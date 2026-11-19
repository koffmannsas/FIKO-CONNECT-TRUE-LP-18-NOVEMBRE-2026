import React, { useEffect, useState } from 'react';
import './FikoHeroSlider.css';
import { auth } from '../firebase';
import { getClientPortalUrl, getSaaSUrl, trackEvent } from '../utils/navigation';
import { CLIENT_PORTAL_URL } from '../data/fikoPricing';

const FikoHeroSlider: React.FC = () => {
    const [sales, setSales] = useState(1847);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSales(prev => prev + Math.floor(Math.random() * 3) + 1);
        }, 4000 + Math.random() * 6000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const particles = document.querySelectorAll('.bg-particle');
        particles.forEach((p) => {
            p.addEventListener('animationiteration', () => {
                (p as HTMLElement).style.left = (Math.random() * 90) + '%';
            });
        });
    }, []);

    return (
        <section className="fiko-hero-slider">
            {/* Orbes de couleur en arrière-plan */}
            <div className="bg-color-orb orb-blue"></div>
            <div className="bg-color-orb orb-orange"></div>
            <div className="bg-color-orb orb-red"></div>
            <div className="bg-color-orb orb-blue-secondary"></div>
            <div className="bg-color-orb orb-orange-secondary"></div>

            {/* Motif géométrique */}
            <div className="bg-pattern-fiko"></div>

            {/* Particules flottantes */}
            <div className="fiko-hero-bg-grid">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`bg-particle particle-${i + 1}`}></div>
                ))}
            </div>

            <div className="fiko-hero-content">
                {/* Colonne Gauche — Texte */}
                <div className="fiko-hero-text">
                    <div className="fiko-hero-badge-row">
                        <span className="fiko-hero-badge-partner">WhatsApp Business Partner</span>
                        <span className="fiko-hero-badge-roi">
                            <span className="stars">★★★★★</span> ROI vérifié
                        </span>
                        <a 
                            href={getClientPortalUrl("", "trial")}
                            onClick={() => {
                                trackEvent("plan_selected", { plan: "trial" });
                                trackEvent("trial_started", { plan: "trial", duration_days: 7 });
                                trackEvent("landing_cta_click", { cta_label: "Badge Essai Gratuit 7j", plan: "trial" });
                            }}
                            className="fiko-hero-badge-trial"
                        >
                            🎁 Essai 7j · 0 FCFA
                        </a>
                    </div>

                    <p className="fiko-hero-question">
                        Un prospect vous écrit sur <span>WhatsApp</span> à 23h. Vous dormez.
                        Il achète chez votre concurrent à 23h07.
                        <span>Ne laissez plus une conversation commerciale sans suite.</span>
                    </p>

                    <h1 className="fiko-hero-title">
                        Transformez vos conversations WhatsApp<br />
                        en <span className="fiko-gradient-word">opportunités commerciales</span>
                    </h1>

                    <p className="fiko-hero-subtitle">
                        Fiko Connect automatise l'intégralité du cycle de messagerie : <strong>Capture · Qualification · Réponse · Recommandation · Relance · Conversion · Analytics</strong> — 24h/24, sans délai ni friction.
                    </p>

                    {/* Appel Essai Gratuit 7 Jours */}
                    <div className="fiko-hero-trial-banner">
                        <span className="trial-pill">🎁 ESSAI GRATUIT · 7 JOURS</span>
                        <span className="trial-desc">
                            <strong>0 FCFA</strong> pendant 7 jours • Aucune carte requise
                        </span>
                    </div>

                    <div className="fiko-hero-cta-row">
                        {isLoggedIn ? (
                            <a 
                                href={getClientPortalUrl("/dashboard")}
                                onClick={() => trackEvent("landing_cta_click", { cta_label: "Accéder à mon espace" })}
                                className="fiko-cta-primary"
                            >
                                🚀 Accéder à mon espace
                            </a>
                        ) : (
                            <a 
                                href={getClientPortalUrl("", "trial")}
                                onClick={() => {
                                    trackEvent("plan_selected", { plan: "trial" });
                                    trackEvent("trial_started", { plan: "trial", duration_days: 7 });
                                    trackEvent("landing_cta_click", { cta_label: "Démarrer gratuitement pendant 7 jours", plan: "trial" });
                                }}
                                className="fiko-cta-primary"
                            >
                                ⚡ Démarrer gratuitement pendant 7 jours
                            </a>
                        )}
                        <a 
                            href={getClientPortalUrl(isLoggedIn ? "/dashboard" : "/register")}
                            onClick={() => trackEvent("landing_cta_click", { cta_label: "Activer Fiko" })}
                            className="fiko-cta-secondary"
                        >
                            🔥 Activer Fiko
                        </a>
                    </div>

                    <p className="fiko-hero-micro-text">
                        <span className="live-dot"></span>
                        <strong>2 347 entreprises</strong> ont activé Fiko ce mois-ci •
                        Configuration en 47 secondes
                    </p>
                </div>

                {/* Colonne Droite — Orbe de Conversation */}
                <div className="fiko-hero-visual">
                    <div className="conversation-orbe">
                        <div className="orbe-ring ring-1"></div>
                        <div className="orbe-ring ring-2"></div>
                        <div className="orbe-ring ring-3"></div>

                        <div className="floating-message msg-1">💬 Bonjour, je suis intéressé…</div>
                        <div className="floating-message msg-2">✅ Parfait, quelle offre ?</div>
                        <div className="floating-message msg-3">📱 Disponible sur WhatsApp ?</div>
                        <div className="floating-message msg-4">💰 Je prends !</div>

                        <div className="orbe-core">
                            <div className="fiko-icon">⚡</div>
                            <div className="fiko-label">FIKO CONNECT</div>
                        </div>

                        <div className="live-counter-visual">
                            <span className="count-num">{sales.toLocaleString('fr-FR')}</span> ventes conclues aujourd'hui
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FikoHeroSlider;
