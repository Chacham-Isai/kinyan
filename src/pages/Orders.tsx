import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Order {
  id: string;
  items: { title: string; price: number; quantity: number }[];
  seller: string;
  status: "processing" | "shipped" | "delivered" | "pending";
  date: string;
  total: number;
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: "ord-1",
    items: [{ title: "Artscroll Shas — Full Set", price: 899, quantity: 1 }],
    seller: "Seforim Central",
    status: "shipped",
    date: "Mar 10, 2026",
    total: 899,
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "ord-2",
    items: [
      { title: "Borsalino Fedora — Black", price: 175, quantity: 1 },
      { title: "Black Velvet Kippa — Bulk 10-Pack", price: 45, quantity: 1 },
    ],
    seller: "The Hat Spot",
    status: "delivered",
    date: "Mar 5, 2026",
    total: 232,
  },
  {
    id: "ord-3",
    items: [{ title: "Samsung Galaxy A15 — TAG Certified Kosher", price: 249, quantity: 1 }],
    seller: "TechKosher",
    status: "processing",
    date: "Mar 12, 2026",
    total: 249,
  },
];

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "text-yellow-500 bg-yellow-500/10" },
  processing: { icon: Package, label: "Processing", color: "text-blue-500 bg-blue-500/10" },
  shipped: { icon: Truck, label: "Shipped", color: "text-primary bg-primary/10" },
  delivered: { icon: CheckCircle2, label: "Delivered", color: "text-success bg-success/10" },
};

export default function Orders() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredOrders = mockOrders.filter((order) => {
    if (filter === "active") return ["pending", "processing", "shipped"].includes(order.status);
    if (filter === "completed") return order.status === "delivered";
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-primary" />
        <h1 className="font-display text-2xl font-bold text-foreground">Orders</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all capitalize",
              filter === f
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">No orders found</p>
          <Button asChild className="gradient-primary text-white">
            <Link to="/browse">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                className="rounded-xl border border-border/50 bg-card overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">{order.id}</span>
                    <Badge className={cn("text-xs gap-1 border-0", status.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{order.date}</span>
                </div>

                {/* Items */}
                <div className="p-4 space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} · ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-border/50 flex items-center justify-between bg-secondary/30">
                  <div>
                    <p className="text-xs text-muted-foreground">Sold by {order.seller}</p>
                    <p className="font-display font-bold text-foreground mt-0.5">
                      ${order.total.toLocaleString()}
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-xs gap-1 text-primary">
                    <Link to={`/orders/${order.id}`}>
                      Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
