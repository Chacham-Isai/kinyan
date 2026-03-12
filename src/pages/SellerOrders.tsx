import { Link } from "react-router-dom";
import {
  ArrowLeft, Package, Truck, Check, Clock, Printer,
  MessageCircle, ChevronRight, Filter, Search, DollarSign,
  MapPin, User, Star, AlertCircle, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface SellerOrder {
  id: string;
  displayId: string;
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  buyer: { name: string; rating: number; totalOrders: number };
  items: { title: string; qty: number; price: number; emoji: string }[];
  total: number;
  fee: number;
  payout: number;
  date: string;
  address: string;
  shippingMethod: string;
  trackingNumber?: string;
  notes?: string;
}

const mockSellerOrders: SellerOrder[] = [
  {
    id: "so1",
    displayId: "KIN-8X12AB",
    status: "new",
    buyer: { name: "MosheDavid", rating: 4.9, totalOrders: 23 },
    items: [{ title: "Artscroll Shas — Full Set", qty: 1, price: 899, emoji: "📚" }],
    total: 899,
    fee: 71.92,
    payout: 827.08,
    date: "Mar 12, 2:15 PM",
    address: "456 Main St, Lakewood, NJ 08701",
    shippingMethod: "Standard (3-5 days)",
    notes: "Please wrap carefully — it's a gift!",
  },
  {
    id: "so2",
    displayId: "KIN-3M45NP",
    status: "processing",
    buyer: { name: "SarahR", rating: 5.0, totalOrders: 8 },
    items: [
      { title: "Sterling Silver Menorah", qty: 1, price: 240, emoji: "✡" },
      { title: "Silver Polish Kit", qty: 1, price: 18, emoji: "✨" },
    ],
    total: 258,
    fee: 20.64,
    payout: 237.36,
    date: "Mar 11, 10:30 AM",
    address: "789 Cedar Lane, Monsey, NY 10952",
    shippingMethod: "Express (1-2 days)",
  },
  {
    id: "so3",
    displayId: "KIN-7R92KL",
    status: "shipped",
    buyer: { name: "YossiB", rating: 4.7, totalOrders: 45 },
    items: [{ title: "Wooden Alef Beis Blocks", qty: 2, price: 45, emoji: "🧸" }],
    total: 90,
    fee: 7.20,
    payout: 82.80,
    date: "Mar 10, 4:45 PM",
    address: "123 Ocean Pkwy, Brooklyn, NY 11218",
    shippingMethod: "Standard (3-5 days)",
    trackingNumber: "1Z999AA10123456789",
  },
  {
    id: "so4",
    displayId: "KIN-5K18QW",
    status: "delivered",
    buyer: { name: "ChaimW", rating: 4.8, totalOrders: 15 },
    items: [{ title: "Borsalino Fedora — Black", qty: 1, price: 175, emoji: "🎩" }],
    total: 175,
    fee: 14.00,
    payout: 161.00,
    date: "Mar 8, 11:00 AM",
    address: "321 Maple Dr, Passaic, NJ 07055",
    shippingMethod: "Standard (3-5 days)",
    trackingNumber: "1Z999AA10123456790",
  },
];

const statusConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: AlertCircle },
  processing: { label: "Processing", color: "bg-amber-100 text-amber-700", icon: Clock },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: Check },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: AlertCircle },
};

const shippingOptions = [
  { id: "usps_priority", label: "USPS Priority Mail", price: "$8.50", time: "2-3 days", popular: true },
  { id: "usps_ground", label: "USPS Ground Advantage", price: "$5.25", time: "3-5 days", popular: false },
  { id: "ups_ground", label: "UPS Ground", price: "$9.80", time: "3-5 days", popular: false },
  { id: "fedex_express", label: "FedEx Express", price: "$24.50", time: "1-2 days", popular: false },
];

