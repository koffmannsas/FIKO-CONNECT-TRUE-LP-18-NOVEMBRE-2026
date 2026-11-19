import React, { useState } from 'react';
import './FikoPricingSlider.css';
import { getClientPortalUrl, getSaaSUrl, trackEvent } from '../utils/navigation';
import { FIKO_PLANS, CLIENT_PORTAL_URL } from '../data/fikoPricing';

const FikoPricingSlider: React.FC = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <section className="pricing-section" id="section-pricing">
            {/* Fond cosmique */}
            <div className="cosmic-bg">
                <div className="cosmic-particle cp-blue"></div><div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-red"></div><div className="cosmic-particle cp-blue"></div>
                <div className="cosmic-particle cp-orange"></div><div className="cosmic-particle cp-red"></div>
                <div className="cosmic-particle cp-blue"></div><div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-red"></div><div className="cosmic-particle cp-orange"></div>
                <div className="cosmic-particle cp-blue"></div><div className="cosmic-particle cp-red"></div>
            </div>
            <div className="nebula-orb orb-blue"></div>
            <div className="nebula-orb orb-orange"></div>
            <div className="nebula-orb orb-red"></div>

            <div className="pricing-container">
                {/* Header */}
                <div className="pricing-header">
                    <div className="eyebrow">
                        <span className="pulse-dot"></span> Tarifs Fiko Connect
                    </div>
                    <h2>
                        Votre <span className="gradient-text">machine de conversion</span><br/>prête à être activée
                    </h2>
                    <p className="subtitle">
                        Un plan pour chaque ambition. Sans engagement. Activation immédiate.
                    </p>
                </div>

                {/* Toggle Mensuel / Annuel */}
                <div className="toggle-row">
                    <button 
                        type="button"
                        className={`toggle-label ${!isAnnual ? 'active' : ''}`} 
                        onClick={() => setIsAnnual(false)}
                    >
                        Facturation Mensuelle
                    </button>
                    <div 
                        className={`toggle-track ${isAnnual ? 'active' : ''}`} 
                        onClick={() => setIsAnnual(!isAnnual)}
                        role="switch"
                        aria-checked={isAnnual}
                        aria-label="Basculer vers la facturation annuelle"
                    >
                        <div className="toggle-dot"></div>
                    </div>
                    <button 
                        type="button"
                        className={`toggle-label ${isAnnual ? 'active' : ''}`} 
                        onClick={() => setIsAnnual(true)}
                    >
                        Facturation Annuelle
                    </button>
                    <span className="toggle-badge">-20%</span>
                </div>
                <p className="toggle-helper-text">
                    {isAnnual
                      ? "✨ Remise annuelle de 20% appliquée sur les 4 formules payantes • Essai toujours gratuit"
                      : "Engagement mensuel sans contrainte • Annulation en 1 clic"}
                </p>

                {/* Grille des 5 Offres Fiko Connect */}
                <div className="pricing-grid">
                    {FIKO_PLANS.map((plan) => {
                        const displayPrice = isAnnual ? plan.annualMonthlyPrice : plan.monthlyPrice;
                        const saasUrl = plan.ctaUrl || (plan.isFreeTrial ? getClientPortalUrl("", "trial") : getClientPortalUrl("/register", plan.saasKey));

                        return (
                            <div 
                                key={plan.id}
                                className={`pricing-card card-${plan.id} ${plan.highlighted ? 'card-pro' : ''}`}
                            >
                                {/* Badge de positionnement */}
                                {plan.badge && (
                                    <div className={plan.highlighted ? "badge-pro" : `badge-plan badge-${plan.id}`}>
                                        {plan.badge}
                                    </div>
                                )}

                                {/* Effet halo lumineux tournant pour l'offre PRO */}
                                {plan.highlighted && (
                                    <div className="border-spin-wrapper">
                                        <div className="border-spin-inner"></div>
                                    </div>
                                )}

                                {/* Contenu supérieur de la carte */}
                                <div className="card-top-content">
                                    <div className="plan-name">{plan.name}</div>
                                    <p className="plan-tagline">{plan.tagline}</p>

                                    {/* Bloc de prix */}
                                    <div className="plan-price-wrap">
                                        {plan.isFreeTrial ? (
                                            <div>
                                                <div className="plan-price">
                                                    <span className="price-val">0</span>
                                                    <span className="currency">FCFA</span>
                                                    <span className="period trial-period">7 jours</span>
                                                </div>
                                                <div className="price-subtext trial-subtext">
                                                    Aucune facturation pendant la période d’essai.
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="plan-price">
                                                    <span className="price-val">{displayPrice.toLocaleString('fr-FR')}</span>
                                                    <span className="currency">FCFA</span>
                                                    <span className="period">/mois</span>
                                                </div>
                                                <div className="price-subtext">
                                                    {isAnnual ? (
                                                        <span className="annual-subtext">
                                                            Facturé annuellement ({(displayPrice * 12).toLocaleString('fr-FR')} FCFA/an)
                                                        </span>
                                                    ) : (
                                                        <span>Facturation mensuelle sans engagement</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description commerciale */}
                                    <p className="plan-description">{plan.description}</p>

                                    {/* Projection ROI pour PRO */}
                                    {plan.highlighted && (
                                        <div className="projection-box">
                                            <div className="proj-value">+30% à +70% de clients</div>
                                            <div className="proj-sub">vs gestion manuelle</div>
                                        </div>
                                    )}

                                    {/* Liste des fonctionnalités */}
                                    <div className="features-block">
                                        <div className="features-header">Inclus dans ce forfait :</div>
                                        <ul className="plan-features">
                                            {plan.features.map((feat, idx) => (
                                                <li key={`feat-${idx}`}>
                                                    <span className="check-mark">✓</span>
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                            {plan.disabledFeatures.map((feat, idx) => (
                                                <li key={`dis-${idx}`} className="disabled">
                                                    <span className="cross-mark">✕</span>
                                                    <span className="line-through">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Mention de popularité pour PRO */}
                                    {plan.highlighted && (
                                        <p className="popular-mention">✔ <strong>Le plus choisi</strong> par les vendeurs</p>
                                    )}
                                </div>

                                {/* Action CTA */}
                                <div className="card-cta-wrapper">
                                    <a 
                                        href={saasUrl}
                                        onClick={() => {
                                            if (plan.isFreeTrial) {
                                                trackEvent("trial_started", { plan: "trial", duration_days: 7 });
                                                trackEvent("pricing_cta_click", { plan: "trial", price: 0 });
                                                trackEvent("landing_cta_click", { cta_label: plan.ctaText, plan: "trial" });
                                            } else {
                                                trackEvent("plan_selected", { plan: plan.id, isAnnual });
                                                trackEvent("pricing_cta_click", { plan: plan.id, price: displayPrice });
                                                trackEvent("landing_cta_click", { cta_label: plan.ctaText, plan: plan.id });
                                            }
                                        }}
                                        className={`plan-cta ${plan.highlighted ? 'cta-pro' : plan.isFreeTrial ? 'cta-trial' : ''}`}
                                    >
                                        <span>{plan.ctaText}</span>
                                        <span className="cta-arrow">↗</span>
                                    </a>
                                    <p className="cta-micro-text">
                                        {plan.isFreeTrial ? "Activation immédiate 7 jours • 0 FCFA" : "Configuration en 3 min • Support actif"}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mention paiement */}
                <div className="payment-mention">
                    <p>
                        <span>📱 Mobile Money</span> accepté • Paiement mensuel ou annuel • <span>Activation immédiate</span> • Sans engagement
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FikoPricingSlider;
