# Rapport de Nettoyage Sécurisé — Fiko Connect™ (Pré-publication GitHub)

**Date :** 17 novembre 2026  
**Périmètre :** Nettoyage ciblé de l’ancienne landing page **Krypton AI** tout en préservant intégralement **Fiko Connect**, son header, ses menus, mégamenus, pages de destination, parcours et fonctionnalités.

---

## 1. Synthèse de l’Architecture Active Identifiée

| Rôle | Point d’entrée / Configuration active | Détails |
| :--- | :--- | :--- |
| **Frontend actif** | `frontend/index.html` → `frontend/src/index.tsx` → `frontend/src/App.tsx` | Workspace `frontend` (React 19, Vite 6, React Router 7, Tailwind CSS). |
| **Build de production** | `cd frontend && npm run build` (`vite build` → `/dist`) | Utilisé par `Dockerfile` et `.github/workflows/deploy.yml`. |
| **Serveur de production** | `npm start` (`node scripts/serve.js`) + `server/geminiService.js` | Sert `/dist` en SPA, proxy `/api/gemini/*` et WebSocket Live `/live`, `/api/live`. |
| **Backend workspace** | `backend/src/server.ts` (`npm run build --workspace=backend` → `backend/dist/server.js`) | Express + Firebase Admin (webhooks `/api/webhook/*`, `/api/data-deletion`, `/api/fiko/checkout`). |
| **Cloud Functions** | `functions/src/index.ts`, `functions/src/relanceEngine.ts` | Workspace Firebase Functions indépendant (hors périmètre de refonte). |
| **Gouvernance LP** | `scripts/fiko-lp-sealed-manifest.json`, `scripts/verify-lp-baseline.sh`, `.github/CODEOWNERS` | Scellement SHA-256 sur 23 fichiers clés (`FIKO-LP-SEALED-BASELINE`). |

---

## 2. Tableau de Navigation (Audit Initial & État Final)

> **Résultat :** 100 % des entrées de navigation, mégamenus, menus mobiles, actions CTA, pages cibles et liens légaux existants sont intégralement préservés et fonctionnels.

