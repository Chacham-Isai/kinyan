import { Link } from "react-router-dom";
import { Heart, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/mockData";

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice!) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-xl overflow-hidden card-lift border border-border/50 bg-card"
    >
      {/* Image */}
      <div className={`relative aspect-square bg-gradient-to-br ${categoryColors[product.category]?.bg || "from-secondary to-card"} overflow-hidden`}>
        {/* Category emoji placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl opacity-40 group-hover:scale-110 transition-transform">
            {categoryColors[product.category]?.emoji || "📦"}
          </span>
        </div>

        {/* Discount badge */}
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 gradient-coral text-white border-0 text-xs font-bold">
            -{discountPercent}%
          </Badge>
        )}

        {/* Like button */}
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // Toggle like
          }}
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Condition badge */}
        {product.condition !== "New" && (
          <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs bg-white/80 backdrop-blur-sm border-0 text-foreground shadow-sm">
            {product.condition}
          </Badge>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">${product.price}</span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.compareAtPrice}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {product.shipping === "Free" ? (
              <>
                <Truck className="w-3 h-3 text-success" />
                <span className="text-success font-medium">Free shipping</span>
              </>
            ) : (
              <>
                <Truck className="w-3 h-3" />
                <span>+${product.shipping} shipping</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart className="w-3 h-3" />
            {product.likes}
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="w-4 h-4 rounded-full gradient-primary flex items-center justify-center text-[8px] font-bold text-white">
            {product.seller.displayName[0]}
          </div>
          <span className="text-xs text-muted-foreground truncate">
            {product.seller.displayName}
          </span>
        </div>
      </div>
    </Link>
  );
}
