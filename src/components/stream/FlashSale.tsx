import { useState, useEffect } from "react";
import { Zap, Clock, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FlashSaleProps {
  title: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  durationSeconds: number;
  onPurchase?: () => void;
}

export default function FlashSale({
  title,
  originalPrice,
  salePrice,
  quantity,
  durationSeconds,
  onPurchase,
}: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [claimed, setClaimed] = useState(0);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);

    // Simulate others claiming
    const claimInterval = setInterval(() => {
      setClaimed((prev) => Math.min(quantity - 1, prev + 1));
    }, 3000 + Math.random() * 5000);

    return () => { clearInterval(interval); clearInterval(claimInterval); };
  }, [timeLeft, quantity]);

  const remaining = quantity - claimed;
  const discount = Math.round((1 - salePrice / originalPrice) * 100);
  const isEnding = timeLeft <= 30;
  const isOver = timeLeft <= 0 || remaining <= 0;

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isOver && !purchased) {
    return (
      <div className="rounded-xl border border-border/30 bg-secondary/30 p-3 text-center">
        <p className="text-xs text-muted-foreground">Flash sale ended</p>
      </div>
    );
  }

  if (purchased) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center">
        <p className="text-sm text-green-700 font-semibold">Purchased! Check your orders.</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-xl border p-3 space-y-2 transition-all",
      isEnding
        ? "border-red-300 bg-red-50 animate-pulse"
        : "border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50"
    )}>
      <div className="flex items-center gap-2">
        <Zap className={cn("w-4 h-4", isEnding ? "text-red-500" : "text-yellow-600")} />
        <span className="text-xs font-bold uppercase tracking-wider text-foreground">Flash Sale</span>
        <Badge className={cn(
          "text-[10px] border-0 ml-auto gap-1",
          isEnding ? "bg-red-600 text-white animate-pulse" : "bg-yellow-600 text-white"
        )}>
          <Clock className="w-2.5 h-2.5" />
          {formatTime(timeLeft)}
        </Badge>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-lg font-display font-bold text-red-600">${salePrice}</span>
            <span className="text-xs text-muted-foreground line-through">${originalPrice}</span>
            <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">-{discount}%</Badge>
          </div>
        </div>
        <Button
          size="sm"
          className={cn(
            "shrink-0 font-bold gap-1",
            isEnding ? "bg-red-600 hover:bg-red-700" : "gradient-coral"
          )}
          onClick={() => {
            setPurchased(true);
            onPurchase?.();
            toast.success(`Flash sale item purchased for $${salePrice}!`);
          }}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Buy
        </Button>
      </div>

      {/* Stock bar */}
      <div className="space-y-1">
        <div className="h-1.5 rounded-full bg-white/80 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              remaining <= 2 ? "bg-red-500" : "bg-yellow-500"
            )}
            style={{ width: `${(remaining / quantity) * 100}%` }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground">
          {remaining} of {quantity} remaining
        </p>
      </div>
    </div>
  );
}
