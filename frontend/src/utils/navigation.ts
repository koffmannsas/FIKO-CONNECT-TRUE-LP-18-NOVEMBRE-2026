import { auth } from "../firebase";

/**
 * Official Fiko Connect SaaS Portal domain
 */
export const CLIENT_PORTAL_URL = "https://clients.fiko-connect.com";

/**
 * Canonical plan keys mapping to the official client portal
 */
export const PLAN_KEY_MAPPING: Record<string, string> = {
  trial: "trial",
  starter: "starter",
  growth: "business",
  business: "business",
  pro: "scale",
  scale: "scale",
  elite: "elite",
};

/**
 * Centralized Client Portal URL generator.
 * Systematically targets the official domain: https://clients.fiko-connect.com
 * Handles optional path routes (/register, /login, /dashboard) and query parameters (plan, etc.).
 */
export const getClientPortalUrl = (
  path: string = "",
  plan?: string,
  extraParams?: Record<string, string | number | boolean>
): string => {
  const cleanPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  const url = new URL(`${CLIENT_PORTAL_URL}${cleanPath}`);

  if (plan) {
    const canonicalKey = PLAN_KEY_MAPPING[plan.toLowerCase()] || plan.toLowerCase();
    url.searchParams.set("plan", canonicalKey);
  }

  if (extraParams) {
    Object.entries(extraParams).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        url.searchParams.set(k, String(v));
      }
    });
  }

  return url.toString();
};

/**
 * Smart SaaS URL generator (kept for backward compatibility, delegates to getClientPortalUrl).
 * Always resolves to the official SaaS portal https://clients.fiko-connect.com.
 */
export const getSaaSUrl = (path: string, plan?: string): string => {
  return getClientPortalUrl(path, plan);
};

export type ConversionEventName =
  | "hero_view"
  | "hero_cta_click"
  | "fiko_open"
  | "fiko_message"
  | "diagnostic_start"
  | "diagnostic_complete"
  | "recommendation_view"
  | "product_view"
  | "pricing_view"
  | "pricing_cta"
  | "signup_start"
  | "signup_complete"
  | "contact_start"
  | "contact_complete"
  | "landing_cta_click";

/**
 * Track events to Google Analytics, Firebase Analytics, and internal event journal
 */
export const trackEvent = (eventName: ConversionEventName | string, params?: Record<string, any>) => {
  const timestamp = new Date().toISOString();
  console.log(`[V3.1 ANALYTICS][${eventName}]`, { timestamp, ...params });

  // Store recent conversion events in session storage for funnel attribution
  try {
    const rawEvents = sessionStorage.getItem("krypton_funnel_events");
    const events = rawEvents ? JSON.parse(rawEvents) : [];
    events.push({ event: eventName, timestamp, params });
    if (events.length > 50) events.shift();
    sessionStorage.setItem("krypton_funnel_events", JSON.stringify(events));
  } catch (e) {
    // Session storage fallback
  }

  // Send to Google Analytics (gtag) if loaded
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, params);
  }

  // Send to other tracking listeners
  if (typeof (window as any).dataLayer !== "undefined") {
    (window as any).dataLayer.push({
      event: eventName,
      ...params,
    });
  }
};

/**
 * Safe navigation helper that checks auth state to direct users
 * either to Dashboard or Login, following SaaS logic.
 */
export const handleSmartRedirect = (
  isLoggedIn: boolean,
  actionLabel: string,
  plan?: string
) => {
  trackEvent("landing_cta_click", {
    cta_label: actionLabel,
    plan: plan || "none",
    is_logged_in: isLoggedIn,
  });

  const targetPath = isLoggedIn ? "/dashboard" : "/login";
  window.location.href = getSaaSUrl(targetPath, plan);
};
