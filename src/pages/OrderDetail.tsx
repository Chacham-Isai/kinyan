import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Package, Truck, Check, Clock, MapPin, CreditCard, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import BuyerProtection from "@/components/marketplace/BuyerProtection";
import { toast } from "sonner";

const mockOrderDetails = {
  "ord-1": {
    id: "KIN-7X92KD",
    status: "shipped" as const,
    date: "Mar 10, 2026",
    items: [
      { title: "Artscroll Shas — Full Set", qty: 1, price: 899, seller: "Seforim Central", emoji: "📚" },
    ],
    subtotal: 899,
    shipping: 0,
    total: 899,
    address: "123 Ocean Parkway, Brooklyn, NY 11218",
    tracking: "1Z999AA10123456784",
    timeline: [
      { label: "Order placed", time: "Mar 10, 10:32 AM", done: true },
      { label: "Payment confirmed", time: "Mar 10, 10:33 AM", done: true },
      { label: "Shipped", time: "Mar 11, 2:15 PM", done: true },
      { label: "Out for delivery", time: "", done: false },
      { label: "Delivered", time: "", done: false },
    ],
  },
  "ord-2": {
    id: "KIN-4P81MR",
    status: "delivered" as const,
    date: "Mar 5, 2026",
    items: [
      { title: "Borsalino Fedora — Black", qty: 1, price: 175, seller: "The Hat Spot", emoji: "🎩" },
      { title: "Black Velvet Kippa — Bulk 10-Pack", qty: 1, price: 45, seller: "Simcha Style", emoji: "👔" },
    ],
    subtotal: 220,
    shipping: 12,
    total: 232,
    address: "456 Main St, Lakewood, NJ 08701",
    tracking: "1Z999AA10123456785",
    timeline: [
      { label: "Order placed", time: "Mar 5, 8:15 AM", done: true },
      { label: "Payment confirmed", time: "Mar 5, 8:16 AM", done: true },
      { label: "Shipped", time: "Mar 6, 11:30 AM", done: true },
      { label: "Out for delivery", time: "Mar 8, 7:45 AM", done: true },
      { label: "Delivered", time: "Mar 8, 2:30 PM", done: true },
    ],
  },
  "ord-3": {
    id: "KIN-9F23LQ",
    status: "processing" as const,
    date: "Mar 12, 2026",
    items: [
      { title: "Samsung Galaxy A15 — TAG Certified Kosher", qty: 1, price: 249, seller: "TechKosher", emoji: "📱" },
    ],
    subtotal: 249,
    shipping: 0,
    total: 249,
    address: "789 Elm Ave, Monsey, NY 10952",
    tracking: "",
    timeline: [
      { label: "Order placed", time: "Mar 12, 9:00 AM", done: true },
      { label: "Payment confirmed", time: "Mar 12, 9:01 AM", done: true },
      { label: "Shipped", time: "", done: false },
      { label: "Out for delivery", time: "", done: false },
      { label: "Delivered", time: "", done: false },
    ],
  },
};

const statusConfig = {
  processing: { label: "Processing", color: "bg-blue-100 text-blue-700", icon: Clock },
  shipped: { label: "Shipped", color: "bg-amber-100 text-amber-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: Check },
};

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = mockOrderDetails[orderId as keyof typeof mockOrderDetails];

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <Package className="w-12 h-12 text-muted-foreground mx-auto" />
        <h1 className="font-display text-xl font-bold">Order not found</h1>
        <Button asChild className="gradient-primary text-white">
          <Link to="/orders">View all orders</Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Orders
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Order #{order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed {order.date}</p>
        </div>
        <Badge className={cn("gap-1 border-0", status.color)}>
          <StatusIcon className="w-3.5 h-3.5" />
          {status.label}
        </Badge>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <h2 className="font-display font-bold text-foreground text-sm">Tracking</h2>
        <div className="space-y-0">
          {order.timeline.map((step, i) => {
            const isLast = i === order.timeline.length - 1;
            return (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-3 h-3 rounded-full border-2 shrink-0",
                    step.done
                      ? "bg-primary border-primary"
                      : "bg-white border-muted-foreground/30"
                  )} />
                  {!isLast && (
                    <div className={cn(
                      "w-0.5 h-8",
                      step.done ? "bg-primary" : "bg-muted-foreground/15"
                    )} />
                  )}
                </div>
                <div className="pb-6">
                  <p className={cn(
                    "text-sm font-medium",
                    step.done ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {order.tracking && (
          <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
            Tracking: <span className="font-mono text-foreground">{order.tracking}</span>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
        <h2 className="font-display font-bold text-foreground text-sm">Items</h2>
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-xl">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.seller} · Qty: {item.qty}</p>
            </div>
            <span className="text-sm font-bold text-foreground">${item.price}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-2">
        <h2 className="font-display font-bold text-foreground text-sm mb-3">Summary</h2>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${order.subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{order.shipping === 0 ? <span className="text-green-600">Free</span> : `$${order.shipping}`}</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-border/50 pt-2">
          <span>Total</span>
          <span>${order.total}</span>
        </div>
      </div>

      {/* Shipping address */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-display font-bold text-foreground text-sm">Shipping Address</h2>
        </div>
        <p className="text-sm text-muted-foreground">{order.address}</p>
      </div>

      {/* Buyer Protection */}
      <BuyerProtection
        orderId={order.id}
        sellerName={order.items[0]?.seller || "Seller"}
        itemTitle={order.items[0]?.title || "Item"}
        amount={order.total}
        status={order.status === "delivered" ? "resolved" : "protected"}
      />

      {/* Shipping Details */}
      {order.tracking && (
        <div className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-4 h-4 text-primary" />
            <h2 className="font-display font-bold text-foreground text-sm">Shipping Details</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Carrier</p>
              <p className="font-medium">USPS Priority Mail</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Est. Delivery</p>
              <p className="font-medium">Mar 15, 2026</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="font-medium">2.4 lbs</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Insurance</p>
              <p className="font-medium text-green-600">Included</p>
            </div>
          </div>
        </div>
      )}

      {/* Rate & Review */}
      {order.status === "delivered" && (
        <div className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
          <h2 className="font-display font-bold text-foreground text-sm">Rate Your Purchase</h2>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-2xl text-muted-foreground/30 hover:text-yellow-400 transition-colors"
                onClick={() => toast.success(`Rated ${star} stars! Thank you for your feedback.`)}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Your review helps the community make better decisions</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 gap-2" asChild>
          <Link to="/messages">
            <MessageCircle className="w-4 h-4" />
            Contact Seller
          </Link>
        </Button>
        <Button variant="outline" className="flex-1 gap-2" asChild>
          <Link to="/help">
            Help
          </Link>
        </Button>
      </div>
    </div>
  );
}