| Entrée de navigation | URL / Action | Page / Composant cible | Dépendances principales | État initial | État final |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Logo Fiko Connect** (Header) | `/` | `FikoConnectPage` (`/` via `App.tsx`) | `Navbar.tsx`, `routes.config.ts`, `FikoHeroSlider.tsx` | Actif | **Conservé (intact)** |
| **Accueil** (Desktop & Mobile) | `/` | `FikoConnectPage` | `NAV_LINKS` (`constants.tsx`), `ROUTES[Page.HOME]` | Actif | **Conservé (intact)** |
| **Fiko HUB → Fiko AI** | `/fiko` | `FikoLandingPage` | `ROUTES[Page.FIKO]`, `VocalSalesOverlay`, `/activation` | Actif | **Conservé (intact)** |
| **Fiko HUB → FiKO CONNECT** | `/fiko-connect` | `FikoConnectPage` | 8 composants scellés + CSS + `fikoPricing.ts` | Actif | **Conservé (intact)** |
| **Fiko HUB → FIKO SEND** | `/fiko-send` | `FikoSendPage` | `ROUTES[Page.FIKO_SEND]`, `motion/react` | Actif | **Conservé (intact)** |
| **Fiko HUB → GROWTH COCKPIT** *(Desktop)* | `/growth` | `GrowthCockpitPage` | `ROUTES[Page.GROWTH]`, `services/growth/*` | Actif | **Conservé (intact)** |
| **Nos Agents** (Desktop & Mobile) | `/nos-agents` | `AgentsPage` | `MASTER_AGENTS`, `AIChatOverlay`, `VocalSalesOverlay` | Actif | **Conservé (intact)** |
| **Tarifs** (Desktop & Mobile) | `/tarifs` | `PricingPage` | `FIKO_PLANS` (`fikoPricing.ts`), `getClientPortalUrl` | Actif | **Conservé (intact)** |
| **Ressources → Qui sommes-nous** | `/about` | `AboutPage` + `KcgHeroSlider` | `frontend/public/assets/about-hero/*` (13 assets utilisés), Lettres du Fondateur | Actif *(description menu mentionne Krypton IA)* | **Conservé (intact)** *(ambiguïté éditoriale signalée ci-dessous)* |
| **Ressources → Fiko Assistance** | `/assistance` (+ `/assistance/:slug`) | `AssistancePage` | `AssistancePage.css`, `ROUTES[Page.ASSISTANCE]` | Actif | **Conservé (intact)** |
| **Ressources → Blog & Stratégies** | `/blog` (+ `/blog/:slug`) | `BlogGridPage` / `BlogPostPage` | `data/blogPosts.ts`, `SEO.tsx` | Actif | **Conservé (intact)** |
| **Ressources → Ambassadeurs** | `/ambassadeurs` | `AmbassadeursPage` | `AmbassadeursHeroSlider`, `AmbassadeursPage.css` | Actif | **Conservé (intact)** |
| **Ressources → FIKO ÉGÉRIE** | `/egerie` | `EgeriePage` | `ROUTES[Page.EGERIE]` | Actif | **Conservé (intact)** |
| **Connexion** (Desktop & Mobile) | `https://clients.fiko-connect.com/login` (ou `/dashboard` si connecté) | Portail Client externe / `ClientDashboardPage` | `getClientPortalUrl`, Firebase Auth (`firebase.ts`) | Actif | **Conservé (intact)** |
| **Essayer Gratuitement** (Desktop & Mobile) | `https://clients.fiko-connect.com?plan=trial` | Portail Client externe (essai 7j) | `getClientPortalUrl("", "trial")`, `trackEvent` | Actif | **Conservé (intact)** |
| **Menu utilisateur connecté** | `/dashboard`, `/profil`, Déconnexion | `ClientDashboardPage`, `ProfilePage` | `firebase.ts`, `OrderModal`, `FikoOnboardingOverlay` | Actif | **Conservé (intact)** |
| **Bouton flottant « 🚀 Ouvrir Fiko »** | `https://clients.fiko-connect.com/register` (ou `/dashboard`) | Portail Client externe | `App.tsx` (desktop `lg:flex`), `getClientPortalUrl` | Actif | **Conservé (intact)** |
| **Widget vocal `FikoHexaWidget`** (sur `/`) | Ouvre `VocalSalesOverlay` | `VocalSalesOverlay` → `OrderModal` → `GateAuthModal` → `GateTransition` | `fikoAPI.ts`, `geminiClient.ts`, `three`, `@react-three/fiber`, micro | Actif | **Conservé (intact)** |
| **Footer — Entreprise** | `/about`, `https://koffmann.group`, `/whitepaper` | `AboutPage`, externe KCG, `WhitepaperPage` | `Footer.tsx`, `ROUTES` | Actif | **Conservé (intact)** |
| **Footer — Liens utiles & Légaux** | `https://clients.krypton-ia.tech`, `/privacy`, `/data-deletion`, `/terms` | Externe, `PrivacyPage`, `DataDeletionPage`, `TermsPage` | `Footer.tsx`, `ROUTES` | Actif | **Conservé (intact)** |
| **Footer — Clusters SEO** | `/recherche/:slug` | `SEOPage` | `SEO_CLUSTERS`, `slugify` (`constants.tsx`) | Actif | **Conservé (intact)** |
| **Footer — Mention de marque KCG** | « Fiko Connect une marque **KCG** » → `https://www.koffmann.group` | Externe KCG | `Footer.tsx` (lignes 186-196) | Actif | **Conservé (intact)** |
| **Routes secondaires / Offres / Piliers / Activation** | `/fiko/audit`, `/voice-ia`, `/crm-intelligent`, `/data-scraper`, `/confiance`, `/seo-ia`, `/site-web-intelligent`, `/agent-ia-automatisation`, `/generation-leads-automatique`, `/:slug`, `/viva-leads`, `/facturation`, `/paiement`, `/activation`, `/offres/*`, `/fiko/solo|pilot|elite|empire`, `/connexion`, `/inscription`, `/login`, `/register`, `/signup`, `/auth`, `/auth/callback`, `/admin/auth`, `/admin` | Pages dédiées conservées dans `frontend/src/App.tsx` | `routes.config.ts`, `data/topics.ts`, `data/programmatic.ts`, `services/*` | Actif | **Conservé (intact)** |

