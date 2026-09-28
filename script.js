const $=s=>document.querySelector(s),c=window.siteContent;
$("#workGrid").innerHTML=c.work.map((p,i)=>`<article class="work-card"><a href="${p.image}" target="_blank" rel="noreferrer"><div class="work-image"><img src="${p.image}" alt="${p.title} portfolio media"><span class="project-no">0${i+1}</span></div></a><div class="work-body"><p class="work-type">${p.type}</p><h3>${p.title}</h3><p>${p.description}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join("")}</div></div></article>`).join("");
$("#reviewGrid").innerHTML=c.clientReview.map((r,i)=>`<figure class="review-card"><img src="${r.image}" alt="Client review session ${i+1}"><figcaption><span>0${i+1}</span>${r.caption}</figcaption></figure>`).join("");
$("#serviceGrid").innerHTML=c.services.map(x=>`<article class="service"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("");
$("#studioCopy").textContent=c.studioCopy;
$("#studioMeta").innerHTML=c.studioMeta.map(x=>`<div><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
$("#processGrid").innerHTML=c.process.map(x=>`<div class="process-step"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("");
$("#contactActions").innerHTML=c.contact.map(x=>`<a class="contact-link" href="${x[2]}" target="_blank" rel="noreferrer"><span>${x[0]}</span><strong>${x[1]}</strong><b>↗</b></a>`).join("");
$("#year").textContent=new Date().getFullYear();