export default function SellerOrders() {
  const [filter, setFilter] = useState<"all" | "new" | "processing" | "shipped" | "delivered">("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>("so1");
  const [shippingOrder, setShippingOrder] = useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = useState<string>("usps_priority");

  const filtered = filter === "all"
    ? mockSellerOrders
    : mockSellerOrders.filter((o) => o.status === filter);

  const newCount = mockSellerOrders.filter((o) => o.status === "new").length;

  const handleShipOrder = (orderId: string) => {
    toast.success("Order marked as shipped!", {
      description: "Tracking info has been sent to the buyer",
    });
    setShippingOrder(null);
  };

  const handlePrintLabel = () => {
    toast.success("Shipping label ready!", {
      description: "Label generated — check your downloads",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage and ship your orders</p>
        </div>
        {newCount > 0 && (
          <Badge className="gradient-coral text-white border-0 font-bold">
            {newCount} new
          </Badge>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Pending", value: "2", color: "text-blue-600" },
          { label: "To Ship", value: "1", color: "text-amber-600" },
          { label: "In Transit", value: "1", color: "text-purple-600" },
          { label: "Completed", value: "47", color: "text-green-600" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border/50 bg-card p-3 text-center">
            <p className={cn("font-display font-bold text-lg", stat.color)}>{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {[
          { id: "all" as const, label: "All", count: mockSellerOrders.length },
          { id: "new" as const, label: "New", count: mockSellerOrders.filter((o) => o.status === "new").length },
          { id: "processing" as const, label: "Processing", count: mockSellerOrders.filter((o) => o.status === "processing").length },
          { id: "shipped" as const, label: "Shipped", count: mockSellerOrders.filter((o) => o.status === "shipped").length },
          { id: "delivered" as const, label: "Delivered", count: mockSellerOrders.filter((o) => o.status === "delivered").length },
        ].map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0",
              filter === id
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filtered.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;
          const isExpanded = expandedOrder === order.id;

          return (
            <div
              key={order.id}
              className={cn(
                "rounded-xl border bg-card overflow-hidden transition-all",
                order.status === "new" ? "border-blue-200 bg-blue-50/30" : "border-border/50"
              )}
            >
              {/* Order Header */}
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold text-foreground">{order.displayId}</span>
                    <Badge className={cn("border-0 text-[10px] gap-1", status.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="w-3 h-3" />
                    <span>{order.buyer.name}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span>{order.buyer.rating}</span>
                    <span>· {order.date}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display font-bold text-foreground">${order.total}</p>
                  <p className="text-[10px] text-green-600">You earn ${order.payout.toFixed(2)}</p>
                </div>
                <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform", isExpanded && "rotate-90")} />
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-border/30 p-4 space-y-4">
                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                        </div>
                        <span className="text-sm font-medium">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buyer note */}
                  {order.notes && (
                    <div className="rounded-lg bg-amber-50 border border-amber-200/50 p-3">
                      <p className="text-xs font-medium text-amber-800 mb-1">Buyer Note</p>
                      <p className="text-xs text-amber-700">{order.notes}</p>
                    </div>
                  )}

                  {/* Shipping address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-foreground">Ship to:</p>
                      <p className="text-xs text-muted-foreground">{order.buyer.name}</p>
                      <p className="text-xs text-muted-foreground">{order.address}</p>
                    </div>
                  </div>

                  {/* Tracking */}
                  {order.trackingNumber && (
                    <div className="flex items-center gap-2 text-xs">
                      <Truck className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Tracking:</span>
                      <span className="font-mono text-foreground">{order.trackingNumber}</span>
                    </div>
                  )}

                  {/* Fee breakdown */}
                  <div className="rounded-lg bg-secondary/50 p-3 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Item total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KINYAN fee (8%)</span>
                      <span className="text-red-500">-${order.fee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-border/30 pt-1">
                      <span className="text-green-700">Your payout</span>
                      <span className="text-green-700">${order.payout.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {(order.status === "new" || order.status === "processing") && (
                      <>
                        <Button
                          className="flex-1 h-10 gradient-primary text-white font-bold text-sm gap-1.5"
                          onClick={() => setShippingOrder(order.id)}
                        >
                          <Truck className="w-4 h-4" />
                          Ship Order
                        </Button>
                        <Button variant="outline" className="h-10 gap-1.5 text-sm" onClick={handlePrintLabel}>
                          <Printer className="w-4 h-4" />
                          Print Label
                        </Button>
                      </>
                    )}
                    <Button variant="outline" className="h-10 gap-1.5 text-sm">
                      <MessageCircle className="w-4 h-4" />
                      Message Buyer
                    </Button>
                  </div>
                </div>
              )}

              {/* Shipping Selection Modal (inline) */}
              {shippingOrder === order.id && (
                <div className="border-t border-border/30 p-4 bg-secondary/30 space-y-3">
                  <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    Choose Shipping Method
                  </h3>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedShipping(option.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                          selectedShipping === option.id
                            ? "border-primary bg-primary/5"
                            : "border-border/50 bg-white hover:bg-secondary"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                          selectedShipping === option.id ? "border-primary" : "border-border"
                        )}>
                          {selectedShipping === option.id && (
                            <div className="w-3 h-3 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{option.label}</span>
                            {option.popular && <Badge className="bg-primary/10 text-primary border-0 text-[9px]">Popular</Badge>}
                          </div>
                          <span className="text-xs text-muted-foreground">{option.time}</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">{option.price}</span>
                      </button>
                    ))}
                  </div>

                  {/* AI suggestion */}
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/10">
                    <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-primary/80">
                      <span className="font-medium">AI tip:</span> USPS Priority is the most cost-effective for this package size. Buyers in NJ typically receive in 2 days.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 h-10 gradient-primary text-white font-bold text-sm"
                      onClick={() => handleShipOrder(order.id)}
                    >
                      Confirm & Ship
                    </Button>
                    <Button variant="outline" className="h-10" onClick={() => setShippingOrder(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
