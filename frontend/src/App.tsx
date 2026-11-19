import React, { useState, useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Page, UserProfile } from "./types";
import { ROUTES } from "./routes.config";
import { auth } from "./firebase";
import { getClientPortalUrl, trackEvent } from "./utils/navigation";

import SEO from "./components/SEO";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CosmicBackground from "./components/CosmicBackground";

import FikoConnectPage from "./pages/fiko/FikoConnectPage";
import PrivacyPage from "./pages/PrivacyPage";
import DataDeletionPage from "./pages/DataDeletionPage";
import TermsPage from "./pages/TermsPage";
import NotFoundPage from "./pages/NotFoundPage";

const PageWrapper: React.FC<{
  children: React.ReactNode;
  config: (typeof ROUTES)[Page];
}> = ({ children, config }) => (
  <>
    <SEO title={config.title} description={config.description} canonical={config.path} />
    {children}
  </>
);

const App: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const scrollTimer = window.setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
      return () => window.clearTimeout(scrollTimer);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const handleLogout = useCallback(async () => {
    await auth.signOut();
    setUser(null);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <CosmicBackground />

      <Navbar user={user} onLogout={handleLogout} />

      <div className="fixed bottom-6 right-6 z-[999] hidden lg:flex items-center">
        <a
          href={user ? getClientPortalUrl("/dashboard") : getClientPortalUrl("/register")}
          onClick={() => {
            trackEvent("landing_cta_click", {
              cta_label: "Floating CTA Permanent",
              is_logged_in: !!user,
            });
            trackEvent("dashboard_access", { source: "floating_button" });
          }}
          className="flex items-center gap-2.5 px-6 py-4 bg-[#FF2718] hover:bg-neutral-900 border border-white/15 text-white font-black text-xs md:text-sm uppercase tracking-[0.16em] rounded-full shadow-[0_20px_40px_rgba(255,39,24,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>🚀 Ouvrir Fiko</span>
        </a>
      </div>

      <main className="flex-grow">
        <Routes>
          <Route
            path={ROUTES[Page.HOME].path}
            element={
              <PageWrapper config={ROUTES[Page.HOME]}>
                <FikoConnectPage />
              </PageWrapper>
            }
          />
          <Route
            path={ROUTES[Page.FIKO_CONNECT].path}
            element={
              <PageWrapper config={ROUTES[Page.FIKO_CONNECT]}>
                <FikoConnectPage />
              </PageWrapper>
            }
          />
          <Route
            path={ROUTES[Page.PRIVACY].path}
            element={
              <PageWrapper config={ROUTES[Page.PRIVACY]}>
                <PrivacyPage />
              </PageWrapper>
            }
          />
          <Route
            path={ROUTES[Page.DATA_DELETION].path}
            element={
              <PageWrapper config={ROUTES[Page.DATA_DELETION]}>
                <DataDeletionPage />
              </PageWrapper>
            }
          />
          <Route
            path={ROUTES[Page.TERMS].path}
            element={
              <PageWrapper config={ROUTES[Page.TERMS]}>
                <TermsPage />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={
              <>
                <SEO
                  title="Page introuvable | Fiko Connect"
                  description="La page demandée n'existe pas sur Fiko Connect."
                />
                <NotFoundPage />
              </>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
