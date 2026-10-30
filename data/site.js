/* Configuration unique du site : numéro, messages WhatsApp, photos, créations.
   Photos : originaux dans /photos-originales (nom = identifiant), tools/optimize.py génère
   assets/img/photos/<id>-<largeur>.webp, puis file:"identifiant" + texte alternatif ici.
   Sources et licences : voir PHOTOS-CREDITS.md. publie:false masque une création. */
window.SITE = {
  wa: "2290197277159",
  msgs: {
    general:   "Bonjour Achille’s Couture, je souhaite obtenir des renseignements.",
    mesure:    "Bonjour Achille’s Couture, je souhaite obtenir des renseignements concernant une confection sur mesure.",
    costumes:  "Bonjour Achille’s Couture, je souhaite obtenir des renseignements concernant un costume sur mesure.",
    pagnes:    "Bonjour Achille’s Couture, je souhaite obtenir des renseignements concernant une tenue en pagne.",
    perso:     "Bonjour Achille’s Couture, je souhaite obtenir des renseignements concernant une création personnalisée.",
    retouches: "Bonjour Achille’s Couture, je souhaite obtenir des renseignements concernant une retouche ou un ajustement.",
    rdv:       "Bonjour Achille’s Couture, je souhaite prendre rendez-vous."
  },
  creation: nom => `Bonjour Achille’s Couture, la création « ${nom} » m’intéresse. Pouvez-vous me renseigner ?`,
  photos: {
    "hero-01": { file: "hero-01", alt: "Tenues confectionnées en tissus imprimés africains", pos: "50% 30%" },
    "hero-02": { file: "hero-02", alt: "Étoffes kente tissées main, région de Volta au Ghana", pos: "50% 30%" },
    "costumes-01": { file: "costumes-01", alt: "Tailleur au travail dans son atelier à Bamako", pos: "50% 25%" },
    "pagnes-01": { file: "pagnes-01", alt: "Pagne wax plié aux motifs colorés", pos: "50% 25%" },
    "pagnes-02": { file: "pagnes-02", alt: "Rouleau de pagne wax à motifs géométriques", pos: "50% 25%" },
    "cta-01": { file: "cta-01", alt: "Atelier de couture en plein centre-ville", pos: "50% 30%" },
    "detail-01": { file: "detail-01", alt: "Aiguille à coudre et fil rouge", pos: "50% 50%" },
    "detail-02": { file: "detail-02", alt: "Chas d’aiguille enfilé", pos: "50% 50%" },
    "detail-03": { file: "detail-03", alt: "Texture de tissu orange tissé", pos: "50% 50%" }
  },
  /* Noms et descriptions PROVISOIRES, à confirmer avec Achille. cats : pagnes | costumes | ceremonies */
  creations: [
    { id: "costume-classique", nom: "Costume classique", univers: "costumes", cats: ["costumes"], r: "4/5", feat: true, desc: "Costume classique confectionné sur mesure.", file: "costume-classique", alt: "Homme portant un costume classique" },
    { id: "costume-moderne", nom: "Costume moderne", univers: "costumes", cats: ["costumes"], r: "1/1", desc: "Costume à la coupe moderne, sur mesure.", file: "costume-moderne", alt: "Agbada blanc à la coupe moderne" },
    { id: "ensemble-mesure", nom: "Ensemble sur mesure", univers: "costumes", cats: ["costumes"], r: "3/4", desc: "Ensemble confectionné selon vos mesures.", file: "ensemble-mesure", alt: "Tailleurs à l’ouvrage dans un atelier" },
    { id: "ceremonie-homme", nom: "Tenue de cérémonie (homme)", univers: "costumes", cats: ["costumes", "ceremonies"], r: "4/5", desc: "Tenue masculine pour les grandes occasions.", file: "ceremonie-homme", alt: "Marié en agbada traditionnelle pour une cérémonie" },
    { id: "tenue-traditionnelle", nom: "Tenue traditionnelle", univers: "pagnes", cats: ["pagnes"], r: "3/4", feat: true, desc: "Tenue traditionnelle africaine en pagne.", file: "tenue-traditionnelle", alt: "Femmes en tenues traditionnelles kente et perles" },
    { id: "robe-elegante", nom: "Robe élégante", univers: "pagnes", cats: ["pagnes"], r: "4/5", feat: true, desc: "Robe élégante confectionnée en pagne.", file: "robe-elegante", alt: "Robe longue en tissu imprimé à motifs" },
    { id: "ensemble-africain", nom: "Ensemble africain moderne", univers: "pagnes", cats: ["pagnes"], r: "1/1", desc: "Ensemble africain à l’allure contemporaine.", file: "ensemble-africain", alt: "Homme portant un ensemble en tissu imprimé africain" },
    { id: "ceremonie-pagne", nom: "Tenue de cérémonie en pagne", univers: "pagnes", cats: ["pagnes", "ceremonies"], r: "3/4", desc: "Tenue en pagne pour les cérémonies.", file: "ceremonie-pagne", alt: "Mariés en tenues de cérémonie en pagne" }
  ]
};
