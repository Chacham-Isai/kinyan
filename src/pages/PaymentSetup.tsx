import { Link } from "react-router-dom";
import {
  ArrowLeft, CreditCard, Building2, Shield, Check,
  DollarSign, Percent, Info, ChevronRight, Zap, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const mockPaymentMethods: PaymentMethod[] = [
  { id: "pm1", type: "visa", last4: "4242", expiry: "08/27", isDefault: true },
  { id: "pm2", type: "mastercard", last4: "5555", expiry: "12/26", isDefault: false },
];

const cardIcons = {
  visa: "💳",
  mastercard: "💳",
  amex: "💳",
};

export default function PaymentSetup() {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");
  const [addingCard, setAddingCard] = useState(false);
  const [sellerSetupStep, setSellerSetupStep] = useState(0);
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvc: "", name: "" });
  const [bankForm, setBankForm] = useState({ routing: "", account: "", name: "", type: "checking" });

  const handleAddCard = () => {
    if (cardForm.number && cardForm.expiry && cardForm.cvc) {
      toast.success("Payment method added!", { description: "Your card ending in " + cardForm.number.slice(-4) + " was saved" });
      setAddingCard(false);
      setCardForm({ number: "", expiry: "", cvc: "", name: "" });
    }
  };

  const handleSellerSetup = () => {
    if (sellerSetupStep < 2) {
      setSellerSetupStep((s) => s + 1);
    } else {
      toast.success("Payout setup complete!", { description: "You can now receive payments from sales" });
      setSellerSetupStep(3);
    }
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
        <h1 className="font-display text-2xl font-bold text-foreground">Payments</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage payment methods and seller payouts</p>
      </div>

      {/* Tab Switch */}
      <div className="flex items-center gap-2 p-1 bg-secondary rounded-xl">
        <button
          onClick={() => setTab("buyer")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
            tab === "buyer" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
          )}
        >
          <CreditCard className="w-4 h-4" />
          Payment Methods
        </button>
        <button
          onClick={() => setTab("seller")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all",
            tab === "seller" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
          )}
        >
          <Building2 className="w-4 h-4" />
          Seller Payouts
        </button>
      </div>

      {tab === "buyer" ? (
        <div className="space-y-4">
          {/* Existing Cards */}
          {mockPaymentMethods.map((method) => (
            <div
              key={method.id}
              className={cn(
                "rounded-xl border p-4 flex items-center gap-4",
                method.isDefault ? "border-primary/30 bg-primary/5" : "border-border/50 bg-card"
              )}
            >
              <span className="text-2xl">{cardIcons[method.type]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground capitalize">{method.type} ···· {method.last4}</p>
                  {method.isDefault && <Badge className="bg-primary/10 text-primary border-0 text-[10px]">Default</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">Expires {method.expiry}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}

          {/* Add Card */}
          {!addingCard ? (
            <button
              onClick={() => setAddingCard(true)}
              className="w-full rounded-xl border-2 border-dashed border-border/50 p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              Add payment method
            </button>
          ) : (
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
              <h3 className="font-display font-bold text-foreground text-sm">Add Card</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card number"
                  value={cardForm.number}
                  onChange={(e) => setCardForm((f) => ({ ...f, number: e.target.value }))}
                  className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardForm.expiry}
                    onChange={(e) => setCardForm((f) => ({ ...f, expiry: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cardForm.cvc}
                    onChange={(e) => setCardForm((f) => ({ ...f, cvc: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder name"
                  value={cardForm.name}
                  onChange={(e) => setCardForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gradient-primary text-white font-bold" onClick={handleAddCard}>
                  Save Card
                </Button>
                <Button variant="outline" onClick={() => setAddingCard(false)}>
                  Cancel
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5 text-green-600" />
                <span>Secured with 256-bit encryption. Your data is never stored on our servers.</span>
              </div>
            </div>
          )}

          {/* Quick checkout info */}
          <div className="rounded-xl bg-gradient-to-r from-primary/5 to-cyan-50 border border-primary/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Quick Checkout</span>
            </div>
            <p className="text-xs text-muted-foreground">
              With a saved payment method, you can buy items instantly with one tap.
              No need to re-enter card details — just swipe, tap, and it's yours.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Fee Structure */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-3">
            <h2 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
              <Percent className="w-4 h-4 text-primary" />
              KINYAN Fee Structure
            </h2>
            <div className="space-y-2">
              {[
                { label: "Marketplace fee", value: "8%", desc: "On every sale" },
                { label: "Payment processing", value: "2.9% + $0.30", desc: "Standard card processing" },
                { label: "Live stream sales", value: "10%", desc: "Includes stream hosting" },
                { label: "Charity campaigns", value: "0%", desc: "Free for verified charities" },
              ].map((fee) => (
                <div key={fee.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{fee.label}</p>
                    <p className="text-xs text-muted-foreground">{fee.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{fee.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 pt-1">
              <Info className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                No monthly fees, no listing fees, no paywalls. You only pay when you make a sale.
              </p>
            </div>
          </div>

          {/* Seller Payout Setup */}
          {sellerSetupStep < 3 ? (
            <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
              <h2 className="font-display font-bold text-foreground text-sm">Set Up Payouts</h2>

              {/* Progress steps */}
              <div className="flex items-center gap-2">
                {["Identity", "Bank Account", "Confirm"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                      i < sellerSetupStep
                        ? "gradient-primary text-white"
                        : i === sellerSetupStep
                          ? "border-2 border-primary text-primary"
                          : "border-2 border-border/50 text-muted-foreground"
                    )}>
                      {i < sellerSetupStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={cn(
                      "text-xs font-medium hidden sm:block",
                      i <= sellerSetupStep ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step}
                    </span>
                    {i < 2 && <div className="flex-1 h-0.5 bg-border/30 hidden sm:block" />}
                  </div>
                ))}
              </div>

              {/* Step content */}
              {sellerSetupStep === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Verify your identity to start receiving payouts</p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Legal full name"
                      className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="text"
                      placeholder="Date of birth (MM/DD/YYYY)"
                      className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="text"
                      placeholder="Last 4 digits of SSN"
                      className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              )}

              {sellerSetupStep === 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Add your bank account for payouts</p>
                  <div className="flex gap-2 mb-2">
                    {["checking", "savings"].map((type) => (
                      <Badge
                        key={type}
                        variant="secondary"
                        className={cn(
                          "cursor-pointer px-4 py-1.5 text-xs capitalize transition-colors",
                          bankForm.type === type ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
                        )}
                        onClick={() => setBankForm((f) => ({ ...f, type }))}
                      >
                        {bankForm.type === type && <Check className="w-3 h-3 mr-1" />}
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Routing number"
                    value={bankForm.routing}
                    onChange={(e) => setBankForm((f) => ({ ...f, routing: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    placeholder="Account number"
                    value={bankForm.account}
                    onChange={(e) => setBankForm((f) => ({ ...f, account: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    placeholder="Account holder name"
                    value={bankForm.name}
                    onChange={(e) => setBankForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full h-11 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}

              {sellerSetupStep === 2 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Review and confirm your payout details</p>
                  <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payout method</span>
                      <span className="font-medium">Bank Transfer (ACH)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payout schedule</span>
                      <span className="font-medium">Weekly (Tuesdays)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Min payout</span>
                      <span className="font-medium">$10.00</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full h-12 gradient-primary text-white font-bold"
                onClick={handleSellerSetup}
              >
                {sellerSetupStep === 2 ? "Complete Setup" : "Continue"}
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-green-100 mx-auto flex items-center justify-center">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="font-display font-bold text-green-800">Payouts Active</h2>
              <p className="text-sm text-green-700">
                You're all set to receive payments. Payouts are processed weekly on Tuesdays.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-lg bg-white p-3 text-center">
                  <p className="font-display font-bold text-foreground">$4,285</p>
                  <p className="text-xs text-muted-foreground">Total earned</p>
                </div>
                <div className="rounded-lg bg-white p-3 text-center">
                  <p className="font-display font-bold text-foreground">$892</p>
                  <p className="text-xs text-muted-foreground">Next payout</p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits */}
          <div className="rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 p-4 space-y-3">
            <h3 className="font-display font-bold text-foreground text-sm flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Seller Benefits
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "No monthly fees",
                "No listing fees",
                "Live selling tools",
                "AI pricing help",
                "Seller analytics",
                "Fast payouts",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-xs">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
