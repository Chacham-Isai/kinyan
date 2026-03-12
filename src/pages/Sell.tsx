import { Link } from "react-router-dom";
import {
  ArrowLeft, Camera, DollarSign, Tag, Package, Truck,
  Info, Radio, ShoppingBag, Plus, Image as ImageIcon, Check,
  Sparkles, TrendingUp, Zap, BarChart3, Clock, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/categories";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ListingForm {
  title: string;
  description: string;
  category: string;
  price: string;
  condition: string;
  shipping: string;
  shippingCost: string;
}

interface LiveForm {
  title: string;
  category: string;
}

export default function Sell() {
  const [tab, setTab] = useState<"listing" | "live">("listing");
  const [listing, setListing] = useState<ListingForm>({
    title: "",
    description: "",
    category: "",
    price: "",
    condition: "",
    shipping: "",
    shippingCost: "",
  });
  const [live, setLive] = useState<LiveForm>({ title: "", category: "" });
  const [submitting, setSubmitting] = useState(false);

  const updateListing = (field: keyof ListingForm, value: string) => {
    setListing((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmitListing =
    listing.title.trim() &&
    listing.category &&
    listing.price &&
    listing.condition &&
    listing.shipping;

  const canGoLive = live.title.trim() && live.category;

  const handleListItem = async () => {
    if (!canSubmitListing) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Item listed!", { description: `"${listing.title}" is now live on KINYAN` });
    setListing({ title: "", description: "", category: "", price: "", condition: "", shipping: "", shippingCost: "" });
  };

  const handleGoLive = async () => {
    if (!canGoLive) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast.success("Going live!", { description: "Your stream is starting..." });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Sell on KINYAN</h1>
        <p className="text-sm text-muted-foreground mt-1">
          List an item or go live to sell to the community
        </p>
      </div>

      {/* AI Seller Tips Banner */}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 via-purple-50 to-cyan-50 border border-primary/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">AI Selling Assistant</span>
          <Badge className="bg-primary/10 text-primary border-0 text-[9px]">Smart</Badge>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80">
            <TrendingUp className="w-3.5 h-3.5 text-green-600 shrink-0" />
            <span className="text-[11px] text-foreground">Seforim trending +45% this week</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80">
            <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="text-[11px] text-foreground">Best time: Motzei Shabbos 9 PM</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80">
            <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="text-[11px] text-foreground">1.2K buyers active now</span>
          </div>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="flex items-center gap-2 p-1 bg-secondary rounded-xl">
        <button
          onClick={() => setTab("listing")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
            tab === "listing"
              ? "gradient-primary text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ShoppingBag className="w-4 h-4" />
          List an Item
        </button>
        <button
          onClick={() => setTab("live")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
            tab === "live"
              ? "gradient-live text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Radio className="w-4 h-4" />
          Go Live
        </button>
      </div>

      {tab === "listing" ? (
        <div className="space-y-6">
          {/* Photos */}
          <section className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-primary" />
              Photos
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button className="aspect-square rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors">
                <Plus className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Add</span>
              </button>
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-secondary border border-border/50 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-muted-foreground/30" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Up to 8 photos. First photo is the cover.</p>
          </section>

          {/* Title & Description */}
          <section className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Title *</label>
              <input
                type="text"
                value={listing.title}
                onChange={(e) => updateListing("title", e.target.value)}
                placeholder="What are you selling?"
                className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Description</label>
                <button
                  onClick={() => {
                    if (listing.title) {
                      updateListing(
                        "description",
                        `${listing.title} in excellent condition. Well maintained and carefully used. Ships quickly from a smoke-free home. Feel free to message with any questions!`
                      );
                      toast.success("AI generated a description draft!");
                    } else {
                      toast.error("Add a title first so AI can generate a description");
                    }
                  }}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  AI Write
                </button>
              </div>
              <textarea
                value={listing.description}
                onChange={(e) => updateListing("description", e.target.value)}
                placeholder="Describe your item in detail..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          </section>

          {/* Category */}
          <section className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-primary" />
              Category *
            </label>
            <select
              value={listing.category}
              onChange={(e) => updateListing("category", e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </section>

          {/* Price */}
          <section className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-primary" />
              Price *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                value={listing.price}
                onChange={(e) => updateListing("price", e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full h-11 pl-8 pr-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {/* AI Price Suggestion */}
            {listing.category && listing.title.length > 3 && (
              <div className="flex items-center gap-2 mt-2 p-2.5 rounded-lg bg-green-50 border border-green-100">
                <Sparkles className="w-3.5 h-3.5 text-green-600 shrink-0" />
                <p className="text-xs text-green-700">
                  <span className="font-medium">AI suggestion:</span> Similar items in{" "}
                  {categories.find((c) => c.id === listing.category)?.name || listing.category}{" "}
                  typically sell for <span className="font-bold">$45–$250</span>. Free shipping listings sell 32% faster.
                </p>
              </div>
            )}
          </section>

          {/* Condition */}
          <section className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Package className="w-4 h-4 text-primary" />
              Condition *
            </label>
            <div className="flex flex-wrap gap-2">
              {["New", "Like New", "Good", "Fair"].map((condition) => (
                <Badge
                  key={condition}
                  variant="secondary"
                  className={cn(
                    "cursor-pointer px-4 py-1.5 text-xs transition-colors",
                    listing.condition === condition
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "hover:bg-primary hover:text-white"
                  )}
                  onClick={() => updateListing("condition", condition)}
                >
                  {listing.condition === condition && <Check className="w-3 h-3 mr-1" />}
                  {condition}
                </Badge>
              ))}
            </div>
          </section>

          {/* Shipping */}
          <section className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary" />
              Shipping *
            </label>
            <div className="flex gap-2">
              {[
                { value: "free", label: "Free Shipping" },
                { value: "flat", label: "Flat Rate" },
                { value: "calculated", label: "Calculated" },
              ].map((option) => (
                <Badge
                  key={option.value}
                  variant="secondary"
                  className={cn(
                    "cursor-pointer px-4 py-1.5 text-xs transition-colors",
                    listing.shipping === option.value
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "hover:bg-primary hover:text-white"
                  )}
                  onClick={() => updateListing("shipping", option.value)}
                >
                  {listing.shipping === option.value && <Check className="w-3 h-3 mr-1" />}
                  {option.label}
                </Badge>
              ))}
            </div>
            {listing.shipping === "flat" && (
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  value={listing.shippingCost}
                  onChange={(e) => updateListing("shippingCost", e.target.value)}
                  placeholder="Shipping cost"
                  min="0"
                  step="0.01"
                  className="w-full h-11 pl-8 pr-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
          </section>

          <Button
            className="w-full h-12 gradient-primary text-white font-bold"
            disabled={!canSubmitListing || submitting}
            onClick={handleListItem}
          >
            {submitting ? "Listing..." : "List Item"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Go Live Form */}
          <div className="rounded-xl border border-border/50 bg-card p-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-live mx-auto flex items-center justify-center">
              <Radio className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-foreground">Go Live</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Start a live stream to sell, auction, or showcase your items
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Stream Title *</label>
              <input
                type="text"
                value={live.title}
                onChange={(e) => setLive((l) => ({ ...l, title: e.target.value }))}
                placeholder="Give your stream a catchy title"
                className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category *</label>
              <select
                value={live.category}
                onChange={(e) => setLive((l) => ({ ...l, category: e.target.value }))}
                className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-2">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                Live streams are automatically paused during Shabbos and Yom Tov.
                Schedule your stream for after Havdalah to reach the most viewers.
              </p>
            </div>
          </div>

          {/* AI Stream Tips */}
          <div className="rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500" />
              <span className="text-sm font-semibold text-red-800">Live Selling Tips</span>
              <Badge className="bg-red-100 text-red-600 border-0 text-[9px]">AI</Badge>
            </div>
            <div className="space-y-2">
              {[
                "Start with a 30-second intro showing your best items",
                "Engage viewers by name — it boosts retention 2.5x",
                "Run a flash deal in the first 5 minutes to build momentum",
                "End with a preview of next stream to build anticipation",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs font-bold text-red-400 mt-0.5">{i + 1}.</span>
                  <p className="text-xs text-red-700/80">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Prediction */}
          {live.category && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border/50">
              <BarChart3 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Estimated viewers: 45–120</p>
                <p className="text-xs text-muted-foreground">Based on {categories.find((c) => c.id === live.category)?.name} category performance</p>
              </div>
            </div>
          )}

          <Button
            className="w-full h-12 gradient-live text-white font-bold gap-2"
            disabled={!canGoLive || submitting}
            onClick={handleGoLive}
          >
            <Radio className="w-4 h-4" />
            {submitting ? "Starting..." : "Start Live Stream"}
          </Button>
        </div>
      )}
    </div>
  );
}
