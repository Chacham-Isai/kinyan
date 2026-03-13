import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Truck, Shield, Star, ShoppingCart, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/data/mockData";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/recommendations";

const categoryColors: Record<string, { bg: string; emoji: string }> = {
  seforim: { bg: "from-amber-50 to-orange-50", emoji: "📚" },
  judaica: { bg: "from-yellow-50 to-amber-50", emoji: "✡" },
  fashion: { bg: "from-slate-100 to-gray-50", emoji: "👔" },
  electronics: { bg: "from-blue-50 to-cyan-50", emoji: "📱" },
  simcha: { bg: "from-pink-50 to-rose-50", emoji: "🎉" },
  kids: { bg: "from-green-50 to-emerald-50", emoji: "🧸" },
  home: { bg: "from-violet-50 to-purple-50", emoji: "🏠" },
  food: { bg: "from-orange-50 to-red-50", emoji: "🍕" },
};

export default function ProductView() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find((p) => p.id === productId) || mockProducts[0];

  // Track product view
  useEffect(() => {
    trackEvent({
      type: "view_product",
      itemId: product.id,
      category: product.category,
      metadata: {
        price: product.price.toString(),
        tags: product.tags.join(","),
      },
    });
  }, [product.id]);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Back */}
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className={`aspect-square rounded-xl bg-gradient-to-br ${categoryColors[product.category]?.bg || "from-secondary to-card"} border border-border/50 overflow-hidden relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">
                {categoryColors[product.category]?.emoji || "📦"}
              </span>
            </div>
            {hasDiscount && (
              <Badge className="absolute top-3 left-3 gradient-coral text-white border-0 font-bold">
                -{discountPercent}% OFF
              </Badge>
            )}
          </div>
          {/* Thumbnail strip */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-16 h-16 rounded-lg bg-gradient-to-br ${categoryColors[product.category]?.bg || "from-secondary to-card"} border border-border/50 cursor-pointer hover:border-primary transition-colors flex items-center justify-center`}
              >
                <span className="text-lg opacity-25">{categoryColors[product.category]?.emoji || "📦"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {product.title}
              </h1>
              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => {
                    setLiked(!liked);
                    if (!liked) {
                      trackEvent({ type: "like_product", itemId: product.id, category: product.category });
                    }
                  }}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: product.title, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard!");
                    }
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-3xl font-display font-bold text-foreground">
                ${product.price}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.compareAtPrice}
                </span>
              )}
            </div>
          </div>

          {/* Seller */}
          <Link
            to={`/seller/${product.seller.username}`}
            className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-white">
              {product.seller.displayName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm">{product.seller.displayName}</span>
                {product.seller.verified && <span className="text-primary text-xs">✓</span>}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  {product.seller.rating}
                </span>
                <span>{product.seller.totalSales.toLocaleString()} sales</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{product.condition}</Badge>
              <Badge variant="secondary">{product.category}</Badge>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="w-4 h-4 text-success" />
                {product.shipping === "Free" ? (
                  <span className="text-success font-medium">Free shipping</span>
                ) : (
                  <span>${product.shipping} shipping</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Buyer protection guaranteed</span>
              </div>
            </div>
          </div>

          {/* Quantity + Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Qty:</span>
              <div className="flex items-center border border-border/50 rounded-lg overflow-hidden">
                <button
                  className="px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="px-4 py-1.5 text-sm font-medium border-x border-border/50">
                  {quantity}
                </span>
                <button
                  className="px-3 py-1.5 text-sm hover:bg-secondary transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 h-12 gradient-primary text-white font-bold text-sm"
                onClick={() => {
                  trackEvent({ type: "add_to_cart", itemId: product.id, category: product.category, metadata: { price: product.price.toString() } });
                  toast.success("Added to cart!", { description: `${product.title} x${quantity}` });
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 font-bold text-sm"
                onClick={() => navigate("/cart")}
              >
                Buy Now
              </Button>
            </div>

            <Button
              variant="ghost"
              className="w-full h-10 text-sm gap-2"
              onClick={() => navigate(`/messages/${product.seller.id}`)}
            >
              <MessageCircle className="w-4 h-4" />
              Message Seller
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
