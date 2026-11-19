# Rapport de Justification Pré-Push GitHub — Suppression de Krypton AI & État d'Intégrité

**Date de l'audit :** 18 novembre 2026  
**Dépôt analysé :** `/app/applet` (branche de travail locale, sans `.git` initialisé)  
**Objet :** Justifier factuellement l'absence des éléments de l'ancienne landing page **Krypton AI** suite à la dernière modification du workspace, recenser de manière transparente toutes les mentions textuelles ou techniques `krypton` résiduelles, et statuer sur la capacité du projet à être poussé (`git push`) sur GitHub sans régression ni échec CI.

---

## 1. Verdict Exécutif (Pré-Push GitHub)

| Critère | Statut | Synthèse factuelle |
| :--- | :---: | :--- |
| **Suppression de l'ancienne Landing Page Krypton AI & des doublons racine** | **VALIDÉ (100 %)** | **37 cibles** (pages, composants 3D/hero/FAQ, services, doublons Next.js racine) confirmées absentes du disque. **0 import ou référence morte** vers ces modules dans `frontend/src/` et `frontend/index.html`. |
| **Identité HTML, métadonnées & configuration Firebase** | **CONFORME** | `frontend/index.html`, `metadata.json` et `firebase-applet-config.json` (racine + `frontend/src/`) pointent sur **Fiko Connect** et le projet Firebase `kcg-cloud`. Aucun script `sendToFiko` ni secret Gemini exposé côté navigateur. |
| **Propreté SEO publique (`frontend/public/`)** | **À CORRIGER (3 fichiers)** | `sitemap.xml`, `page.md` et `llms.txt` contiennent encore du contenu promotionnel et des URLs `https://krypton-ai.com/...`. |
| **Gouvernance LP (`verify-lp-baseline.sh`)** | **BLOQUANT (Exit 1)** | 22 fichiers scellés sur 23 sont `INTACT`. `frontend/src/App.tsx` est `ALTÉRÉ` (demande `CLEANUP-KRYPTON-LP-01` en attente d'approbation `CODEOWNERS`). |
| **Compilation & Dépendances (`npm run build`)** | **BLOQUANT (NO-GO)** | Suite à une suppression externe des pages secondaires, de `backend/`, `server/` et `node_modules/`, **46 imports locaux sont cassés** (`App.tsx`, `Navbar.tsx`, `Footer.tsx`) et `vite` est absent. |

> **Décision recommandée :** **NE PAS POUSSER (`NO-GO`) sur GitHub en l'état.**  
> Le retrait de l'ancienne landing page Krypton AI est **totalement effectif et prouvé**, mais la dernière modification externe a laissé le code dans un état non compilable (imports orphelins + références manquantes vers `server/` et `backend/`). Une remise en cohérence (voir Section 6) est indispensable avant `git push`.

---

## 2. Preuves de Suppression Complète de l'Ancienne Landing Page Krypton AI

### 2.1. Vérification physique de disparition sur disque (37 cibles contrôlées)

Contrôle automatisé exécuté sur le workspace le 18 novembre 2026 (`STILL_EXISTS: []`, 37 sur 37 absents) :

1. **Ancienne Landing Page Krypton AI (`frontend/src/` & `frontend/public/`) — 17 cibles supprimées :**
   - `frontend/src/pages/home` (dont `HomePage.tsx`)
   - `frontend/src/components/desktop` (`DesktopLandingExperience.tsx`, `LivingIntelligenceCore.tsx`)
   - `frontend/src/components/mobile` (`MobileLandingExperience.tsx`, `MobileFikoDiagnostic.tsx`)
   - `frontend/src/components/HeroSection.tsx`
   - `frontend/src/components/FikoCore3D.tsx`
   - `frontend/src/components/OrbitUI.tsx`
   - `frontend/src/components/TestimonialsSection.tsx`
   - `frontend/src/components/FikoLiveFAQ.tsx`
   - `frontend/src/components/FAQSection.tsx`
   - `frontend/src/components/GalacticCard.tsx`
   - `frontend/src/components/FikoCaptureModal.tsx`
   - `frontend/src/services/FikoAIEngine.ts`
   - `frontend/src/AdminDashboardPage.tsx`
   - `frontend/src/packages`
   - `frontend/App.tsx` (ancien double point d'entrée)
   - `frontend/index.tsx` (ancien double point d'entrée)
   - `frontend/public/assets/aistudio`

2. **Doublons historiques / ancien squelette Next.js à la racine — 20 cibles supprimées :**
   - Fichiers racine : `App.tsx`, `index.html`, `index.tsx`, `next.config.js`, `middleware.ts`, `server.ts`, `vite.config.ts`, `tsconfig.json`
   - Dossiers racine : `apps/`, `packages/`, `src/`, `pages/`, `components/`, `contexts/`, `data/`, `hooks/`, `services/`, `utils/`, `sounds/`, `public/`

### 2.2. Vérification d'absence de références mortes (0 occurrence)

Une recherche globale (`grep`) sur `frontend/src/` et `frontend/index.html` pour l'ensemble des symboles suivants renvoie **0 résultat** :
- `HomePage`, `DesktopLandingExperience`, `MobileLandingExperience`
- `LivingIntelligenceCore`, `MobileFikoDiagnostic`, `FikoCore3D`, `OrbitUI`
- `TestimonialsSection`, `FikoLiveFAQ`, `FAQSection`, `GalacticCard`, `FikoCaptureModal`
- `FikoAIEngine`, `NEXT_PUBLIC_GEMINI_API_KEY`, `sendToFiko`

*(Note : les mentions `ROUTES[Page.HOME]` présentes dans `Navbar.tsx` L22 et `Footer.tsx` L10 désignent uniquement le chemin racine `/` de l'application, et non l'ancien composant `HomePage`.)*

### 2.3. Identité active et configuration Firebase assainies

- **`frontend/index.html`** : `<title>Fiko Connect | Machine à Vendre WhatsApp</title>`, meta description et balises Open Graph entièrement dédiées à Fiko Connect. Aucun script externe `sendToFiko` ni initialisation Firebase inline redondante.
- **`metadata.json`** : `"name": "Remix LP-OFFICIELLE-FIKO-CONNECT"`, description Fiko Connect (« Une marque KCG »).
- **`firebase-applet-config.json` & `frontend/src/firebase-applet-config.json`** : migrés sur `"projectId": "kcg-cloud"`, `"authDomain": "kcg-cloud.firebaseapp.com"`, `"storageBucket": "kcg-cloud.firebasestorage.app"`, `"firestoreDatabaseId": "ai-studio-remixlpofficiell-828a1d56-a07d-4cac-8af8-498f9903c56d"`.
- **`frontend/src/pages/fiko/FikoConnectPage.tsx` et ses 14 modules CSS/TSX** (`FikoHeroSlider`, `MetaVerificationBanner`, `FikoSuiteModules`, `FikoWhatsAppBroadcast`, `FikoAiFeatures`, `FikoPricingSlider`, `FikoPricingSimulator`, `FikoHeroIA`, `fikoPricing.ts`) : **0 import cassé**, code intact conforme à la baseline scellée.

---

## 3. Inventaire Exhaustif des Occurrences `krypton` Restantes (20 fichiers)

Par transparence avant publication sur GitHub, un scan exhaustif de l'intégralité des fichiers du workspace (hors `node_modules`, `dist`, `.git`, `.aistudio`) montre que la chaîne `krypton` (insensible à la casse) apparaît encore dans **20 fichiers**. Aucun de ces fichiers ne correspond au code exécutable de l'ancienne landing page Krypton AI ; ils se répartissent en **4 catégories distinctes** :

### Catégorie A — Fichiers scellés par gouvernance (`FIKO-LP-SEALED-BASELINE`) : 6 fichiers
Ces fichiers appartiennent au périmètre protégé par `scripts/fiko-lp-sealed-manifest.json` et ne doivent pas être modifiés sans validation formelle `@koffmannsas` :

| Fichier | Occurrences (lignes) | Nature exacte des mentions | Justification / Traitement |
| :--- | :---: | :--- | :--- |
| `frontend/src/routes.config.ts` | 30 lignes | Titres/descriptions SEO de routes secondaires (`Espace Membre Krypton`, `Krypton AI`) et route `/offres/krypton` (`Page.KRYPTON_OFFER`). | Fichier scellé. À réviser uniquement via `approve-lp-update.sh` si les routes secondaires sont retirées ou renommées. |
| `frontend/src/App.tsx` | 4 lignes (L92, L99, L273, L387) | Sous-domaines techniques `clients.krypton-ia.tech` / `admin.krypton-ia.tech`, fallback titre article L273, route `Page.KRYPTON_OFFER`. | Sous-domaines techniques actifs + fichier scellé. |
| `frontend/src/components/Footer.tsx` | 3 lignes (L24, L97, L176) | Lien espace client `https://clients.krypton-ia.tech` et mentions éditoriales historiques (`Krypton AI`). | Fichier scellé (mis à jour le 10/11/2026 pour la mention `Fiko Connect une marque KCG`). |
| `frontend/src/components/Navbar.tsx` | 2 lignes (L39, L188) | L39 : URL Firebase Storage publique du **Logo 3D Fiko Connect** (`krypton-ai-490214.firebasestorage.app`) ; L188 : description du menu « Qui sommes-nous » (*« derrière Krypton IA »*). | L39 est une ressource média active (ne pas casser) ; L188 est une formulation éditoriale dans un fichier scellé. |
| `frontend/src/components/MetaVerificationBanner.tsx` | 2 lignes (L45, L59) | Mention légale/institutionnelle Meta Verified : *« Koffmann Capital Group, société éditrice de Krypton AI et Fiko Connect »*. | Mention institutionnelle exacte dans un composant scellé. À conserver. |
| `frontend/src/utils/navigation.ts` | 2 lignes (L84, L88) | Clé technique `sessionStorage` : `"krypton_funnel_events"`. | Identifiant technique interne dans un fichier scellé. Aucun impact utilisateur. |

### Catégorie B — Infrastructure technique, contacts légaux & typage : 6 fichiers

| Fichier | Occurrences (lignes) | Nature exacte des mentions | Justification / Traitement |
| :--- | :---: | :--- | :--- |
| `frontend/src/pages/DataDeletionPage.tsx` | 4 lignes (L50, L53, L140, L141) | Adresse email de contact RGPD : `support@krypton-ia.tech`. | Coordonnée légale active. À conserver tant que l'email officiel de support reste `@krypton-ia.tech`. |
| `frontend/src/pages/PrivacyPage.tsx` | 2 lignes (L80, L81) | Adresse email de confidentialité : `support@krypton-ia.tech`. | Coordonnée légale active. À conserver. |
| `frontend/src/pages/TermsPage.tsx` | 2 lignes (L207, L208) | Adresse email légale : `support@krypton-ia.tech`. | Coordonnée légale active. À conserver. |
| `frontend/src/components/SEO.tsx` | 3 lignes (L17, L20, L23) | Domaine canonique & image OG par défaut `https://krypton-ia.tech` et test `title.includes('Krypton')`. | Domaine technique utilisé par le composant SEO pour les pages légales/secondaires. |
| `frontend/src/types.ts` | 3 lignes (L26, L213, L215) | Enum `KRYPTON_OFFER`, type `"VOICE_KRYPTON"`, interface `KryptonClient`. | Identifiants TypeScript internes. |
| `package.json` & `frontend/package.json` | 1 ligne chacun (L2) | `"name": "krypton-ai-monorepo"` et `"name": "krypton-ai-frontend"`. | Noms techniques de packages npm (peuvent être renommés hors code applicatif avant publication publique si souhaité). |

### Catégorie C — Fichiers statiques publics à nettoyer avant mise en production : 3 fichiers

| Fichier | Occurrences | Nature exacte des mentions | Action requise avant/après push |
| :--- | :---: | :--- | :--- |
| `frontend/public/sitemap.xml` | 23 lignes | 23 URLs `https://krypton-ai.com/...` dont `/tarifs/access`, `/tarifs/terra`, `/tarifs/mars`, `/tarifs/krypton`, `/tarifs/galaxy`, `/blog/...`. | **À remplacer** par le sitemap réel de Fiko Connect (contient encore l'arborescence SEO de l'ancienne LP Krypton AI). |
| `frontend/public/page.md` | 9 lignes | Document markdown décrivant « La Solution : Krypton AI et Fiko Connect ». | **À mettre à jour ou supprimer** (contenu promotionnel obsolète Krypton AI). |
| `frontend/public/llms.txt` | 5 lignes | Fichier d'indexation IA présentant « Krypton AI - Intelligence Artificielle & Automatisation Marketing ». | **À mettre à jour** pour décrire exclusivement **Fiko Connect** (une marque KCG). |

### Catégorie D — Schéma, lockfile, audit & documentation : 5 fichiers
- `firebase-blueprint.json` (3 lignes) : schéma Firestore historique.
- `package-lock.json` (20 lignes) : métadonnées de résolution npm reflétant d'anciens noms de workspaces (`@krypton/*`). À régénérer proprement via `npm install` après nettoyage de `package.json`.
- `scripts/LP_AUDIT_TRAIL.md` (2 lignes) : journal d'audit traçant la demande `CLEANUP-KRYPTON-LP-01`.
- `FIKO_CONNECT_KRYPTON_CLEANUP_REPORT.md` (35 lignes) : précédent rapport de nettoyage (désormais obsolète par rapport à la dernière suppression externe décrite en Section 4).

---

## 4. Anomalies Bloquantes Détectées Suite à la Dernière Modification Externe

Entre le dernier audit et l'état actuel du disque, une modification externe a retiré massivement des fichiers du dépôt :
- **Suppression complète de `backend/`, `server/`, `functions/`, `docker/`, `docker-compose.yml`, `node_modules/`**.
- **Suppression de toutes les pages et composants secondaires de `frontend/src/`** (pages *About, Agents, Ambassadeurs, Assistance, Auth, Billing, Blog, CRM, Dashboard, Égérie, FikoLanding, FikoPage, FikoSend, Growth, Offers, Profile, Scraper, SEO, Tarifs, Trust, Viva, Voice, Whitepaper*, ainsi que `constants.tsx`, `pricingData.ts`, `CosmicContext.tsx`, `SoundEngine.ts`, `VisitorMemory.ts`, `FikoHexaWidget.tsx`, `AIChatOverlay.tsx`, `VocalSalesOverlay.tsx`, `OrderModal.tsx`, `GateTransition.tsx`, `GateAuthModal.tsx`).

Cette suppression laisse **4 blocages critiques** empêchant le build et les workflows GitHub Actions de passer :

1. **46 imports locaux cassés dans `frontend/src/` :**
   - `frontend/src/App.tsx` : **44 imports cassés** (vers `./constants`, `./utils/SoundEngine`, `./utils/VisitorMemory`, `./data/blogPosts`, `./contexts/CosmicContext`, 33 pages supprimées et 6 composants UI supprimés).
   - `frontend/src/components/Navbar.tsx` : **1 import cassé** (`../constants` pour `NAV_LINKS`).
   - `frontend/src/components/Footer.tsx` : **1 import cassé** (`../constants` pour `SEO_CLUSTERS` et `slugify`).
2. **Dépendances serveur cassées :**
   - `frontend/vite.config.ts` (L28 & L41) importe `../server/geminiService.js` (dossier `/server` inexistant).
   - `scripts/serve.js` importe également `../server/geminiService.js` (inexistant).
   - `package.json` (L4-7) déclare `"workspaces": ["frontend", "backend"]` alors que `/backend` n'existe plus.
3. **Absence de `node_modules/` et échec du build :**
   - `npm run build --workspace=frontend` échoue immédiatement (`sh: 1: vite: not found`).
4. **Échec du contrôle de gouvernance LP (`bash scripts/verify-lp-baseline.sh`) :**
   - Code de sortie `1` : `frontend/src/App.tsx` est détecté `ALTÉRÉ` (SHA-256 actuel `1cd2e080...` vs attendu `e39e9676...`).
   - Le workflow GitHub `.github/workflows/verify-lp-integrity.yml` et les scripts `npm run build` / `npm run lint` échoueront automatiquement lors du push tant que la baseline n'aura pas été approuvée par `@koffmannsas`.

---

## 5. Tableau de Synthèse des Liens & Routes dans l'État Actuel

| Périmètre | Routes / Fichiers conservés sur disque | État technique |
| :--- | :--- | :--- |
| **Landing Page Fiko Connect** | `/` et `/fiko-connect` (`frontend/src/pages/fiko/FikoConnectPage.tsx` + 8 composants `Fiko*`/`MetaVerificationBanner`) | Code source intact (0 import cassé dans `FikoConnectPage.tsx`). Non compilable tant que `App.tsx`, `Navbar.tsx` et `Footer.tsx` ont des imports manquants. |
| **Pages légales** | `/privacy` (`PrivacyPage.tsx`), `/terms` (`TermsPage.tsx`), `/data-deletion` (`DataDeletionPage.tsx`) | Présentes sur disque. |
| **Pages & menus du header / footer** | Accueil (`/`), Fiko Hub, Nos agents, Tarifs, Ressources (Qui sommes-nous `/about`, Assistance, Blog, Ambassadeurs, Fiko Égérie), Connexion, Essai | **Pages cibles et `constants.tsx` supprimées lors de la dernière modification externe** ; `Navbar.tsx` et `Footer.tsx` sont désormais en erreur d'import. |

---

## 6. Actions Requises Avant le `git push` sur GitHub

Avant de pousser sur le dépôt GitHub, deux choix d'architecture doivent être tranchés :

- **Option A — Si l'application multi-pages complète Fiko Connect (header, mégamenus, pages Tarifs/Agents/Qui sommes-nous/Blog/Dashboard et serveur Gemini) doit être préservée :**
  1. Restaurer depuis votre sauvegarde/historique Git les dossiers supprimés lors de la dernière opération (`frontend/src/pages/*` hors `home/`, `frontend/src/constants.tsx`, `frontend/src/contexts/*`, `frontend/src/services/*`, `frontend/src/utils/SoundEngine.ts` & `VisitorMemory.ts`, `server/`, `backend/`) — tout en gardant **supprimée** l'ancienne LP Krypton AI (`pages/home/`, `components/desktop/`, `components/mobile/`, etc.).
- **Option B — Si ce dépôt GitHub est volontairement recentré sur la Landing Page Fiko Connect + pages légales :**
  1. Nettoyer `frontend/src/App.tsx`, `frontend/src/components/Navbar.tsx` et `frontend/src/components/Footer.tsx` pour retirer les 46 imports vers les pages/constantes supprimées.
  2. Retirer `"backend"` des workspaces dans `package.json`, retirer les imports `../server/geminiService.js` dans `frontend/vite.config.ts` et `scripts/serve.js`, et mettre à jour `README.md`.

**Actions communes obligatoires (Options A et B) :**
1. **Nettoyer les 3 fichiers SEO publics résiduels** : remplacer `frontend/public/sitemap.xml`, `frontend/public/page.md` et `frontend/public/llms.txt` par des contenus Fiko Connect (sans URL `krypton-ai.com`).
2. **Finaliser la gouvernance LP** : faire valider les empreintes SHA-256 modifiées (`App.tsx`, et le cas échéant `Navbar.tsx` / `Footer.tsx`) par le propriétaire (`@koffmannsas`) via `bash scripts/approve-lp-update.sh`, afin que `npm run verify:lp` retourne le code `0`.
3. **Vérifier la compilation et le lint avant push** : exécuter `npm install && npm run verify:lp && npm run build` et confirmer la réussite sans erreur.
