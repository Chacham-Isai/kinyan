import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Users, ShoppingBag, CheckCircle2, MapPin, Calendar, Radio, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/marketplace/ProductCard";
import LiveStreamCard from "@/components/marketplace/LiveStreamCard";
import SellerBadge, { getSellerTier, SellerVerificationBanner } from "@/components/marketplace/SellerBadge";
import ShareSheet from "@/components/marketplace/ShareSheet";
import { mockSellers, mockProducts, mockLiveStreams } from "@/data/mockData";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/recommendations";
import { toast } from "sonner";

export default function SellerProfile() {
  const { username } = useParams();
  const [tab, setTab] = useState<"listings" | "live" | "reviews">("listings");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const seller = mockSellers.find((s) => s.username === username) || mockSellers[0];

  // Track seller view
  useEffect(() => {
    trackEvent({ type: "view_seller", itemId: seller.id });
  }, [seller.id]);
  const sellerProducts = mockProducts.filter((p) => p.seller.id === seller.id);
  const sellerStreams = mockLiveStreams.filter((s) => s.seller.id === seller.id);

  const tabs = [
    { id: "listings" as const, label: "Listings", count: sellerProducts.length },
    { id: "live" as const, label: "Live & Upcoming", count: sellerStreams.length },
    { id: "reviews" as const, label: "Reviews", count: 47 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Profile Header */}
      <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
        {/* Banner */}
        <div className="h-24 md:h-32 gradient-primary relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(290_80%_50%/0.4),transparent_60%)]" />
        </div>

        {/* Info */}
        <div className="px-4 md:px-6 pb-5 -mt-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-white border-4 border-card shrink-0">
              {seller.displayName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold text-foreground">
                  {seller.displayName}
                </h1>
                {seller.verified && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
                <SellerBadge tier={getSellerTier(seller.totalSales, seller.rating)} size="md" showLabel />
              </div>
              <p className="text-sm text-muted-foreground">@{seller.username}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setShowShare(true)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => toast.info("Opening chat...")}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button
                className={cn(
                  isFollowing
                    ? "bg-secondary text-foreground hover:bg-secondary/80"
                    : "gradient-primary text-white hover:opacity-90"
                )}
                onClick={() => {
                  setIsFollowing(!isFollowing);
                  if (!isFollowing) {
                    trackEvent({ type: "follow_seller", itemId: seller.id });
                    toast.success(`Following ${seller.displayName}!`);
                  }
                }}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{seller.rating}</span>
              <span className="text-muted-foreground">rating</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span className="font-semibold">{seller.totalSales.toLocaleString()}</span>
              <span className="text-muted-foreground">sales</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold">{seller.followers.toLocaleString()}</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {seller.location}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border/50">
        {tabs.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              tab === id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
            <span className="ml-1.5 text-xs text-muted-foreground">({count})</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "listings" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sellerProducts.length > 0 ? (
            sellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-sm">No listings yet</p>
            </div>
          )}
        </div>
      )}

      {tab === "live" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellerStreams.length > 0 ? (
            sellerStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-sm">No live streams scheduled</p>
            </div>
          )}
        </div>
      )}

      {tab === "reviews" && (
        <div className="space-y-4">
          {[
            { user: "MosheDavid", rating: 5, text: "Amazing seller! Fast shipping and exactly as described. Would buy again.", date: "2 days ago" },
            { user: "SarahR", rating: 5, text: "Beautiful quality. The kids love it!", date: "1 week ago" },
            { user: "YossiB", rating: 4, text: "Great product, shipping took a bit longer than expected but seller communicated well.", date: "2 weeks ago" },
          ].map((review, i) => (
            <div key={i} className="p-4 rounded-xl border border-border/50 bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                    {review.user[0]}
                  </div>
                  <span className="font-medium text-sm">{review.user}</span>
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <div className="flex items-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={cn(
                      "w-3.5 h-3.5",
                      j < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/80 mt-2">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Seller Verification */}
      <SellerVerificationBanner tier={getSellerTier(seller.totalSales, seller.rating)} />

      {/* Share Sheet */}
      <ShareSheet
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        title={seller.displayName}
        url={window.location.href}
        type="seller"
      />
    </div>
  );
}
