# JOURNAL D'AUDIT CANONIQUE — LANDING PAGE FIKO CONNECT™

## [2026-10-25T13:10:45Z] INITIALISATION DU SCELLEMENT DE RÉFÉRENCE
- **Type d'événement :** Scellement officiel de référence (Directive de Gel)
- **Baseline ID :** `FIKO-LP-SEALED-BASELINE`
- **Autorité :** Propriétaire du projet
- **Périmètre :** 23 fichiers scellés (SHA-256 enregistrés dans `scripts/fiko-lp-sealed-manifest.json`)
- **Statut :** INITIAL_SEALED_BASELINE
- **Notes :** Aucune modification autorisée sans ordre formel et revue CODEOWNERS.

## [2026-11-10T16:51:30Z] MISE À JOUR AUTORISÉE DU PIED DE PAGE (FOOTER)
- **Type d'événement :** Évolution de contenu autorisée par le propriétaire du projet
- **Autorité :** Propriétaire du projet (koffmannsas@gmail.com)
- **Fichier modifié :** `frontend/src/components/Footer.tsx`
- **Ancien Hash SHA-256 :** `bd76ccedc3ac8e581e49269dfcc6e0ae9b174c7275cf390953ef0a8adcb208ef`
- **Nouveau Hash SHA-256 :** `3771f49044f067f4ba0b42f8e2714ecc88fd1a3485c68e77600d8a685c6cae18`
- **Description :** Remplacement de la signature de marque : « Fiko Connect une marque KCG (KCG en rouge redirige vers www.koffmann.group) ».
- **Statut :** VALIDE_CONFORME_BASELINE


## [2026-11-17T17:43:10Z] DEMANDE D'ÉVOLUTION DE LA BASELINE LP ENREGISTRÉE
- **Référence demandée :** CLEANUP-KRYPTON-LP-01
- **Motif déclaré :** Retrait de l'import inutilise HomePage (ligne 25) dans frontend/src/App.tsx afin de supprimer l'ancienne landing page Krypton AI (pages/home/HomePage.tsx et ses 9 composants exclusifs) sans modifier les routes, menus, composants ou rendus de Fiko Connect.
- **Opérateur :** root
- **Fichiers modifiés détectés :** 1
- **Fichiers manquants détectés :** 0
- **Statut :** EN_ATTENTE_REVUE_PROPRIETAIRE_GITHUB_CODEOWNERS
