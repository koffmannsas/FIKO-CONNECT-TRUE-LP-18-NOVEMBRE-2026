/**
 * Catalogue Tarifaire Officiel Fiko Connect™
 * Source unique de vérité commerciale pour la Landing Page et la page /tarifs.
 */

import { CLIENT_PORTAL_URL, getClientPortalUrl } from "../utils/navigation";
export { CLIENT_PORTAL_URL, getClientPortalUrl };

export interface PlanPriceConfig {
  monthly: number;
  annual: number;
  monthlyLabel: string;
  annualLabel: string;
  duration?: string;
  billingFrequency: string;
}

export const FIKO_PRICES = {
  trial: {
    monthly: 0,
    annual: 0,
    monthlyLabel: "0",
    annualLabel: "0",
    duration: "7 jours",
    billingFrequency: "Pendant 7 jours",
  },
  starter: {
    monthly: 19000,
    annual: 15000,
    monthlyLabel: "19 000",
    annualLabel: "15 000",
    billingFrequency: "par mois",
  },
  growth: {
    monthly: 49000,
    annual: 39000,
    monthlyLabel: "49 000",
    annualLabel: "39 000",
    billingFrequency: "par mois",
  },
  pro: {
    monthly: 99000,
    annual: 79000,
    monthlyLabel: "99 000",
    annualLabel: "79 000",
    billingFrequency: "par mois",
  },
  elite: {
    monthly: 199000,
    annual: 159000,
    monthlyLabel: "199 000",
    annualLabel: "159 000",
    billingFrequency: "par mois",
  },
} as const;

export interface FikoPlan {
  id: "trial" | "starter" | "growth" | "pro" | "elite";
  name: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  isFreeTrial?: boolean;
  durationLabel?: string;
  tagline: string;
  description: string;
  badge?: string;
  highlighted?: boolean;
  ctaText: string;
  ctaUrl: string;
  saasKey: string;
  features: string[];
  disabledFeatures: string[];
}

export const FIKO_PLANS: FikoPlan[] = [
  {
    id: "trial",
    name: "ESSAI GRATUIT",
    monthlyPrice: FIKO_PRICES.trial.monthly,
    annualMonthlyPrice: FIKO_PRICES.trial.annual,
    isFreeTrial: true,
    durationLabel: FIKO_PRICES.trial.duration,
    badge: "0 FCFA • 7 JOURS",
    tagline: "Testez Fiko Connect sans engagement",
    description: "Découvrez la puissance de l'automatisation WhatsApp et testez son fonctionnement en conditions réelles avant de souscrire.",
    ctaText: "Démarrer gratuitement pendant 7 jours",
    ctaUrl: getClientPortalUrl("", "trial"),
    saasKey: "trial",
    features: [
      "Accès complet pendant 7 jours",
      "Connexion WhatsApp Business par QR Code",
      "Réponses automatiques 24h/24",
      "Capture instantanée des coordonnées",
      "Aucune facturation pendant la période d’essai.",
      "Support d'aide au démarrage",
    ],
    disabledFeatures: [
      "Relances automatiques multi-étapes",
      "Scoring prédictif avancé",
      "Comptes WhatsApp multiples",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: FIKO_PRICES.starter.monthly,
    annualMonthlyPrice: FIKO_PRICES.starter.annual,
    tagline: "Automatisez vos premières réponses",
    description: "Idéal pour les indépendants et petites activités qui souhaitent ne plus rater aucun prospect WhatsApp.",
    ctaText: "Commencer Starter",
    ctaUrl: getClientPortalUrl("/register", "starter"),
    saasKey: "starter",
    features: [
      "Réponses automatiques 24h/24",
      "Capture instantanée des coordonnées",
      "Base conversationnelle intelligente",
      "1 compte WhatsApp connecté",
      "Jusqu'à 500 conversations / mois",
      "Support standard par email",
    ],
    disabledFeatures: [
      "Qualification BANT avancée",
      "Relances automatiques multi-étapes",
      "Scoring prédictif des leads",
      "Tableau de bord temps réel",
      "Accompagnement personnalisé",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: FIKO_PRICES.growth.monthly,
    annualMonthlyPrice: FIKO_PRICES.growth.annual,
    tagline: "Structurez votre acquisition commerciale",
    description: "Pour les entreprises en croissance qui ont besoin de filtrer, scorer et prioriser les opportunités chaudes.",
    ctaText: "Essayer Growth",
    ctaUrl: getClientPortalUrl("/register", "business"),
    saasKey: "business",
    features: [
      "Tout Starter inclus",
      "Qualification intelligente des besoins",
      "Scoring automatique des prospects (Chaud / Tiède)",
      "Gestion améliorée des flux entrants",
      "Jusqu'à 2 comptes WhatsApp",
      "Jusqu'à 2 000 conversations / mois",
      "Support prioritaire sous 24h",
    ],
    disabledFeatures: [
      "Scénarios de conversion sur-mesure",
      "Relances automatiques illimitées",
      "Optimisation autonome du closing",
      "Tableau de bord analytics temps réel",
      "Accompagnement stratégique dédié",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: FIKO_PRICES.pro.monthly,
    annualMonthlyPrice: FIKO_PRICES.pro.annual,
    badge: "⭐ RECOMMANDÉ",
    highlighted: true,
    tagline: "Transformez les conversations en ventes",
    description: "L'arme de closing complète pour maximiser vos conversions et récupérer les ventes habituellement perdues.",
    ctaText: "🔥 Activer PRO",
    ctaUrl: getClientPortalUrl("/register", "scale"),
    saasKey: "scale",
    features: [
      "Tout Growth inclus",
      "Scénarios de conversion avancés",
      "Relances automatiques cadencées (J+1, J+3, J+7)",
      "Recommandations de closing en temps réel",
      "Optimisation IA des arguments de vente",
      "Tableau de bord analytics en direct",
      "Jusqu'à 5 comptes WhatsApp",
      "Jusqu'à 6 000 conversations / mois",
      "Support VIP dédié WhatsApp & Téléphone",
    ],
    disabledFeatures: [
      "IA personnalisée sur données propriétaires",
      "Multi-équipes & permissions avancées",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPrice: FIKO_PRICES.elite.monthly,
    annualMonthlyPrice: FIKO_PRICES.elite.annual,
    badge: "HAUTE PERFORMANCE",
    tagline: "Une machine de vente intégrale sans compromis",
    description: "Pour les structures exigeantes, marques et réseaux de vente souhaitant une automatisation intégrale.",
    ctaText: "Déployer Elite",
    ctaUrl: getClientPortalUrl("/register", "elite"),
    saasKey: "elite",
    features: [
      "Tout Pro inclus",
      "Modèle IA personnalisé sur votre catalogue",
      "Stratégie de closing complète & sur-mesure",
      "Analytics prédictifs & reporting hebdomadaire",
      "Multi-comptes WhatsApp & multi-agents illimités",
      "Conversations illimitées encadrées",
      "Intégrations API & webhooks personnalisés",
      "Account Manager dédié & revue mensuelle",
    ],
    disabledFeatures: [],
  },
];
