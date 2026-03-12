import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Grid3x3, List, Sparkles, TrendingDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { mockProducts } from "@/data/mockData";
import ProductCard from "@/components/marketplace/ProductCard";
import { getUserProfile, getRecommendedProducts } from "@/lib/recommendations";

export default function Saved() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceAlerts, setPriceAlerts] = useState<Record<string, boolean>>({});
  // Mock: show first 4 products as "saved"
  const savedProducts = mockProducts.slice(0, 4);

  const profile = useMemo(() => getUserProfile(), []);
  // AI: find similar items to what user has saved
  const similarProducts = useMemo(() => {
    const savedIds = new Set(savedProducts.map((p) => p.id));
    return getRecommendedProducts(
      mockProducts.filter((p) => !savedIds.has(p.id)),
      profile,
      4
    );
  }, [profile]);

  const togglePriceAlert = (productId: string) => {
    setPriceAlerts((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">Saved Items</h1>
          <span className="text-sm text-muted-foreground">({savedProducts.length})</span>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === "grid" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
            )}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              view === "list" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price Drop Alerts Banner */}
      {savedProducts.length > 0 && (
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-800">Price Drop Alerts</span>
            <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">AI</Badge>
          </div>
          <p className="text-xs text-green-700/80 mb-3">Get notified when prices drop on your saved items</p>
          <div className="flex flex-wrap gap-2">
            {savedProducts.slice(0, 3).map((p) => (
              <button
                key={p.id}
                onClick={() => togglePriceAlert(p.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all",
                  priceAlerts[p.id]
                    ? "bg-green-600 text-white"
                    : "bg-white border border-green-200 text-green-700 hover:bg-green-50"
                )}
              >
                <Bell className="w-3 h-3" />
                {p.title.length > 20 ? p.title.slice(0, 20) + "…" : p.title}
                {priceAlerts[p.id] && " ✓"}
              </button>
            ))}
          </div>
        </div>
      )}

      {savedProducts.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">No saved items yet</p>
          <Button asChild className="gradient-primary text-white">
            <Link to="/browse">Browse marketplace</Link>
          </Button>
        </div>
      ) : (
        <div className={cn(
          "grid gap-3",
          view === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
        )}>
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* AI-powered Similar Items */}
      {similarProducts.length > 0 && (
        <section className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground">You Might Also Like</h2>
            <Badge className="bg-primary/10 text-primary border-0 text-[10px]">AI Picks</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
