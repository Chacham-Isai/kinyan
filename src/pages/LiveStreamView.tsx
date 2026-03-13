import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Heart, Users, Flag, Volume2, VolumeX, LayoutList, Skull, Zap, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StreamChat from "@/components/stream/StreamChat";
import BidPanel from "@/components/stream/BidPanel";
import StreamReactions from "@/components/stream/StreamReactions";
import StreamGiveaway from "@/components/stream/StreamGiveaway";
import PinnedProduct from "@/components/stream/PinnedProduct";
import FlashSale from "@/components/stream/FlashSale";
import SpinWheel from "@/components/stream/SpinWheel";
import CoHostPanel from "@/components/stream/CoHostPanel";
import ChatModeration, { type ChatFilter } from "@/components/stream/ChatModeration";
import SellerCoupons from "@/components/marketplace/SellerCoupons";
import { mockLiveStreams, mockChatMessages, mockProducts } from "@/data/mockData";
import { useState, useEffect } from "react";
import { useAuction, type AuctionMode } from "@/hooks/useAuction";
import { trackEvent } from "@/lib/recommendations";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function LiveStreamView() {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showGiveaway, setShowGiveaway] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [showProductQueue, setShowProductQueue] = useState(false);
  const [auctionMode, setAuctionMode] = useState<AuctionMode>("standard");
  const [showFlashSale, setShowFlashSale] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [chatFilter, setChatFilter] = useState<ChatFilter>("all");
  const [activeTab, setActiveTab] = useState<"bid" | "coupon">("bid");

  const stream = mockLiveStreams.find((s) => s.id === streamId) || mockLiveStreams[0];

  const auction = useAuction(stream.currentBid || 20, 180, auctionMode);

  // Track stream view
  useEffect(() => {
    if (stream) {
      trackEvent({ type: "view_stream", itemId: stream.id, category: stream.category });
      setViewerCount(stream.viewers);
    }
  }, [stream?.id]);

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 11) - 4;
        return Math.max(prev + change, 50);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Trigger giveaway after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowGiveaway(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger flash sale after 45 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowFlashSale(true), 45000);
    return () => clearTimeout(timer);
  }, []);

  // Related products for the product queue
  const relatedProducts = mockProducts.filter((p) => p.category === stream.category).slice(0, 4);

  if (!stream) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Stream not found</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/live">Back to Live</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="relative aspect-video lg:aspect-auto lg:flex-1 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-black flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center animate-float">
                <span className="text-3xl font-bold text-white font-display">
                  {stream.seller.displayName[0]}
                </span>
              </div>
              <p className="text-white/50 text-sm">Live stream video</p>
            </div>
          </div>

          {/* Top overlay */}
          <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-white/20"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              <Badge className="bg-red-600 text-white border-0 live-glow text-xs font-bold gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
                LIVE
              </Badge>
              {auctionMode === "sudden_death" && (
                <Badge className="bg-black text-white border border-red-500 text-xs font-bold gap-1">
                  <Skull className="w-3 h-3 text-red-500" />
                  SUDDEN DEATH
                </Badge>
              )}
              <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm border-0 text-white/90 text-xs gap-1">
                <Users className="w-3 h-3" />
                {viewerCount.toLocaleString()}
              </Badge>
            </div>
          </div>

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => {
                    setLiked(!liked);
                    if (!liked) toast("Liked!", { icon: "❤️" });
                  }}
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    toast.success("Link copied!");
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  aria-label="Report stream"
                  onClick={() => toast.info("Stream reported", { description: "Our team will review this stream. Thank you for keeping KINYAN safe." })}
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>

              <StreamReactions />
            </div>
          </div>
        </div>

        {/* Seller Info Bar */}
        <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
          <Link to={`/seller/${stream.seller.username}`} className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white shrink-0 ring-2 ring-red-500 ring-offset-2">
              {stream.seller.displayName[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h2 className="font-semibold text-sm text-foreground truncate">
                  {stream.seller.displayName}
                </h2>
                {stream.seller.verified && (
                  <span className="text-primary text-xs">✓</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {stream.seller.followers.toLocaleString()} followers · {stream.seller.rating} rating
              </p>
            </div>
          </Link>
          <Button
            size="sm"
            className={isFollowing ? "bg-secondary text-foreground" : "gradient-primary text-white"}
            onClick={() => {
              setIsFollowing(!isFollowing);
              toast(isFollowing ? "Unfollowed" : "Following! You'll get notified when they go live.");
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        {/* Stream Title & Tags */}
        <div className="px-4 py-3 border-b border-border/50">
          <h1 className="font-display font-bold text-foreground">{stream.title}</h1>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {stream.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Auction Mode Toggle - Mobile */}
        <div className="px-4 py-2 border-b border-border/50 lg:hidden flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Auction:</span>
          <button
            onClick={() => {
              const newMode = auctionMode === "standard" ? "sudden_death" : "standard";
              setAuctionMode(newMode);
              auction.resetAuction(stream.currentItem, stream.currentBid || 20, newMode);
              toast(newMode === "sudden_death" ? "💀 Sudden Death — No time extensions!" : "Standard mode — Snipe protection on");
            }}
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors",
              auctionMode === "sudden_death"
                ? "bg-red-100 text-red-700"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {auctionMode === "sudden_death" ? <Skull className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
            {auctionMode === "sudden_death" ? "Sudden Death" : "Standard"}
          </button>
          <button
            onClick={() => setShowSpinWheel(!showSpinWheel)}
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ml-auto",
              showSpinWheel ? "bg-purple-100 text-purple-700" : "bg-secondary text-muted-foreground"
            )}
          >
            <RotateCw className="w-3 h-3" />
            Spin
          </button>
        </div>

        {/* Spin Wheel - Mobile */}
        {showSpinWheel && (
          <div className="px-4 py-3 border-b border-border/50 lg:hidden">
            <SpinWheel />
          </div>
        )}

        {/* Pinned Product - Mobile */}
        <div className="px-4 py-3 border-b border-border/50 lg:hidden">
          <PinnedProduct
            title={stream.currentItem}
            price={auction.currentBid}
            originalPrice={299}
            quantity={3}
            emoji={stream.category === "seforim" ? "📚" : stream.category === "judaica" ? "✡" : "📦"}
          />
        </div>

        {/* Flash Sale - Mobile */}
        {showFlashSale && (
          <div className="px-4 py-3 border-b border-border/50 lg:hidden">
            <FlashSale
              title={relatedProducts[0]?.title || "Mystery Item"}
              originalPrice={relatedProducts[0]?.price || 99}
              salePrice={Math.round((relatedProducts[0]?.price || 99) * 0.6)}
              quantity={5}
              durationSeconds={120}
            />
          </div>
        )}

        {/* Giveaway - Mobile */}
        {showGiveaway && (
          <div className="px-4 py-3 border-b border-border/50 lg:hidden">
            <StreamGiveaway
              isActive
              prize="Mystery Judaica Box worth $150"
              onEnter={() => toast.success("You're entered! Good luck!")}
            />
          </div>
        )}

        {/* Co-Host Panel - Mobile */}
        <div className="px-4 py-3 border-b border-border/50 lg:hidden">
          <CoHostPanel hostName={stream.seller.displayName} />
        </div>

        {/* Product Queue Toggle - Mobile */}
        <div className="px-4 py-2 border-b border-border/50 lg:hidden">
          <button
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground w-full"
            onClick={() => setShowProductQueue(!showProductQueue)}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span className="font-medium">Coming Up ({relatedProducts.length} items)</span>
          </button>
          {showProductQueue && (
            <div className="mt-2 space-y-2">
              {relatedProducts.map((product, i) => (
                <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50">
                  <span className="text-xs text-muted-foreground font-mono w-4">#{i + 1}</span>
                  <span className="text-sm font-medium flex-1 truncate">{product.title}</span>
                  <span className="text-xs font-bold text-primary">${product.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bid Panel - Mobile */}
        <div className="lg:hidden p-4 border-b border-border/50">
          <BidPanel
            currentBid={auction.currentBid}
            currentItem={stream.currentItem}
            bidCount={auction.bids.length}
            timeLeft={auction.timeLeft}
            viewers={viewerCount}
            bids={auction.bids}
            isActive={auction.isActive}
            winner={auction.winner}
            autoBidEnabled={auction.autoBidEnabled}
            autoBidMax={auction.autoBidMax}
            snipeProtectionActive={auction.snipeProtectionActive}
            buyNowPrice={299}
            onBid={auction.placeBid}
            onAutoBid={auction.setAutoBid}
            onBuyNow={() => navigate("/cart")}
          />
        </div>

        {/* Seller Coupons - Mobile */}
        <div className="px-4 py-3 border-b border-border/50 lg:hidden">
          <SellerCoupons mode="buyer" sellerName={stream.seller.displayName} />
        </div>
      </div>

      {/* Sidebar - Chat + Bid Panel */}
      <div className="w-full lg:w-[400px] flex flex-col border-l border-border/50 bg-card">
        {/* Pinned Product - Desktop */}
        <div className="hidden lg:block p-3 border-b border-border/50">
          <PinnedProduct
            title={stream.currentItem}
            price={auction.currentBid}
            originalPrice={299}
            quantity={3}
            emoji={stream.category === "seforim" ? "📚" : stream.category === "judaica" ? "✡" : "📦"}
          />
        </div>

        {/* Auction Mode Toggle - Desktop */}
        <div className="hidden lg:flex p-3 border-b border-border/50 items-center gap-2">
          <span className="text-xs text-muted-foreground">Mode:</span>
          <button
            onClick={() => {
              const newMode = auctionMode === "standard" ? "sudden_death" : "standard";
              setAuctionMode(newMode);
              auction.resetAuction(stream.currentItem, stream.currentBid || 20, newMode);
              toast(newMode === "sudden_death" ? "💀 Sudden Death — No time extensions!" : "Standard mode — Snipe protection on");
            }}
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors",
              auctionMode === "sudden_death"
                ? "bg-red-100 text-red-700"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {auctionMode === "sudden_death" ? <Skull className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
            {auctionMode === "sudden_death" ? "Sudden Death" : "Standard"}
          </button>
          <button
            onClick={() => setShowSpinWheel(!showSpinWheel)}
            className={cn(
              "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ml-auto",
              showSpinWheel ? "bg-purple-100 text-purple-700" : "bg-secondary text-muted-foreground"
            )}
          >
            <RotateCw className="w-3 h-3" />
            Spin Wheel
          </button>
        </div>

        {/* Spin Wheel - Desktop */}
        {showSpinWheel && (
          <div className="hidden lg:block p-3 border-b border-border/50">
            <SpinWheel />
          </div>
        )}

        {/* Flash Sale - Desktop */}
        {showFlashSale && (
          <div className="hidden lg:block p-3 border-b border-border/50">
            <FlashSale
              title={relatedProducts[0]?.title || "Mystery Item"}
              originalPrice={relatedProducts[0]?.price || 99}
              salePrice={Math.round((relatedProducts[0]?.price || 99) * 0.6)}
              quantity={5}
              durationSeconds={120}
            />
          </div>
        )}

        {/* Giveaway - Desktop */}
        {showGiveaway && (
          <div className="hidden lg:block p-3 border-b border-border/50">
            <StreamGiveaway
              isActive
              prize="Mystery Judaica Box worth $150"
              onEnter={() => toast.success("You're entered! Good luck!")}
            />
          </div>
        )}

        {/* Co-Host Panel - Desktop */}
        <div className="hidden lg:block p-3 border-b border-border/50">
          <CoHostPanel hostName={stream.seller.displayName} />
        </div>

        {/* Tab Switcher: Bid / Coupons */}
        <div className="hidden lg:flex p-2 border-b border-border/50 gap-1">
          {[
            { id: "bid" as const, label: "Bid" },
            { id: "coupon" as const, label: "Coupons" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors",
                activeTab === tab.id ? "bg-primary text-white" : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bid Panel - Desktop */}
        {activeTab === "bid" && (
          <div className="hidden lg:block p-4 border-b border-border/50">
            <BidPanel
              currentBid={auction.currentBid}
              currentItem={stream.currentItem}
              bidCount={auction.bids.length}
              timeLeft={auction.timeLeft}
              viewers={viewerCount}
              bids={auction.bids}
              isActive={auction.isActive}
              winner={auction.winner}
              autoBidEnabled={auction.autoBidEnabled}
              autoBidMax={auction.autoBidMax}
              snipeProtectionActive={auction.snipeProtectionActive}
              buyNowPrice={299}
              onBid={auction.placeBid}
              onAutoBid={auction.setAutoBid}
              onBuyNow={() => navigate("/cart")}
            />
          </div>
        )}

        {/* Seller Coupons - Desktop */}
        {activeTab === "coupon" && (
          <div className="hidden lg:block p-4 border-b border-border/50">
            <SellerCoupons mode="buyer" sellerName={stream.seller.displayName} />
          </div>
        )}

        {/* Product Queue - Desktop */}
        <div className="hidden lg:block p-3 border-b border-border/50">
          <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-1.5">
            <LayoutList className="w-3.5 h-3.5" />
            Coming Up
          </p>
          <div className="space-y-1.5">
            {relatedProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-colors cursor-pointer">
                <span className="text-xs text-muted-foreground font-mono w-4">#{i + 1}</span>
                <span className="text-xs font-medium flex-1 truncate">{product.title}</span>
                <span className="text-xs font-bold text-primary">${product.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Moderation Filters */}
        <div className="px-3 pt-2 border-b border-border/50">
          <ChatModeration
            activeFilter={chatFilter}
            onFilterChange={setChatFilter}
          />
        </div>

        {/* Chat */}
        <div className="flex-1 min-h-[300px] lg:min-h-0">
          <div className="px-4 py-2 border-b border-border/50 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Live Chat</h3>
            <Badge variant="secondary" className="text-[10px]">
              {viewerCount.toLocaleString()} watching
            </Badge>
          </div>
          <div className="h-[300px] lg:h-[calc(100vh-700px)] min-h-[200px]">
            <StreamChat messages={mockChatMessages} />
          </div>
        </div>
      </div>
    </div>
  );
}
