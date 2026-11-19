import React from "react";
import { Link } from "react-router-dom";

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-[#050505] text-white min-h-screen py-28 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black mb-4">
          Politique de confidentialité – Fiko Connect
        </h1>
        <p className="text-sm text-slate-400 mb-12">Dernière mise à jour : Avril 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">1. Introduction</h2>
          <p className="text-slate-300 leading-relaxed">
            Koffmann Capital Group, société spécialisée dans le développement et l’exploitation de
            solutions informatiques innovantes de mise en relation, enregistrée au Registre de
            Commerce et des Sociétés d’Abidjan sous le numéro RCCM : CI-ABJ-03-2023-B13-02587, NCC :
            23 01 065 C. Siège social : Palmeraie, Abidjan, Côte d’Ivoire. Fiko Connect est une
            solution logicielle développée et exploitée par Koffmann Capital Group permettant aux
            entreprises d’automatiser leur communication client via des agents intelligents
            connectés notamment à WhatsApp Business.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">2. Données collectées</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Données de communication (messages WhatsApp)</li>
            <li>Données techniques (IP, appareil, logs)</li>
            <li>Données clients (prospects, CRM)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">3. Utilisation des données</h2>
          <p className="text-slate-300 leading-relaxed">
            Les données servent à automatiser les échanges, améliorer l’expérience utilisateur,
            qualifier les prospects et optimiser la conversion. Ces données ne sont pas utilisées à
            d’autres fins.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">
            4. Utilisation des données Meta (WhatsApp)
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Les données WhatsApp sont utilisées uniquement pour fournir le service Fiko Connect.
            Aucune revente de données. Usage strictement limité au cadre client.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">5. Sécurité et Partage</h2>
          <p className="text-slate-300 leading-relaxed">
            Aucune vente de données. Partage uniquement en cas d’obligation légale ou technique.
            Stockage sécurisé (cloud / Firebase), accès restreint et protection contre les
            intrusions.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">6. Droits des utilisateurs</h2>
          <p className="text-slate-300 leading-relaxed">
            Vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition au
            traitement de vos données personnelles. Consultez également notre{" "}
            <Link to="/data-deletion" className="text-[#FF2718] font-bold hover:underline">
              procédure de suppression des données
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">7. Contact</h2>
          <div className="text-slate-300 space-y-1">
            <p>
              Email :{" "}
              <a href="mailto:support@krypton-ia.tech" className="text-[#FF2718] hover:underline">
                support@krypton-ia.tech
              </a>
            </p>
            <p>Téléphone : 05 44 42 76 76</p>
            <p>Adresse : Palmeraie, Abidjan, Côte d’Ivoire</p>
          </div>
        </section>

        <section>
          <p className="text-slate-400 italic">
            L’utilisation de Fiko Connect implique l’acceptation de cette politique de
            confidentialité.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
