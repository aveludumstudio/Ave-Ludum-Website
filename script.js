const $=s=>document.querySelector(s),c=window.siteContent;

// Mouse drag for strips that fingers can already scroll natively.
// onEnd(dx) runs after a drag, e.g. to settle on the nearest card.
const dragScroll=(el,onEnd)=>{
  let startX=0,startLeft=0,dragging=false,moved=false;
  el.addEventListener("pointerdown",e=>{
    if(e.pointerType!=="mouse"||e.button!==0)return;
    dragging=true;moved=false;startX=e.clientX;startLeft=el.scrollLeft;
  });
  addEventListener("pointermove",e=>{
    if(!dragging)return;
    const dx=e.clientX-startX;
    if(!moved&&Math.abs(dx)<6)return;
    if(!moved){moved=true;el.classList.add("is-dragging")} // turns snapping off while dragging
    el.scrollLeft=startLeft-dx;
  });
  addEventListener("pointerup",e=>{
    if(!dragging)return;dragging=false;
    if(!moved)return;
    el.classList.remove("is-dragging");
    onEnd?.(e.clientX-startX);
    setTimeout(()=>moved=false); // let the click that ends the drag be swallowed first
  });
  // a drag shouldn't also count as a click on the card it started on
  el.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopImmediatePropagation()}},true);
  el.addEventListener("dragstart",e=>e.preventDefault());
};

// Swipe with a finger, or drag with the mouse, to step back/forward (step gets -1 or 1)
const onSwipe=(el,step)=>{
  let x0=null,y0=0,id=null;
  el.classList.add("swipeable");
  el.addEventListener("pointerdown",e=>{if(e.button!==0)return;x0=e.clientX;y0=e.clientY;id=e.pointerId});
  addEventListener("pointerup",e=>{
    if(x0===null||e.pointerId!==id)return;
    const dx=e.clientX-x0,dy=e.clientY-y0;x0=null;
    if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.2)step(dx<0?1:-1);
  });
  addEventListener("pointercancel",()=>x0=null);
  el.addEventListener("dragstart",e=>e.preventDefault());
};

// Close a dialog on a backdrop click, but not when a drag inside it ends out there
const closeOnBackdrop=d=>{
  let downOnBackdrop=false;
  d.addEventListener("pointerdown",e=>downOnBackdrop=e.target===d);
  d.addEventListener("click",e=>{if(e.target===d&&downOnBackdrop)d.close()});
};

