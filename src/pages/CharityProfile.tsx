import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Heart, MapPin, Users, DollarSign, Shield,
  ChevronRight, Clock, Eye, Share2, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import {
  mockCharities, mockFundraisers, mockAuctionGames,
  type Charity, type Fundraiser
} from "@/data/mockData";

const donationAmounts = [18, 36, 72, 180, 360, 1000];

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(Math.round((raised / goal) * 100), 100);
  return (
    <div className="space-y-1.5">
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full gradient-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="font-bold text-foreground">${raised.toLocaleString()}</span>
        <span className="text-muted-foreground">{pct}% of ${goal.toLocaleString()}</span>
      </div>
    </div>
  );
}

function CampaignCard({ fundraiser }: { fundraiser: Fundraiser }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-sm text-foreground">{fundraiser.title}</h3>
        {fundraiser.isLive && (
          <Badge className="bg-red-600 text-white border-0 live-glow text-xs font-bold gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
            LIVE
          </Badge>
        )}
        {!fundraiser.isLive && fundraiser.scheduledFor && (
          <Badge variant="secondary" className="text-xs gap-1">
            <Clock className="w-3 h-3" />
            {fundraiser.scheduledFor}
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">{fundraiser.description}</p>
      <ProgressBar raised={fundraiser.raisedAmount} goal={fundraiser.goalAmount} />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Users className="w-3 h-3" />
          {fundraiser.donorCount.toLocaleString()} donors
        </span>
        {fundraiser.isLive && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {fundraiser.viewers.toLocaleString()} watching
          </span>
        )}
      </div>
    </div>
  );
}

export default function CharityProfile() {
  const { slug } = useParams<{ slug: string }>();
  const charity = mockCharities.find((c) => c.slug === slug);
  const [donateAmount, setDonateAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [tab, setTab] = useState<"about" | "campaigns" | "games">("about");

  if (!charity) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <Heart className="w-12 h-12 text-muted-foreground mx-auto" />
        <h1 className="font-display text-xl font-bold">Charity not found</h1>
        <Button asChild className="gradient-primary text-white">
          <Link to="/charity">Browse charities</Link>
        </Button>
      </div>
    );
  }

  const charityCampaigns = mockFundraisers.filter((f) => f.charity.id === charity.id);
  const charityGames = mockAuctionGames.filter((g) => g.fundraiser.charity.id === charity.id);

  const handleDonate = () => {
    const amount = donateAmount || (customAmount ? parseFloat(customAmount) : 0);
    if (!amount || amount <= 0) return;
    toast.success(`Thank you for your donation of $${amount}!`, {
      description: `Your tzedakah to ${charity.name} is being processed.`,
    });
    setDonateAmount(null);
    setCustomAmount("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/charity"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Charity Hub
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-xl font-bold text-white shrink-0">
          {charity.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-foreground">{charity.name}</h1>
            {charity.verified && (
              <Badge className="bg-primary/10 text-primary border-0 text-xs gap-0.5">
                <Shield className="w-3 h-3" />
                Verified
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{charity.description}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {charity.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {charity.supporters.toLocaleString()} supporters
            </span>
          </div>
        </div>
      </div>

      {/* Total raised banner */}
      <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Total Raised</p>
          <p className="font-display text-2xl font-bold text-green-700">
            ${charity.totalRaised.toLocaleString()}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: charity.name, url: window.location.href });
            } else {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard!");
            }
          }}
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </Button>
      </div>

      {/* Quick Donate */}
      <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-foreground">Make a Donation</h2>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {donationAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => { setDonateAmount(amount); setCustomAmount(""); }}
              className={cn(
                "py-2.5 rounded-xl text-sm font-bold transition-all",
                donateAmount === amount
                  ? "gradient-primary text-white"
                  : "bg-secondary text-foreground hover:bg-primary/10"
              )}
            >
              ${amount.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setDonateAmount(null); }}
            placeholder="Custom amount"
            min="1"
            className="w-full h-11 pl-8 pr-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <Button
          className="w-full h-12 gradient-primary text-white font-bold"
          disabled={!donateAmount && !customAmount}
          onClick={handleDonate}
        >
          <Heart className="w-4 h-4 mr-2" />
          Donate {donateAmount ? `$${donateAmount}` : customAmount ? `$${customAmount}` : ""}
        </Button>

        <p className="text-[11px] text-muted-foreground text-center">
          Tax-deductible donation. Receipt will be emailed.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-secondary rounded-xl">
        {(["about", "campaigns", "games"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize",
              tab === t
                ? "bg-white shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "games" ? "Games & Auctions" : t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "about" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
            <h3 className="font-display font-bold text-foreground">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{charity.mission}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <p className="font-display text-xl font-bold text-gradient">
                ${(charity.totalRaised / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total Raised</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
              <p className="font-display text-xl font-bold text-gradient">
                {charity.supporters.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Supporters</p>
            </div>
          </div>
        </div>
      )}

      {tab === "campaigns" && (
        <div className="space-y-3">
          {charityCampaigns.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No active campaigns</p>
          ) : (
            charityCampaigns.map((f) => <CampaignCard key={f.id} fundraiser={f} />)
          )}
        </div>
      )}

      {tab === "games" && (
        <div className="space-y-3">
          {charityGames.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No active games or auctions</p>
          ) : (
            charityGames.map((game) => (
              <Link
                key={game.id}
                to={`/charity/game/${game.id}`}
                className="block rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-sm text-foreground">{game.title}</h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">{game.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>${game.ticketPrice}/ticket</span>
                  <span>{game.ticketsSold.toLocaleString()} tickets sold</span>
                  <span>{game.prizes.length} prizes</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
