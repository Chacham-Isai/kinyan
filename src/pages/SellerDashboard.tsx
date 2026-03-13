import { Link } from "react-router-dom";
import {
  ArrowLeft, TrendingUp, DollarSign, Eye, ShoppingBag,
  BarChart3, Users, Star, Zap, Package, ArrowUpRight, ArrowDownRight,
  Monitor, Tag
} from "lucide-react";
import SellerCoupons from "@/components/marketplace/SellerCoupons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Mock analytics data
const stats = {
  revenue: { value: "$4,285", change: "+12.3%", up: true },
  views: { value: "1,842", change: "+8.7%", up: true },
  orders: { value: "47", change: "+3.2%", up: true },
  conversionRate: { value: "2.55%", change: "-0.4%", up: false },
};

const topProducts = [
  { name: "Artscroll Shas — Full Set", revenue: "$2,697", units: 3, views: 342 },
  { name: "Borsalino Fedora — Black", revenue: "$875", units: 5, views: 218 },
  { name: "Sterling Silver Menorah", revenue: "$480", units: 2, views: 187 },
  { name: "Samsung Galaxy A15 — Kosher", revenue: "$498", units: 2, views: 156 },
];

const aiInsights = [
  {
    type: "opportunity" as const,
    title: "Trending: Pesach items",
    description: "Pesach searches are up 340% this week. Consider listing hagados, seder plates, and matzah covers.",
    action: "List Pesach items",
  },
  {
    type: "pricing" as const,
    title: "Price optimization",
    description: "Your Borsalino Fedora is priced 15% above similar listings. Reducing to $159 could boost sales by ~25%.",
    action: "Adjust pricing",
  },
  {
    type: "timing" as const,
    title: "Best time to go live",
    description: "Your audience is most active Motzei Shabbos 9-11 PM EST and Sunday mornings 10-12 PM.",
    action: "Schedule stream",
  },
  {
    type: "inventory" as const,
    title: "Restock alert",
    description: "Artscroll Shas inventory is low. Based on demand patterns, order 5+ units to avoid stockouts.",
    action: "Manage inventory",
  },
];

const revenueByDay = [
  { day: "Sun", amount: 820 },
  { day: "Mon", amount: 450 },
  { day: "Tue", amount: 380 },
  { day: "Wed", amount: 520 },
  { day: "Thu", amount: 690 },
  { day: "Fri", amount: 280 },
  { day: "Motz", amount: 1145 },
];

const maxRevenue = Math.max(...revenueByDay.map((d) => d.amount));

const insightColors = {
  opportunity: "bg-green-50 border-green-200/50 text-green-800",
  pricing: "bg-amber-50 border-amber-200/50 text-amber-800",
  timing: "bg-blue-50 border-blue-200/50 text-blue-800",
  inventory: "bg-red-50 border-red-200/50 text-red-800",
};

const insightIcons = {
  opportunity: TrendingUp,
  pricing: DollarSign,
  timing: Zap,
  inventory: Package,
};

