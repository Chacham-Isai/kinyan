import { Link } from "react-router-dom";
import {
  Heart, ChevronRight, Eye, Users, Clock, Flame, Trophy,
  Gift, Ticket, DollarSign, Star, TrendingUp, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import {
  mockCharities, mockFundraisers, mockAuctionGames,
  type Fundraiser, type AuctionGame, type Charity
} from "@/data/mockData";

const charityCategories = [
  { id: "all", label: "All" },
  { id: "chesed", label: "Chesed" },
  { id: "medical", label: "Medical" },
  { id: "education", label: "Education" },
  { id: "Israel", label: "Eretz Yisroel" },
  { id: "poverty", label: "Food & Poverty" },
];

const gameTypeLabels: Record<string, { label: string; color: string; icon: typeof Trophy }> = {
  "chinese-auction": { label: "Chinese Auction", color: "bg-purple-100 text-purple-700", icon: Trophy },
  raffle: { label: "Raffle", color: "bg-blue-100 text-blue-700", icon: Ticket },
  "spin-wheel": { label: "Spin Wheel", color: "bg-green-100 text-green-700", icon: Sparkles },
  "mystery-box": { label: "Mystery Box", color: "bg-amber-100 text-amber-700", icon: Gift },
};

function FundraiserCard({ fundraiser }: { fundraiser: Fundraiser }) {
  const progress = Math.round((fundraiser.raisedAmount / fundraiser.goalAmount) * 100);
  return (
    <Link
      to={`/charity/${fundraiser.charity.slug}`}
      className="group block rounded-2xl overflow-hidden border border-border/50 bg-card card-lift"
    >
      {/* Header with gradient */}
      <div className="relative h-28 bg-gradient-to-br from-primary/80 to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(185_100%_50%/0.3),transparent_60%)]" />
        {fundraiser.isLive && (
          <Badge className="absolute top-3 left-3 bg-red-600 text-white border-0 live-glow text-xs font-bold px-2 py-0.5 gap-1 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
            LIVE
          </Badge>
        )}
        {!fundraiser.isLive && fundraiser.scheduledFor && (
          <Badge variant="secondary" className="absolute top-3 left-3 text-xs gap-1 bg-white/80 backdrop-blur-sm border-0 z-10">
            <Clock className="w-3 h-3" />
            {fundraiser.scheduledFor}
          </Badge>
        )}
        {fundraiser.isLive && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="secondary" className="text-xs gap-1 bg-white/80 backdrop-blur-sm border-0">
              <Eye className="w-3 h-3" />
              {fundraiser.viewers.toLocaleString()}
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {fundraiser.charity.avatarInitials}
            </div>
            <span className="text-sm font-medium text-white truncate">
              {fundraiser.charity.name}
              {fundraiser.charity.verified && <span className="ml-1">✓</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-display font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {fundraiser.title}
        </h3>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full gradient-primary transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="font-bold text-foreground">${fundraiser.raisedAmount.toLocaleString()}</span>
            <span className="text-muted-foreground">of ${fundraiser.goalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {fundraiser.donorCount.toLocaleString()} donors
          </span>
          <span>{progress}% funded</span>
        </div>
      </div>
    </Link>
  );
}

function AuctionGameCard({ game }: { game: AuctionGame }) {
  const typeInfo = gameTypeLabels[game.type];
  const ticketProgress = Math.round((game.ticketsSold / game.totalTickets) * 100);
  const topPrize = game.prizes.reduce((max, p) => (p.value > max.value ? p : max), game.prizes[0]);

  return (
    <Link
      to={`/charity/game/${game.id}`}
      className="group block rounded-2xl overflow-hidden border border-border/50 bg-card card-lift"
    >
      <div className="p-5 space-y-4">
        {/* Type badge + active indicator */}
        <div className="flex items-center justify-between">
          <Badge className={cn("text-xs font-semibold gap-1 border-0", typeInfo.color)}>
            <typeInfo.icon className="w-3 h-3" />
            {typeInfo.label}
          </Badge>
          {game.isActive && (
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{game.description}</p>
        </div>

        {/* Top prize */}
        <div className="rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 p-3 flex items-center gap-3">
          <span className="text-2xl">{topPrize.emoji}</span>
          <div>
            <p className="text-xs text-muted-foreground">Top Prize</p>
            <p className="text-sm font-bold text-foreground">{topPrize.name}</p>
            <p className="text-xs font-semibold text-amber-600">${topPrize.value.toLocaleString()}</p>
          </div>
        </div>

        {/* Ticket info */}
        <div className="space-y-1.5">
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary/60 transition-all"
              style={{ width: `${ticketProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{game.ticketsSold.toLocaleString()} / {game.totalTickets.toLocaleString()} tickets</span>
            <span className="font-bold text-primary">${game.ticketPrice}/ticket</span>
          </div>
        </div>

        {/* Charity name */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1 border-t border-border/50">
          <Heart className="w-3 h-3 text-primary" />
          {game.fundraiser.charity.name}
        </div>
      </div>
    </Link>
  );
}

function CharityCard({ charity }: { charity: Charity }) {
  return (
    <Link
      to={`/charity/${charity.slug}`}
      className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card card-lift"
    >
      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
        {charity.avatarInitials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
            {charity.name}
          </h3>
          {charity.verified && <span className="text-primary text-xs">✓</span>}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{charity.description}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span>${(charity.totalRaised / 1000000).toFixed(1)}M raised</span>
          <span>{charity.supporters.toLocaleString()} supporters</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </Link>
  );
}

export default function CharityHub() {
  const [category, setCategory] = useState("all");

  const filteredCharities = category === "all"
    ? mockCharities
    : mockCharities.filter((c) => c.category === category);

  const liveFundraisers = mockFundraisers.filter((f) => f.isLive);
  const upcomingFundraisers = mockFundraisers.filter((f) => !f.isLive);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-primary to-blue-700 p-6 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(38_92%_50%/0.2),transparent_60%)]" />
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-6 h-6 text-white" />
            <Badge className="bg-white/20 text-white border-0 text-xs">KINYAN Gives</Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Give. Play. Win.<br />
            <span className="text-white/80">Change Lives.</span>
          </h1>
          <p className="text-white/70 mt-3 text-sm md:text-base">
            Support community charities through live fundraisers, raffles, spin wheels, and auction games.
            Every ticket changes a life.
          </p>
          <div className="flex gap-3 mt-5">
            <Button
              className="bg-white text-primary hover:bg-white/90 font-bold"
              onClick={() => document.getElementById("auction-games")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Gift className="w-4 h-4 mr-1.5" />
              Browse Games
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => toast.info("Fundraising applications coming soon!", { description: "Contact us at fundraising@kinyan.com to get started." })}
            >
              Start Fundraising
            </Button>
          </div>
        </div>
      </div>

      {/* Live Fundraisers */}
      {liveFundraisers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <h2 className="font-display font-bold text-lg text-foreground">Live Fundraisers</h2>
              <Badge className="bg-red-100 text-red-700 border-0 text-xs">{liveFundraisers.length} live</Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveFundraisers.map((f) => (
              <FundraiserCard key={f.id} fundraiser={f} />
            ))}
          </div>
        </section>
      )}

      {/* Auction Games */}
      <section>
        <div id="auction-games" className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Auction Games</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAuctionGames.map((game) => (
            <AuctionGameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Upcoming Fundraisers */}
      {upcomingFundraisers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-lg text-foreground">Coming Up</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingFundraisers.map((f) => (
              <FundraiserCard key={f.id} fundraiser={f} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Charities */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Featured Charities</h2>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-4">
          {charityCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                category === cat.id
                  ? "gradient-primary text-white"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredCharities.map((charity) => (
            <CharityCard key={charity.id} charity={charity} />
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="rounded-2xl gradient-brand p-8">
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-white">Community Impact</h2>
          <p className="text-white/70 text-sm mt-1">Together, KINYAN users have made a difference</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "$31M+", label: "Total Raised" },
            { value: "178K+", label: "Supporters" },
            { value: "500+", label: "Charities" },
            { value: "1,200+", label: "Fundraisers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
