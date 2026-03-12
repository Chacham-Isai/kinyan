import { Link } from "react-router-dom";
import { ChevronRight, Flame, Clock, TrendingUp, Zap, Heart, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LiveStreamCard from "@/components/marketplace/LiveStreamCard";
import ProductCard from "@/components/marketplace/ProductCard";
import CategoryGrid from "@/components/marketplace/CategoryGrid";
import SellerCard from "@/components/marketplace/SellerCard";
import KinyanLogo from "@/components/marketplace/KinyanLogo";
import { mockLiveStreams, mockUpcomingStreams, mockProducts, mockSellers, mockFundraisers, mockAuctionGames } from "@/data/mockData";
import { getUserProfile, getRecommendedProducts, getRecommendedSellers, getRecommendedStreams } from "@/lib/recommendations";
import { useMemo } from "react";

function SectionHeader({
  title,
  icon: Icon,
  linkTo,
  linkText = "See all",
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  linkTo: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="font-display font-bold text-lg text-foreground">{title}</h2>
      </div>
      <Link
        to={linkTo}
        className="flex items-center gap-0.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
      >
        {linkText}
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function Home() {
  const profile = useMemo(() => getUserProfile(), []);
  const forYouProducts = useMemo(() => getRecommendedProducts(mockProducts, profile, 6), [profile]);
  const forYouSellers = useMemo(() => getRecommendedSellers(mockSellers, profile, 3), [profile]);
  const forYouStreams = useMemo(() => getRecommendedStreams(mockLiveStreams, profile, 3), [profile]);
  const hasPersonalization = profile.viewedProducts.length > 0 || profile.interests.length > 0 || Object.keys(profile.categoryAffinities).length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden gradient-brand p-6 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(185_100%_50%/0.3),transparent_60%)]" />
        <div className="relative z-10 max-w-lg">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Your Community.<br />
            <span className="text-white/80">Your Marketplace.</span>
          </h1>
          <p className="text-white/70 mt-3 text-sm md:text-base">
            Bid, buy, and sell live. Seforim, Judaica, fashion, tech — from sellers you trust.
          </p>
          <div className="flex gap-3 mt-5">
            <Button
              asChild
              className="bg-white text-blue-700 hover:bg-white/90 font-bold"
            >
              <Link to="/live">
                <Zap className="w-4 h-4 mr-1.5" />
                Watch Live
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link to="/browse">Browse All</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section>
        <SectionHeader title="Categories" icon={TrendingUp} linkTo="/browse" />
        <CategoryGrid compact />
      </section>

      {/* For You - AI Personalized */}
      {hasPersonalization && (
        <section>
          <SectionHeader title="For You" icon={Sparkles} linkTo="/browse" linkText="See more" />
          <div className="rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-cyan-500/5 border border-primary/10 p-4 mb-2">
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Personalized picks based on your activity
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {forYouProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          {forYouSellers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {forYouSellers.map((seller) => (
                <SellerCard key={seller.id} seller={seller} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Live Now */}
      <section>
        <SectionHeader title="Live Now" icon={Flame} linkTo="/live" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLiveStreams.slice(0, 6).map((stream) => (
            <LiveStreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>

      {/* Upcoming Streams */}
      <section>
        <SectionHeader title="Coming Up" icon={Clock} linkTo="/live" linkText="View schedule" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUpcomingStreams.map((stream) => (
            <LiveStreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <SectionHeader title="Trending" icon={TrendingUp} linkTo="/browse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Sellers */}
      <section>
        <SectionHeader title="Top Sellers" icon={Flame} linkTo="/browse" linkText="See all sellers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockSellers.slice(0, 6).map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      </section>

      {/* Drops — Scheduled Events */}
      <section>
        <SectionHeader title="Upcoming Drops" icon={Zap} linkTo="/drops" linkText="See all drops" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { emoji: "🎭", title: "Purim Costume Blowout", time: "1 hr", type: "Flash Sale", interested: "1.8K" },
            { emoji: "📜", title: "Rare Seforim — Private Collection", time: "2 hrs", type: "Exclusive", interested: "342" },
            { emoji: "🎩", title: "Borsalino Auction Night", time: "8 hrs", type: "Auction", interested: "2.1K" },
          ].map((drop) => (
            <Link
              key={drop.title}
              to="/drops"
              className="rounded-xl border border-border/50 bg-card p-4 hover:border-primary/30 transition-all hover:shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{drop.emoji}</span>
                <div className="flex-1 min-w-0">
                  <Badge className="text-[9px] bg-primary/10 text-primary border-0 mb-1">{drop.type}</Badge>
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {drop.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Starts in {drop.time} · {drop.interested} interested
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Charity & Fundraisers */}
      <section>
        <SectionHeader title="KINYAN Gives" icon={Heart} linkTo="/charity" linkText="See all" />
        <div className="rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-primary" />
            <div>
              <p className="font-display font-bold text-foreground text-sm">Support Community Charities</p>
              <p className="text-xs text-muted-foreground">Live fundraisers, raffles, spin wheels & auctions</p>
            </div>
            <Button asChild size="sm" className="ml-auto gradient-primary text-white font-semibold">
              <Link to="/charity">Explore</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {mockAuctionGames.slice(0, 4).map((game) => (
              <Link
                key={game.id}
                to={`/charity/game/${game.id}`}
                className="rounded-xl bg-white border border-border/50 p-3 hover:border-primary/30 transition-colors"
              >
                <Badge className="text-[10px] bg-primary/10 text-primary border-0 mb-1.5">
                  {game.type === "chinese-auction" ? "Auction" : game.type === "spin-wheel" ? "Spin" : game.type === "mystery-box" ? "Mystery" : "Raffle"}
                </Badge>
                <p className="text-xs font-medium text-foreground line-clamp-2">{game.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">${game.ticketPrice}/ticket</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 pt-8 pb-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <KinyanLogo size={28} showText showTagline textClassName="text-base" />
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/help" className="hover:text-foreground transition-colors">Help</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} KINYAN. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