export default function SellerDashboard() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("7d");

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Seller Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-powered insights for your shop</p>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          {(["7d", "30d", "90d"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                period === p ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Revenue", icon: DollarSign, ...stats.revenue },
          { label: "Views", icon: Eye, ...stats.views },
          { label: "Orders", icon: ShoppingBag, ...stats.orders },
          { label: "Conversion", icon: BarChart3, ...stats.conversionRate },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
              <span className={cn(
                "text-xs font-medium flex items-center gap-0.5",
                stat.up ? "text-green-600" : "text-red-500"
              )}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="font-display font-bold text-xl text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-border/50 bg-card p-5">
        <h2 className="font-display font-bold text-foreground text-sm mb-4">Revenue This Week</h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {revenueByDay.map((day) => (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">${day.amount}</span>
              <div
                className={cn(
                  "w-full rounded-t-md transition-all",
                  day.day === "Mot" ? "gradient-primary" : "bg-primary/20"
                )}
                style={{ height: `${(day.amount / maxRevenue) * 100}%` }}
              />
              <span className="text-[10px] font-medium text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-foreground">AI Insights</h2>
          <Badge className="bg-primary/10 text-primary border-0 text-[10px]">Smart</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight) => {
            const Icon = insightIcons[insight.type];
            return (
              <div
                key={insight.title}
                className={cn(
                  "rounded-xl border p-4 space-y-2",
                  insightColors[insight.type]
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{insight.title}</span>
                </div>
                <p className="text-xs opacity-80">{insight.description}</p>
                <Button size="sm" variant="outline" className="text-xs h-7 bg-white/80">
                  {insight.action}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-xl border border-border/50 bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-foreground text-sm">Top Products</h2>
          <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
            <Link to="/sell">Manage listings</Link>
          </Button>
        </div>
        <div className="space-y-3">
          {topProducts.map((product, i) => (
            <div key={product.name} className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{product.units} sold</span>
                  <span>{product.views} views</span>
                </div>
              </div>
              <span className="text-sm font-bold text-foreground">{product.revenue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Insights */}
      <div className="rounded-xl border border-border/50 bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-primary" />
          <h2 className="font-display font-bold text-foreground text-sm">Customer Insights</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Repeat Buyers", value: "34%", sub: "of total customers" },
            { label: "Avg Order Value", value: "$91.17", sub: "+$12 from last month" },
            { label: "Top Location", value: "Brooklyn", sub: "38% of orders" },
            { label: "Customer Rating", value: "4.9", sub: "from 47 reviews" },
          ].map((insight) => (
            <div key={insight.label} className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="font-display font-bold text-lg text-foreground">{insight.value}</p>
              <p className="text-xs font-medium text-foreground">{insight.label}</p>
              <p className="text-[10px] text-muted-foreground">{insight.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Label Generator */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-primary" />
          <h2 className="font-display font-bold text-foreground text-sm">Ship an Order</h2>
          <Badge className="bg-green-50 text-green-700 border-0 text-[9px]">Discounted Rates</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { carrier: "USPS", service: "Priority Mail", price: "$7.99", time: "2-3 days", logo: "📬" },
            { carrier: "UPS", service: "Ground", price: "$9.99", time: "3-5 days", logo: "📦" },
            { carrier: "FedEx", service: "Home Delivery", price: "$11.99", time: "2-5 days", logo: "📫" },
          ].map((rate) => (
            <div
              key={rate.carrier}
              className="rounded-lg border border-border/50 p-3 hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{rate.logo}</span>
                <div>
                  <p className="text-xs font-semibold">{rate.carrier}</p>
                  <p className="text-[10px] text-muted-foreground">{rate.service}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-primary">{rate.price}</span>
                <span className="text-[10px] text-muted-foreground">{rate.time}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground">
          Save up to 40% on shipping with KINYAN seller rates. Labels include tracking and insurance.
        </p>
      </div>

      {/* Live Stream Performance */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <h2 className="font-display font-bold text-foreground text-sm">Stream Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Avg Viewers", value: "187", sub: "+23% vs last stream" },
            { label: "Peak Viewers", value: "489", sub: "Kosher Phone Deals" },
            { label: "Stream Revenue", value: "$1,247", sub: "Last 7 days" },
            { label: "Chat Messages", value: "342", sub: "Avg per stream" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-lg bg-secondary/50">
              <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
              <p className="text-xs font-medium text-foreground">{stat.label}</p>
              <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seller Coupons */}
      <div className="rounded-xl border border-border/50 bg-card p-5">
        <SellerCoupons mode="seller" />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Manage Orders", path: "/seller-orders", icon: Package, badge: "2 new" },
          { label: "Customers", path: "/customers", icon: Users },
          { label: "OBS Setup", path: "/obs-setup", icon: Monitor },
          { label: "Payments", path: "/payments", icon: DollarSign },
        ].map(({ label, path, icon: Icon, badge }) => (
          <Link
            key={path}
            to={path}
            className="rounded-xl border border-border/50 bg-card p-4 hover:bg-secondary transition-colors flex flex-col items-center gap-2 text-center"
          >
            <Icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{label}</span>
            {badge && <Badge className="gradient-coral text-white border-0 text-[9px]">{badge}</Badge>}
          </Link>
        ))}
      </div>
    </div>
  );
}
