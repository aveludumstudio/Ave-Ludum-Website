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

// Footer
$("#footerSocials").innerHTML=c.socials.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener">${label}</a></li>`).join("");
$("#footerServices").innerHTML=c.whatWeDo.map(s=>`<li><a href="services.html#${s.id}">${s.title}</a></li>`).join("")+`<li><a href="services.html#offers">Packages &amp; pricing</a></li>`;
$("#year").textContent=new Date().getFullYear();
})();

// "Rp1.500.000" style prices, as written in Indonesia
const formatRupiah=n=>"Rp"+n.toLocaleString("id-ID");
