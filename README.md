# Fiko Connect™ — Plateforme Officielle (Monorepo)

Application web officielle de **Fiko Connect**, une marque **KCG ([Koffmann Capital Group](https://www.koffmann.group))** : plateforme intelligente d'automatisation WhatsApp Business, agents IA, Growth Cockpit et portail écosystème.

## Architecture active

- `frontend/` : Application React 19 + TypeScript + Vite (`frontend/index.html` -> `frontend/src/index.tsx` -> `frontend/src/App.tsx`), compilée vers `dist/`.
- `server/geminiService.js` : Passerelle API Gemini côté serveur (`/api/gemini/*`) et pont WebSocket temps réel (`/live`, `/api/live`).
- `scripts/serve.js` : Serveur HTTP statique de production servant `dist/` et les routes `/api/gemini/*` + WebSocket Live.
- `backend/` : Service Express/Firebase Admin (`backend/src/server.ts`), compilé vers `backend/dist/server.js`.
- `functions/` : Cloud Functions Firebase (`functions/src/index.ts`, `relanceEngine.ts`).
- `scripts/` : Gouvernance et vérification d'intégrité de la Landing Page Fiko Connect (`verify-lp-baseline.sh`, `approve-lp-update.sh`, `fiko-lp-sealed-manifest.json`, `LP_AUDIT_TRAIL.md`).

## Installation et démarrage

1. Installer les dépendances :
   ```bash
   npm install
   ```

2. Copier `.env.example` vers `.env` et renseigner `GEMINI_API_KEY` côté serveur (ne jamais exposer de clé Gemini dans le bundle client Vite).

3. Commandes principales :
   ```bash
   # Développement frontend (port 3000)
   npm run dev

   # Vérifier l'intégrité de la baseline scellée de la LP
   npm run verify:lp

   # Build frontend direct (Vite -> dist/)
   npm run build --workspace=frontend

   # Build complet avec contrôle de baseline LP
   npm run build

   # Build backend
   npm run build --workspace=backend

   # Démarrer le serveur de production (port 3000)
   npm start
   ```

## Gouvernance Landing Page (FIKO-LP-SEALED-BASELINE)

Les 23 fichiers de référence de la landing page Fiko Connect sont listés dans `scripts/fiko-lp-sealed-manifest.json` et protégés par `.github/CODEOWNERS` ainsi que le workflow `.github/workflows/verify-lp-integrity.yml`.
Consultez `scripts/PROCEDURE_AUTORISATION_LP.md` avant toute modification d'un fichier du périmètre scellé.
