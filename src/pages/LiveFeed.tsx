import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart, Share2, MessageCircle, ShoppingCart, Gift, Users, Gavel,
  Timer, ChevronUp, ChevronDown, Volume2, VolumeX, X, Zap, Crown,
  Star, ShieldCheck, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { mockLiveStreams, mockProducts, type LiveStream, type ChatMessage } from "@/data/mockData";

// Simulated chat messages per stream
const CHAT_TEMPLATES = [
  { username: "YossiB", message: "What's the starting bid?" },
  { username: "MosheDavid", message: "Beautiful piece!" },
  { username: "SarahR", message: "$50!" },
  { username: "ChaimG", message: "Does it come with a case?" },
  { username: "RivkaM", message: "Amazing quality!" },
  { username: "MendelK", message: "How much for the set?" },
  { username: "RachelS", message: "I'll take it!" },
  { username: "DovB", message: "Can you show the back?" },
  { username: "LeahG", message: "$65!" },
  { username: "ShlomoW", message: "Is shipping included?" },
  { username: "MiriamF", message: "Perfect for Pesach!" },
  { username: "AviK", message: "That's a steal!" },
  { username: "EstherP", message: "Take my money!" },
  { username: "NaftaliR", message: "$75!" },
  { username: "TziporahD", message: "B\"H gorgeous" },
];

interface StreamFeedItemProps {
  stream: LiveStream;
  isActive: boolean;
}

