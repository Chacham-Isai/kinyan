/**
 * AI-powered recommendation engine for KINYAN marketplace.
 *
 * Tracks user behavior (views, searches, likes, purchases) and uses
 * collaborative filtering + content-based scoring to surface relevant
 * products, sellers, streams, and charity campaigns.
 *
 * In production this would be backed by a real ML pipeline. This local
 * version runs lightweight scoring in the browser to demonstrate the UX.
 */

import type { Product, Seller, LiveStream, Fundraiser } from "@/data/mockData";

// ---- User behavior events ----

export type EventType =
  | "view_product"
  | "like_product"
  | "add_to_cart"
  | "purchase"
  | "view_seller"
  | "follow_seller"
  | "view_stream"
  | "search"
  | "view_category"
  | "donate";

export interface UserEvent {
  type: EventType;
  itemId: string;
  category?: string;
  timestamp: number;
  metadata?: Record<string, string>;
}

// ---- Preference profile derived from events ----

export interface UserProfile {
  categoryAffinities: Record<string, number>; // category -> score 0-1
  sellerAffinities: Record<string, number>;   // sellerId -> score 0-1
  priceRange: { min: number; max: number };
  recentSearches: string[];
  viewedProducts: string[];
  likedProducts: string[];
  interests: string[]; // inferred tags
}

const STORAGE_KEY = "kinyan_user_events";
const PROFILE_KEY = "kinyan_user_profile";

// ---- Event tracking ----

function getEvents(): UserEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function trackEvent(event: Omit<UserEvent, "timestamp">) {
  const events = getEvents();
  events.push({ ...event, timestamp: Date.now() });
  // Keep last 500 events
  const trimmed = events.slice(-500);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

// ---- Profile building ----

export function buildProfile(events: UserEvent[]): UserProfile {
  const categoryScores: Record<string, number> = {};
  const sellerScores: Record<string, number> = {};
  const prices: number[] = [];
  const searches: string[] = [];
  const viewed: string[] = [];
  const liked: string[] = [];
  const tagCounts: Record<string, number> = {};

  // Weight recent events higher (exponential decay)
  const now = Date.now();
  const decay = (ts: number) => Math.exp(-(now - ts) / (7 * 24 * 60 * 60 * 1000)); // 7-day half-life

  const eventWeights: Record<EventType, number> = {
    view_product: 1,
    like_product: 3,
    add_to_cart: 5,
    purchase: 10,
    view_seller: 1,
    follow_seller: 4,
    view_stream: 2,
    search: 2,
    view_category: 1.5,
    donate: 3,
  };

  for (const event of events) {
    const weight = eventWeights[event.type] * decay(event.timestamp);

    if (event.category) {
      categoryScores[event.category] = (categoryScores[event.category] || 0) + weight;
    }

    if (event.type === "view_seller" || event.type === "follow_seller") {
      sellerScores[event.itemId] = (sellerScores[event.itemId] || 0) + weight;
    }

    if (event.type === "search" && event.metadata?.query) {
      searches.push(event.metadata.query);
    }

    if (event.type === "view_product") {
      viewed.push(event.itemId);
    }

    if (event.type === "like_product") {
      liked.push(event.itemId);
    }

    if (event.metadata?.price) {
      prices.push(parseFloat(event.metadata.price));
    }

    if (event.metadata?.tags) {
      for (const tag of event.metadata.tags.split(",")) {
        tagCounts[tag.trim()] = (tagCounts[tag.trim()] || 0) + weight;
      }
    }
  }

  // Normalize scores to 0-1
  const normalize = (scores: Record<string, number>) => {
    const max = Math.max(...Object.values(scores), 1);
    return Object.fromEntries(
      Object.entries(scores).map(([k, v]) => [k, v / max])
    );
  };

  // Top interests by tag weight
  const interests = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  return {
    categoryAffinities: normalize(categoryScores),
    sellerAffinities: normalize(sellerScores),
    priceRange: {
      min: prices.length ? Math.min(...prices) * 0.5 : 0,
      max: prices.length ? Math.max(...prices) * 1.5 : 10000,
    },
    recentSearches: [...new Set(searches.reverse())].slice(0, 10),
    viewedProducts: [...new Set(viewed.reverse())].slice(0, 50),
    likedProducts: [...new Set(liked)],
    interests,
  };
}

export function getUserProfile(): UserProfile {
  const events = getEvents();
  if (events.length === 0) {
    // Return default profile for new users
    return {
      categoryAffinities: {},
      sellerAffinities: {},
      priceRange: { min: 0, max: 10000 },
      recentSearches: [],
      viewedProducts: [],
      likedProducts: [],
      interests: [],
    };
  }
  return buildProfile(events);
}

// ---- Scoring & recommendations ----

export function scoreProduct(product: Product, profile: UserProfile): number {
  let score = 0;

  // Category affinity (0-40 pts)
  score += (profile.categoryAffinities[product.category] || 0) * 40;

  // Seller affinity (0-20 pts)
  score += (profile.sellerAffinities[product.seller.id] || 0) * 20;

  // Price in range (0-15 pts)
  if (product.price >= profile.priceRange.min && product.price <= profile.priceRange.max) {
    score += 15;
  }

  // Has discount (0-5 pts)
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    score += 5;
  }

  // Tag overlap (0-15 pts)
  const tagOverlap = product.tags.filter((t) => profile.interests.includes(t)).length;
  score += Math.min(tagOverlap * 5, 15);

  // Popularity boost (0-5 pts)
  score += Math.min(product.likes / 100, 5);

  // Penalty for already viewed (reduce by 30%)
  if (profile.viewedProducts.includes(product.id)) {
    score *= 0.7;
  }

  return score;
}

