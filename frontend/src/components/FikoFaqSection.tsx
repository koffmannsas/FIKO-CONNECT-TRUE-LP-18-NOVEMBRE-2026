import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, RotateCcw, Upload, X, ArrowRight } from "lucide-react";
import { getClientPortalUrl, trackEvent } from "../utils/navigation";

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  steps?: string[];
}

interface RawFaqPayload {
  title?: string;
  updatedAt?: string;
  items?: Array<Partial<FaqItem>>;
}

const DEFAULT_JSON_URL = "/data/fiko-faq.json";

function normalizeFaqData(raw: unknown): {
  title: string;
  updatedAt?: string;
  items: FaqItem[];
} {
  let rawItems: Array<Partial<FaqItem>> = [];
  let title = "Questions fréquentes pour bien démarrer";
  let updatedAt: string | undefined;

  if (Array.isArray(raw)) {
    rawItems = raw;
  } else if (raw && typeof raw === "object") {
    const payload = raw as RawFaqPayload;
    if (Array.isArray(payload.items)) {
      rawItems = payload.items;
    }
    if (typeof payload.title === "string" && payload.title.trim()) {
      title = payload.title.trim();
    }
    if (typeof payload.updatedAt === "string" && payload.updatedAt.trim()) {
      updatedAt = payload.updatedAt.trim();
    }
  } else {
    throw new Error("Format JSON invalide : tableau ou objet avec clé « items » attendu.");
  }

  const items: FaqItem[] = rawItems
    .filter(
      (entry): entry is Partial<FaqItem> & { question: string; answer: string } =>
        Boolean(
          entry &&
            typeof entry.question === "string" &&
            entry.question.trim() &&
            typeof entry.answer === "string" &&
            entry.answer.trim()
        )
    )
    .map((entry, idx) => ({
      id:
        typeof entry.id === "string" && entry.id.trim()
          ? entry.id.trim()
          : `faq-item-${idx + 1}`,
      category:
        typeof entry.category === "string" && entry.category.trim()
          ? entry.category.trim()
          : "Général",
      question: entry.question.trim(),
      answer: entry.answer.trim(),
      steps: Array.isArray(entry.steps)
        ? entry.steps.filter((s): s is string => typeof s === "string" && s.trim().length > 0)
        : undefined,
    }));

  if (items.length === 0) {
    throw new Error("Aucune question-réponse valide trouvée dans le fichier JSON.");
  }

  return { title, updatedAt, items };
}

