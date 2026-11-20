// Shared by every page: theme toggle, footer links, the year and price formatting.
(()=>{
const $=s=>document.querySelector(s),c=window.siteContent;

// Theme
const root=document.documentElement,themeColor=$("#themeColor");
const isDark=()=>root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;
const syncThemeColor=()=>themeColor.setAttribute("content",isDark()?"#100f0d":"#f6f4ef");
syncThemeColor();
$("#themeToggle").addEventListener("click",()=>{
  const next=isDark()?"light":"dark";
  root.dataset.theme=next;
  try{localStorage.setItem("ave-ludum-theme",next)}catch(e){}
  syncThemeColor();
});

// Menu button on phones and tablets, where the header nav doesn't fit
const menu=$("#menuToggle");
if(menu){
  const setMenu=open=>{
    document.body.classList.toggle("menu-open",open);
    menu.setAttribute("aria-expanded",String(open));
    menu.setAttribute("aria-label",open?"Close menu":"Open menu");
  };
  menu.addEventListener("click",()=>setMenu(!document.body.classList.contains("menu-open")));
  $("#mainNav").addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.body.classList.contains("menu-open")){setMenu(false);menu.focus()}});
  addEventListener("resize",()=>{if(innerWidth>900)setMenu(false)});
}

// Footer
$("#footerSocials").innerHTML=c.socials.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener">${label}</a></li>`).join("");
$("#footerServices").innerHTML=c.whatWeDo.map(s=>`<li><a href="services.html#${s.id}">${s.title}</a></li>`).join("")+`<li><a href="services.html#offers">Packages &amp; pricing</a></li>`;
$("#year").textContent=new Date().getFullYear();
})();

// "Rp1.500.000" style prices, as written in Indonesia
const formatRupiah=n=>"Rp"+n.toLocaleString("id-ID");

// A visible, keyboard-reachable pause/play button for clips that loop on their own
// (WCAG 2.2.2). Returns the button so callers can hide it when no clip is showing.
const playToggle=(video,host=video.parentElement)=>{
  const b=document.createElement("button");
  b.type="button";b.className="play-toggle";
  const sync=()=>{b.textContent=video.paused?"▶":"❚❚";b.setAttribute("aria-label",video.paused?"Play video":"Pause video")};
  b.addEventListener("click",e=>{e.stopPropagation();video.paused?video.play().catch(()=>{}):video.pause()});
  video.addEventListener("play",sync);video.addEventListener("pause",sync);sync();
  host.append(b);
  return b;
};

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

