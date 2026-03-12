import { Link } from "react-router-dom";
import {
  ArrowLeft, Users, Star, ShoppingBag, MessageCircle,
  TrendingUp, Heart, ChevronRight, Search, Crown, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Customer {
  id: string;
  name: string;
  initials: string;
  totalSpent: number;
  orders: number;
  rating: number;
  lastOrder: string;
  favorite: boolean;
  segment: "vip" | "repeat" | "new" | "at-risk";
  location: string;
  topCategory: string;
}

const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "MosheDavid",
    initials: "MD",
    totalSpent: 2450,
    orders: 12,
    rating: 4.9,
    lastOrder: "Today",
    favorite: true,
    segment: "vip",
    location: "Lakewood, NJ",
    topCategory: "Seforim",
  },
  {
    id: "c2",
    name: "SarahR",
    initials: "SR",
    totalSpent: 890,
    orders: 5,
    rating: 5.0,
    lastOrder: "Yesterday",
    favorite: false,
    segment: "repeat",
    location: "Monsey, NY",
    topCategory: "Judaica",
  },
  {
    id: "c3",
    name: "YossiB",
    initials: "YB",
    totalSpent: 420,
    orders: 8,
    rating: 4.7,
    lastOrder: "3 days ago",
    favorite: true,
    segment: "repeat",
    location: "Brooklyn, NY",
    topCategory: "Kids",
  },
  {
    id: "c4",
    name: "ChaimW",
    initials: "CW",
    totalSpent: 175,
    orders: 1,
    rating: 4.8,
    lastOrder: "1 week ago",
    favorite: false,
    segment: "new",
    location: "Passaic, NJ",
    topCategory: "Fashion",
  },
  {
    id: "c5",
    name: "RivkaG",
    initials: "RG",
    totalSpent: 680,
    orders: 4,
    rating: 4.6,
    lastOrder: "3 weeks ago",
    favorite: false,
    segment: "at-risk",
    location: "Far Rockaway, NY",
    topCategory: "Home",
  },
];

const segmentConfig = {
  vip: { label: "VIP", color: "bg-purple-100 text-purple-700", icon: Crown },
  repeat: { label: "Repeat", color: "bg-green-100 text-green-700", icon: TrendingUp },
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: Star },
  "at-risk": { label: "At Risk", color: "bg-red-100 text-red-700", icon: Heart },
};

export default function Customers() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState<"all" | "vip" | "repeat" | "new" | "at-risk">("all");

  const filtered = mockCustomers
    .filter((c) => segment === "all" || c.segment === segment)
    .filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()));

  const vipCount = mockCustomers.filter((c) => c.segment === "vip").length;
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage and understand your buyers</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Customers", value: mockCustomers.length.toString(), icon: Users },
          { label: "VIP Buyers", value: vipCount.toString(), icon: Crown },
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: TrendingUp },
          { label: "Avg Rating", value: "4.8", icon: Star },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-3 text-center">
            <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="rounded-xl bg-gradient-to-r from-primary/5 to-purple-50 border border-primary/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Customer Insights</span>
          <Badge className="bg-primary/10 text-primary border-0 text-[9px]">AI</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="flex items-start gap-2 p-2 rounded-lg bg-white/80">
            <TrendingUp className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
            <p className="text-xs text-foreground">
              <strong>RivkaG</strong> hasn't ordered in 3 weeks. Send a personalized offer to re-engage.
            </p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-white/80">
            <Crown className="w-3.5 h-3.5 text-purple-600 mt-0.5 shrink-0" />
            <p className="text-xs text-foreground">
              <strong>MosheDavid</strong> is your top buyer. Consider offering exclusive early access.
            </p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-lg bg-white/80">
            <Heart className="w-3.5 h-3.5 text-pink-600 mt-0.5 shrink-0" />
            <p className="text-xs text-foreground">
              34% of customers come back. Top sellers average 45%. <strong>Improve with loyalty rewards.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full h-10 pl-9 pr-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Segment Filter */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: "all" as const, label: "All" },
          { id: "vip" as const, label: "VIP" },
          { id: "repeat" as const, label: "Repeat" },
          { id: "new" as const, label: "New" },
          { id: "at-risk" as const, label: "At Risk" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSegment(id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0",
              segment === id
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Customer List */}
      <div className="space-y-2">
        {filtered.map((customer) => {
          const seg = segmentConfig[customer.segment];
          const SegIcon = seg.icon;

          return (
            <div
              key={customer.id}
              className="rounded-xl border border-border/50 bg-card p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-sm font-bold text-white shrink-0">
                {customer.initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">{customer.name}</span>
                  <Badge className={cn("border-0 text-[10px] gap-1", seg.color)}>
                    <SegIcon className="w-3 h-3" />
                    {seg.label}
                  </Badge>
                  {customer.favorite && <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <ShoppingBag className="w-3 h-3" />
                    {customer.orders} orders
                  </span>
                  <span>${customer.totalSpent.toLocaleString()} spent</span>
                  <span>{customer.location}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Last order: {customer.lastOrder} · Likes: {customer.topCategory}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