function StreamFeedItem({ stream, isActive }: StreamFeedItemProps) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [currentBid, setCurrentBid] = useState(stream.currentBid || 20);
  const [bidCount, setBidCount] = useState(8);
  const [timeLeft, setTimeLeft] = useState(90 + Math.floor(Math.random() * 120));
  const [viewerCount, setViewerCount] = useState(stream.viewers);
  const [showGiveaway, setShowGiveaway] = useState(false);
  const [giveawayEntered, setGiveawayEntered] = useState(false);
  const [buyNowFlash, setBuyNowFlash] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const reactionCounter = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);

  // Simulate live chat
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      const template = CHAT_TEMPLATES[Math.floor(Math.random() * CHAT_TEMPLATES.length)];
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        userId: `user-${template.username}`,
        username: template.username,
        message: template.message,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev.slice(-30), newMsg]);
    }, 2500 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Simulate bid updates
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      const increment = [5, 10, 15][Math.floor(Math.random() * 3)];
      setCurrentBid((prev) => prev + increment);
      setBidCount((prev) => prev + 1);

      // System message for new bid
      const bidder = CHAT_TEMPLATES[Math.floor(Math.random() * CHAT_TEMPLATES.length)].username;
      setChatMessages((prev) => [...prev.slice(-30), {
        id: `bid-${Date.now()}`,
        userId: "system",
        username: "KINYAN",
        message: `${bidder} bid $${currentBid + increment}!`,
        timestamp: new Date(),
        isSystem: true,
      }]);
    }, 8000 + Math.random() * 12000);
    return () => clearInterval(interval);
  }, [isActive, currentBid]);

  // Countdown timer
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Viewer count fluctuation
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setViewerCount((prev) => Math.max(50, prev + Math.floor(Math.random() * 11) - 4));
    }, 5000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Trigger giveaway
  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => setShowGiveaway(true), 20000);
    return () => clearTimeout(timer);
  }, [isActive]);

  // "Buy It Now" flash animation
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setBuyNowFlash(true);
      setTimeout(() => setBuyNowFlash(false), 3000);
    }, 25000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Floating reactions from other viewers
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      const emojis = ["❤️", "🔥", "😍", "👏", "💎", "✡️"];
      reactionCounter.current++;
      setFloatingReactions((prev) => [
        ...prev.slice(-10),
        { id: reactionCounter.current, emoji: emojis[Math.floor(Math.random() * emojis.length)], x: 70 + Math.random() * 25 },
      ]);
    }, 2000 + Math.random() * 3000);

    const cleanup = setInterval(() => {
      const now = Date.now();
      setFloatingReactions((prev) => prev.slice(-8));
    }, 3000);

    return () => { clearInterval(interval); clearInterval(cleanup); };
  }, [isActive]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, {
      id: `you-${Date.now()}`,
      userId: "you",
      username: "You",
      message: chatInput.trim(),
      timestamp: new Date(),
    }]);
    setChatInput("");
  };

  const addReaction = (emoji: string) => {
    reactionCounter.current++;
    setFloatingReactions((prev) => [
      ...prev,
      { id: reactionCounter.current, emoji, x: 70 + Math.random() * 25 },
    ]);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const relatedProduct = mockProducts.find((p) => p.category === stream.category);
  const buyNowPrice = relatedProduct ? relatedProduct.price : 299;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-3 opacity-30">
          <div className="w-24 h-24 rounded-full gradient-primary mx-auto flex items-center justify-center">
            <span className="text-4xl font-bold text-white font-display">
              {stream.seller.displayName[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Reactions */}
      <div className="absolute right-2 bottom-48 w-16 h-48 pointer-events-none overflow-hidden">
        {floatingReactions.map((r) => (
          <span
            key={r.id}
            className="absolute text-2xl"
            style={{
              left: `${r.x - 70}%`,
              bottom: 0,
              animation: "floatUp 3s ease-out forwards",
            }}
          >
            {r.emoji}
          </span>
        ))}
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-3 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
        <div className="flex items-center justify-between">
          {/* Seller Info */}
          <Link
            to={`/seller/${stream.seller.username}`}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white ring-2 ring-red-500 ring-offset-1 ring-offset-black">
              {stream.seller.displayName[0]}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-semibold">{stream.seller.displayName}</span>
                {stream.seller.verified && <ShieldCheck className="w-3 h-3 text-blue-400" />}
              </div>
              <span className="text-white/50 text-[10px]">{stream.seller.followers.toLocaleString()} followers</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white border-0 text-[10px] font-bold gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </Badge>
            {stream.isSponsored && (
              <Badge className={cn(
                "border-0 text-[9px]",
                stream.sponsorTier === "featured"
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-purple-500/80 text-white"
              )}>
                {stream.sponsorTier === "featured" ? "Featured" : "Sponsored"}
              </Badge>
            )}
            <Badge className="bg-black/50 backdrop-blur-sm border-0 text-white/90 text-[10px] gap-1">
              <Users className="w-2.5 h-2.5" />
              {viewerCount.toLocaleString()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Current Item + Bid Info (WhatNot style overlay) */}
      <div className="absolute top-14 left-3 right-3 z-10">
        <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-white/60 text-[10px] uppercase tracking-wider">Current Item</p>
            <p className="text-white font-semibold text-sm truncate">{stream.currentItem}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1.5">
              <Gavel className="w-3 h-3 text-green-400" />
              <span className="text-green-400 font-display font-bold text-lg">${currentBid}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-white/50">{bidCount} bids</span>
              <span className={cn(
                "font-mono",
                timeLeft <= 30 ? "text-red-400 animate-pulse" : "text-white/50"
              )}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Buy It Now Flash */}
      {buyNowFlash && (
        <div className="absolute top-32 left-3 right-3 z-20 animate-in slide-in-from-top-2">
          <button
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-3 flex items-center gap-3 shadow-lg shadow-red-500/30"
            onClick={() => {
              toast.success(`${stream.currentItem} added to cart!`, {
                action: { label: "Checkout", onClick: () => navigate("/cart") },
              });
            }}
          >
            <Zap className="w-5 h-5 text-white" />
            <div className="flex-1 text-left">
              <p className="text-white font-bold text-sm">BUY IT NOW</p>
              <p className="text-white/70 text-[10px]">{stream.currentItem}</p>
            </div>
            <span className="text-white font-display font-bold text-lg">${buyNowPrice}</span>
          </button>
        </div>
      )}

      {/* Giveaway Banner */}
      {showGiveaway && !giveawayEntered && (
        <div className="absolute top-32 left-3 right-3 z-15 animate-in slide-in-from-top-2">
          <div className="bg-purple-600/90 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
            <Gift className="w-6 h-6 text-white" />
            <div className="flex-1">
              <p className="text-white font-bold text-sm">GIVEAWAY!</p>
              <p className="text-white/70 text-[10px]">Type "KINYAN" in chat to enter!</p>
            </div>
            <Button
              size="sm"
              className="bg-white text-purple-700 hover:bg-white/90 font-bold text-xs"
              onClick={() => {
                setGiveawayEntered(true);
                toast.success("You're entered in the giveaway!");
                setChatMessages((prev) => [...prev, {
                  id: `giveaway-${Date.now()}`,
                  userId: "you",
                  username: "You",
                  message: "KINYAN",
                  timestamp: new Date(),
                }]);
              }}
            >
              Enter
            </Button>
            <button
              className="text-white/50 hover:text-white"
              onClick={() => setShowGiveaway(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Section: Chat + Actions */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        {/* Chat Messages */}
        <div ref={chatRef} className="px-3 max-h-40 overflow-y-auto space-y-1 mb-2">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={cn("text-sm", msg.isSystem && "text-center")}>
              {msg.isSystem ? (
                <span className="text-[10px] text-green-400 font-medium bg-green-400/10 px-2 py-0.5 rounded-full">
                  {msg.message}
                </span>
              ) : (
                <p>
                  <span className={cn(
                    "font-semibold text-[11px] mr-1",
                    msg.userId === "you" ? "text-cyan-400" : "text-white/70"
                  )}>
                    {msg.username}
                  </span>
                  <span className="text-white/90 text-[11px]">{msg.message}</span>
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="px-3 pb-2 flex items-center gap-2">
          {/* Chat Input */}
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              placeholder="Say something..."
              className="flex-1 h-9 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            {/* Reaction */}
            <button
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 active:scale-110 transition-all"
              onClick={() => { setLiked(!liked); addReaction("❤️"); }}
            >
              <Heart className={cn("w-4 h-4", liked && "fill-red-500 text-red-500")} />
            </button>

            {/* Share */}
            <button
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success("Link copied!");
              }}
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Cart / Buy */}
            <button
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            {/* Mute */}
            <button
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bid + Buy Buttons */}
        <div className="px-3 pb-4 flex gap-2">
          <Button
            className="flex-1 h-11 bg-white/15 backdrop-blur-sm border border-white/20 text-white font-bold text-sm hover:bg-white/25"
            onClick={() => {
              const newBid = currentBid + 5;
              setCurrentBid(newBid);
              setBidCount((prev) => prev + 1);
              toast.success(`Bid placed: $${newBid}`);
              setChatMessages((prev) => [...prev, {
                id: `yourbid-${Date.now()}`,
                userId: "system",
                username: "KINYAN",
                message: `You bid $${newBid}!`,
                timestamp: new Date(),
                isSystem: true,
              }]);
            }}
          >
            <Gavel className="w-4 h-4 mr-1.5" />
            Bid ${currentBid + 5}
          </Button>
          <Button
            className="flex-1 h-11 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm border-0"
            onClick={() => {
              toast.success(`${stream.currentItem} purchased for $${buyNowPrice}!`, {
                action: { label: "View Cart", onClick: () => navigate("/cart") },
              });
            }}
          >
            <Zap className="w-4 h-4 mr-1.5" />
            Buy Now ${buyNowPrice}
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-180px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// AI-curated stream ordering: sponsored/featured first, then by boost score and viewer count
function getCuratedStreams(streams: LiveStream[]): LiveStream[] {
  return [...streams].sort((a, b) => {
    // Featured sponsored always first
    if (a.sponsorTier === "featured" && b.sponsorTier !== "featured") return -1;
    if (b.sponsorTier === "featured" && a.sponsorTier !== "featured") return 1;
    // Premium sponsored next
    if (a.isSponsored && !b.isSponsored) return -1;
    if (b.isSponsored && !a.isSponsored) return 1;
    // Then by boost score (AI relevance)
    const scoreA = a.boostScore || (a.viewers * 0.5 + (a.currentBid || 0) * 0.3);
    const scoreB = b.boostScore || (b.viewers * 0.5 + (b.currentBid || 0) * 0.3);
    return scoreB - scoreA;
  });
}

export default function LiveFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const streams = getCuratedStreams(mockLiveStreams);

  const goToStream = (index: number) => {
    const clamped = Math.max(0, Math.min(streams.length - 1, index));
    setCurrentIndex(clamped);
  };

  // Handle swipe / scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let startTime = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startTime = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const diff = startY - endY;
      const elapsed = Date.now() - startTime;

      if (Math.abs(diff) > 50 && elapsed < 500) {
        if (diff > 0) goToStream(currentIndex + 1); // swipe up = next
        else goToStream(currentIndex - 1); // swipe down = prev
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [currentIndex, streams.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") goToStream(currentIndex - 1);
      if (e.key === "ArrowDown") goToStream(currentIndex + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
    >
      {/* Close button */}
      <Link
        to="/home"
        className="absolute top-4 left-4 z-50 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>

      {/* Stream indicator dots */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
        {streams.map((_, i) => (
          <button
            key={i}
            className={cn(
              "w-1.5 rounded-full transition-all",
              i === currentIndex ? "h-6 bg-white" : "h-1.5 bg-white/30"
            )}
            onClick={() => goToStream(i)}
          />
        ))}
      </div>

      {/* Navigation arrows (desktop) */}
      {currentIndex > 0 && (
        <button
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          onClick={() => goToStream(currentIndex - 1)}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
      {currentIndex < streams.length - 1 && (
        <button
          className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          onClick={() => goToStream(currentIndex + 1)}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}

      {/* Current Stream */}
      <div className="w-full h-full">
        <StreamFeedItem
          stream={streams[currentIndex]}
          isActive={true}
        />
      </div>
    </div>
  );
}