// Work grid + filters (filters come from the categories actually used)
const categories=["All",...new Set(c.work.map(p=>p.category))];
let activeFilter="All";
$("#filters").innerHTML=categories.map(f=>`<button type="button" data-filter="${f}" aria-pressed="${f==="All"}">${f}</button>`).join("");
const renderWork=()=>{
  $("#workGrid").innerHTML=c.work.map((p,i)=>({p,i})).filter(({p})=>activeFilter==="All"||p.category===activeFilter).map(({p,i})=>`
    <article class="work-card">
      <button type="button" class="work-open" data-index="${i}">
        <span class="work-image"><img src="${p.image}" alt="" loading="lazy" decoding="async"></span>
        <span class="work-text">
          <span class="work-type">${p.type}</span>
          <span class="work-title">${p.title}</span>
          <span class="work-desc">${p.description}</span>
        </span>
      </button>
    </article>`).join("");
};
$("#filters").addEventListener("click",e=>{
  const b=e.target.closest("[data-filter]");if(!b)return;
  activeFilter=b.dataset.filter;
  document.querySelectorAll("#filters button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
  renderWork();
  $("#workGrid").scrollTo({left:0});
  syncWorkCarousel();
});
renderWork();

// Work carousel: arrows step one card at a time; swiping/trackpad still works
const workGrid=$("#workGrid");
const cardStep=()=>{const card=workGrid.querySelector(".work-card");return card?card.getBoundingClientRect().width+parseFloat(getComputedStyle(workGrid).columnGap||0):workGrid.clientWidth};
const syncWorkCarousel=()=>{
  const max=workGrid.scrollWidth-workGrid.clientWidth;
  $("#workPrev").disabled=workGrid.scrollLeft<=2;
  $("#workNext").disabled=workGrid.scrollLeft>=max-2;
  // progress bar shows which slice of the list is in view
  const visible=max>0?workGrid.clientWidth/workGrid.scrollWidth:1;
  $("#workProgress").style.width=`${visible*100}%`;
  $("#workProgress").style.left=`${max>0?(workGrid.scrollLeft/workGrid.scrollWidth)*100:0}%`;
  $(".carousel-bar").hidden=max<=2;
};
$("#workPrev").addEventListener("click",()=>workGrid.scrollBy({left:-cardStep(),behavior:"smooth"}));
$("#workNext").addEventListener("click",()=>workGrid.scrollBy({left:cardStep(),behavior:"smooth"}));
workGrid.addEventListener("scroll",syncWorkCarousel,{passive:true});
workGrid.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight"){e.preventDefault();$("#workNext").click()}
  if(e.key==="ArrowLeft"){e.preventDefault();$("#workPrev").click()}
});
addEventListener("resize",syncWorkCarousel);
syncWorkCarousel();
// after a mouse drag, settle on a whole card in the direction it was dragged
dragScroll(workGrid,dx=>{
  const step=cardStep(),pos=workGrid.scrollLeft/step;
  workGrid.scrollTo({left:(dx<0?Math.ceil(pos-.15):Math.floor(pos+.15))*step,behavior:"smooth"});
});

// Project dialog
const dialog=$("#projectDialog");
let shots=[],shot=0;
const show=i=>{
  shot=(i+shots.length)%shots.length;
  $("#dialogImage").src=shots[shot].image;$("#dialogImage").alt=shots[shot].alt;
  document.querySelectorAll("#dialogThumbs button").forEach((t,j)=>t.setAttribute("aria-pressed",String(j===shot)));
};
onSwipe($("#dialogImage"),d=>{if(shots.length>1)show(shot+d)});
dragScroll($("#dialogThumbs"));
$("#workGrid").addEventListener("click",e=>{
  const b=e.target.closest(".work-open");if(!b)return;
  const p=c.work[b.dataset.index];
  shots=p.gallery||[{image:p.image,alt:`${p.title} screenshot`}];
  $("#dialogThumbs").innerHTML=shots.length>1?shots.map((s,i)=>`<button type="button" data-shot="${i}" aria-label="Show image ${i+1} of ${shots.length}"><img src="${s.image}" alt=""></button>`).join(""):"";
  $("#dialogThumbs").onclick=e=>{const t=e.target.closest("[data-shot]");if(t)show(+t.dataset.shot)};
  show(0);
  $("#dialogType").textContent=p.type;
  $("#dialogTitle").textContent=p.title;
  $("#dialogDescription").textContent=p.description;
  $("#dialogRole").textContent=p.role;
  $("#dialogStack").textContent=p.stack.join(", ");
  dialog.showModal();
});
$("#dialogClose").addEventListener("click",()=>dialog.close());
closeOnBackdrop(dialog);
dialog.addEventListener("keydown",e=>{if(shots.length<2)return;if(e.key==="ArrowLeft")show(shot-1);if(e.key==="ArrowRight")show(shot+1)});