---

## 3. Classification A / B / C / D / E

- **Catégorie A (Nécessaires à la landing page Fiko Connect `/`, `/fiko-connect`) — CONSERVÉS :**  
  `frontend/index.html`, `frontend/src/index.tsx`, `frontend/src/index.css`, `frontend/src/App.tsx`, `frontend/src/pages/fiko/FikoConnectPage.tsx`, les 8 sections LP scellées et leurs CSS (`FikoHeroSlider`, `MetaVerificationBanner`, `FikoSuiteModules`, `FikoWhatsAppBroadcast`, `FikoAiFeatures`, `FikoPricingSlider`, `FikoPricingSimulator`, `FikoHeroIA`), `frontend/src/data/fikoPricing.ts`, `frontend/src/utils/navigation.ts`, `frontend/src/firebase.ts`, `frontend/src/firebase-applet-config.json`, `Navbar.tsx`, `Footer.tsx`, `FikoHexaWidget.tsx`, `VocalSalesOverlay.tsx`, `OrderModal.tsx`, `GateAuthModal.tsx`, `GateTransition.tsx`, `CosmicBackground.tsx`, `CosmicContext.tsx`.
- **Catégorie B (Nécessaires aux menus, mégamenus, pages et parcours conservés) — CONSERVÉS :**  
  Toutes les pages cibles dans `frontend/src/pages/` (`about`, `activation`, `agents`, `ambassadeurs`, `assistance`, `auth`, `billing`, `blog`, `crm`, `dashboard`, `egerie`, `fiko`, `growth`, `offers`, `profile`, `scraper`, `seo`, `tarifs`, `trust`, `viva`, `voice`, `whitepaper`, `PrivacyPage`, `DataDeletionPage`, `TermsPage`, `AuthCallbackPage`), `components/KcgHeroSlider.tsx`, `components/AmbassadeursHeroSlider.*`, `components/AIChatOverlay.tsx`, `components/FikoOnboardingOverlay.tsx`, `components/SEO.tsx`, `components/dashboard/*`, `frontend/public/assets/about-hero/*`, `routes.config.ts`, `constants.tsx`, `types.ts`, `data/*`, `hooks/*`, `utils/*`, `services/*`.
- **Catégorie C (Partagés / Infrastructure active) — CONSERVÉS :**  
  `package.json`, `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.json`, `backend/*`, `server/geminiService.js`, `scripts/serve.js`, `Dockerfile`, `nginx.conf`, `firebase.json`, `firestore.rules`, `firebase-blueprint.json`, `firebase-applet-config.json`, `.github/*`, `scripts/*` (gouvernance LP), `metadata.json`, `.env.example`, `.gitignore`.
- **Catégorie D (Exclusifs à l’ancienne landing page Krypton AI & doublons hérités obsolètes) — SUPPRIMÉS :**  
  Voir section 4 ci-dessous.