export function getRecommendedProducts(products: Product[], profile: UserProfile, limit = 12): Product[] {
  return [...products]
    .map((p) => ({ product: p, score: scoreProduct(p, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product);
}

export function getRecommendedSellers(sellers: Seller[], profile: UserProfile, limit = 6): Seller[] {
  return [...sellers]
    .sort((a, b) => {
      const scoreA = (profile.sellerAffinities[a.id] || 0) + a.rating * 0.1 + (a.verified ? 0.2 : 0);
      const scoreB = (profile.sellerAffinities[b.id] || 0) + b.rating * 0.1 + (b.verified ? 0.2 : 0);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function getRecommendedStreams(streams: LiveStream[], profile: UserProfile, limit = 6): LiveStream[] {
  return [...streams]
    .sort((a, b) => {
      const scoreA =
        (profile.categoryAffinities[a.category] || 0) * 10 +
        (profile.sellerAffinities[a.seller.id] || 0) * 5 +
        (a.isLive ? 20 : 0) +
        a.viewers * 0.01;
      const scoreB =
        (profile.categoryAffinities[b.category] || 0) * 10 +
        (profile.sellerAffinities[b.seller.id] || 0) * 5 +
        (b.isLive ? 20 : 0) +
        b.viewers * 0.01;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

// ---- Smart search suggestions ----

export function getSearchSuggestions(
  query: string,
  products: Product[],
  sellers: Seller[],
  profile: UserProfile
): { products: Product[]; sellers: Seller[]; suggestions: string[] } {
  const q = query.toLowerCase().trim();
  if (!q) {
    // Return recent searches and trending
    return {
      products: [],
      sellers: [],
      suggestions: profile.recentSearches.slice(0, 5),
    };
  }

  const matchedProducts = products
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.category.includes(q)
    )
    .slice(0, 4);

  const matchedSellers = sellers
    .filter(
      (s) =>
        s.displayName.toLowerCase().includes(q) ||
        s.username.includes(q)
    )
    .slice(0, 2);

  // Auto-complete suggestions
  const allTerms = [
    ...products.flatMap((p) => [p.title, ...p.tags, p.category, p.subcategory]),
    ...sellers.map((s) => s.displayName),
  ];
  const suggestions = [...new Set(
    allTerms.filter((t) => t.toLowerCase().includes(q)).map((t) => t.toLowerCase())
  )].slice(0, 5);

  return { products: matchedProducts, sellers: matchedSellers, suggestions };
}

// ---- User preference categories for onboarding ----

export const interestCategories = [
  { id: "seforim", label: "Seforim & Books", emoji: "📚" },
  { id: "judaica", label: "Judaica & Silver", emoji: "✡" },
  { id: "fashion", label: "Fashion & Hats", emoji: "👔" },
  { id: "electronics", label: "Electronics & Tech", emoji: "📱" },
  { id: "home", label: "Home & Kitchen", emoji: "🏠" },
  { id: "simcha", label: "Simcha Supplies", emoji: "🎉" },
  { id: "kids", label: "Kids & Toys", emoji: "🧸" },
  { id: "food", label: "Food & Groceries", emoji: "🍕" },
];

export function saveOnboardingPreferences(categoryIds: string[]) {
  // Seed the event log with category preferences
  for (const id of categoryIds) {
    trackEvent({ type: "view_category", itemId: id, category: id });
    trackEvent({ type: "view_category", itemId: id, category: id });
    trackEvent({ type: "view_category", itemId: id, category: id });
  }
}
