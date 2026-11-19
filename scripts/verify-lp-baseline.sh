#!/usr/bin/env bash
# ==============================================================================
# FIKO CONNECT™ LANDING PAGE — VERIFICATION SCRIPT DE NON-RÉGRESSION
# Baseline officielle scellée : FIKO-LP-SEALED-BASELINE
# Hash Commit Git : df7ffc70e815d0d8deff49a4c78d54c51c6fb7bb
# ==============================================================================

set -euo pipefail

MANIFEST_FILE="$(dirname "$0")/fiko-lp-sealed-manifest.json"

if [ ! -f "$MANIFEST_FILE" ]; then
  echo "❌ Erreur : Fichier manifeste introuvable : $MANIFEST_FILE" >&2
  exit 1
fi

echo "======================================================================"
echo "🛡️  VÉRIFICATION DE L'INTÉGRITÉ DE LA LANDING PAGE FIKO CONNECT™"
echo "    Baseline de référence : FIKO-LP-SEALED-BASELINE"
echo "======================================================================"

FAILED=0
CHECKED=0

# Parser les paires fichier / sha256 depuis le manifest JSON avec node
RESULTS=$(node -e '
const fs = require("fs");
const crypto = require("crypto");
const manifest = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));

const entries = Object.entries(manifest.checksums_sha256 || {});
if (entries.length !== 23) {
  console.log(`CORRUPT_MANIFEST:Expected 23 files, found ${entries.length}`);
  process.exit(1);
}

let failures = 0;
let checked = 0;

for (const [file, expectedHash] of entries) {
  checked++;
  if (!fs.existsSync(file)) {
    console.log(`MISSING:${file}`);
    failures++;
    continue;
  }
  const content = fs.readFileSync(file);
  const actualHash = crypto.createHash("sha256").update(content).digest("hex");
  if (actualHash !== expectedHash) {
    console.log(`MISMATCH:${file}:${expectedHash}:${actualHash}`);
    failures++;
  } else {
    console.log(`OK:${file}`);
  }
}

if (failures > 0) {
  process.exit(1);
}
' "$MANIFEST_FILE") || FAILED=1

echo "$RESULTS" | while IFS= read -r line; do
  if [[ "$line" == OK:* ]]; then
    file="${line#OK:}"
    echo "  ✅ INTACT  : $file"
  elif [[ "$line" == MISMATCH:* ]]; then
    IFS=':' read -r _ file expected actual <<< "$line"
    echo "  ❌ ALTÉRÉ  : $file"
    echo "     Attendu  : $expected"
    echo "     Actuel   : $actual"
  elif [[ "$line" == MISSING:* ]]; then
    file="${line#MISSING:}"
    echo "  ❌ MANQUANT: $file"
  fi
done

if [ "$FAILED" -ne 0 ]; then
  echo "----------------------------------------------------------------------"
  echo "🚨 ALERTE VIOLATION DU GEL : Des fichiers de la LP ont été modifiés !"
  echo "   Toute modification de la Landing Page est formellement interdite."
  echo "   Le contrôle d'intégrité a échoué. Aucun bypass par variable d'environnement n'est admis."
  echo "   Consultez le protocole de gouvernance : scripts/PROCEDURE_AUTORISATION_LP.md"
  echo "======================================================================"
  exit 1
fi

echo "----------------------------------------------------------------------"
echo "✨ SUCCÈS : Les 23 fichiers protégés sont 100% conformes à la Baseline scellée."
echo "   Baseline : FIKO-LP-SEALED-BASELINE"
echo "======================================================================"
exit 0