- **Catégorie E (Usage incertain / Hors périmètre / À arbitrer côté produit ou DevOps) — CONSERVÉS & DOCUMENTÉS :**  
  - `frontend/src/pages/voice/VoicePricingPage.tsx` : Page tarifaire non reliée dans `App.tsx` (contient encore l’offre `KRYPTON AI VOICE`, mais n’était pas exclusive à l’ancienne landing page `/`). Conservée par prudence.
  - `frontend/src/services/fikoCore/aiGateway.ts` et `frontend/src/services/growth/contentEngine.ts` : Contiennent des références `process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY` (non injectées dans le bundle Vite, basculant donc sur le moteur local déterministe dans le navigateur ; des routes proxy `/api/gemini/gateway` et `/api/gemini/growth/bundle` existent déjà dans `server/geminiService.js` et `geminiClient.ts`, mais la refonte du pipeline IA est hors périmètre).
  - `functions/` (`Cloud Functions Firebase`) et `scripts/init_leads.ts` : Hors flux web principal, mais potentiellement utilisés côté Firebase Admin / Cloud Functions.
  - `docker/Dockerfile` & `docker-compose.yml` : Ancien Dockerfile multi-stage Next.js (`apps/landing`) + configuration `firebase-emulator`. Conservés pour ne pas casser d’éventuels usages émulateur locaux (le Dockerfile actif de production est `/Dockerfile`).
  - `frontend/public/sitemap.xml` (`krypton-ai.com`), `frontend/public/llms.txt`, `frontend/public/page.md` : Mentionnent `krypton-ai.com` / Krypton AI ; conservés sans inventer de domaine marketing tant que le domaine canonique public final n’est pas arbitré.
  - Documents d’audit historiques à la racine (`ARCHITECTURE_OMEGA.md`, `FIKO_*.md`, `KRYPTON_*.md`, `security_spec.md`, `migrated_prompt_history/`).

---

## 4. Éléments Supprimés (Catégorie D) & Justification

### A. Ancienne landing page Krypton AI (`frontend/src/`)
Vérification par `grep` sur l’ensemble de `frontend/src/` : aucun de ces modules n’est utilisé par `FikoConnectPage` ni par aucune route conservée.

1. `frontend/src/pages/home/HomePage.tsx` — Ancien point d’entrée adaptatif Krypton AI (`/` est désormais rendu par `FikoConnectPage` ; `HomePage` n’était présent qu’en import mort ligne 25 de `frontend/src/App.tsx`).
2. `frontend/src/components/desktop/DesktopLandingExperience.tsx` — Importé exclusivement par `HomePage.tsx`.
3. `frontend/src/components/mobile/MobileLandingExperience.tsx` — Importé exclusivement par `HomePage.tsx`.
4. `frontend/src/components/mobile/LivingIntelligenceCore.tsx` — Importé exclusivement par `MobileLandingExperience.tsx`.
5. `frontend/src/components/mobile/MobileFikoDiagnostic.tsx` — Importé exclusivement par `MobileLandingExperience.tsx`.
6. `frontend/src/components/HeroSection.tsx` — Importé exclusivement par `DesktopLandingExperience.tsx`.
7. `frontend/src/components/FikoCore3D.tsx` — Importé exclusivement par `HeroSection.tsx`.
8. `frontend/src/components/OrbitUI.tsx` — Importé exclusivement par `HeroSection.tsx`.
9. `frontend/src/components/TestimonialsSection.tsx` — Importé exclusivement par `DesktopLandingExperience.tsx`.
10. `frontend/src/components/FikoLiveFAQ.tsx` — Importé exclusivement par `DesktopLandingExperience.tsx`.
11. `frontend/src/components/mobile/MobileNavigation.tsx` — Orphelin (0 import), ancienne barre mobile Krypton AI.
12. `frontend/src/components/FAQSection.tsx` — Orphelin (0 import), ancienne FAQ Krypton AI.
13. `frontend/src/components/GalacticCard.tsx` — Orphelin (0 import), ancienne carte Krypton AI (seul consommateur de `/sounds/galactic-open.mp3`).
14. `frontend/src/components/FikoCaptureModal.tsx` — Orphelin (0 import), ancienne modale de capture Krypton AI.
15. `frontend/src/components/FikoAIEngine.ts` — Orphelin (0 import), ancien moteur local statique Krypton AI.
16. `frontend/src/AdminDashboardPage.tsx` — Doublon obsolète (0 import ; `App.tsx` importe `frontend/src/pages/dashboard/AdminDashboardPage.tsx`).

