# Achille’s Couture — site web (ATLANTIK WEB)
- `python3 tools/build.py` régénère les pages depuis `src/` (en-tête/pied de page : `src/partials/`).
- Contenus, numéro WhatsApp, messages, créations et photos : `data/site.js`.
- Photos : déposer les originaux dans `photos-originales/` (nom = identifiant), `pip install pillow`, `python3 tools/optimize.py`, puis renseigner `file` dans `data/site.js`.
- Formulaire : renseigner `to` et `from` dans `api/config.php` (hébergement PHP avec `mail()` ou SMTP requis). Sans cela, le visiteur est invité à utiliser WhatsApp.


## Tests et vérifications

Prérequis pour les outils de test :
- Node.js 20 ou supérieur et npm ;
- PHP 8.1 ou supérieur avec l'extension `mbstring` ;
- `curl` et un shell Bash pour le script de test PHP.

Depuis le dossier `achilles-couture/` :

```bash
npm install
npm test
npm run test:php
```

Pour régénérer les pages après modification des sources :

```bash
npm run build
```

Le test PHP utilise un faux programme `sendmail` : il vérifie le traitement et la construction du message, mais ne prouve pas que les e-mails seront effectivement livrés par l'hébergeur. Le script de test PHP doit être conservé dans `tools/test-php.sh`.
