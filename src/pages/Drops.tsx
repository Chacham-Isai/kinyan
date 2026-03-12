import { Clock, Flame, Filter, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ScheduledDropCard, { type Drop } from "@/components/marketplace/ScheduledDrop";
import { mockSellers } from "@/data/mockData";

const mockDrops: Drop[] = [
  {
    id: "drop1",
    title: "Purim Costume Blowout",
    description: "200+ costumes at 50-70% off. First come, first served. Live auction for premium costumes!",
    sellerName: "Simcha Style",
    sellerAvatar: "S",
    scheduledFor: new Date(Date.now() + 3600000), // 1 hour
    category: "kids",
    itemCount: 200,
    interestedCount: 1847,
    isExclusive: false,
    previewEmoji: "🎭",
    type: "flash_sale",
  },
  {
    id: "drop2",
    title: "Rare Seforim — Private Collection",
    description: "Exclusive access to a private collection of antique seforim. Authenticated and certified. Invitation only.",
    sellerName: "Seforim Central",
    sellerAvatar: "S",
    scheduledFor: new Date(Date.now() + 7200000), // 2 hours
    category: "seforim",
    itemCount: 25,
    interestedCount: 342,
    isExclusive: true,
    previewEmoji: "📜",
    type: "exclusive_drop",
  },
  {
    id: "drop3",
    title: "Mystery Judaica Box",
    description: "Each box contains $200+ worth of sterling silver Judaica items. Limited to 50 boxes!",
    sellerName: "Silver & Gold Judaica",
    sellerAvatar: "S",
    scheduledFor: new Date(Date.now() + 14400000), // 4 hours
    category: "judaica",
    itemCount: 50,
    interestedCount: 923,
    isExclusive: false,
    previewEmoji: "🎁",
    type: "mystery_box",
  },
  {
    id: "drop4",
    title: "Borsalino Hat Auction Night",
    description: "50 premium Borsalino hats starting at $1. Live auction with celebrity host. Free shipping on all wins!",
    sellerName: "The Hat Spot",
    sellerAvatar: "T",
    scheduledFor: new Date(Date.now() + 28800000), // 8 hours
    category: "fashion",
    itemCount: 50,
    interestedCount: 2156,
    isExclusive: false,
    previewEmoji: "🎩",
    type: "auction_event",
  },
  {
    id: "drop5",
    title: "TAG Kosher Tech Flash Sale",
    description: "Samsung, Pixel, and flip phones — all TAG certified. 24 hours only, up to 40% off retail.",
    sellerName: "TechKosher",
    sellerAvatar: "T",
    scheduledFor: new Date(Date.now() + 43200000), // 12 hours
    category: "electronics",
    itemCount: 100,
    interestedCount: 3421,
    isExclusive: false,
    previewEmoji: "📱",
    type: "flash_sale",
  },
  {
    id: "drop6",
    title: "Pesach Kitchen Essentials",
    description: "Everything you need for Pesach — hot plates, blech, pots, utensils. Exclusive bundle pricing.",
    sellerName: "Heimish Deals",
    sellerAvatar: "H",
    scheduledFor: new Date(Date.now() + 86400000), // 24 hours
    category: "home",
    itemCount: 75,
    interestedCount: 1567,
    isExclusive: false,
    previewEmoji: "🍽️",
    type: "flash_sale",
  },
];

type FilterType = "all" | "flash_sale" | "exclusive_drop" | "mystery_box" | "auction_event";

export default function Drops() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredDrops = mockDrops
    .filter((d) => filter === "all" || d.type === filter)
    .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime());

  const upNext = filteredDrops[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <Flame className="w-6 h-6 text-primary" />
            Drops
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Exclusive releases, flash sales & auction events
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1 text-xs">
          <Bell className="w-3.5 h-3.5" />
          Notify All
        </Button>
      </div>

      {/* Up Next Banner */}
      {upNext && (
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-cyan-50 border border-primary/20 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Up Next</span>
          </div>
          <h2 className="font-display font-bold text-lg text-foreground">{upNext.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{upNext.description}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span>{upNext.sellerName}</span>
            <span>·</span>
            <span>{upNext.itemCount} items</span>
            <span>·</span>
            <span>{upNext.interestedCount.toLocaleString()} interested</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {([
          { id: "all", label: "All Drops" },
          { id: "flash_sale", label: "Flash Sales" },
          { id: "exclusive_drop", label: "Exclusive" },
          { id: "mystery_box", label: "Mystery Box" },
          { id: "auction_event", label: "Auctions" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
              filter === tab.id
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Drops Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrops.map((drop) => (
          <ScheduledDropCard key={drop.id} drop={drop} />
        ))}
      </div>

      {filteredDrops.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <Flame className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">No drops scheduled for this category</p>
        </div>
      )}
    </div>
  );
}
