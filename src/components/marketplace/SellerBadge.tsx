import { ShieldCheck, Star, Crown, Gem, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export type SellerTier = "new" | "rising" | "trusted" | "power" | "elite";

interface SellerBadgeProps {
  tier: SellerTier;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const TIER_CONFIG: Record<SellerTier, {
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  minSales: number;
  minRating: number;
}> = {
  new: {
    label: "New Seller",
    icon: <Star className="w-3 h-3" />,
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    description: "Just getting started on KINYAN",
    minSales: 0,
    minRating: 0,
  },
  rising: {
    label: "Rising Star",
    icon: <TrendingUp className="w-3 h-3" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "10+ sales, 4.5+ rating",
    minSales: 10,
    minRating: 4.5,
  },
  trusted: {
    label: "Trusted Seller",
    icon: <ShieldCheck className="w-3 h-3" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "50+ sales, 4.7+ rating, ID verified",
    minSales: 50,
    minRating: 4.7,
  },
  power: {
    label: "Power Seller",
    icon: <Award className="w-3 h-3" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "500+ sales, 4.8+ rating, featured seller",
    minSales: 500,
    minRating: 4.8,
  },
  elite: {
    label: "Elite Seller",
    icon: <Crown className="w-3 h-3" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "1000+ sales, 4.9+ rating, top 1% on KINYAN",
    minSales: 1000,
    minRating: 4.9,
  },
};

export function getSellerTier(totalSales: number, rating: number): SellerTier {
  if (totalSales >= 1000 && rating >= 4.9) return "elite";
  if (totalSales >= 500 && rating >= 4.8) return "power";
  if (totalSales >= 50 && rating >= 4.7) return "trusted";
  if (totalSales >= 10 && rating >= 4.5) return "rising";
  return "new";
}

export default function SellerBadge({ tier, size = "sm", showLabel = false }: SellerBadgeProps) {
  const config = TIER_CONFIG[tier];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          className={cn(
            "border-0 gap-1 cursor-help",
            config.bgColor,
            config.color,
            size === "sm" && "text-[10px] px-1.5 py-0",
            size === "md" && "text-xs px-2 py-0.5",
            size === "lg" && "text-sm px-3 py-1",
          )}
        >
          {config.icon}
          {showLabel && config.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-1">
          <p className="font-semibold text-xs">{config.label}</p>
          <p className="text-[10px] text-muted-foreground">{config.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function SellerVerificationBanner({ tier }: { tier: SellerTier }) {
  const config = TIER_CONFIG[tier];

  return (
    <div className={cn("rounded-lg p-3 flex items-center gap-3", config.bgColor)}>
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", config.bgColor)}>
        <span className={config.color}>{config.icon}</span>
      </div>
      <div>
        <p className={cn("text-sm font-semibold", config.color)}>{config.label}</p>
        <p className="text-xs text-muted-foreground">{config.description}</p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-xs text-muted-foreground">Min {config.minSales} sales</p>
        <p className="text-xs text-muted-foreground">Min {config.minRating} rating</p>
      </div>
    </div>
  );
}
