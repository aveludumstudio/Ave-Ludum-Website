const $=s=>document.querySelector(s),c=window.siteContent;

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
});
renderWork();

// Project dialog
const dialog=$("#projectDialog");
$("#workGrid").addEventListener("click",e=>{
  const b=e.target.closest(".work-open");if(!b)return;
  const p=c.work[b.dataset.index];
  const shots=p.gallery||[{image:p.image,alt:`${p.title} screenshot`}];
  const show=i=>{
    $("#dialogImage").src=shots[i].image;$("#dialogImage").alt=shots[i].alt;
    document.querySelectorAll("#dialogThumbs button").forEach((t,j)=>t.setAttribute("aria-pressed",String(j===i)));
  };
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
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()}); // click on backdrop

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
artDialog.addEventListener("click",e=>{if(e.target===artDialog)artDialog.close()});
artDialog.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")showArt(artIndex-1);if(e.key==="ArrowRight")showArt(artIndex+1)});

// Studio
$("#studioCopy").innerHTML=c.studioCopy.map(p=>`<p>${p}</p>`).join("");
$("#photos").innerHTML=c.fieldPhotos.map(f=>`<figure><img src="${f.image}" alt="${f.caption}" width="${f.width}" height="${f.height}" loading="lazy" decoding="async"><figcaption>${f.caption}</figcaption></figure>`).join("");
$("#quotes").innerHTML=c.testimonials.map(t=>`<blockquote><p>“${t.quote}”</p><footer>${t.source}</footer></blockquote>`).join("");

// Services + process
$("#serviceList").innerHTML=c.services.map(([name,text])=>`<div><dt>${name}</dt><dd>${text}</dd></div>`).join("");
$("#process").innerHTML=c.process.map(([name,text])=>`<li><strong>${name}.</strong> ${text}</li>`).join("");

// Contact
$("#contactLinks").innerHTML=c.contact.map(([label,value,href])=>`<li><span>${label}</span><a href="${href}"${href.startsWith("http")?' target="_blank" rel="noopener"':""}>${value}</a></li>`).join("");
$("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  const subject=`Project enquiry: ${d.get("project")}`;
  const body=`Hi Ave Ludum,\n\n${d.get("brief")}\n\n— ${d.get("name")}`;
  window.location.href=`mailto:${c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
const loc=c.location;
$("#visitIntro").textContent=loc.intro;
$("#visitPhoto").src=loc.photo;$("#visitPhoto").alt=loc.photoAlt;
$("#visitAddress").innerHTML=loc.address.join("<br>");
$("#visitLink").href=loc.mapsUrl;
$("#visitMap").src=loc.embedUrl;
$("#year").textContent=new Date().getFullYear();

// Theme
const root=document.documentElement,themeColor=$("#themeColor");
const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
const syncThemeColor=()=>themeColor.setAttribute("content",isDark()?"#16140f":"#f3efe6");
syncThemeColor();
$("#themeToggle").addEventListener("click",()=>{
  const next=isDark()?"light":"dark";
  root.dataset.theme=next;
  try{localStorage.setItem("ave-ludum-theme",next)}catch(e){}
  syncThemeColor();
});
