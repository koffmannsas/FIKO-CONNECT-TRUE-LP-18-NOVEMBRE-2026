import React from "react";
import { Link } from "react-router-dom";

const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#050505] text-white min-h-screen py-28 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black mb-4">
          Conditions d’utilisation – Fiko Connect
        </h1>
        <p className="text-sm text-slate-400 mb-12">Dernière mise à jour : Avril 2026</p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">1. Objet</h2>
          <p className="text-slate-300 leading-relaxed">
            Les présentes conditions d’utilisation régissent l’accès et l’utilisation de la
            plateforme Fiko Connect. En accédant ou en utilisant notre service, vous acceptez de
            manière inconditionnelle de vous conformer à ces conditions générales. Si vous
            n’acceptez pas ces conditions, vous ne pouvez pas utiliser la plateforme.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">2. Accès au service</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>
              Le service est accessible via Internet aux professionnels ayant souscrit à une offre
              Fiko Connect.
            </li>
            <li>
              L’accès nécessite la création d’un compte utilisateur. Vous êtes entièrement
              responsable du maintien de la confidentialité de vos identifiants de connexion.
            </li>
            <li>
              Toute action effectuée via votre compte est présumée avoir été effectuée par
              vous-même. En cas de perte ou de vol de vos accès, vous devez prévenir immédiatement
              notre support.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">3. Description du service</h2>
          <p className="text-slate-300 mb-2 leading-relaxed">
            Fiko Connect est une plateforme logicielle en tant que service (SaaS) développée et
            exploitée par Koffmann Capital Group.
          </p>
          <p className="text-slate-300 leading-relaxed">
            <span className="font-bold">Fiko Connect</span> permet aux entreprises d’automatiser
            leur communication client, la qualification des prospects et la conversion commerciale
            via des agents intelligents connectés notamment à l’API WhatsApp Business.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">
            4. Obligations de l’utilisateur
          </h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>
              L’utilisateur s’engage à employer la plateforme uniquement à des fins légales et
              professionnelles.
            </li>
            <li>
              Il est strictement interdit d’utiliser le service pour envoyer des messages
              indésirables (spam abusif, harcèlement, fraude).
            </li>
            <li>
              L’utilisateur garantit qu’il respecte les lois en vigueur dans sa juridiction,
              notamment en matière de prospection et de protection des données.
            </li>
            <li>
              L’utilisateur demeure seul responsable des données importées et traitées via Fiko
              Connect.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">
            5. Utilisation de WhatsApp / Meta
          </h2>
          <p className="text-slate-300 mb-2 font-bold text-white">
            Une attention particulière est requise concernant l’utilisation des intégrations Meta
            (WhatsApp Business API) :
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>
              L’utilisateur est formellement tenu de respecter l’ensemble des politiques de commerce
              et de messagerie établies par Meta.
            </li>
            <li>
              Toute utilisation abusive du système de messagerie (ex : envoi massif non sollicité,
              contenu interdit) entraînera une suspension immédiate des services par Meta.
            </li>
            <li>
              Koffmann Capital Group décline toute responsabilité en cas de blocage ou de suspension
              de votre compte WhatsApp par Meta en raison de violations des règles de Meta.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">
            6. Données et confidentialité
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Le traitement de vos données personnelles et de celles de vos clients est encadré par
            notre{" "}
            <Link to="/privacy" className="text-[#FF2718] font-bold hover:underline">
              Politique de confidentialité
            </Link>
            . Pour en savoir plus sur la manière de supprimer vos informations ou de demander une
            purge, veuillez consulter notre{" "}
            <Link to="/data-deletion" className="text-[#FF2718] font-bold hover:underline">
              Procédure de suppression des données
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">7. Propriété intellectuelle</h2>
          <p className="text-slate-300 mb-2 leading-relaxed">
            La plateforme Fiko Connect, son code source, ses algorithmes, ses interfaces et son
            design demeurent la propriété exclusive de Koffmann Capital Group.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Il est expressément interdit de copier, reproduire, modifier, désassembler ou créer des
            œuvres dérivées de la plateforme sans l’accord écrit de Koffmann Capital Group.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">8. Responsabilité</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>
              Le service Fiko Connect est fourni « tel quel ». Nous nous efforçons de maintenir un
              accès ininterrompu, mais nous ne garantissons pas l’absence d’incidents techniques.
            </li>
            <li>
              Fiko Connect est un outil d’assistance commerciale. Koffmann Capital Group ne fournit
              aucune garantie de résultats commerciaux.
            </li>
            <li>
              Notre responsabilité, en cas de litige, est expressément limitée au montant total payé
              pour l’utilisation du service sur la période concernée, sauf disposition légale
              impérative contraire.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">9. Interruption / Suspension</h2>
          <p className="text-slate-300 mb-2">
            Koffmann Capital Group se réserve le droit de suspendre ou d’interrompre l’accès au
            service :
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>Pour effectuer des opérations de maintenance technique régulières ou d’urgence.</li>
            <li>
              En cas d’utilisation abusive, illégale ou en violation grave des présentes conditions
              (notamment celles liées aux abus sur WhatsApp Business API).
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">10. Résiliation</h2>
          <p className="text-slate-300 leading-relaxed">
            Vous avez la possibilité de résilier votre abonnement ou l’utilisation du service selon
            les modalités prévues dans votre contrat ou votre plan tarifaire. La résiliation
            entraînera la fermeture du compte et la suppression des accès à la plateforme.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">11. Modifications</h2>
          <p className="text-slate-300 leading-relaxed">
            Koffmann Capital Group se réserve le droit de modifier les présentes conditions
            d’utilisation à tout moment. Toute modification substantielle fera l’objet d’une
            notification préalable. Continuer d’utiliser le service après de telles modifications
            équivaut à leur acceptation.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">
            12. Droit applicable et Juridiction
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Les présentes conditions d’utilisation sont régies par le droit en vigueur en Côte
            d’Ivoire. Tout litige relatif à leur interprétation ou leur exécution relèvera de la
            compétence exclusive du Tribunal de Commerce d’Abidjan.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#FF2718]">13. Contact</h2>
          <div className="text-slate-300 space-y-2">
            <p>
              <strong>Koffmann Capital Group</strong> (RCCM : CI-ABJ-03-2023-B13-02587 / NCC : 23 01
              065 C)
            </p>
            <p>
              <strong>Email :</strong>{" "}
              <a href="mailto:support@krypton-ia.tech" className="text-[#FF2718] hover:underline">
                support@krypton-ia.tech
              </a>
            </p>
            <p>
              <strong>Téléphone :</strong> 05 44 42 76 76
            </p>
            <p>
              <strong>Adresse :</strong> Palmeraie, Abidjan, Côte d’Ivoire
            </p>
          </div>
        </section>

        <section>
          <div className="bg-white/5 p-6 rounded-lg border border-white/10 mt-12 text-center">
            <p className="text-slate-300 italic font-medium">
              L’utilisation de Fiko Connect implique l’acceptation pleine et entière des présentes
              conditions.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
