(() => {
  const S = window.SITE, { fill, $$ } = window.SITEUI;
  $$(".cgrid").forEach(g => S.creations.filter(c => c.univers === g.dataset.univ && c.publie !== false).forEach(c => {
    const a = document.createElement("article"); a.className = "cr rv"; a.style.setProperty("--r", c.r);
    a.innerHTML = '<div class="ph"></div><h3></h3><p></p><div class="cr__a"><a class="btn btn--sm btn--wa" target="_blank" rel="noopener">Cette création</a><a class="lnk">Faire une demande</a></div>';
    a.querySelector("h3").textContent = c.nom; a.querySelector("p").textContent = c.desc;
    a.querySelector(".btn").href = `https://wa.me/${S.wa}?text=${encodeURIComponent(S.creation(c.nom))}`;
    a.querySelector(".lnk").href = `contact.html?ref=${encodeURIComponent(c.id)}`; fill(a.firstChild, c, "(min-width:860px) 25vw, 80vw", true); g.append(a);
  }));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
  $$(".cr").forEach(el => io.observe(el));
})();
