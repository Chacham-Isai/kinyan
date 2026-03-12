import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Heart, MessageCircle, Share2, ShoppingCart, Star,
  ChevronUp, ChevronDown, Zap, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockProducts, type Product } from "@/data/mockData";
import { trackEvent } from "@/lib/recommendations";
import { toast } from "sonner";

const categoryColors: Record<string, { bg: string; emoji: string }> = {
  seforim: { bg: "from-amber-100 to-orange-100", emoji: "📚" },
  judaica: { bg: "from-yellow-100 to-amber-100", emoji: "✡" },
  fashion: { bg: "from-slate-100 to-gray-100", emoji: "👔" },
  electronics: { bg: "from-blue-100 to-cyan-100", emoji: "📱" },
  simcha: { bg: "from-pink-100 to-rose-100", emoji: "🎉" },
  kids: { bg: "from-green-100 to-emerald-100", emoji: "🧸" },
  home: { bg: "from-violet-100 to-purple-100", emoji: "🏠" },
  food: { bg: "from-orange-100 to-red-100", emoji: "🍕" },
};

function ProductSlide({ product, isActive }: { product: Product; isActive: boolean }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [showBuySheet, setShowBuySheet] = useState(false);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  useEffect(() => {
    if (isActive) {
      trackEvent({
        type: "view_product",
        itemId: product.id,
        category: product.category,
        metadata: { price: product.price.toString(), tags: product.tags.join(",") },
      });
    }
  }, [isActive, product.id]);

  const handleQuickBuy = () => {
    trackEvent({ type: "add_to_cart", itemId: product.id, category: product.category });
    setShowBuySheet(false);
    toast.success("Added to cart!", {
      description: `${product.title} — $${product.price}`,
      action: { label: "Checkout", onClick: () => navigate("/cart") },
    });
  };

  const colors = categoryColors[product.category] || { bg: "from-secondary to-card", emoji: "📦" };

  return (
    <div className="h-full w-full relative flex flex-col">
      {/* Product Image Area */}
      <div className={`flex-1 bg-gradient-to-br ${colors.bg} relative flex items-center justify-center`}>
        <span className="text-8xl opacity-20">{colors.emoji}</span>

        {/* Discount badge */}
        {hasDiscount && (
          <Badge className="absolute top-4 left-4 gradient-coral text-white border-0 font-bold text-sm px-3 py-1">
            -{discountPercent}% OFF
          </Badge>
        )}

        {/* Swipe hint */}
        <div className="absolute top-4 right-4 flex flex-col items-center gap-1 opacity-50">
          <ChevronUp className="w-5 h-5 text-foreground animate-bounce" />
          <span className="text-[10px] text-foreground">Swipe</span>
        </div>

        {/* Side actions */}
        <div className="absolute right-4 bottom-4 flex flex-col items-center gap-4">
          <button
            onClick={() => {
              setLiked(!liked);
              if (!liked) trackEvent({ type: "like_product", itemId: product.id, category: product.category });
            }}
            className="flex flex-col items-center gap-1"
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shadow-lg",
              liked ? "bg-red-500" : "bg-white/90 backdrop-blur-sm"
            )}>
              <Heart className={cn("w-6 h-6", liked ? "text-white fill-white" : "text-foreground")} />
            </div>
            <span className="text-xs font-medium text-foreground">{product.likes + (liked ? 1 : 0)}</span>
          </button>

          <button
            onClick={() => navigate(`/messages/${product.seller.id}`)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground">Chat</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Share2 className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground">Share</span>
          </button>
        </div>
      </div>

      {/* Product Info Bar */}
      <div className="bg-white border-t border-border/50 px-4 py-3 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-foreground text-lg leading-tight line-clamp-1">
              {product.title}
            </h2>
            <Link
              to={`/seller/${product.seller.username}`}
              className="flex items-center gap-1.5 mt-1"
            >
              <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-white">
                {product.seller.displayName[0]}
              </div>
              <span className="text-xs text-muted-foreground">{product.seller.displayName}</span>
              {product.seller.verified && <span className="text-primary text-xs">✓</span>}
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 ml-1" />
              <span className="text-xs text-muted-foreground">{product.seller.rating}</span>
            </Link>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display font-bold text-xl text-foreground">${product.price}</span>
            {hasDiscount && (
              <span className="block text-xs text-muted-foreground line-through">${product.compareAtPrice}</span>
            )}
          </div>
        </div>

        {/* Quick Buy Actions */}
        <div className="flex gap-2">
          <Button
            className="flex-1 h-11 gradient-primary text-white font-bold text-sm gap-1.5"
            onClick={handleQuickBuy}
          >
            <Zap className="w-4 h-4" />
            Buy Now — ${product.price}
          </Button>
          <Button
            variant="outline"
            className="h-11 px-4"
            onClick={() => {
              trackEvent({ type: "add_to_cart", itemId: product.id, category: product.category });
              toast.success("Added to cart!");
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>

        {/* Shipping & Protection */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {product.shipping === "Free" ? (
            <span className="text-green-600 font-medium">Free shipping</span>
          ) : (
            <span>${product.shipping} shipping</span>
          )}
          <span>·</span>
          <span>Buyer protection</span>
          <span>·</span>
          <span>{product.condition}</span>
        </div>
      </div>
    </div>
  );
}

export default function Discover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const products = mockProducts;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    const distance = touchStart.current - touchEnd.current;
    const threshold = 50;

    if (distance > threshold && currentIndex < products.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else if (distance < -threshold && currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        setCurrentIndex((i) => Math.min(i + 1, products.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "k") {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [products.length]);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-7.5rem)] overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress dots */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
        {products.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 rounded-full transition-all",
              i === currentIndex ? "w-6 bg-primary" : "w-1 bg-foreground/20"
            )}
          />
        ))}
      </div>

      {/* Product slides */}
      <div
        className="transition-transform duration-300 ease-out h-full"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {products.map((product, i) => (
          <div key={product.id} className="h-full">
            <ProductSlide product={product} isActive={i === currentIndex} />
          </div>
        ))}
      </div>

      {/* Navigation arrows (desktop) */}
      <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
          disabled={currentIndex === products.length - 1}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