// Level design walkthrough
const level=c.levelDesign;
let stop=0;
$("#levelMapImage").src=level.image;
$("#levelMapImage").width=level.width;$("#levelMapImage").height=level.height;
$("#levelPins").innerHTML=level.stops.map((s,i)=>`<button type="button" class="level-pin" data-stop="${i}" style="left:${s.x}%;top:${s.y}%" aria-label="${i+1}. ${s.name}">${i+1}</button>`).join("");
const showStop=i=>{
  stop=(i+level.stops.length)%level.stops.length;
  const s=level.stops[stop];
  document.querySelectorAll(".level-pin").forEach((p,j)=>p.setAttribute("aria-pressed",String(j===stop)));
  // No in-game shot for this stop: zoom into the layout around the marker instead.
  // The view is 16:10 and the image is drawn at ZOOM x its width; work out the
  // background-position that puts the marker in the middle of the view.
  const ZOOM=3.2,scaleY=ZOOM*(level.height/level.width)*1.6;
  const centre=(pct,scale)=>Math.min(100,Math.max(0,(scale*pct/100-.5)/(scale-1)*100));
  $("#levelView").innerHTML=s.shot
    ?`<img src="${s.shot}" alt="${s.name}, in the game">`
    :`<span class="level-zoom" role="img" aria-label="Close-up of the ${s.name} area in the editor" style="background-image:url(${level.image});background-size:${ZOOM*100}% auto;background-position:${centre(s.x,ZOOM)}% ${centre(s.y,scaleY)}%"></span>`;
  $("#levelCount").textContent=`Stop ${stop+1} of ${level.stops.length} · ${s.shot?"In game":"Editor view"}`;
  $("#levelName").textContent=s.name;
  $("#levelNote").textContent=s.note;
};
$("#levelPins").addEventListener("click",e=>{const p=e.target.closest("[data-stop]");if(p)showStop(+p.dataset.stop)});
$("#levelPrev").addEventListener("click",()=>showStop(stop-1));
$("#levelNext").addEventListener("click",()=>showStop(stop+1));
onSwipe($("#levelView"),d=>showStop(stop+d));
showStop(0);

// Concept art grid + lightbox
const art=c.conceptArt,artDialog=$("#artDialog");
let artIndex=0;
const artItems=kind=>art.map((a,i)=>a.kind!==kind?"":`
  <figure class="concept-item">
    <button type="button" data-art="${i}" aria-label="View ${a.title} full size">
      <img src="${a.image}" alt="${a.alt}" width="${a.width}" height="${a.height}" loading="lazy" decoding="async">
    </button>
    <figcaption><strong>${a.title}</strong> ${a.note}</figcaption>
  </figure>`).join("");
$("#conceptGrid").innerHTML=`<div class="concept-paintings">${artItems("painting")}</div><div class="concept-sketches">${artItems("sketch")}</div>`;
const showArt=i=>{
  artIndex=(i+art.length)%art.length;
  const a=art[artIndex];
  $("#artImage").src=a.image;$("#artImage").alt=a.alt;
  $("#artDialog").classList.toggle("is-tall",a.height>a.width);
  $("#artTitle").textContent=a.title;
  $("#artNote").textContent=a.note;
};
$("#conceptGrid").addEventListener("click",e=>{const b=e.target.closest("[data-art]");if(!b)return;showArt(+b.dataset.art);artDialog.showModal()});
$("#artPrev").addEventListener("click",()=>showArt(artIndex-1));
$("#artNext").addEventListener("click",()=>showArt(artIndex+1));
$("#artClose").addEventListener("click",()=>artDialog.close());
closeOnBackdrop(artDialog);
onSwipe($("#artImage"),d=>showArt(artIndex+d));
artDialog.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")showArt(artIndex-1);if(e.key==="ArrowRight")showArt(artIndex+1)});

// Studio
$("#studioCopy").innerHTML=c.studioCopy.map(p=>`<p>${p}</p>`).join("");
$("#photos").innerHTML=c.fieldPhotos.map(f=>`<figure><img src="${f.image}" alt="${f.caption}" width="${f.width}" height="${f.height}"${f.focus?` style="object-position:${f.focus}"`:""} loading="lazy" decoding="async"><figcaption>${f.caption}</figcaption></figure>`).join("");
$("#quotes").innerHTML=c.testimonials.map(t=>`<blockquote><p>“${t.quote}”</p><footer>${t.source}</footer></blockquote>`).join("");

