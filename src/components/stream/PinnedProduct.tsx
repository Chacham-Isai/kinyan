import { ShoppingCart, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface PinnedProductProps {
  title: string;
  price: number;
  originalPrice?: number;
  quantity?: number;
  emoji?: string;
}

export default function PinnedProduct({
  title,
  price,
  originalPrice,
  quantity = 5,
  emoji = "📦",
}: PinnedProductProps) {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <div className="bg-card border border-primary/20 rounded-xl p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-100 flex items-center justify-center text-xl shrink-0">
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <Badge className="text-[9px] bg-red-100 text-red-600 border-0 shrink-0">PINNED</Badge>
            {quantity <= 3 && (
              <Badge className="text-[9px] bg-amber-100 text-amber-700 border-0 shrink-0">
                Only {quantity} left!
              </Badge>
            )}
          </div>
          <p className="text-sm font-semibold text-foreground truncate mt-0.5">{title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-display font-bold text-primary">${price}</span>
            {originalPrice && (
              <>
                <span className="text-xs text-muted-foreground line-through">${originalPrice}</span>
                <Badge className="text-[9px] bg-green-100 text-green-700 border-0">-{discount}%</Badge>
              </>
            )}
          </div>
        </div>
        <Button
          size="sm"
          className="gradient-primary text-white font-bold shrink-0"
          onClick={() => toast.success(`${title} added to cart!`)}
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
}
