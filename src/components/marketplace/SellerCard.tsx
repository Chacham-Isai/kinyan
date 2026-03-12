import { Link } from "react-router-dom";
import { Star, Users, ShoppingBag, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Seller } from "@/data/mockData";

interface SellerCardProps {
  seller: Seller;
}

export default function SellerCard({ seller }: SellerCardProps) {
  return (
    <Link
      to={`/seller/${seller.username}`}
      className="group flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card card-lift"
    >
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-lg font-bold text-white shrink-0">
        {seller.displayName[0]}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
            {seller.displayName}
          </h3>
          {seller.verified && (
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">@{seller.username}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {seller.rating}
          </span>
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <ShoppingBag className="w-3 h-3" />
            {seller.totalSales.toLocaleString()}
          </span>
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            {seller.followers.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Follow button placeholder */}
      <Badge variant="secondary" className="shrink-0 text-xs cursor-pointer hover:bg-primary hover:text-white transition-colors">
        Follow
      </Badge>
    </Link>
  );
}
