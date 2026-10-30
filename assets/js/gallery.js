(() => {
  const S = window.SITE, { fill, $, $$ } = window.SITEUI, grid = $("#grid"); if (!grid) return;
  const NAME = { all: "Toutes les créations", pagnes: "Pagnes", costumes: "Costumes", ceremonies: "Cérémonies" };
  const items = S.creations.filter(c => c.publie !== false), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  items.forEach(c => {
    const b = document.createElement("button"); b.type = "button"; b.className = "gi"; b.dataset.id = c.id; b.dataset.cats = c.cats.join(" ");
    b.style.setProperty("--r", c.r || "4/5"); b.setAttribute("aria-label", `${c.nom} — agrandir`);
    b.innerHTML = '<div class="ph" aria-hidden="true"></div><span class="gi__n"></span>'; b.lastChild.textContent = c.nom;
    b.firstChild.dataset.photo = c.id; fill(b.firstChild, c, "(min-width:860px) 33vw, 50vw", true); b.firstChild.removeAttribute("role"); grid.append(b);
  });
  const cards = $$(".gi", grid), count = $("#count");
  const vis = () => cards.filter(g => !g.hidden);
  const apply = f => {
    const before = new Map(vis().map(g => [g, g.getBoundingClientRect()]));
    cards.forEach(g => g.hidden = !(f === "all" || g.dataset.cats.split(" ").includes(f)));
    $$(".flt button").forEach(b => b.setAttribute("aria-pressed", b.dataset.f === f));
    const v = vis(); count.textContent = `${v.length} création${v.length > 1 ? "s" : ""} · ${NAME[f]}`;
    if (reduce) return;
    v.forEach(g => { const o = before.get(g), n = g.getBoundingClientRect();
      if (o) { g.style.transition = "none"; g.style.transform = `translate(${o.left - n.left}px,${o.top - n.top}px)`; }
      else { g.style.transition = "none"; g.style.opacity = 0; } });
    grid.offsetHeight;
    v.forEach(g => { g.style.transition = "transform .55s cubic-bezier(.2,.7,.2,1),opacity .55s"; g.style.transform = ""; g.style.opacity = ""; });
  };
  $$(".flt button").forEach(b => b.addEventListener("click", () => apply(b.dataset.f)));
  apply("all");
  /* Visionneuse */
  const lb = $("#lb"), box = $(".lb-img", lb), cap = $(".lb-t", lb), wa = $(".lb-wa", lb); let cur = 0, list = [];
  const show = i => {
    list = vis(); cur = (i + list.length) % list.length; const c = items.find(x => x.id === list[cur].dataset.id);
    box.innerHTML = '<div class="ph"></div>'; const ph = box.firstChild; ph.dataset.photo = c.id; ph.style.aspectRatio = c.r; fill(ph, c, "90vw");
    cap.textContent = `${c.nom} — ${cur + 1}/${list.length}`; wa.href = `https://wa.me/${S.wa}?text=${encodeURIComponent(S.creation(c.nom))}`;
    try { history.replaceState(null, "", "#" + c.id); } catch {}
    [1, -1].forEach(d => { const n = items.find(x => x.id === list[(cur + d + list.length) % list.length].dataset.id); if (n.file) new Image().src = `assets/img/photos/${n.file}-1800.webp`; });
  };
  const open = id => { list = vis(); const i = list.findIndex(g => g.dataset.id === id); if (i < 0) return; show(i); lb.showModal ? lb.showModal() : lb.setAttribute("open", ""); };
  const close = () => { lb.close ? lb.close() : lb.removeAttribute("open"); try { history.replaceState(null, "", location.pathname + location.search); } catch {} };
  grid.addEventListener("click", e => { const g = e.target.closest(".gi"); if (g) open(g.dataset.id); });
  $(".lb-x", lb).onclick = close; $(".lb-p", lb).onclick = () => show(cur - 1); $(".lb-nx", lb).onclick = () => show(cur + 1);
  lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  let x0 = null; box.addEventListener("pointerdown", e => x0 = e.clientX);
  box.addEventListener("pointerup", e => { if (x0 !== null && Math.abs(e.clientX - x0) > 50) show(cur + (e.clientX < x0 ? 1 : -1)); x0 = null; });
  if (location.hash.length > 1) open(decodeURIComponent(location.hash.slice(1)));
})();
