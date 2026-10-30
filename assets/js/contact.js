(() => {
  const S = window.SITE, f = document.getElementById("f"); if (!f) return;
  const $ = id => document.getElementById(id), st = $("status"), sum = $("summary"), val = n => f.elements[n].value.trim();
  const ref = new URLSearchParams(location.search).get("ref"), c = S.creations.find(x => x.id === ref); if (c) $("ref").value = c.nom;
  let token = "", ready = false;
  fetch("api/csrf.php", { credentials: "same-origin", cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject()).then(j => { token = j.token; $("csrf").value = token; ready = true; }).catch(() => {});
  const RULES = { nom: v => v.length >= 2 || "Indiquez votre nom.", tel: v => /^\+?[0-9 ().-]{8,18}$/.test(v) || "Indiquez un numéro valide (8 chiffres minimum).",
    type: v => !!v || "Choisissez un type de vêtement.", besoin: v => v.length >= 10 || "Décrivez votre besoin (10 caractères minimum)." };
  const check = () => { const bad = [];
    Object.entries(RULES).forEach(([n, r]) => { const m = r(val(n)), el = f.elements[n], e = $("e-" + n);
      e.textContent = m === true ? "" : m; el.setAttribute("aria-invalid", m !== true); if (m !== true) bad.push(el); });
    sum.hidden = !bad.length; sum.textContent = bad.length ? `${bad.length} champ${bad.length > 1 ? "s" : ""} à corriger.`; if (bad.length) bad[0].focus(); return !bad.length; };
  const msg = () => ["Bonjour Achille’s Couture, je souhaite faire une demande.", `Nom : ${val("nom")}`, `Téléphone : ${val("tel")}`, `Vêtement : ${val("type")}`,
    val("ref") && `Création de référence : ${val("ref")}`, val("rdv") && `Rendez-vous souhaité : ${val("rdv")}`, `Besoin : ${val("besoin")}`].filter(Boolean).join("\n");
  $("wa-send").addEventListener("click", () => { if (!check()) return;
    window.open(`https://wa.me/${S.wa}?text=${encodeURIComponent(msg())}`, "_blank", "noopener"); st.textContent = "WhatsApp s’ouvre avec votre demande."; });
  f.addEventListener("submit", async e => { e.preventDefault(); if (!check()) return;
    st.textContent = "Envoi en cours…";
    try { const r = await fetch(f.action, { method: "POST", body: new FormData(f), credentials: "same-origin" });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { st.textContent = "Merci, votre demande a bien été envoyée.";
        // Demander un nouveau jeton pour permettre un second envoi sans recharger
        fetch("api/csrf.php", { credentials: "same-origin", cache: "no-store" }).then(r2 => r2.ok ? r2.json() : Promise.reject()).then(j2 => { $("csrf").value = j2.token; });
        f.reset(); return; }
      // Traduction des codes d'erreur serveur en français
      let errorMsg = "";
      if (j.errors && j.errors.rdv) errorMsg = j.errors.rdv;
      else if (j.message) {
        if (j.message.includes("server_error") || r.status >= 500) errorMsg = "Une erreur serveur est survenue, réessayez plus tard.";
        else if (j.message.includes("send_failed")) errorMsg = "L'envoi par e-mail a échoué, utilisez WhatsApp.";
        else if (j.message.includes("not_configured") || r.status === 503) errorMsg = "L’envoi par e-mail n’est pas encore configuré sur ce site. Utilisez « Envoyer par WhatsApp ».";
        else errorMsg = j.message;
      } else if (r.status === 503 || r.status === 404) errorMsg = "L’envoi par e-mail n’est pas encore configuré sur ce site. Utilisez « Envoyer par WhatsApp ».";
      else if (r.status === 422) errorMsg = j.message || "Erreur de validation, veuillez corriger les champs.";
      else errorMsg = "Le traitement serveur n’est pas disponible. Utilisez « Envoyer par WhatsApp ».";
      st.textContent = errorMsg; } catch { st.textContent = "Le traitement serveur n’est pas disponible. Utilisez « Envoyer par WhatsApp »."; } });
})();