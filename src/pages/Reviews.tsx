import { Link } from "react-router-dom";
import { ArrowLeft, Star, ThumbsUp, MessageCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Review {
  id: string;
  product: string;
  seller: string;
  rating: number;
  text: string;
  date: string;
  helpful: number;
  reply?: string;
  type: "given" | "received";
}

const mockReviews: Review[] = [
  {
    id: "r1",
    product: "Artscroll Shas — Full Set",
    seller: "Seforim Central",
    rating: 5,
    text: "Absolutely stunning set. Arrived in perfect condition, well packed. The print quality is excellent. B'H very happy with this purchase!",
    date: "Mar 8, 2026",
    helpful: 12,
    type: "given",
  },
  {
    id: "r2",
    product: "Borsalino Fedora — Black",
    seller: "The Hat Spot",
    rating: 5,
    text: "Perfect fit, exactly as described. Fast shipping and great communication from the seller. Would buy again IY'H.",
    date: "Mar 3, 2026",
    helpful: 8,
    reply: "Thank you so much! Glad you love it. Let us know if you need anything else!",
    type: "given",
  },
  {
    id: "r3",
    product: "Sterling Silver Menorah",
    seller: "You",
    rating: 4,
    text: "Beautiful menorah, great craftsmanship. Slightly smaller than expected but the quality is top notch.",
    date: "Feb 28, 2026",
    helpful: 5,
    type: "received",
  },
  {
    id: "r4",
    product: "Wooden Alef Beis Blocks",
    seller: "You",
    rating: 5,
    text: "My kids absolutely love these! Great quality wood and beautiful painted letters. The seller was so helpful answering my questions.",
    date: "Feb 20, 2026",
    helpful: 15,
    type: "received",
  },
  {
    id: "r5",
    product: "Samsung Galaxy A15 — Kosher",
    seller: "TechKosher",
    rating: 4,
    text: "Good phone, works well. TAG certification was already done which saved a lot of hassle. Battery life could be better.",
    date: "Feb 15, 2026",
    helpful: 3,
    type: "given",
  },
];

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4",
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [filter, setFilter] = useState<"all" | "given" | "received">("all");

  const filtered = filter === "all"
    ? mockReviews
    : mockReviews.filter((r) => r.type === filter);

  const avgRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);
  const givenCount = mockReviews.filter((r) => r.type === "given").length;
  const receivedCount = mockReviews.filter((r) => r.type === "received").length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">My Reviews</h1>
          <div className="flex items-center gap-2 mt-1">
            <Stars rating={Math.round(Number(avgRating))} size="md" />
            <span className="text-sm font-medium text-foreground">{avgRating}</span>
            <span className="text-sm text-muted-foreground">({mockReviews.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl border border-border/50 bg-card">
          <p className="font-display font-bold text-lg text-foreground">{avgRating}</p>
          <p className="text-xs text-muted-foreground">Avg Rating</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-border/50 bg-card">
          <p className="font-display font-bold text-lg text-foreground">{givenCount}</p>
          <p className="text-xs text-muted-foreground">Given</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-border/50 bg-card">
          <p className="font-display font-bold text-lg text-foreground">{receivedCount}</p>
          <p className="text-xs text-muted-foreground">Received</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {[
          { id: "all" as const, label: "All", count: mockReviews.length },
          { id: "given" as const, label: "Given", count: givenCount },
          { id: "received" as const, label: "Received", count: receivedCount },
        ].map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              filter === id
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-border/50 bg-card p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{review.product}</p>
                <p className="text-xs text-muted-foreground">
                  {review.type === "given" ? `Seller: ${review.seller}` : "Review from buyer"} · {review.date}
                </p>
              </div>
              <Badge
                className={cn(
                  "border-0 text-[10px]",
                  review.type === "given"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-green-50 text-green-700"
                )}
              >
                {review.type === "given" ? "Given" : "Received"}
              </Badge>
            </div>

            <Stars rating={review.rating} />

            <p className="text-sm text-foreground/80 leading-relaxed">{review.text}</p>

            {review.reply && (
              <div className="ml-4 pl-3 border-l-2 border-primary/20 bg-primary/5 rounded-r-lg p-3">
                <p className="text-xs font-medium text-primary mb-1">Seller Reply</p>
                <p className="text-xs text-foreground/70">{review.reply}</p>
              </div>
            )}

            <div className="flex items-center gap-4 pt-1">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                Helpful ({review.helpful})
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-3.5 h-3.5" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
