import { Link } from "react-router-dom";
import { ArrowLeft, Star, Trophy, Gift, Tag, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRewardsClub, TIER_CONFIG, type RewardTier } from "@/hooks/useRewardsClub";
import { toast } from "sonner";

const TIER_ORDER: RewardTier[] = ["bronze", "silver", "gold", "platinum", "diamond"];

export default function RewardsClub() {
  const { member, currentTierConfig, nextTier, pointsToNext, progress, addPoints, useCoupon } = useRewardsClub();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h1 className="font-display text-2xl font-bold text-foreground">Rewards Club</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          Earn points, unlock perks, level up
        </p>
      </div>

      {/* Current Tier Card */}
      <div className={cn(
        "rounded-2xl border-2 p-6 space-y-4",
        currentTierConfig.color
      )}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium opacity-70 uppercase tracking-wider">Your Tier</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl">{currentTierConfig.emoji}</span>
              <h2 className="font-display text-2xl font-bold">{currentTierConfig.name}</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-bold">{member.points.toLocaleString()}</p>
            <p className="text-xs opacity-70">points</p>
          </div>
        </div>

        {/* Progress to next tier */}
        {member.tier !== "diamond" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span>{currentTierConfig.emoji} {currentTierConfig.name}</span>
              <span>{nextTier.emoji} {nextTier.name}</span>
            </div>
            <div className="h-3 rounded-full bg-white/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            <p className="text-xs opacity-70 text-center">
              {pointsToNext.toLocaleString()} points to {nextTier.name}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Spent", value: `$${member.totalSpent.toLocaleString()}` },
            { label: "Streams", value: member.streamsWatched.toString() },
            { label: "Wins", value: member.itemsWon.toString() },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-2 rounded-lg bg-white/30">
              <p className="font-display font-bold text-lg">{stat.value}</p>
              <p className="text-[10px] opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Comparison */}
      <div className="space-y-3">
        <h2 className="font-display font-bold text-foreground">All Tiers</h2>
        <div className="space-y-2">
          {TIER_ORDER.map((tier) => {
            const config = TIER_CONFIG[tier];
            const currentIndex = TIER_ORDER.indexOf(member.tier);
            const tierIndex = TIER_ORDER.indexOf(tier);
            const isUnlocked = tierIndex <= currentIndex;
            const isCurrent = tier === member.tier;

            return (
              <div
                key={tier}
                className={cn(
                  "rounded-xl border p-4 transition-all",
                  isCurrent ? config.color + " border-2" : isUnlocked ? "bg-card border-border/50" : "bg-secondary/30 border-border/20 opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{config.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{config.name}</h3>
                      {isCurrent && <Badge className="text-[9px] bg-primary text-white border-0">Current</Badge>}
                      {!isUnlocked && <Lock className="w-3 h-3 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{config.minPoints.toLocaleString()}+ points</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {config.perks.map((perk) => (
                    <Badge key={perk} variant="secondary" className="text-[10px] font-normal">
                      {perk}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <h2 className="font-display font-bold text-foreground">Achievements</h2>
          <Badge variant="secondary" className="text-[10px]">
            {member.achievements.filter((a) => a.earned).length}/{member.achievements.length}
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {member.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={cn(
                "rounded-lg border p-3 text-center transition-all",
                achievement.earned
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-border/30 bg-secondary/20 opacity-50"
              )}
            >
              <span className="text-2xl block mb-1">{achievement.emoji}</span>
              <p className="text-xs font-semibold">{achievement.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{achievement.description}</p>
              {achievement.earned && (
                <Badge className="text-[9px] bg-yellow-100 text-yellow-700 border-0 mt-1.5">Earned</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coupons */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <h2 className="font-display font-bold text-foreground">Your Coupons</h2>
        </div>
        {member.coupons.filter((c) => !c.used).length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            No active coupons. Keep earning points to unlock rewards!
          </p>
        ) : (
          <div className="space-y-2">
            {member.coupons.filter((c) => !c.used).map((coupon) => (
              <div key={coupon.id} className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-primary/30 bg-primary/5">
                <Gift className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1">
                  <span className="font-mono font-bold text-sm text-primary">{coupon.code}</span>
                  <p className="text-xs text-muted-foreground">
                    {coupon.discount}% off · Min ${coupon.minSpend} · Expires {coupon.expiresAt.toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-7"
                  onClick={() => {
                    useCoupon(coupon.id);
                    toast.success(`Coupon ${coupon.code} applied!`);
                  }}
                >
                  Use
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How to Earn */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
        <h2 className="font-display font-bold text-foreground text-sm">How to Earn Points</h2>
        <div className="space-y-2">
          {[
            { action: "Watch a live stream (per minute)", points: 1, emoji: "📺" },
            { action: "Place a bid", points: 5, emoji: "🔨" },
            { action: "Win an auction", points: 50, emoji: "🏆" },
            { action: "Buy Now purchase", points: 25, emoji: "💎" },
            { action: "Leave a review", points: 10, emoji: "⭐" },
            { action: "Refer a friend", points: 100, emoji: "🤝" },
            { action: "Daily check-in", points: 5, emoji: "📅" },
          ].map((item) => (
            <div key={item.action} className="flex items-center gap-3 text-xs">
              <span className="text-lg">{item.emoji}</span>
              <span className="flex-1 text-foreground">{item.action}</span>
              <Badge variant="secondary" className="text-[10px] font-bold">+{item.points} pts</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Earn Points CTA */}
      <div className="text-center">
        <Button
          className="gradient-primary text-white font-bold gap-2"
          onClick={() => {
            addPoints(50);
            toast.success("+50 points! Daily check-in bonus");
          }}
        >
          <Gift className="w-4 h-4" />
          Claim Daily Bonus (+50 pts)
        </Button>
      </div>
    </div>
  );
}