const FikoFaqSection: React.FC = () => {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [sourceName, setSourceName] = useState<string>("fiko-faq.json");
  const [isCustomSource, setIsCustomSource] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadDefaultFaq = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(DEFAULT_JSON_URL, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Impossible de charger ${DEFAULT_JSON_URL} (HTTP ${response.status}).`);
      }
      const jsonData = await response.json();
      const normalized = normalizeFaqData(jsonData);
      setItems(normalized.items);
      setSourceName("fiko-faq.json");
      setIsCustomSource(false);
      setSelectedCategory("Toutes");
      setOpenIds(normalized.items[0] ? { [normalized.items[0].id]: true } : {});
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur inattendue lors du chargement de la FAQ JSON."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDefaultFaq();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const normalized = normalizeFaqData(parsed);
      setItems(normalized.items);
      setSourceName(file.name);
      setIsCustomSource(true);
      setSelectedCategory("Toutes");
      setSearchQuery("");
      setOpenIds(normalized.items[0] ? { [normalized.items[0].id]: true } : {});
    } catch (err) {
      setError(
        err instanceof Error
          ? `Fichier refusé (${file.name}) : ${err.message}`
          : "Le fichier sélectionné n'est pas un JSON FAQ valide."
      );
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return ["Toutes", ...unique];
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "Toutes" || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.steps?.some((s) => s.toLowerCase().includes(query)) ?? false)
      );
    });
  }, [items, searchQuery, selectedCategory]);

  const allFilteredOpen =
    filteredItems.length > 0 && filteredItems.every((item) => Boolean(openIds[item.id]));

  const toggleItem = (id: string, question: string) => {
    setOpenIds((prev) => {
      const nextOpen = !prev[id];
      if (nextOpen) {
        trackEvent("faq_item_opened", { faq_id: id, question });
      }
      return { ...prev, [id]: nextOpen };
    });
  };

  const handleToggleAll = () => {
    if (allFilteredOpen) {
      setOpenIds((prev) => {
        const next = { ...prev };
        filteredItems.forEach((item) => {
          delete next[item.id];
        });
        return next;
      });
    } else {
      setOpenIds((prev) => {
        const next = { ...prev };
        filteredItems.forEach((item) => {
          next[item.id] = true;
        });
        return next;
      });
    }
  };

  return (
    <section
      id="faq"
      aria-labelledby="fiko-faq-heading"
      className="bg-white text-[#080808] py-20 md:py-28 px-6 border-t border-neutral-200"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#E10600] mb-3">
              Aide au démarrage · Fiko Connect
            </p>
            <h2
              id="fiko-faq-heading"
              className="text-3xl md:text-5xl font-bold tracking-tight text-[#080808] leading-tight text-balance"
            >
              Questions fréquentes des nouveaux utilisateurs
            </h2>
            <p className="text-base text-neutral-600 mt-4 leading-relaxed">
              Tout ce qu&apos;il faut savoir pour connecter WhatsApp, configurer votre agent et
              lancer votre essai gratuit de 7 jours sans friction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileUpload}
              className="hidden"
              aria-label="Charger un fichier JSON de questions-réponses"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Upload size={14} aria-hidden="true" />
              <span>Charger un JSON</span>
            </button>
            {isCustomSource && (
              <button
                type="button"
                onClick={loadDefaultFaq}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#E10600] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw size={14} aria-hidden="true" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8 pb-6 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search
                size={16}
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une question (ex : QR Code, tarifs, WhatsApp, relances...)"
                aria-label="Rechercher dans la FAQ Fiko Connect"
                className="w-full pl-10 pr-10 py-3 text-sm text-[#080808] bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#E10600] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Effacer la recherche"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {filteredItems.length > 0 && (
              <button
                type="button"
                onClick={handleToggleAll}
                className="px-4 py-3 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {allFilteredOpen ? "Tout replier" : "Tout déplier"}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Filtrer la FAQ par thème"
              className="flex flex-wrap items-center gap-1.5"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-[#080808] text-white"
                        : "bg-neutral-100 text-neutral-600 hover:text-[#080808] hover:bg-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-neutral-500 font-mono tabular-nums">
              <span>{filteredItems.length}</span>
              <span>/{items.length} questions</span>
              <span aria-hidden="true"> · </span>
              <span>Source : {sourceName}</span>
            </div>
          </div>
        </div>

        {loading && (
          <div className="space-y-3" aria-busy="true" aria-label="Chargement des questions">
            {[1, 2, 3, 4].map((skeleton) => (
              <div
                key={skeleton}
                className="h-20 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div
            role="alert"
            className="p-6 rounded-xl border border-red-200 bg-red-50 text-red-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-semibold">Erreur de chargement JSON</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              type="button"
              onClick={loadDefaultFaq}
              className="px-4 py-2 text-xs font-semibold bg-[#E10600] text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Recharger le JSON par défaut
            </button>
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="p-10 text-center rounded-xl border border-neutral-200 bg-neutral-50">
            <p className="text-base font-semibold text-[#080808]">
              Aucune question ne correspond à « {searchQuery} »
            </p>
            <p className="text-sm text-neutral-600 mt-1">
              Essayez un autre mot-clé ou réinitialisez les filtres.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Toutes");
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-[#080808] text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Afficher toutes les questions
            </button>
          </div>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {filteredItems.map((item, idx) => {
              const isOpen = Boolean(openIds[item.id]);
              const panelId = `faq-panel-${item.id}`;
              const triggerId = `faq-trigger-${item.id}`;
              const numberLabel = String(idx + 1).padStart(2, "0");

              return (
                <div key={item.id} className="transition-colors">
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id, item.question)}
                    className="w-full py-6 flex items-start justify-between gap-6 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10600] rounded-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5 font-mono tabular-nums">
                        <span className="text-[#E10600] font-semibold">{numberLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-sans font-medium">{item.category}</span>
                      </div>
                      <span className="block text-lg md:text-xl font-semibold text-[#080808] group-hover:text-[#E10600] transition-colors leading-snug">
                        {item.question}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`mt-2 size-9 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen
                          ? "bg-[#E10600] border-[#E10600] text-white rotate-180"
                          : "bg-neutral-50 border-neutral-200 text-neutral-600 group-hover:border-neutral-300 group-hover:text-[#080808]"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className="pb-6 pr-2 md:pr-14 text-neutral-700 text-sm md:text-base leading-relaxed space-y-4"
                    >
                      <p>{item.answer}</p>
                      {item.steps && item.steps.length > 0 && (
                        <ol className="space-y-2 pt-1 text-sm text-neutral-800">
                          {item.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-3">
                              <span className="font-mono text-xs font-semibold text-[#E10600] mt-0.5 tabular-nums">
                                {sIdx + 1}.
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-10 p-6 md:p-8 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-base font-semibold text-[#080808]">
              Prêt à tester Fiko Connect sur votre WhatsApp ?
            </p>
            <p className="text-sm text-neutral-600 mt-1">
              Démarrez votre essai complet de 7 jours à 0 FCFA ou écrivez à support@krypton-ia.tech.
            </p>
          </div>
          <a
            href={getClientPortalUrl("", "trial")}
            onClick={() => {
              trackEvent("trial_started", { plan: "trial", duration_days: 7 });
              trackEvent("landing_cta_click", {
                cta_label: "Démarrer essai gratuit (FAQ)",
                plan: "trial",
              });
            }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E10600] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Démarrer gratuitement</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FikoFaqSection;
