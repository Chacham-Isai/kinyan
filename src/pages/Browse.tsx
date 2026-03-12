import { useParams, Link } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/marketplace/ProductCard";
import CategoryGrid from "@/components/marketplace/CategoryGrid";
import { mockProducts } from "@/data/mockData";
import { categories, getCategoryById } from "@/lib/categories";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/recommendations";

export default function Browse() {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState("trending");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const category = categoryId ? getCategoryById(categoryId) : null;

  // Track category view
  useEffect(() => {
    if (categoryId) {
      trackEvent({ type: "view_category", itemId: categoryId, category: categoryId });
    }
  }, [categoryId]);

  const filteredProducts = categoryId
    ? mockProducts.filter((p) => p.category === categoryId)
    : mockProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Back + Header */}
      {category ? (
        <div>
          <Link
            to="/browse"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            All Categories
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {category.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {category.description}
              </p>
            </div>
          </div>

          {/* Subcategories */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
            <Badge
              variant="secondary"
              className="cursor-pointer shrink-0 hover:bg-primary hover:text-white transition-colors bg-primary text-white"
            >
              All
            </Badge>
            {category.subcategories.map((sub) => (
              <Badge
                key={sub}
                variant="secondary"
                className="cursor-pointer shrink-0 hover:bg-primary hover:text-white transition-colors"
              >
                {sub}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Browse
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Explore categories and find what you need
          </p>
        </div>
      )}

      {/* Show category grid if no category selected */}
      {!category && (
        <section>
          <CategoryGrid />
        </section>
      )}

      {/* Products */}
      <section>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} items
          </p>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 px-3 rounded-lg bg-secondary border border-border/50 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
            <div className="hidden sm:flex items-center border border-border/50 rounded-lg overflow-hidden">
              <button
                className={cn(
                  "p-1.5 transition-colors",
                  viewMode === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                className={cn(
                  "p-1.5 transition-colors",
                  viewMode === "list" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={cn(
            "grid gap-3",
            viewMode === "grid"
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1 sm:grid-cols-2"
          )}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No items found in this category yet.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/browse">Browse all categories</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
