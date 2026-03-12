import { useState, useCallback } from "react";

export type RewardTier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

export interface RewardsMember {
  points: number;
  tier: RewardTier;
  totalSpent: number;
  streamsWatched: number;
  itemsWon: number;
  achievements: Achievement[];
  coupons: RewardCoupon[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface RewardCoupon {
  id: string;
  code: string;
  discount: number; // percentage
  minSpend: number;
  expiresAt: Date;
  used: boolean;
}

export const TIER_CONFIG: Record<RewardTier, { name: string; emoji: string; minPoints: number; color: string; perks: string[] }> = {
  bronze: {
    name: "Bronze",
    emoji: "🥉",
    minPoints: 0,
    color: "text-amber-700 bg-amber-50 border-amber-200",
    perks: ["Early access to upcoming streams", "5% off first purchase from new sellers"],
  },
  silver: {
    name: "Silver",
    emoji: "🥈",
    minPoints: 500,
    color: "text-gray-600 bg-gray-50 border-gray-200",
    perks: ["Priority chat in live streams", "Free shipping on orders $50+", "Exclusive giveaway entries"],
  },
  gold: {
    name: "Gold",
    emoji: "🥇",
    minPoints: 2000,
    color: "text-yellow-700 bg-yellow-50 border-yellow-200",
    perks: ["10% bonus on auction wins", "VIP badge in chat", "Monthly mystery box"],
  },
  platinum: {
    name: "Platinum",
    emoji: "💎",
    minPoints: 5000,
    color: "text-blue-700 bg-blue-50 border-blue-200",
    perks: ["Exclusive seller access", "Free returns on all orders", "Personal shopper AI"],
  },
  diamond: {
    name: "Diamond",
    emoji: "👑",
    minPoints: 10000,
    color: "text-purple-700 bg-purple-50 border-purple-200",
    perks: ["Private shopping events", "First dibs on drops", "25% shipping discount always", "Dedicated support"],
  },
};

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "first_bid", title: "First Bid", description: "Place your first bid", emoji: "🔨", earned: true, earnedAt: new Date() },
  { id: "first_win", title: "Winner!", description: "Win your first auction", emoji: "🏆", earned: true, earnedAt: new Date() },
  { id: "watch_10", title: "Stream Fan", description: "Watch 10 live streams", emoji: "📺", earned: true, earnedAt: new Date() },
  { id: "spend_500", title: "Big Spender", description: "Spend $500 total", emoji: "💰", earned: false },
  { id: "streak_7", title: "Weekly Warrior", description: "Watch streams 7 days in a row", emoji: "🔥", earned: false },
  { id: "giveaway_win", title: "Lucky Winner", description: "Win a giveaway", emoji: "🎁", earned: false },
  { id: "follow_10", title: "Social Butterfly", description: "Follow 10 sellers", emoji: "🦋", earned: false },
  { id: "refer_friend", title: "Ambassador", description: "Refer a friend who makes a purchase", emoji: "🤝", earned: true, earnedAt: new Date() },
];

function getTier(points: number): RewardTier {
  if (points >= 10000) return "diamond";
  if (points >= 5000) return "platinum";
  if (points >= 2000) return "gold";
  if (points >= 500) return "silver";
  return "bronze";
}

export function useRewardsClub() {
  const [member, setMember] = useState<RewardsMember>({
    points: 2450,
    tier: "gold",
    totalSpent: 1247,
    streamsWatched: 34,
    itemsWon: 8,
    achievements: DEFAULT_ACHIEVEMENTS,
    coupons: [
      { id: "c1", code: "GOLD10", discount: 10, minSpend: 50, expiresAt: new Date(Date.now() + 30 * 86400000), used: false },
      { id: "c2", code: "KINYAN5", discount: 5, minSpend: 25, expiresAt: new Date(Date.now() + 14 * 86400000), used: false },
    ],
  });

  const addPoints = useCallback((amount: number) => {
    setMember((prev) => {
      const newPoints = prev.points + amount;
      return { ...prev, points: newPoints, tier: getTier(newPoints) };
    });
  }, []);

  const useCoupon = useCallback((couponId: string) => {
    setMember((prev) => ({
      ...prev,
      coupons: prev.coupons.map((c) => c.id === couponId ? { ...c, used: true } : c),
    }));
  }, []);

  const nextTier = TIER_CONFIG[
    member.tier === "diamond" ? "diamond" :
    member.tier === "platinum" ? "diamond" :
    member.tier === "gold" ? "platinum" :
    member.tier === "silver" ? "gold" : "silver"
  ];
  const currentTierConfig = TIER_CONFIG[member.tier];
  const pointsToNext = member.tier === "diamond" ? 0 : nextTier.minPoints - member.points;
  const progress = member.tier === "diamond" ? 100 :
    ((member.points - currentTierConfig.minPoints) / (nextTier.minPoints - currentTierConfig.minPoints)) * 100;

  return { member, addPoints, useCoupon, nextTier, currentTierConfig, pointsToNext, progress };
}
