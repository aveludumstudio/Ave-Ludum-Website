// Services page: service areas, packages with starting prices, and the process,
// all built from content.js. "Request a quote" links preselect the project type on the home page form.
(()=>{
const $=s=>document.querySelector(s),c=window.siteContent;
const quoteLink=type=>`index.html?type=${encodeURIComponent(type)}#contact`;

$("#serviceAreas").innerHTML=c.whatWeDo.map((s,i)=>`
  <section class="service-area${i%2?" is-flipped":""}" id="${s.id}" aria-labelledby="${s.id}-title">
    <img src="${s.image}" alt="${s.alt}" ${i?'loading="lazy" ':""}decoding="async">
    <div>
      <h2 id="${s.id}-title">${s.title}</h2>
      <p>${s.text}</p>
      <ul class="check-list">${s.details.map(d=>`<li>${d}</li>`).join("")}</ul>
      ${s.work.length?`<p class="service-work">Related work: ${s.work.map(t=>{const p=c.work.find(w=>w.title===t);return p?`<a href="project.html?p=${p.slug}">${t}</a>`:t}).join(", ")}</p>`:""}
      <a class="button" href="${quoteLink(s.type)}">Discuss a Project</a>
    </div>
  </section>`).join("");

$("#offersNote").textContent=c.showPrices
  ?"Prices are starting estimates, not fixed packages. The final quotation depends on your requirements, complexity, deliverables and timeline."
  :"Every project is quoted individually, based on your requirements, complexity, deliverables and timeline.";
$("#packages").innerHTML=c.offers.map(o=>`
  <article class="package" id="${o.id}">
    <h3>${o.title}</h3>
    <p class="package-for">For ${o.for.charAt(0).toLowerCase()+o.for.slice(1)}</p>
    ${c.showPrices?`<p class="package-price"><span>Starting from</span> ${formatRupiah(o.price)}${o.unit?` <small>${o.unit}</small>`:""}</p>`:""}
    <ul class="check-list">${o.includes.map(x=>`<li>${x}</li>`).join("")}</ul>
    <a class="button button-ghost" href="${quoteLink(o.type)}">Request a Quote</a>
  </article>`).join("");

$("#processSteps").innerHTML=c.process.map(([name,text],i)=>`<li><span class="step-number">${String(i+1).padStart(2,"0")}</span><h3>${name}</h3><p>${text}</p></li>`).join("");

// Structured data for the packages, so search engines can read the offers
if(c.showPrices){
  const ld=document.createElement("script");ld.type="application/ld+json";
  ld.textContent=JSON.stringify({"@context":"https://schema.org","@type":"ItemList","name":"Ave Ludum Studio services",
    itemListElement:c.offers.map((o,i)=>({"@type":"ListItem",position:i+1,item:{"@type":"Service",name:o.title,provider:{"@type":"Organization",name:"Ave Ludum Studio",url:"https://aveludumstudio.com/"},areaServed:"ID",
      offers:{"@type":"Offer",priceCurrency:"IDR",priceSpecification:{"@type":"PriceSpecification",minPrice:o.price,priceCurrency:"IDR"}}}}))});
  document.head.append(ld);
}
})();
