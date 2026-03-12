import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store, Camera, CreditCard, Check, ChevronRight, ArrowLeft,
  Sparkles, Users, DollarSign, Zap, Shield, Radio, ShoppingBag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import KinyanLogo from "@/components/marketplace/KinyanLogo";

const steps = [
  { id: "welcome", label: "Welcome", icon: Store },
  { id: "shop", label: "Your Shop", icon: ShoppingBag },
  { id: "payout", label: "Get Paid", icon: CreditCard },
  { id: "ready", label: "Ready!", icon: Zap },
];

export default function SellerOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [shopForm, setShopForm] = useState({
    shopName: "",
    description: "",
    category: "",
    location: "",
  });

  const nextStep = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border/30 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {step > 0 ? (
            <button onClick={prevStep} className="flex items-center gap-1 text-sm text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <KinyanLogo size={24} showText textClassName="text-sm" />
          )}
          <div className="flex items-center gap-1.5">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i <= step ? "w-8 bg-primary" : "w-4 bg-border/50"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{step + 1}/{steps.length}</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="space-y-8 text-center">
            <div className="w-20 h-20 rounded-3xl gradient-primary mx-auto flex items-center justify-center">
              <Store className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Start Selling on KINYAN
              </h1>
              <p className="text-muted-foreground">
                Set up your shop in under 2 minutes. No fees until you make a sale.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                { icon: Users, title: "1,200+ Active Buyers", desc: "Ready to purchase from frum sellers" },
                { icon: Radio, title: "Live Selling", desc: "Go live and sell in real-time to viewers" },
                { icon: Sparkles, title: "AI Tools", desc: "Smart pricing, descriptions, and analytics" },
                { icon: Shield, title: "Secure Payments", desc: "We handle payments, you focus on selling" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border/50 bg-white p-4 space-y-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            {/* Fee transparency */}
            <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 p-4 text-left">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-800">Simple, Transparent Pricing</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>No monthly fees.</strong> No listing fees. No paywalls.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>8% commission</strong> only when you make a sale</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span><strong>Weekly payouts</strong> directly to your bank account</span>
                </div>
              </div>
            </div>

            <Button className="w-full h-13 gradient-primary text-white font-bold text-base gap-2" onClick={nextStep}>
              Let's Get Started
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 1: Shop Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl font-bold text-foreground">Set Up Your Shop</h2>
              <p className="text-sm text-muted-foreground">Tell buyers about your shop</p>
            </div>

            {/* Shop Avatar */}
            <div className="flex justify-center">
              <button className="w-24 h-24 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-1 hover:bg-primary/5 transition-colors">
                <Camera className="w-6 h-6 text-primary" />
                <span className="text-[10px] text-primary font-medium">Add Logo</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Shop Name *</label>
                <input
                  type="text"
                  value={shopForm.shopName}
                  onChange={(e) => setShopForm((f) => ({ ...f, shopName: e.target.value }))}
                  placeholder="e.g., Brooklyn Seforim Shop"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <button
                    onClick={() => {
                      if (shopForm.shopName) {
                        setShopForm((f) => ({
                          ...f,
                          description: `Welcome to ${f.shopName}! We offer quality products at great prices with fast shipping. All items are carefully inspected and described accurately. Message us anytime with questions!`,
                        }));
                        toast.success("AI wrote a description!");
                      }
                    }}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    <Sparkles className="w-3 h-3" />
                    AI Write
                  </button>
                </div>
                <textarea
                  value={shopForm.description}
                  onChange={(e) => setShopForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Tell buyers what makes your shop special..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Main Category</label>
                <select
                  value={shopForm.category}
                  onChange={(e) => setShopForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select your main category</option>
                  <option value="seforim">Seforim & Books</option>
                  <option value="judaica">Judaica & Silver</option>
                  <option value="fashion">Fashion & Hats</option>
                  <option value="electronics">Electronics & Tech</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="simcha">Simcha Supplies</option>
                  <option value="kids">Kids & Toys</option>
                  <option value="food">Food & Groceries</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Location</label>
                <input
                  type="text"
                  value={shopForm.location}
                  onChange={(e) => setShopForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="e.g., Brooklyn, NY"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <Button
              className="w-full h-12 gradient-primary text-white font-bold gap-2"
              disabled={!shopForm.shopName}
              onClick={nextStep}
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Payout Setup */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl font-bold text-foreground">Get Paid</h2>
              <p className="text-sm text-muted-foreground">Add your bank details for weekly payouts</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Bank Name</label>
                <input
                  type="text"
                  placeholder="e.g., Chase, TD Bank, First National"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Routing Number</label>
                <input
                  type="text"
                  placeholder="9 digits"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Account Number</label>
                <input
                  type="text"
                  placeholder="Your account number"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="rounded-lg bg-secondary/50 p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payout schedule</span>
                  <span className="font-medium">Every Tuesday</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum payout</span>
                  <span className="font-medium">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing time</span>
                  <span className="font-medium">1-2 business days</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5 text-green-600" />
                <span>Your banking info is encrypted and never shared</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button className="w-full h-12 gradient-primary text-white font-bold gap-2" onClick={nextStep}>
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
              <button onClick={nextStep} className="text-sm text-muted-foreground hover:text-foreground text-center">
                Skip for now — I'll add this later
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ready! */}
        {step === 3 && (
          <div className="space-y-8 text-center">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-24 h-24 rounded-3xl bg-green-100 flex items-center justify-center">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-3xl font-bold text-foreground">You're All Set!</h2>
              <p className="text-muted-foreground">
                {shopForm.shopName ? `${shopForm.shopName} is ready` : "Your shop is ready"} to start selling on KINYAN
              </p>
            </div>

            {/* What's next */}
            <div className="space-y-3 text-left">
              <h3 className="font-display font-bold text-foreground text-sm text-center">What would you like to do first?</h3>
              {[
                {
                  icon: ShoppingBag,
                  title: "List Your First Item",
                  desc: "Add a product in under 60 seconds",
                  action: () => navigate("/sell"),
                  primary: true,
                },
                {
                  icon: Radio,
                  title: "Go Live",
                  desc: "Start a live selling stream",
                  action: () => navigate("/sell"),
                  primary: false,
                },
                {
                  icon: Store,
                  title: "View Dashboard",
                  desc: "See your seller analytics",
                  action: () => navigate("/dashboard"),
                  primary: false,
                },
              ].map(({ icon: Icon, title, desc, action, primary }) => (
                <button
                  key={title}
                  onClick={action}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left",
                    primary
                      ? "gradient-primary text-white"
                      : "border border-border/50 bg-white hover:bg-secondary"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    primary ? "bg-white/20" : "bg-primary/10"
                  )}>
                    <Icon className={cn("w-6 h-6", primary ? "text-white" : "text-primary")} />
                  </div>
                  <div>
                    <p className={cn("font-semibold", primary ? "text-white" : "text-foreground")}>{title}</p>
                    <p className={cn("text-xs", primary ? "text-white/70" : "text-muted-foreground")}>{desc}</p>
                  </div>
                  <ChevronRight className={cn("w-5 h-5 ml-auto shrink-0", primary ? "text-white/60" : "text-muted-foreground")} />
                </button>
              ))}
            </div>

            <button
              onClick={() => navigate("/home")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              I'll explore first →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
