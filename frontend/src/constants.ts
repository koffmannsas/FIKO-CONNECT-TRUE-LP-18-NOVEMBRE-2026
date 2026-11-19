import { Page } from "./types";

export interface NavLinkItem {
  id: Page;
  label: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: Page.HOME, label: "Accueil" },
  { id: Page.AGENTS, label: "Nos agents" },
  { id: Page.PRICING, label: "Tarifs" },
];

export interface SeoCluster {
  title: string;
  keywords: string[];
}

export const SEO_CLUSTERS: SeoCluster[] = [];

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
