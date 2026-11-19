# PROTOCOLE DE GOUVERNANCE ET PROCÉDURE D'AUTORISATION — LANDING PAGE FIKO CONNECT™

## 1. RÈGLE FONDAMENTALE (DIRECTIVE DE GEL ABSOLU)

La Landing Page Fiko Connect™ (`/` et `/fiko-connect`) est soumise à un **gel architectural absolu**.

- **Baseline officielle de référence :** Tag Git `FIKO-LP-SEALED-BASELINE` (Manifeste : `scripts/fiko-lp-sealed-manifest.json`).
- **Principe :** Zéro modification, création, suppression, refactorisation ou régression sans autorisation explicite, écrite et préalable du propriétaire du projet.
- **Périmètre protégé (23 fichiers) :** Composants de la LP, fichiers CSS associés, données tarifaires partagées, helpers de navigation, barre de navigation, pied de page et routeur principal.
- **Journal d'audit canonique :** `scripts/LP_AUDIT_TRAIL.md`.

---

## 2. CONTRÔLES TECHNIQUES EN PLACE

1. **Vérification d'intégrité stricte (`scripts/verify-lp-baseline.sh`) :**
   - Contrôle binaire des 23 fichiers protégés par rapport à leurs sommes de contrôle SHA-256 scellées.
   - Contrôle du nombre d'entrées du manifeste (exactement 23 entrées obligatoires).
   - Aucun contournement par variable d'environnement n'est admis : tout écart entraîne un code d'arrêt `1`.

2. **Garde-fous Build & Lint (`package.json`) :**
   - `npm run verify:lp` : Exécute la vérification d'intégrité de la LP.
   - `npm run build` : Interrompt la compilation immédiatement si l'intégrité est compromise.
   - `npm run lint` : Bloque la validation de code si l'intégrité est compromise.

3. **Intégration Continue GitHub Actions (`.github/workflows/verify-lp-integrity.yml`) :**
   - Actions v4 maintenues avec permissions réduites (`contents: read`).
   - Détection des modifications apportées aux fichiers de gouvernance (`scripts/`, `.github/`, `package.json`).
   - Échec automatique du job CI en cas d'altération d'un fichier scellé.
   - *Pré-requis distant :* Activation sur GitHub de la règle « Require status checks to pass before merging » sur les branches principales (`main`, `master`).

4. **Contrôle d'accès et revue de code (`.github/CODEOWNERS`) :**
   - Dépôt officiel : `https://github.com/koffmannsas/Fiko-Connect-LP`
   - Attribue la propriété exclusive des 23 fichiers LP et des fichiers de gouvernance à `@koffmannsas`.
   - Bloque toute fusion sans approbation formelle de `@koffmannsas`.

---

## 3. PROCÉDURE OFFICIELLE POUR TOUTE ÉVOLUTION AUTORISÉE DE LA LP

Si une évolution de la Landing Page est formellement requise et autorisée par le propriétaire :

### Étape 1 : Création d'une branche dédiée
Ne jamais travailler directement sur la branche principale. Créer une branche de travail (ex: `feat/lp-update-ref-20261027`).

### Étape 2 : Préparation et inspection des changements
Effectuer les modifications demandées dans la branche dédiée.

### Étape 3 : Enregistrement et audit de la demande
Exécuter le script d'audit :
```bash
./scripts/approve-lp-update.sh --request-owner-review "<RÉFÉRENCE_ORDRE_PROPRIÉTAIRE>" "<JUSTIFICATION_DÉTAILLÉE_ET_FICHIERS_MODIFIÉS>"
```
- Le script analyse les fichiers altérés et consigne la demande dans `scripts/LP_AUDIT_TRAIL.md`.
- Le script ne remplace pas arbitrairement le manifeste officiel en local.

### Étape 4 : Soumission de la Pull Request & Revue CODEOWNERS
1. Ouvrir une Pull Request sur le dépôt distant.
2. Le workflow `.github/workflows/verify-lp-integrity.yml` et les protections GitHub `CODEOWNERS` exigent l'approbation explicite du propriétaire.
3. Après validation humaine du diff complet par le propriétaire, l'archive de la baseline précédente (`fiko-lp-sealed-manifest.vX.json`) est créée et le manifeste est mis à jour dans le commit de fusion.
4. Un nouveau tag officiel de baseline est posé sur le commit de fusion par le propriétaire.