### B. Fichiers hérités redondants & artefacts morts
17. `frontend/App.tsx` & `frontend/index.tsx` — Anciens points d’entrée orphelins à la racine de `frontend/` (provoquaient ~30 erreurs `tsc` de chemins cassés).
18. `frontend/src/packages/` (`ui/Button.tsx`, `fiko/index.ts`, `firebase/config.ts`) — Copie morte du monorepo Next.js (0 import dans `frontend/src/`, contenait des placeholders `"mock-key"`).
19. `frontend/public/assets/aistudio/` (`image_adb28fbe.png`, `Paste_October_27__2026_-_9_04PM_b1ecc8a4`) — Artefacts non référencés dans le code.
20. Scripts inline morts dans `frontend/index.html` (lignes 31–104) : ancienne fonction globale `sendToFiko` (`project: "krypton-ai"`) et initialisation Firebase inline `krypton-ai-490214` exposant `window.signup`, `window.login`, `window.googleLogin` via `alert()` (0 appel dans l’application React, qui utilise `frontend/src/firebase.ts`).
21. Dossiers & fichiers racine de l’ancien monorepo Next.js et ancienne copie Vite racine (0 référence depuis `frontend/`, `backend/`, `server/`, `scripts/serve.js`, `Dockerfile`, `.github/workflows/`, `firebase.json`) :
    - Fichiers racine : `App.tsx`, `index.html`, `index.tsx`, `AdminDashboardPage.tsx`, `constants.tsx`, `pricingData.ts`, `routes.config.ts`, `types.ts`, `firebase.ts`, `next.config.js`, `middleware.ts`, `server.ts`, `vite.config.ts`, `tsconfig.json`, `tsconfig.tsbuildinfo`, `check_bot_imports.js`, `bun.lock`.
    - Dossiers racine : `apps/`, `packages/`, `src/`, `pages/`, `components/`, `contexts/`, `data/`, `hooks/`, `services/`, `utils/`, `sounds/`, `public/`.

---

## 5. Éléments Partagés Conservés & Ambiguïtés Éditoriales Signalées

Les éléments suivants contiennent des mentions « Krypton » légitimes, techniques ou dans des fichiers scellés : **aucun remplacement aveugle n’a été effectué**.

- **Domaine & support technique actifs :** `krypton-ia.tech`, `clients.krypton-ia.tech`, `admin.krypton-ia.tech`, `support@krypton-ia.tech` (dans `App.tsx`, `Footer.tsx`, `SEO.tsx`, `PrivacyPage.tsx`, `TermsPage.tsx`, `DataDeletionPage.tsx`, `backend/src/server.ts`).
- **Configuration Firebase active :** Projet `krypton-ai-490214` dans `firebase-applet-config.json` et `frontend/src/firebase-applet-config.json` (conservé intact).
- **Offre et identité KCG :** `/offres/krypton` (`GateOfferPage`), `AboutPage.tsx` (présentation de Koffmann Capital Group, RCCM, Lettres du Fondateur mentionnant historiquement Krypton AI aux côtés de Fiko Connect).
- **Formulations éditoriales ambiguës à corriger ultérieurement (hors périmètre scellé ou à valider) :**
  1. `frontend/src/components/Navbar.tsx` (ligne 188, fichier scellé) : sous-titre du lien « Qui sommes-nous » indiquant encore *« Découvrez la vision et l'équipe derrière Krypton IA, propulseur de business. »* — menu et page `/about` conservés intégralement.
  2. `frontend/src/components/Footer.tsx` (lignes 24, 97, 176, fichier scellé) : marque en en-tête de footer affichant « Krypton AI V3.1 » et paragraphe SEO ligne 176, alors que le bas de footer porte déjà la signature validée « Fiko Connect une marque KCG ».
  3. `frontend/src/routes.config.ts` (fichier scellé) : plusieurs titres SEO de pages secondaires mentionnent encore `Krypton AI` (ex. `/confiance`, `/connexion`, `/blog`, `/privacy`, `/terms`, `/assistance`, `/growth`).
  4. `frontend/public/sitemap.xml`, `frontend/public/llms.txt`, `frontend/public/page.md` : utilisent encore `https://krypton-ai.com/` et décrivent Krypton AI comme produit principal.

