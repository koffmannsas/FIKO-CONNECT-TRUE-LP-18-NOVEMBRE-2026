#!/usr/bin/env bash
# ==============================================================================
# FIKO CONNECT™ — SCRIPT DE CONTRÔLE ET D'AUDIT D'ÉVOLUTION DE LA LP
# Mode sécurisé : La mise à jour automatique arbitraire du manifeste est désactivée.
# Toute évolution de la baseline doit suivre le protocole de gouvernance.
# ==============================================================================

set -euo pipefail

MANIFEST_FILE="$(dirname "$0")/fiko-lp-sealed-manifest.json"
AUDIT_LOG="$(dirname "$0")/LP_AUDIT_TRAIL.md"

echo "======================================================================"
echo "🛡️  CONTRÔLE D'ÉVOLUTION ET AUDIT DE LA LANDING PAGE FIKO CONNECT™"
echo "======================================================================"

if [ "${1:-}" != "--request-owner-review" ]; then
  echo "❌ ERREUR : La modification directe et silencieuse du manifeste est désactivée."
  echo "   Pour enregistrer une demande d'évolution formelle et inspecter les écarts :"
  echo "   $0 --request-owner-review \"<RÉFÉRENCE_MISSION>\" \"<DESCRIPTION_DÉTAILLÉE_DES_CHANGEMENTS>\""
  echo "   Consultez la procédure : scripts/PROCEDURE_AUTORISATION_LP.md"
  echo "======================================================================"
  exit 1
fi

AUTH_REF="${2:-}"
REASON="${3:-}"

# Validation stricte des paramètres (rejet des chaînes vides, triviales ou placeholders)
if [ -z "$AUTH_REF" ] || [ -z "$REASON" ] || [ ${#AUTH_REF} -lt 6 ] || [ ${#REASON} -lt 15 ] || [[ "$AUTH_REF" == *"<"* ]] || [[ "$REASON" == *"<"* ]]; then
  echo "❌ ERREUR : Paramètres d'autorisation invalides ou insuffisants."
  echo "   - La référence d'autorisation doit comporter au moins 6 caractères non génériques."
  echo "   - La justification doit être détaillée (au moins 15 caractères explicites)."
  echo "   Usage : $0 --request-owner-review \"<REF_VALIDÉE>\" \"<MOTIF_DÉTAILLÉ_ET_FICHIERS_CONCERNÉS>\""
  echo "======================================================================"
  exit 1
fi

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "🔍 Analyse des fichiers du périmètre scellé..."

# Analyser les fichiers modifiés sans écraser le manifeste
DIFF_REPORT=$(node -e '
const fs = require("fs");
const crypto = require("crypto");

const manifestPath = process.argv[1];
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const modified = [];
const missing = [];
const intact = [];

for (const [file, expectedHash] of Object.entries(manifest.checksums_sha256)) {
  if (!fs.existsSync(file)) {
    missing.push(file);
    continue;
  }
  const content = fs.readFileSync(file);
  const actualHash = crypto.createHash("sha256").update(content).digest("hex");
  if (actualHash !== expectedHash) {
    modified.push({ file, expectedHash, actualHash });
  } else {
    intact.push(file);
  }
}

console.log(JSON.stringify({ modified, missing, intactCount: intact.length }));
' "$MANIFEST_FILE")

MODIFIED_COUNT=$(node -e "const r = JSON.parse(process.argv[1]); console.log(r.modified.length);" "$DIFF_REPORT")
MISSING_COUNT=$(node -e "const r = JSON.parse(process.argv[1]); console.log(r.missing.length);" "$DIFF_REPORT")

echo "📊 Bilan du périmètre (23 fichiers) :"
echo "   - Fichiers intacts   : $((23 - MODIFIED_COUNT - MISSING_COUNT))"
echo "   - Fichiers modifiés  : $MODIFIED_COUNT"
echo "   - Fichiers manquants : $MISSING_COUNT"

if [ "$MODIFIED_COUNT" -eq 0 ] && [ "$MISSING_COUNT" -eq 0 ]; then
  echo "ℹ️  Aucun fichier de la LP n'est actuellement altéré. La baseline est déjà respectée."
  exit 0
fi

# Consignation de la demande dans le journal d'audit canonique
mkdir -p "$(dirname "$AUDIT_LOG")"
cat >> "$AUDIT_LOG" <<EOF

## [${TIMESTAMP}] DEMANDE D'ÉVOLUTION DE LA BASELINE LP ENREGISTRÉE
- **Référence demandée :** ${AUTH_REF}
- **Motif déclaré :** ${REASON}
- **Opérateur :** $(whoami)
- **Fichiers modifiés détectés :** ${MODIFIED_COUNT}
- **Fichiers manquants détectés :** ${MISSING_COUNT}
- **Statut :** EN_ATTENTE_REVUE_PROPRIETAIRE_GITHUB_CODEOWNERS
EOF

echo "📝 Demande consignée dans le journal d'audit canonique : $AUDIT_LOG"
echo "🔒 SÉCURITÉ ACTIVE : Le manifeste officiel n'a PAS été écrasé."
echo "   La politique de sécurité interdit l'écrasement local non vérifié."
echo "   Pour adopter une nouvelle version de référence :"
echo "   1. Soumettre une Pull Request vers la branche protégée."
echo "   2. Obtenir la revue formelle du propriétaire via GitHub CODEOWNERS."
echo "   3. Archiver la baseline précédente avant toute adoption de nouveau tag."
echo "======================================================================"
exit 1

