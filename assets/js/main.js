(() => {
  const S = window.SITE, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const W = [480, 800, 1200, 1800];
  /* Remplit un emplacement photo : image optimisée si file renseigné, sinon emplacement provisoire accessible. */
  const fill = (el, p, sizes = "100vw", lazy = false) => {
    if (!p) return;
    if (!p.file) { el.setAttribute("role", "img"); el.setAttribute("aria-label", (p.alt || "Photographie") + " — emplacement provisoire"); return; }
    const d = "assets/img/photos/" + p.file, img = new Image();
    img.srcset = W.map(w => `${d}-${w}.webp ${w}w`).join(","); img.sizes = sizes; img.src = `${d}-1200.webp`;
    img.alt = p.alt || ""; img.decoding = "async"; img.style.objectPosition = p.pos || "50% 50%"; if (lazy) img.loading = "lazy";
    el.textContent = ""; el.classList.add("has-img"); el.append(img);
  };
  window.SITEUI = { fill, $, $$ };
  $$("[data-wa]").forEach(a => {
    a.href = `https://wa.me/${S.wa}?text=${encodeURIComponent(S.msgs[a.dataset.wa] || S.msgs.general)}`;
    a.target = "_blank"; a.rel = "noopener";
  });
  $$("[data-photo]").forEach(el => fill(el, S.photos[el.dataset.photo], el.dataset.sizes || "100vw", !!el.dataset.lazy));
  const sel = $("#sel");
  if (sel) S.creations.filter(c => c.feat && c.publie !== false).forEach(c => {
    const a = document.createElement("a"); a.className = "tile rv"; a.href = `galerie.html#${c.id}`; a.style.setProperty("--r", c.r);
    a.innerHTML = '<div class="ph"></div><span></span>'; a.lastChild.textContent = c.nom; fill(a.firstChild, c, "(min-width:860px) 30vw, 90vw", true); sel.append(a);
  });
  const head = $(".site-header"), onScroll = () => head.classList.toggle("is-scrolled", scrollY > 40);
  onScroll(); addEventListener("scroll", onScroll, { passive: true });
  /* Menu mobile : focus piégé, fond inerte, Échap */
  const btn = $(".menu-btn"), menu = $("#menu"), bg = $$("main, footer, .wa-bar");
  const trap = () => [btn, ...$$("a", menu)];
  const setMenu = o => {
    menu.classList.toggle("open", o); btn.setAttribute("aria-expanded", o); btn.textContent = o ? "Fermer" : "Menu";
    menu.inert = !o; bg.forEach(e => e.inert = o); document.body.classList.toggle("lock", o);
    if (o) $("a", menu).focus();
  };
  menu.inert = true;
  btn.addEventListener("click", () => setMenu(btn.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => {
    if (btn.getAttribute("aria-expanded") !== "true") return;
    if (e.key === "Escape") { setMenu(false); btn.focus(); }
    if (e.key === "Tab") { const t = trap(), i = t.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); t.at(-1).focus(); } else if (!e.shiftKey && i === t.length - 1) { e.preventDefault(); t[0].focus(); } }
  });
  const bar = $(".wa-bar"), hero = $(".hero");
  if (hero) new IntersectionObserver(([e]) => bar.classList.toggle("show", !e.isIntersecting), { threshold: 0.1 }).observe(hero);
  else { const f = () => bar.classList.toggle("show", scrollY > 400); f(); addEventListener("scroll", f, { passive: true }); }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$(".rv").forEach(el => io.observe(el));
})();