---

## 6. Fichiers Modifiés, Dépendances & Sécurité

### Fichiers modifiés
- `frontend/src/App.tsx` *(scellé)* : suppression uniquement de la ligne 25 (`import HomePage from "./pages/home/HomePage";`), import mort inutilisé.
- `frontend/index.html` : ajout des balises `og:type`, `og:title`, `og:description` alignées sur Fiko Connect ; retrait des 2 scripts inline obsolètes.
- `frontend/src/components/SEO.tsx` : évite d’ajouter `| Krypton AI` sur les routes `/` et `/fiko-connect` (ainsi que les titres Fiko Connect / KOFFMANN).
- `frontend/src/components/CosmicBackground.tsx` : suppression de l’import inutilisé `sendToFiko`.
- `metadata.json` : mise à jour de `"description"` pour Fiko Connect (conservation de `"name"`, `"requestFramePermissions": ["microphone"]`, `"majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]`).
- `.env.example` : remplacement de `NEXT_PUBLIC_GEMINI_API_KEY` par `GEMINI_API_KEY` côté serveur + ajout de `PORT=3000`.
- `.gitignore` : ajout des règles d’exclusion pour `.env`, `.env.*` (sauf `.env.example`), `*service-account*.json`, `.firebase/`, `*.tsbuildinfo`, `backend/dist`, `functions/lib`.
- `README.md` : mise à jour pour refléter l’architecture réelle (`frontend/`, `backend/`, `server/geminiService.js`, `scripts/serve.js`, gouvernance LP).
- `scripts/LP_AUDIT_TRAIL.md` : consignation officielle de la demande `CLEANUP-KRYPTON-LP-01` via `scripts/approve-lp-update.sh --request-owner-review`.

### Audit des dépendances & sécurité
- **Permission `microphone` (`metadata.json`) :** **Conservée** — utilisée activement par `VocalSalesOverlay.tsx` et le pont vocal WebSocket (`/api/live`).
- **Gemini côté serveur :** `server/geminiService.js` et `backend/src/server.ts` lisent `GEMINI_API_KEY` côté serveur uniquement ; `frontend/vite.config.ts` n’injecte aucun secret dans le bundle client.
- **Dépendances `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` :** **Conservées** — utilisées activement par `frontend/src/components/VocalSalesOverlay.tsx`.
- **Dépendances `clsx` et `tailwind-merge` (`frontend/package.json`) :** Désormais à **0 référence** après suppression de `frontend/src/packages/ui/Button.tsx`. *Décision de sécurité CI :* `frontend/package.json` n’a pas été édité sans mise à jour de `package-lock.json` afin de ne pas désynchroniser `npm ci` dans `.github/workflows/deploy.yml` (commande recommandée avant commit si souhaité : `npm uninstall clsx tailwind-merge --workspace=frontend`).

---

## 7. Gouvernance & État du Scellement LP (`FIKO-LP-SEALED-BASELINE`)

