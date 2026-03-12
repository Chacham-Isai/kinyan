import { useState } from "react";
import { Tag, Plus, Trash2, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface Coupon {
  id: string;
  code: string;
  discount: number; // percentage
  type: "percentage" | "fixed";
  fixedAmount?: number;
  minSpend: number;
  maxUses: number;
  usedCount: number;
  expiresAt: Date;
  isActive: boolean;
}

interface SellerCouponsProps {
  mode: "seller" | "buyer";
  sellerName?: string;
}

const MOCK_COUPONS: Coupon[] = [
  {
    id: "cp1",
    code: "WELCOME15",
    discount: 15,
    type: "percentage",
    minSpend: 25,
    maxUses: 100,
    usedCount: 47,
    expiresAt: new Date(Date.now() + 30 * 86400000),
    isActive: true,
  },
  {
    id: "cp2",
    code: "LIVE10",
    discount: 10,
    type: "percentage",
    minSpend: 50,
    maxUses: 50,
    usedCount: 22,
    expiresAt: new Date(Date.now() + 7 * 86400000),
    isActive: true,
  },
  {
    id: "cp3",
    code: "FREESHIP",
    discount: 0,
    type: "fixed",
    fixedAmount: 10,
    minSpend: 30,
    maxUses: 200,
    usedCount: 89,
    expiresAt: new Date(Date.now() + 14 * 86400000),
    isActive: true,
  },
];

export default function SellerCoupons({ mode, sellerName }: SellerCouponsProps) {
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [showCreate, setShowCreate] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newMinSpend, setNewMinSpend] = useState("");
  const [newMaxUses, setNewMaxUses] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const createCoupon = () => {
    if (!newCode || !newDiscount) return;
    const coupon: Coupon = {
      id: `cp-${Date.now()}`,
      code: newCode.toUpperCase(),
      discount: parseInt(newDiscount),
      type: "percentage",
      minSpend: parseInt(newMinSpend) || 0,
      maxUses: parseInt(newMaxUses) || 100,
      usedCount: 0,
      expiresAt: new Date(Date.now() + 30 * 86400000),
      isActive: true,
    };
    setCoupons((prev) => [coupon, ...prev]);
    setNewCode("");
    setNewDiscount("");
    setNewMinSpend("");
    setNewMaxUses("");
    setShowCreate(false);
    toast.success(`Coupon ${coupon.code} created!`);
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) => prev.map((c) => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    toast("Coupon deleted");
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Code "${code}" copied!`);
  };

  const applyCoupon = (code: string) => {
    setAppliedCoupon(code);
    toast.success(`Coupon ${code} applied!`);
  };

  // Buyer view: see available coupons from a seller
  if (mode === "buyer") {
    const activeCoupons = coupons.filter((c) => c.isActive && c.usedCount < c.maxUses);
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">
            {sellerName ? `${sellerName}'s Coupons` : "Available Coupons"}
          </span>
        </div>
        {activeCoupons.length === 0 ? (
          <p className="text-xs text-muted-foreground">No coupons available right now</p>
        ) : (
          <div className="space-y-2">
            {activeCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all",
                  appliedCoupon === coupon.code
                    ? "border-green-300 bg-green-50"
                    : "border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10"
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-primary">{coupon.code}</span>
                    <button onClick={() => copyCouponCode(coupon.code)}>
                      <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {coupon.type === "percentage" ? `${coupon.discount}% off` : `$${coupon.fixedAmount} off`}
                    {coupon.minSpend > 0 && ` · Min $${coupon.minSpend}`}
                  </p>
                </div>
                {appliedCoupon === coupon.code ? (
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Applied
                  </Badge>
                ) : (
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => applyCoupon(coupon.code)}>
                    Apply
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Seller view: manage coupons
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Discount Codes</span>
          <Badge variant="secondary" className="text-[10px]">{coupons.length} active</Badge>
        </div>
        <Button size="sm" className="text-xs gap-1 h-7" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="w-3 h-3" />
          Create
        </Button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              placeholder="Code (e.g. SAVE20)"
              className="h-8 px-3 rounded-lg bg-background border border-border/50 text-xs uppercase"
            />
            <input
              type="number"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              placeholder="Discount %"
              className="h-8 px-3 rounded-lg bg-background border border-border/50 text-xs"
            />
            <input
              type="number"
              value={newMinSpend}
              onChange={(e) => setNewMinSpend(e.target.value)}
              placeholder="Min spend ($)"
              className="h-8 px-3 rounded-lg bg-background border border-border/50 text-xs"
            />
            <input
              type="number"
              value={newMaxUses}
              onChange={(e) => setNewMaxUses(e.target.value)}
              placeholder="Max uses"
              className="h-8 px-3 rounded-lg bg-background border border-border/50 text-xs"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="text-xs h-7 flex-1" onClick={createCoupon}>Create Coupon</Button>
            <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Coupon List */}
      <div className="space-y-2">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border",
              coupon.isActive ? "border-border/50 bg-card" : "border-border/30 bg-secondary/30 opacity-60"
            )}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm">{coupon.code}</span>
                {!coupon.isActive && <Badge className="text-[9px] bg-gray-100 text-gray-500 border-0">Inactive</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {coupon.type === "percentage" ? `${coupon.discount}% off` : `$${coupon.fixedAmount} off`}
                {coupon.minSpend > 0 && ` · Min $${coupon.minSpend}`}
                {` · ${coupon.usedCount}/${coupon.maxUses} used`}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={() => toggleCoupon(coupon.id)}
              >
                {coupon.isActive ? "⏸️" : "▶️"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-red-500"
                onClick={() => deleteCoupon(coupon.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