// Team: photo if one is set, otherwise the person's initial
const personCard=p=>`
  <li class="person${p.isNew?" is-new":""}">
    ${p.photo?`<img class="person-photo" src="${p.photo}" alt="${p.fullName}" loading="lazy" decoding="async" data-initial="${p.name[0]}">`:`<span class="person-photo person-initial" aria-hidden="true">${p.name[0]}</span>`}
    <div class="person-text">
      <p class="person-name">${p.name}${p.isNew?` <span class="person-badge">New</span>`:""}</p>
      ${p.fullName&&p.fullName!==p.name?`<p class="person-full">${p.fullName}</p>`:""}
      <p class="person-role">${p.role}</p>
      ${p.job?`<p class="person-job">${p.job}</p>`:""}
    </div>
    ${p.socials?`<ul class="person-socials" aria-label="${p.name}'s socials">${p.socials.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener me">${label}</a></li>`).join("")}</ul>`:""}
    ${p.portfolio?`<a class="person-porto" href="${p.portfolio.url}" target="_blank" rel="noopener">
      <img src="${p.portfolio.preview}" alt="" loading="lazy" decoding="async">
      <span>View ${p.name}'s portfolio <small>${p.portfolio.kind} ↗</small></span>
    </a>`:""}
  </li>`;
$("#teamManagementIntro").textContent=c.team.management.intro;
$("#teamManagement").innerHTML=c.team.management.people.map(personCard).join("");
$("#teamCrewIntro").textContent=c.team.crew.intro;
$("#teamCrew").innerHTML=c.team.crew.people.map(personCard).join("");
// a missing photo file falls back to the initial instead of a broken image
document.querySelectorAll("#team img.person-photo").forEach(img=>img.addEventListener("error",()=>{
  const s=document.createElement("span");
  s.className="person-photo person-initial";s.setAttribute("aria-hidden","true");s.textContent=img.dataset.initial;
  img.replaceWith(s);
},{once:true}));

// Services + process
$("#serviceList").innerHTML=c.services.map(([name,text])=>`<div><dt>${name}</dt><dd>${text}</dd></div>`).join("");
$("#process").innerHTML=c.process.map(([name,text])=>`<li><strong>${name}.</strong> ${text}</li>`).join("");

// Contact
$("#footerSocials").innerHTML=c.socials.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener">${label}</a></li>`).join("");
$("#contactLinks").innerHTML=c.contact.map(([label,value,href])=>`<li><span>${label}</span><a href="${href}"${href.startsWith("http")?' target="_blank" rel="noopener"':""}>${value}</a></li>`).join("");
$("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  const subject=`Project quote request: ${d.get("project")}${d.get("company").trim()?` (${d.get("company").trim()})`:""}`;
  // one line per field; optional fields are left out when empty
  const fields=[["Name","name"],["Reply to","reply"],["Company","company"],["Project type","project"],["Target platform","platform"],["Target deadline","deadline"],["Budget range","budget"],["Reference links","links"]];
  const details=fields.map(([label,key])=>[label,d.get(key).trim()]).filter(([,v])=>v).map(([label,v])=>`${label}: ${v}`).join("\n");
  const body=`Hi Ave Ludum,\n\nGoal / problem:\n${d.get("brief").trim()}\n\n${details}\n\nI agree to be contacted about this enquiry.\n\n— ${d.get("name").trim()}`;
  window.location.href=`mailto:${c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
const loc=c.location;
$("#visitIntro").textContent=loc.intro;
$("#visitPhoto").src=loc.photo;$("#visitPhoto").alt=loc.photoAlt;
$("#visitAddress").innerHTML=loc.address.join("<br>");
$("#visitLink").href=loc.mapsUrl;
$("#visitMap").src=loc.embedUrl;
$("#year").textContent=new Date().getFullYear();

// Chapters: each section is a screen; arrows, the rail, the header nav and the
// keyboard move between them, and ordinary scrolling still works (CSS snaps gently).
const chapters=[...document.querySelectorAll(".chapter")];
const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
let current=0;
const pad=n=>String(n+1).padStart(2,"0");
$("#chapterRail").innerHTML=chapters.map((ch,i)=>`<li><a href="#${ch.id}" data-chapter="${i}"><span class="rail-dot"></span><span class="rail-name">${ch.dataset.title}</span></a></li>`).join("");
const goTo=i=>{
  const target=chapters[Math.max(0,Math.min(chapters.length-1,i))];
  target.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"start"});
};
const setCurrent=i=>{
  current=i;
  const ch=chapters[i];
  $("#chapterLabel").innerHTML=`<b>${pad(i)}</b> ${ch.dataset.title}`;
  $("#chapterPrev").disabled=i===0;
  $("#chapterNext").disabled=i===chapters.length-1;
  document.querySelectorAll("#chapterRail a").forEach((a,j)=>a.toggleAttribute("aria-current",j===i));
  document.querySelectorAll("nav[aria-label='Main'] a").forEach(a=>a.toggleAttribute("aria-current",a.getAttribute("href")===`#${ch.id}`));
  history.replaceState(null,"",i===0?location.pathname+location.search:`#${ch.id}`);
};
// The chapter crossing the middle of the screen is the current one
const chapterObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)setCurrent(chapters.indexOf(e.target))});
},{rootMargin:"-45% 0px -54% 0px"});
chapters.forEach(ch=>chapterObserver.observe(ch));
setCurrent(0);

