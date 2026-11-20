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
// project kind (Original IP, client project…) and status, shown on cards and in the dialog
const badges=p=>[p.kind,p.status].filter(Boolean).map((b,i)=>`<span class="badge${i?" badge-status":""}">${b}</span>`).join("");
const categories=["All",...new Set(c.work.map(p=>p.category))];
let activeFilter="All";
$("#filters").innerHTML=categories.map(f=>`<button type="button" data-filter="${f}" aria-pressed="${f==="All"}">${f}</button>`).join("");
const renderWork=()=>{
  $("#workGrid").innerHTML=c.work.map((p,i)=>({p,i})).filter(({p})=>activeFilter==="All"||p.category===activeFilter).map(({p,i})=>`
    <article class="work-card">
      <button type="button" class="work-open" data-index="${i}">
        <span class="work-image"><img src="${p.image}" alt="" loading="lazy" decoding="async">${p.kind||p.status?`<span class="work-badges">${badges(p)}</span>`:""}</span>
        <span class="work-text">
          <span class="work-type">${p.type}</span>
          <span class="work-title">${p.title}</span>
          <span class="work-desc">${p.description}</span>
          <span class="work-stack">${p.stack.join(" · ")}</span>
          <span class="work-more">View project →</span>
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

// Sideways carousels (work, behind the scenes): arrows step one card at a time,
// the bar shows which slice is in view; swipe, trackpad and mouse drag all work.
// Returns sync() for when the cards change.
const carousel=(grid,prev,next,bar)=>{
  const step=()=>{const card=grid.firstElementChild;return card?card.getBoundingClientRect().width+parseFloat(getComputedStyle(grid).columnGap||0):grid.clientWidth};
  const progress=bar.querySelector(".carousel-track span");
  const sync=()=>{
    const max=grid.scrollWidth-grid.clientWidth;
    prev.disabled=grid.scrollLeft<=2;
    next.disabled=grid.scrollLeft>=max-2;
    const visible=max>0?grid.clientWidth/grid.scrollWidth:1;
    progress.style.width=`${visible*100}%`;
    progress.style.left=`${max>0?(grid.scrollLeft/grid.scrollWidth)*100:0}%`;
    bar.hidden=max<=2;
  };
  prev.addEventListener("click",()=>grid.scrollBy({left:-step(),behavior:"smooth"}));
  next.addEventListener("click",()=>grid.scrollBy({left:step(),behavior:"smooth"}));
  grid.addEventListener("scroll",sync,{passive:true});
  grid.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"){e.preventDefault();next.click()}
    if(e.key==="ArrowLeft"){e.preventDefault();prev.click()}
  });
  addEventListener("resize",sync);
  // after a mouse drag, settle on a whole card in the direction it was dragged
  dragScroll(grid,dx=>{
    const s=step(),pos=grid.scrollLeft/s;
    grid.scrollTo({left:(dx<0?Math.ceil(pos-.15):Math.floor(pos+.15))*s,behavior:"smooth"});
  });
  sync();
  return sync;
};
const syncWorkCarousel=carousel($("#workGrid"),$("#workPrev"),$("#workNext"),$("#work .carousel-bar"));

// Behind the scenes: portrait clips that play while they're on screen
$("#reel").innerHTML=c.reel.map(r=>`
  <li class="reel-card" data-tag="${r.tag}">
    <video muted loop playsinline preload="none" poster="${r.image}" src="${r.video}" aria-label="${r.caption}"></video>
    <span class="reel-tag">${r.tag}</span>
    <p>${r.caption}</p>
  </li>`).join("");
carousel($("#reel"),$("#reelPrev"),$("#reelNext"),$("#behind-the-scenes .carousel-bar"));
const reelVideos=[...document.querySelectorAll("#reel video")];
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  const reelObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting)e.target.play().catch(()=>{});else e.target.pause();
  }),{threshold:.6});
  reelVideos.forEach(v=>reelObserver.observe(v));
}
// click a clip to pause or play it (a drag across the strip is swallowed before this)
reelVideos.forEach(v=>v.addEventListener("click",()=>v.paused?v.play():v.pause()));

// Project dialog
const dialog=$("#projectDialog");
let shots=[],shot=0;
const dialogVideo=$("#dialogVideo");
// a gallery item is a picture, or a short looping clip when it has "video" ("image" is its poster)
const show=i=>{
  shot=(i+shots.length)%shots.length;
  const s=shots[shot];
  $("#dialogImage").hidden=!!s.video;dialogVideo.hidden=!s.video;
  if(s.video){
    dialogVideo.poster=s.image;dialogVideo.src=s.video;dialogVideo.setAttribute("aria-label",s.alt);
    if(!reduceMotion)dialogVideo.play().catch(()=>{});
  }else{
    dialogVideo.pause();dialogVideo.removeAttribute("src");dialogVideo.load();
    $("#dialogImage").src=s.image;$("#dialogImage").alt=s.alt;
  }
  $("#dialogCaption").textContent=s.caption||"";
  document.querySelectorAll("#dialogThumbs button").forEach((t,j)=>t.setAttribute("aria-pressed",String(j===shot)));
};
onSwipe($("#dialogImage"),d=>{if(shots.length>1)show(shot+d)});
onSwipe(dialogVideo,d=>{if(shots.length>1)show(shot+d)});
// click a clip to pause or play it (a swipe across it doesn't count as a click)
let videoDownX=0;
dialogVideo.addEventListener("pointerdown",e=>videoDownX=e.clientX);
dialogVideo.addEventListener("click",e=>{
  if(Math.abs(e.clientX-videoDownX)>10)return;
  dialogVideo.paused?dialogVideo.play():dialogVideo.pause();
});
dragScroll($("#dialogThumbs"));
// Optional case-study fields, shown in this order when a project has them
const caseSections=[["objective","The objective"],["solution","Our solution"],["process","Development process"],["features","Interactive features"],["outcome","Outcome"]];
const openProject=index=>{
  const p=c.work[index];
  shots=p.gallery||[{image:p.image,alt:`${p.title} screenshot`}];
  $("#dialogThumbs").innerHTML=shots.length>1?shots.map((s,i)=>`<button type="button" data-shot="${i}"${s.video?' class="is-video"':""} aria-label="Show ${s.video?"clip":"image"} ${i+1} of ${shots.length}"><img src="${s.image}" alt=""></button>`).join(""):"";
  $("#dialogThumbs").onclick=e=>{const t=e.target.closest("[data-shot]");if(t)show(+t.dataset.shot)};
  show(0);
  $("#dialogType").textContent=p.type;
  $("#dialogTitle").textContent=p.title;
  $("#dialogBadges").innerHTML=badges(p);
  $("#dialogDescription").textContent=p.description;
  $("#dialogSections").innerHTML=caseSections.filter(([key])=>p[key]).map(([key,heading])=>`<h3>${heading}</h3>${Array.isArray(p[key])?`<ul>${p[key].map(x=>`<li>${x}</li>`).join("")}</ul>`:`<p>${p[key]}</p>`}`).join("");
  $("#dialogRole").textContent=p.role;
  $("#dialogStack").textContent=p.stack.join(", ");
  // originals aren't something to commission, so their CTA points elsewhere
  const cta=$("#dialogCta");
  cta.textContent=p.kind==="Original IP"?"Discuss Your Idea":"Start a Similar Project";
  cta.dataset.type=p.category==="Games"?"Game Development":p.category==="VR / XR"||p.category==="Simulation"?"VR / Simulation":"Interactive 3D Application";
  dialog.showModal();
};
$("#dialogCta").addEventListener("click",()=>dialog.close());
$("#workGrid").addEventListener("click",e=>{
  const b=e.target.closest(".work-open");if(b)openProject(+b.dataset.index);
});
$("#dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("close",()=>dialogVideo.pause());
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

// What we do: the four service areas
$("#whatWeDo").innerHTML=c.whatWeDo.map(s=>`
  <article class="offer-card">
    <img src="${s.image}" alt="${s.alt}" loading="lazy" decoding="async">
    <div class="offer-body">
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <p class="offer-links"><a href="services.html#${s.id}">Learn more</a><a href="#contact" data-type="${s.type}">Discuss a project</a></p>
    </div>
  </article>`).join("");

// Who we work with, with links to related projects on this page
const workIndex=title=>c.work.findIndex(p=>p.title===title);
$("#segments").innerHTML=c.segments.map(s=>`
  <article class="segment">
    <h3>${s.title}</h3>
    <p>${s.text}</p>
    ${s.work.length?`<p class="segment-work">Related work: ${s.work.filter(t=>workIndex(t)>=0).map(t=>`<button type="button" data-project="${workIndex(t)}">${t}</button>`).join(", ")}</p>`:""}
  </article>`).join("");
$("#segments").addEventListener("click",e=>{const b=e.target.closest("[data-project]");if(b)openProject(+b.dataset.project)});

// Process
$("#processSteps").innerHTML=c.process.map(([name,text],i)=>`<li><span class="step-number">${String(i+1).padStart(2,"0")}</span><h3>${name}</h3><p>${text}</p></li>`).join("");

// Ave Ludum Originals
const o=c.originals;
$("#originalsTitle").textContent=o.title;
$("#originalsStatus").textContent=o.status;
$("#originalsText").textContent=o.text;
$("#originalsFacts").innerHTML=o.facts.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
$("#originalsUpdates").innerHTML=o.updates.map(([when,what])=>`<li><time>${when}</time> ${what}</li>`).join("");
$("#originalsImages").innerHTML=o.images.map(src=>`<img src="${src}" alt="" loading="lazy" decoding="async">`).join("");
$("#originalsShots").addEventListener("click",()=>openProject(workIndex(o.title)));

// About: the three divisions
$("#divisions").innerHTML=c.divisions.map(d=>`<li><p class="division-label">Ave Ludum</p><h3>${d.name}</h3><p>${d.text}</p><a href="${d.link}">${d.linkText} →</a></li>`).join("");

// Digital products: real listings when there are any, otherwise what's planned
if(c.products.length){
  $("#productsIntro").textContent="Tools, templates and assets made by the studio, ready to use in your own projects.";
  $("#productsList").innerHTML=`<div class="product-grid">${c.products.map(p=>`
    <article class="product-card">
      ${p.image?`<img src="${p.image}" alt="" loading="lazy" decoding="async">`:""}
      <h3>${p.title}</h3><p>${p.text}</p>
      ${p.price?`<p class="product-price">${formatRupiah(p.price)}</p>`:""}
      <a class="button button-sm" href="${p.url}" target="_blank" rel="noopener">${p.cta||"Get it"}</a>
    </article>`).join("")}</div>`;
}else{
  $("#productsIntro").textContent="We're building reusable Unity tools, gameplay systems, templates and learning products. Nothing is on sale yet. These are the first things we're working on:";
  $("#productsList").innerHTML=`<ul class="planned-list">${c.plannedProducts.map(p=>`<li>${p}<span>Coming soon</span></li>`).join("")}</ul>
    <p class="planned-note">Want to hear when the first one is ready? Follow us on <a href="${c.socials[0][1]}" target="_blank" rel="noopener">Instagram</a> or <a href="${c.socials[1][1]}" target="_blank" rel="noopener">LinkedIn</a>.</p>`;
}

// Start a project
$("#contactLinks").innerHTML=c.contact.filter(([label])=>label!=="Email").map(([label,value,href])=>`<li><span>${label}</span><a href="${href}"${href.startsWith("http")?' target="_blank" rel="noopener"':""}>${value}</a></li>`).join("");
if(c.inquiry.whatsapp){
  const wa=$("#whatsappLink");
  wa.href=`https://wa.me/${c.inquiry.whatsapp}?text=${encodeURIComponent("Hi Ave Ludum, I'd like to discuss a project.")}`;
  wa.hidden=false;
}
const form=$("#contactForm"),formStatus=$("#formStatus"),submitButton=$("#formSubmit");
const typeSelect=form.elements.projectType;
// any "Discuss a project" style link with data-type preselects the project type
const preselect=t=>{if(t&&[...typeSelect.options].some(o=>o.value===t))typeSelect.value=t};
document.addEventListener("click",e=>{const a=e.target.closest("a[data-type]");if(a)preselect(a.dataset.type)});
preselect(new URLSearchParams(location.search).get("type"));
$("#formNote").textContent=c.inquiry.endpoint
  ?"We reply within a few working days. Your details are only used to answer this inquiry."
  :`Sending opens your email app with the inquiry filled in, addressed to ${c.email}. Nothing is sent until you press send there.`;
const fieldError=(field,message)=>{
  const label=field.closest("label");
  label.querySelector(".field-error")?.remove();
  field.toggleAttribute("aria-invalid",!!message);
  if(message)label.insertAdjacentHTML("beforeend",`<span class="field-error">${message}</span>`);
};
const validate=()=>{
  let first=null;
  for(const field of form.elements){
    if(!field.name||field.type==="submit")continue;
    let message="";
    if(field.type==="checkbox"&&field.required&&!field.checked)message="Please tick this so we can reply to you.";
    else if(field.required&&!field.value.trim())message=field.tagName==="SELECT"?"Please choose an option.":"Please fill this in.";
    else if(field.type==="email"&&field.value&&!field.validity.valid)message="Please check this email address.";
    else if(field.name==="whatsapp"&&field.value&&!/^\+?[\d\s-]{8,}$/.test(field.value.trim()))message="Please enter a phone number, e.g. +62 812 3456 7890.";
    fieldError(field,message);
    if(message&&!first)first=field;
  }
  first?.focus();
  return !first;
};
form.addEventListener("input",e=>{if(e.target.hasAttribute("aria-invalid"))fieldError(e.target,"")});
form.addEventListener("change",e=>{if(e.target.hasAttribute("aria-invalid"))fieldError(e.target,"")});
const showStatus=(kind,text)=>{formStatus.hidden=false;formStatus.className=`form-status is-${kind}`;formStatus.textContent=text};
form.addEventListener("submit",async e=>{
  e.preventDefault();
  formStatus.hidden=true;
  if(!validate())return;
  const d=Object.fromEntries(new FormData(form));
  const subject=`Project inquiry: ${d.projectType}${d.organization.trim()?` (${d.organization.trim()})`:""}`;
  const fields=[["Name","name"],["Organization","organization"],["Email","email"],["WhatsApp","whatsapp"],["Project type","projectType"],["Estimated budget","budget"],["Desired timeline","timeline"],["Reference links","links"]];
  const details=fields.map(([label,key])=>[label,(d[key]||"").trim()]).filter(([,v])=>v).map(([label,v])=>`${label}: ${v}`).join("\n");
  if(!c.inquiry.endpoint){
    // No form service configured yet: hand the inquiry to the visitor's email app
    const body=`Hi Ave Ludum,\n\n${d.description.trim()}\n\n${details}\n\nI agree to be contacted about this inquiry.`;
    location.href=`mailto:${c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showStatus("info",`Your email app should open with the inquiry ready to send. If nothing opens, email us at ${c.email}.`);
    return;
  }
  submitButton.disabled=true;submitButton.classList.add("is-loading");
  submitButton.querySelector(".button-label").textContent="Sending…";
  try{
    const res=await fetch(c.inquiry.endpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},
      body:JSON.stringify({_subject:subject,...d,consent:"yes"})});
    const json=await res.json().catch(()=>({}));
    if(!res.ok||json.success===false||json.success==="false")throw new Error(json.message||res.statusText);
    form.reset();
    showStatus("success","Thank you for considering Ave Ludum Studio. Your project inquiry has been received. We'll review your requirements and get back to you.");
  }catch(err){
    showStatus("error",`Sorry, your inquiry couldn't be sent just now. Please try again, or email us at ${c.email}.`);
  }finally{
    submitButton.disabled=false;submitButton.classList.remove("is-loading");
    submitButton.querySelector(".button-label").textContent="Send Inquiry";
  }
});

const loc=c.location;
$("#visitIntro").textContent=loc.intro;
$("#visitPhoto").src=loc.photo;$("#visitPhoto").alt=loc.photoAlt;
$("#visitAddress").innerHTML=loc.address.join("<br>");
$("#visitLink").href=loc.mapsUrl;
$("#visitMap").src=loc.embedUrl;

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