- **Manifeste (`scripts/fiko-lp-sealed-manifest.json`) et vérificateur (`scripts/verify-lp-baseline.sh`) :** **Intacts et non contournés.**
- **Résultat de `bash scripts/verify-lp-baseline.sh` :**
  - **22 / 23 fichiers scellés : `INTACT`** (`FikoConnectPage.tsx`, les 8 composants + 8 CSS de la LP, `fikoPricing.ts`, `navigation.ts`, `Navbar.tsx`, `Footer.tsx`, `routes.config.ts`).
  - **1 / 23 fichier modifié : `frontend/src/App.tsx`** (retrait d’une unique ligne d’import inutilisé `import HomePage from "./pages/home/HomePage";`).
  - **Code de retour : `1` (`EN ATTENTE D’APPROBATION @koffmannsas`)** — les commandes `npm run verify:lp`, `npm run build` (racine) et `npm run lint` (racine) échouent volontairement sur ce garde-fou tant que le propriétaire (`CODEOWNERS`) n’a pas validé le diff et mis à jour la baseline selon `scripts/PROCEDURE_AUTORISATION_LP.md`.
- La demande formelle `CLEANUP-KRYPTON-LP-01` a été enregistrée dans `scripts/LP_AUDIT_TRAIL.md`.

---

## 8. Résultats des Vérifications

| Vérification | Commande exécutée | Résultat | Notes |
| :--- | :--- | :--- | :--- |
| **Build Frontend (Vite)** | `npm run build --workspace=frontend` | **SUCCÈS** (42.58 s) | `3659` modules transformés → `dist/index.html` (1.39 kB), `dist/assets/*.css` (141.25 kB), `dist/assets/*.js` (5,119.09 kB). |
| **Build Backend (esbuild)** | `npm run build --workspace=backend` | **SUCCÈS** (4 ms) | `backend/dist/server.js` (3.2 kB). |
| **TypeScript (`tsc`)** | `npx tsc -p frontend/tsconfig.json --noEmit` | **17 erreurs préexistantes** | Suppression complète des ~30 erreurs dues à l’ancien `frontend/App.tsx`. Aucune nouvelle erreur introduite. Erreurs préexistantes restantes dans `App.tsx` (props `FikoConnectPage`), `DashboardOverview.tsx`, `FikoTriggerEngine.tsx`, `PortalActivationWorkflow.tsx`, `AssistancePage.tsx`, `VoicePage.tsx`, `aiGateway.ts`, `vite.config.ts`. |
| **Intégrité LP scellée** | `bash scripts/verify-lp-baseline.sh` | **ÉCHEC ATTENDU (exit 1)** | 22/23 intacts ; `frontend/src/App.tsx` altéré d’1 ligne (import mort `HomePage`) en attente de validation `@koffmannsas`. |
| **Contrôle statique routes & assets** | Script Node sur `Navbar`, `Footer`, `ROUTES`, `App.tsx`, `KcgHeroSlider` | **SUCCÈS** | 17 références `Page.*` résolues (`missingInRoutes: []`, `missingInApp: []`) et 13/13 images `/assets/about-hero/*` présentes sur disque. |
| **Tests navigateur / runtime live / Gemini Live** | — | **Non exécutée** | Aucun test interactif dans un navigateur headless ni appel API réseau réel n’a été lancé. |

---

## 9. Statut Git & Checklist avant Publication GitHub

- **État Git local :** Aucun répertoire `.git` n’est présent dans cet espace de travail (`/app/applet`) ; aucune opération `git commit` ou `git push` n’a donc été exécutée.
- **Checklist avant publication :**
  1. Initialiser/rattacher le dépôt Git (`https://github.com/koffmannsas/Fiko-Connect-LP`) sur une branche dédiée (ex. `chore/cleanup-krypton-legacy-lp`).
  2. Vérifier le diff de `frontend/src/App.tsx` (1 ligne supprimée) et faire approuver par `@koffmannsas` (`CODEOWNERS`) puis archiver/actualiser `scripts/fiko-lp-sealed-manifest.json` si validé.
  3. Optionnel (pour alléger `package-lock.json`) : exécuter `npm uninstall clsx tailwind-merge --workspace=frontend`.
  4. Vérifier l’absence de tout fichier `.env` ou clé privée dans `git status` avant `git push`.
  5. Vérifier en environnement de préproduction le rendu des pages `/`, `/fiko-connect`, `/about`, `/tarifs`, `/nos-agents`, `/growth` et des deux mégamenus.
