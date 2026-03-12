import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/categories";
import {
  BookOpen, Sparkles, Shirt, Smartphone, Home,
  PartyPopper, Baby, UtensilsCrossed, Crown, Heart,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Sparkles,
  Shirt,
  Smartphone,
  Home,
  PartyPopper,
  Baby,
  UtensilsCrossed,
  Crown,
  Heart,
};

interface CategoryGridProps {
  compact?: boolean;
}

export default function CategoryGrid({ compact = false }: CategoryGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        compact
          ? "grid-cols-5 sm:grid-cols-10"
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
      )}
    >
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Sparkles;

        return compact ? (
          <Link
            key={category.id}
            to={`/browse/${category.id}`}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center transition-transform group-hover:scale-110",
                category.color
              )}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground text-center leading-tight">
              {category.name}
            </span>
          </Link>
        ) : (
          <Link
            key={category.id}
            to={`/browse/${category.id}`}
            className="group relative rounded-xl overflow-hidden card-lift border border-border/50"
          >
            <div
              className={cn(
                "bg-gradient-to-br p-4 aspect-[4/3] flex flex-col justify-between",
                category.color
              )}
            >
              <Icon className="w-8 h-8 text-white/90" />
              <div>
                <h3 className="font-display font-bold text-white text-sm">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs mt-0.5 line-clamp-1">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
