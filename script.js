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
  $("#dialogImage").src=p.image;$("#dialogImage").alt=`${p.title} screenshot`;
  $("#dialogType").textContent=p.type;
  $("#dialogTitle").textContent=p.title;
  $("#dialogDescription").textContent=p.description;
  $("#dialogRole").textContent=p.role;
  $("#dialogStack").textContent=p.stack.join(", ");
  dialog.showModal();
});
$("#dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()}); // click on backdrop

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
