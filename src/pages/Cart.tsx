import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, Shield, Truck, CreditCard, MapPin, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  seller: string;
  condition: string;
  shipping: "Free" | number;
  color: string;
}

type CheckoutStep = "cart" | "shipping" | "payment" | "confirm";

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "p1",
      title: "Artscroll Shas — Full Set",
      price: 899,
      quantity: 1,
      seller: "Seforim Central",
      condition: "New",
      shipping: "Free",
      color: "bg-amber-100",
    },
    {
      id: "p3",
      title: "Borsalino Fedora — Black",
      price: 175,
      quantity: 1,
      seller: "The Hat Spot",
      condition: "Like New",
      shipping: 12,
      color: "bg-slate-200",
    },
  ]);

  const [step, setStep] = useState<CheckoutStep>("cart");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [processing, setProcessing] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingTotal = items.reduce(
    (sum, item) => sum + (item.shipping === "Free" ? 0 : (item.shipping as number)),
    0
  );
  const total = subtotal + shippingTotal;

  const canProceedToPayment = shippingInfo.name && shippingInfo.address && shippingInfo.city && shippingInfo.state && shippingInfo.zip;

  const handlePlaceOrder = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setStep("confirm");
    toast.success("Order placed!", { description: "You'll receive a confirmation email shortly." });
  };

  if (step === "confirm") {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Your order #KIN-{Math.random().toString(36).substring(2, 8).toUpperCase()} has been placed.
            You'll receive tracking info once the seller ships.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button asChild className="gradient-primary text-white">
            <Link to="/orders">View Orders</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/browse">Keep Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue shopping
      </Link>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {(["cart", "shipping", "payment"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (s === "cart") setStep("cart");
                if (s === "shipping" && items.length > 0) setStep("shipping");
              }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                step === s
                  ? "gradient-primary text-white"
                  : (["cart", "shipping", "payment"].indexOf(step) > i)
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {["cart", "shipping", "payment"].indexOf(step) > i ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                i + 1
              )}
            </button>
            {i < 2 && <div className="w-8 h-0.5 bg-border rounded" />}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h1 className="font-display text-2xl font-bold text-foreground">
          {step === "cart" ? "Cart" : step === "shipping" ? "Shipping" : "Payment"}
        </h1>
        {step === "cart" && (
          <Badge variant="secondary" className="text-xs">
            {items.length} items
          </Badge>
        )}
      </div>

      {items.length === 0 && step === "cart" ? (
        <div className="text-center py-16 space-y-4">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <Button asChild className="gradient-primary text-white">
            <Link to="/browse">Start shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-3">
            {step === "cart" && items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card"
              >
                <div className={cn("w-20 h-20 rounded-lg shrink-0 flex items-center justify-center", item.color)}>
                  <span className="text-2xl">{item.id === "p1" ? "📚" : "🎩"}</span>
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Link to={`/product/${item.id}`} className="font-medium text-sm hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.seller}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{item.condition}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Truck className="w-3 h-3" />
                      {item.shipping === "Free" ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        `$${item.shipping}`
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <span className="font-display font-bold text-foreground">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {step === "shipping" && (
              <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h2 className="font-display font-bold text-foreground">Shipping Address</h2>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Full name"
                    className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo((s) => ({ ...s, address: e.target.value }))}
                    placeholder="Street address"
                    className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo((s) => ({ ...s, city: e.target.value }))}
                      placeholder="City"
                      className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo((s) => ({ ...s, state: e.target.value }))}
                      placeholder="State"
                      className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="text"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo((s) => ({ ...s, zip: e.target.value }))}
                      placeholder="ZIP"
                      className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <h2 className="font-display font-bold text-foreground">Payment Method</h2>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping summary */}
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Shipping to:</span>
                    <span className="font-medium text-foreground">
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
              <h2 className="font-display font-bold text-foreground">Order Summary</h2>
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-muted-foreground">
                    <span className="truncate pr-2">{item.title} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-border/50 pt-2 flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shippingTotal === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shippingTotal}`
                    )}
                  </span>
                </div>
                <div className="border-t border-border/50 pt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-display font-bold text-lg">${total.toLocaleString()}</span>
                </div>
              </div>

              {step === "cart" && (
                <Button
                  className="w-full h-11 gradient-primary text-white font-bold gap-2"
                  onClick={() => setStep("shipping")}
                  disabled={items.length === 0}
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
              {step === "shipping" && (
                <Button
                  className="w-full h-11 gradient-primary text-white font-bold gap-2"
                  onClick={() => setStep("payment")}
                  disabled={!canProceedToPayment}
                >
                  Continue to Payment
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
              {step === "payment" && (
                <Button
                  className="w-full h-11 gradient-primary text-white font-bold"
                  onClick={handlePlaceOrder}
                  disabled={processing}
                >
                  {processing ? "Processing..." : `Place Order — $${total.toLocaleString()}`}
                </Button>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Shield className="w-3.5 h-3.5 text-primary" />
                Buyer protection on every order
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