$("#chapterPrev").addEventListener("click",()=>goTo(current-1));
$("#chapterNext").addEventListener("click",()=>goTo(current+1));
document.addEventListener("click",e=>{if(e.target.closest("[data-go='next']"))goTo(current+1)});

// Up/down arrows jump a whole chapter once you've reached its edge;
// inside a tall chapter they scroll normally so nothing gets skipped.
document.addEventListener("keydown",e=>{
  if(e.defaultPrevented||e.altKey||e.ctrlKey||e.metaKey||document.querySelector("dialog[open]"))return;
  if(e.target.closest("input,textarea,select,[contenteditable],iframe"))return;
  const r=chapters[current].getBoundingClientRect(),header=$(".site-header").offsetHeight;
  if(e.key==="ArrowDown"&&r.bottom<=innerHeight+4&&current<chapters.length-1){e.preventDefault();goTo(current+1)}
  if(e.key==="ArrowUp"&&r.top>=header-4&&current>0){e.preventDefault();goTo(current-1)}
});

// Fade content in as each chapter arrives (skipped for reduced motion)
if(!reduceMotion){
  chapters.forEach(ch=>{
    const parts=ch.querySelectorAll(":scope > *:not(.hero-next), :scope > .shell > *");
    parts.forEach((el,i)=>{el.classList.add("reveal");el.style.setProperty("--i",i)});
  });
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-in");revealObserver.unobserve(e.target)}});
  },{threshold:.12});
  chapters.forEach(ch=>revealObserver.observe(ch));
}

// Reading progress along the header
const progress=$("#scrollProgress");
let ticking=false;
addEventListener("scroll",()=>{
  if(ticking)return;ticking=true;
  requestAnimationFrame(()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
    ticking=false;
  });
},{passive:true});

// Theme
const root=document.documentElement,themeColor=$("#themeColor");
const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
const syncThemeColor=()=>themeColor.setAttribute("content",isDark()?"#17120c":"#fff4e0");
syncThemeColor();
$("#themeToggle").addEventListener("click",()=>{
  const next=isDark()?"light":"dark";
  root.dataset.theme=next;
  try{localStorage.setItem("ave-ludum-theme",next)}catch(e){}
  syncThemeColor();
});
