import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes.config";
import { Page } from "../types";

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center py-28 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF2718] mb-4">
          Erreur 404
        </p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Page introuvable
        </h1>
        <p className="text-slate-400 leading-relaxed mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          to={ROUTES[Page.HOME].path}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#FF2718] hover:bg-[#e01e10] text-white font-bold text-sm uppercase tracking-[0.14em] transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
