import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, SlidersHorizontal, X, Sparkles, Clock as ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/marketplace/ProductCard";
import LiveStreamCard from "@/components/marketplace/LiveStreamCard";
import SellerCard from "@/components/marketplace/SellerCard";
import { mockProducts, mockLiveStreams, mockSellers } from "@/data/mockData";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { trackEvent, getUserProfile, getRecommendedProducts } from "@/lib/recommendations";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [tab, setTab] = useState<"all" | "products" | "live" | "sellers">("all");
  const profile = useMemo(() => getUserProfile(), []);
  const suggestedProducts = useMemo(() => getRecommendedProducts(mockProducts, profile, 4), [profile]);

  // Track search event
  useEffect(() => {
    if (query) {
      trackEvent({ type: "search", itemId: query, metadata: { query } });
    }
  }, [query]);

  const q = query.toLowerCase();
  const matchedProducts = mockProducts.filter(
    (p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
  );
  const matchedStreams = mockLiveStreams.filter(
    (s) => s.title.toLowerCase().includes(q) || s.tags.some((t) => t.includes(q))
  );
  const matchedSellers = mockSellers.filter(
    (s) => s.displayName.toLowerCase().includes(q) || s.username.includes(q)
  );

  const totalResults = matchedProducts.length + matchedStreams.length + matchedSellers.length;

  const tabs = [
    { id: "all" as const, label: "All", count: totalResults },
    { id: "products" as const, label: "Products", count: matchedProducts.length },
    { id: "live" as const, label: "Live", count: matchedStreams.length },
    { id: "sellers" as const, label: "Sellers", count: matchedSellers.length },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-xl font-bold text-foreground">
          {query ? (
            <>Results for "<span className="text-primary">{query}</span>"</>
          ) : (
            "Search"
          )}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {totalResults} results found
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {tabs.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0",
              tab === id
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* AI Suggestions - Recent Searches & Recommended */}
      {profile.recentSearches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClockIcon className="w-3.5 h-3.5" />
            <span className="font-medium">Recent Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.recentSearches.slice(0, 5).map((term) => (
              <Link
                key={term}
                to={`/search?q=${encodeURIComponent(term)}`}
                className="px-3 py-1.5 rounded-full bg-secondary text-xs text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {totalResults === 0 ? (
        <div className="space-y-8">
          <div className="text-center py-8 space-y-3">
            <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">{query ? `No results found for "${query}"` : "Start searching"}</p>
            <p className="text-xs text-muted-foreground">Try a different search term</p>
          </div>
          {/* AI-powered suggestions when no results */}
          {suggestedProducts.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <h2 className="font-display font-semibold text-foreground text-sm">Recommended for You</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {suggestedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Live Streams */}
          {(tab === "all" || tab === "live") && matchedStreams.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-foreground mb-3">Live Streams</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedStreams.map((stream) => (
                  <LiveStreamCard key={stream.id} stream={stream} />
                ))}
              </div>
            </section>
          )}

          {/* Products */}
          {(tab === "all" || tab === "products") && matchedProducts.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-foreground mb-3">Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {matchedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}

          {/* Sellers */}
          {(tab === "all" || tab === "sellers") && matchedSellers.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-foreground mb-3">Sellers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matchedSellers.map((seller) => (
                  <SellerCard key={seller.id} seller={seller} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
