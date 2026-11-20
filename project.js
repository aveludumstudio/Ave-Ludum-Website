// Case study page: project.html?p=<slug>, built from the project's entry in content.js "work".
// Sections without content are left out, so nothing is padded or guessed.
(()=>{
const $=s=>document.querySelector(s),c=window.siteContent;
const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
const index=c.work.findIndex(p=>p.slug===new URLSearchParams(location.search).get("p"));
$("#footerWork").innerHTML=c.work.map(p=>`<li><a href="project.html?p=${p.slug}">${p.title}</a></li>`).join("");

if(index<0){
  document.title="Project not found | Ave Ludum Studio";
  // keep unknown project links out of search results
  const robots=document.createElement("meta");robots.name="robots";robots.content="noindex";document.head.append(robots);
  $("#case").innerHTML=`<section class="shell page-hero"><h1>Project not found</h1>
    <p class="lead">That project link doesn't match anything in our portfolio. It may have been renamed.</p>
    <a class="button" href="index.html#work">See All Work</a></section>`;
  return;
}

const p=c.work[index],cs=p.caseStudy||{};
const media=p.gallery||[{image:p.image,alt:`${p.title}: project image`}];
const abs=path=>`https://aveludumstudio.com/${path}`;
const url=abs(`project.html?p=${p.slug}`);

// page metadata for sharing and search
document.title=`${p.title}: Case Study | Ave Ludum Studio`;
// search results cut descriptions at about 155 characters, so trim on a word boundary
const clip=(s,n=155)=>s.length<=n?s:s.slice(0,s.lastIndexOf(" ",n-1)).replace(/[,.;:]$/,"")+"…";
$("#metaDescription").content=clip(p.description);
$("#canonical").href=url;
$("#ogUrl").content=url;
$("#ogTitle").content=`${p.title} | Ave Ludum Studio`;
$("#ogDescription").content=p.description;
$("#ogImage").content=abs(p.image);

const badges=[p.kind,p.status].filter(Boolean).map((b,i)=>`<span class="badge${i?" badge-status":""}">${b}</span>`).join("");
const statusText=cs.statusNote||p.status;
// numbered story sections, in the order a reader needs them; empty ones are skipped
const sections=[
  ["Overview",`<p>${p.description}</p>`],
  ["The challenge",cs.challenge&&`<p>${cs.challenge}</p>`],
  ["Our approach",cs.approach&&`<p>${cs.approach}</p>`],
  ["Interactive features",cs.features&&`<ul class="check-list">${cs.features.map(f=>`<li>${f}</li>`).join("")}</ul>`],
  ["Technology",`<ul class="tech-list">${p.stack.map(t=>`<li>${t}</li>`).join("")}</ul>`],
  ["Project status",statusText&&`<p>${statusText}</p>`],
  ["Client feedback",cs.feedback&&`<blockquote class="case-quote"><p>“${cs.feedback.quote}”</p><footer>${cs.feedback.source}</footer></blockquote>`],
  ["What Ave Ludum contributed",cs.contribution&&`<p>${cs.contribution}</p>`]
].filter(([,body])=>body);
const prev=c.work[(index-1+c.work.length)%c.work.length],next=c.work[(index+1)%c.work.length];
const isOriginal=p.kind==="Original IP";
const clips=media.filter(m=>m.video).length,stills=media.length-clips;

$("#case").innerHTML=`
  <header class="shell case-head">
    <a class="case-back" href="index.html#work">← All work</a>
    <p class="eyebrow">Case study · ${p.type}</p>
    <h1>${p.title}</h1>
    ${badges?`<p class="case-badges">${badges}</p>`:""}
  </header>

  <section class="shell case-media" aria-label="Screenshots and video">
    <div class="case-viewer">
      <img id="caseImage" alt="">
      <video id="caseVideo" muted loop playsinline preload="metadata" hidden></video>
      ${media.length>1?`<button type="button" class="case-arrow case-prev" id="casePrev" aria-label="Previous image">←</button>
      <button type="button" class="case-arrow case-next" id="caseNext" aria-label="Next image">→</button>`:""}
    </div>
    <div class="case-caption-row">
      <p class="case-caption" id="caseCaption"></p>
      <p class="case-count">${[stills&&`${stills} screenshot${stills>1?"s":""}`,clips&&`${clips} clip${clips>1?"s":""}`].filter(Boolean).join(" · ")}</p>
    </div>
    ${media.length>1?`<div class="cs-thumbs" id="caseThumbs">${media.map((m,i)=>`<button type="button" data-shot="${i}"${m.video?' class="is-video"':""} aria-label="Show ${m.video?"clip":"image"} ${i+1} of ${media.length}"><img src="${m.image}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div>`:""}
  </section>

  <div class="shell case-body">
    <div class="case-story">
      ${sections.map(([title,body],i)=>`<section class="case-section"><p class="case-num">${String(i+1).padStart(2,"0")}</p><div><h2>${title}</h2>${body}</div></section>`).join("")}
    </div>
    <aside class="case-facts" aria-label="Project facts">
      <dl>
        <div><dt>Project type</dt><dd>${p.type}</dd></div>
        ${p.kind?`<div><dt>Project kind</dt><dd>${p.kind}</dd></div>`:""}
        ${p.status?`<div><dt>Status</dt><dd>${p.status}</dd></div>`:""}
        <div><dt>Our role</dt><dd>${p.role}</dd></div>
        <div><dt>Built with</dt><dd>${p.stack.join(", ")}</dd></div>
      </dl>
      <div class="case-cta">
        <p>${isOriginal?"Have a story or idea you'd like to turn into a game?":"Need something like this for your team or clients?"}</p>
        <a class="button" href="index.html?type=${encodeURIComponent(p.category==="Games"?"Game Development":p.category==="3D"?"Interactive 3D Application":"VR / Simulation")}#contact">${isOriginal?"Discuss Your Idea":"Start a Similar Project"}</a>
        <a class="link" href="services.html">See services &amp; pricing</a>
      </div>
    </aside>
  </div>

  <nav class="shell case-nav" aria-label="More projects">
    <a href="project.html?p=${prev.slug}"><span>← Previous project</span>${prev.title}</a>
    <a href="project.html?p=${next.slug}"><span>Next project →</span>${next.title}</a>
  </nav>`;

// structured data so search engines know what the project is and who made it
const ld=document.createElement("script");ld.type="application/ld+json";
ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"CreativeWork",name:p.title,description:p.description,url,
  image:media.map(m=>abs(m.image)),genre:p.type,keywords:p.stack.join(", "),
  creator:{"@type":"Organization",name:"Ave Ludum Studio",url:"https://aveludumstudio.com/"}});
document.head.append(ld);

// media viewer: pictures and looping clips, with arrows, thumbnails, swipe and arrow keys
const img=$("#caseImage"),video=$("#caseVideo");
const videoToggle=playToggle(video,$(".case-viewer"));
let shot=0;
const show=i=>{
  shot=(i+media.length)%media.length;
  const m=media[shot];
  img.hidden=!!m.video;video.hidden=!m.video;videoToggle.hidden=!m.video;
  if(m.video){
    video.poster=m.image;video.src=m.video;video.setAttribute("aria-label",m.alt);
    if(!reduceMotion)video.play().catch(()=>{});
  }else{
    video.pause();video.removeAttribute("src");video.load();
    img.src=m.image;img.alt=m.alt;
  }
  $("#caseCaption").textContent=m.caption||"";
  document.querySelectorAll("#caseThumbs button").forEach((t,j)=>t.setAttribute("aria-pressed",String(j===shot)));
};
show(0);
if(media.length>1){
  $("#casePrev").addEventListener("click",()=>show(shot-1));
  $("#caseNext").addEventListener("click",()=>show(shot+1));
  $("#caseThumbs").addEventListener("click",e=>{const t=e.target.closest("[data-shot]");if(t)show(+t.dataset.shot)});
  dragScroll($("#caseThumbs"));
  onSwipe(img,d=>show(shot+d));
  onSwipe(video,d=>show(shot+d));
  document.addEventListener("keydown",e=>{
    if(e.target.closest?.("input,textarea,select"))return;
    if(e.key==="ArrowLeft")show(shot-1);
    if(e.key==="ArrowRight")show(shot+1);
  });
}
// click a clip to pause or play it (a swipe across it doesn't count)
let downX=0;
video.addEventListener("pointerdown",e=>downX=e.clientX);
video.addEventListener("click",e=>{if(Math.abs(e.clientX-downX)>10)return;video.paused?video.play():video.pause()});
})();
