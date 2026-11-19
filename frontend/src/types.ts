export enum Page {
  HOME = "HOME",
  FIKO = "FIKO",
  VIVA_LEADS = "VIVA_LEADS",
  AGENTS = "AGENTS",
  PRICING = "PRICING",
  VOICE = "VOICE",
  CRM = "CRM",
  SCRAPER = "SCRAPER",
  TRUST = "TRUST",
  SEO = "SEO",
  WHITEPAPER = "WHITEPAPER",
  AUTH = "AUTH",
  SIGNUP = "SIGNUP",
  PROFILE = "PROFILE",
  ADMIN_AUTH = "ADMIN_AUTH",
  CLIENT_DASHBOARD = "CLIENT_DASHBOARD",
  ADMIN_DASHBOARD = "ADMIN_DASHBOARD",
  FIKO_AUDIT = "FIKO_AUDIT",
  FIKO_CONNECT = "FIKO_CONNECT",
  BILLING = "BILLING",
  PAYMENT = "PAYMENT",
  ACCESS_OFFER = "ACCESS_OFFER",
  TERRA_OFFER = "TERRA_OFFER",
  MARS_OFFER = "MARS_OFFER",
  KRYPTON_OFFER = "KRYPTON_OFFER",
  GALAXY_OFFER = "GALAXY_OFFER",
  FIKO_SOLO_OFFER = "FIKO_SOLO_OFFER",
  FIKO_PILOT_OFFER = "FIKO_PILOT_OFFER",
  FIKO_ELITE_OFFER = "FIKO_ELITE_OFFER",
  FIKO_EMPIRE_OFFER = "FIKO_EMPIRE_OFFER",
  CATEGORY = "CATEGORY",
  BLOG = "BLOG",
  PILLAR_SITE_WEB = "PILLAR_SITE_WEB",
  PILLAR_AGENTS_IA = "PILLAR_AGENTS_IA",
  PILLAR_ACQUISITION = "PILLAR_ACQUISITION",
  PRIVACY = "PRIVACY",
  DATA_DELETION = "DATA_DELETION",
  TERMS = "TERMS",
  AUTH_CALLBACK = "AUTH_CALLBACK",
  AMBASSADEURS = "AMBASSADEURS",
  ASSISTANCE = "ASSISTANCE",
  ASSISTANCE_TOPIC = "ASSISTANCE_TOPIC",
  ABOUT = "ABOUT",
  PORTAL_ACTIVATION = "PORTAL_ACTIVATION",
  FIKO_SEND = "FIKO_SEND",
  EGERIE = "EGERIE",
  GROWTH = "GROWTH",
  CONTENT_CALENDAR = "CONTENT_CALENDAR",
}

export enum UserRole {
  CLIENT = "client",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export interface UserProfile {
  id?: string;
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  phone?: string;
  company?: string;
  objective?: string;
  businessType?: string;
  revenueLevel?: string;
  budget?: string;
  urgency?: string;
  selectedPlan?: string;
  recommendedPlanId?: string;
  status?: string;
  onboardingCompleted?: boolean;
  onboardingStep?: number;
  subscription?: UserSubscription;
  createdAt?: any;
  updatedAt?: any;
}

export interface Agent {
  id: string;
  name: string;
  sector: string;
  category: string;
  description: string;
  status: "active" | "standby" | "deploying";
  image: string;
}

export interface StrategicBrief {
  solutionName: string;
  sector: string;
  description: string;
  challenges: string[];
  recommendedAgents: string[];
}

export interface ProspectInfo {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  objective?: string;
  visitorId?: string;
  lastSeen?: string;
}

export interface MagicLinkContext {
  prospect: ProspectInfo;
  gate?: string;
  timestamp: string;
}

export interface TrustedDevice {
  email: string;
  visitorId: string;
  firstSeen: string;
  lastSeen: string;
  userAgent: string;
}

export interface FollowUpRecord {
  id: string;
  targetId: string;
  targetName: string;
  channel: "email" | "whatsapp" | "sms" | "voice";
  scenario: string;
  tone: string;
  message: string;
  sentAt: string;
  status: "sent" | "pending" | "failed";
  type: "manual" | "auto";
}

export enum BuyingWindow {
  NOW = "NOW",
  H24 = "H24",
  H72 = "H72",
  LATER = "LATER",
}

export enum LTVClass {
  PLATINUM = "PLATINUM",
  GOLD = "GOLD",
  SILVER = "SILVER",
  STANDARD = "STANDARD",
}

export interface Lead {
  id: string;
  entity: string;
  email: string;
  category: string;
  priorityScore?: number;
  status: "hot" | "warm" | "cold" | string;
  buyingMoment?: BuyingWindow;
  ltvClass?: LTVClass;
  intelligence?: {
    decisionId: string;
    actionTaken: string;
    confidence: number;
    topTriggers: Array<{ feature: string; impact: number }>;
    timestamp: string;
  };
}

export interface FikoLead {
  id: string;
  userId?: string;
  email: string;
  source: string;
  score: number;
  velocity?: number;
  status?: string;
  qualification: "hot" | "warm" | "cold" | string;
  recommendedOffer?: string;
  createdAt?: any;
}

export type OpportunityType =
  | "upgrade"
  | "activation_agents"
  | "conversion_optimization"
  | string;

export interface Opportunity {
  id: string;
  userId: string;
  type: OpportunityType;
  title?: string;
  description?: string;
  value: number;
  impact: number;
  status: "open" | "clicked" | "converted" | string;
  createdAt?: any;
}

export type ClientStatus =
  | "active"
  | "blocked"
  | "maintenance_required"
  | "risk";

export type PlanType =
  | "ACCESS"
  | "FIKO"
  | "AGENT_IA"
  | "VOICE_TERRA"
  | "VOICE_MARS"
  | "VOICE_KRYPTON";

export interface KryptonClient {
  client_id: string;
  name: string;
  email: string;
  plan_type: PlanType;
  activation_date: string;
  maintenance_start_date: string;
  maintenance_active: boolean;
  voice_minutes_used: number;
  voice_minutes_limit: number;
  status: ClientStatus;
  marge_brute: number;
}

export interface UserSubscription {
  plan: string;
  leadsUsed: number;
  leadsLimit: number;
  campaignsCount: number;
  emailCredits: number;
}

export interface InfrastructureHealth {
  proxies: { available: number; total: number; status: string };
  apis: { google_places: number; linkedin: number; scrapingbee: number };
  latency: number;
}

export interface VivaCampaign {
  id: string;
  name: string;
  status: "active" | "completed" | "paused" | string;
  progress: number;
  leadsFound: number;
  target: { industry: string; location: string };
}

export interface VivaLead {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;
  score: number;
  source: string;
  isMasked: boolean;
}

export interface CountryConfig {
  id: string;
  name: string;
  code: string;
  flag: string;
  rate: number;
}

export interface PaymentOption {
  installments: 1 | 2 | 3 | 4;
  total: number;
  monthlyAmount: number;
  extraCost: number;
  label: string;
  isRecommended?: boolean;
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userEmail?: string;
  offer?: string;
  plan?: string;
  amount: number;
  currency?: string;
  installments?: number;
  method: string;
  status: "pending" | "paid" | "succeeded" | "failed" | string;
  createdAt?: any;
}

export interface Topic {
  id: string;
  topic: string;
  pillar: boolean;
  keywords: string[];
  clusters: string[];
}

export interface TopicCoverage {
  coverage: number;
  missing: string[];
  score: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  keywords: string[];
  cluster: string;
  content: string;
}

export interface BacklinkTask {
  id: string;
  platform: string;
  targetUrl: string;
  status: "pending" | "published" | "scheduled" | string;
  variantTitle: string;
  createdAt: string;
}

export interface AttributionTouchpoint {
  source: string;
  medium: string;
  campaign: string;
  landingPage: string;
  fikoEngaged: boolean;
  diagnosisCompleted: boolean;
  recommendedOffer: string;
  convertedPlan: string;
  revenueFCFA: number;
  timestamp: string;
}

export interface AIVisibilityReport {
  overallVisibilityScore: number;
  brandCitationRate: number;
  answerEnginePresence: Array<{
    engine: string;
    status: "leading" | "cited" | "absent" | string;
    shareOfVoice: number;
  }>;
  strategicEntities: Array<{
    entity: string;
    associationStrength: number;
  }>;
  topGroundingQueries: string[];
  competitorComparison: Array<{
    name: string;
    visibilityScore: number;
  }>;
}

export interface OmniContentBundle {
  sourceTopic: string;
  cluster: string;
  targetKeyword: string;
  article: {
    title: string;
    metaDescription: string;
    outline: string[];
    readTime: string;
  };
  linkedinPost: string;
  facebookPost: string;
  instagramCaption: string;
  xThread: string[];
  newsletter: {
    subject: string;
    previewText: string;
    body: string;
  };
  faq: Array<{ question: string; answer: string }>;
  shortVideoScript: {
    hook: string;
    body: string;
    cta: string;
    estimatedDurationSeconds: number;
  };
  fikoCtaTrigger: string;
}

export type ContentStatus = "DRAFT" | "APPROVED" | "SCHEDULED" | "PUBLISHED";

export interface ContentCalendarItem {
  id: string;
  title: string;
  subject: string;
  cluster: string;
  channel: string;
  status: ContentStatus;
  author: string;
  scheduledDate: string;
  approvedByHuman: boolean;
  performanceViews: number;
  performanceLeads: number;
  primaryKeyword: string;
  intent: string;
}

export type FikoStrategicModeType =
  | "expansion"
  | "conversion"
  | "authority"
  | "automation"
  | "domination";

export type FikoDecisionType =
  | "micro_recommendation"
  | "strategic_alert"
  | "proactive_decision"
  | "autonomous_preparation";

export type FikoDecisionPriority =
  | "urgent"
  | "important"
  | "optimization"
  | "future";

export interface FikoDecision {
  id: string;
  userId: string;
  type: FikoDecisionType;
  priority: FikoDecisionPriority;
  confidence: number;
  recommendation: string;
  impact: string;
  urgency: string;
  status: "pending" | "actioned" | "dismissed" | string;
  createdAt: Date;
}

export interface FikoMarketPulse {
  id: string;
  userId: string;
  signalType: string;
  marketTrend: "rising" | "falling" | "stable" | string;
  confidence: number;
  impact: string;
  urgency: string;
  recommendedMode: FikoStrategicModeType | string;
  createdAt: Date;
}

export interface FikoLearningEvent {
  id: string;
  userId: string;
  sourceType: string;
  sourceId: string;
  predictionValue: number;
  actualValue: number;
  accuracyScore: number;
  strategyAdjustment: string;
  createdAt: Date;
}

export interface FikoRelationship {
  id: string;
  userId: string;
  relationshipLevel: string;
  communicationStyle: string;
  trustScore: number;
  dominantBehaviors: string[];
  strategicPreferences: string[];
  favoriteModes: string[];
  interactionHistory: Record<string, any>;
  synchronizationLevel: number;
  updatedAt: Date;
}

export interface FikoAutonomousOperation {
  id: string;
  userId: string;
  operationType: string;
  operationStatus: string;
  confidenceScore: number;
  businessImpact: string;
  executionMode: string;
  systemsAffected: string[];
  triggeredBy: string;
  createdAt: Date;
}

export interface FikoEconomicForecast {
  id: string;
  userId: string;
  forecastType: string;
  confidenceScore: number;
  projectedGrowth: number;
  economicRisk: string;
  opportunityLevel: string;
  strategicRecommendation: string;
  marketSignals: Record<string, any>;
  generatedAt: Date;
  forecastWindow: string;
  status: string;
}

export interface FikoBehaviorPrediction {
  id: string;
  userId: string;
  predictionType: string;
  confidenceScore: number;
  impactLevel: string;
  urgencyLevel: string;
  predictionMessage: string;
  recommendedAction: string;
  status: string;
  createdAt: Date;
}

export interface FikoImpactSimulation {
  id: string;
  userId: string;
  simulationType: string;
  projectedImpact: number;
  confidence: number;
  riskLevel: string;
  strategicMode: FikoStrategicModeType;
  generatedAt: Date;
  marketFactors: Record<string, any>;
}

export interface FikoOrchestration {
  id: string;
  userId: string;
  orchestrationType: string;
  systemsAffected: string[];
  confidence: number;
  impact: string;
  status: string;
  strategicMode: FikoStrategicModeType;
  results: Record<string, any>;
  executedAt: Date;
}
