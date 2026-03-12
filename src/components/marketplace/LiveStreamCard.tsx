import { Link } from "react-router-dom";
import { Eye, Clock, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LiveStream } from "@/data/mockData";
import { cn } from "@/lib/utils";

const streamColors: Record<string, string> = {
  seforim: "from-amber-100 to-orange-100",
  judaica: "from-yellow-100 to-amber-100",
  fashion: "from-slate-100 to-gray-100",
  electronics: "from-blue-100 to-cyan-100",
  simcha: "from-pink-100 to-rose-100",
  kids: "from-green-100 to-emerald-100",
  home: "from-violet-100 to-purple-100",
};

interface LiveStreamCardProps {
  stream: LiveStream;
  size?: "sm" | "md" | "lg";
}

export default function LiveStreamCard({ stream, size = "md" }: LiveStreamCardProps) {
  const isLive = stream.isLive;

  return (
    <Link
      to={`/live/${stream.id}`}
      className={cn(
        "group block rounded-xl overflow-hidden card-lift border border-border/50 bg-card",
        size === "lg" && "md:col-span-2 md:row-span-2"
      )}
    >
      {/* Thumbnail / Video Preview */}
      <div
        className={cn(
          "relative bg-gradient-to-br overflow-hidden",
          streamColors[stream.category] || "from-secondary to-card",
          size === "sm" ? "aspect-[4/3]" : "aspect-video"
        )}
      >
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

        {/* Placeholder visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Radio className={cn(
            "text-primary/15",
            size === "sm" ? "w-12 h-12" : "w-16 h-16"
          )} />
        </div>

        {/* Live badge or Scheduled */}
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1">
          {isLive ? (
            <Badge className="bg-red-600 text-white border-0 live-glow text-xs font-bold px-2 py-0.5 gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
              LIVE
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs gap-1 bg-black/50 backdrop-blur-sm border-0">
              <Clock className="w-3 h-3" />
              {stream.scheduledFor}
            </Badge>
          )}
          {stream.isSponsored && (
            <Badge className={cn(
              "text-[9px] border-0",
              stream.sponsorTier === "featured"
                ? "bg-yellow-500 text-black font-bold"
                : stream.sponsorTier === "premium"
                ? "bg-purple-500 text-white"
                : "bg-blue-500 text-white"
            )}>
              {stream.sponsorTier === "featured" ? "Featured" : "Sponsored"}
            </Badge>
          )}
        </div>

        {/* Viewer count */}
        {isLive && (
          <div className="absolute top-2 right-2 z-20">
            <Badge variant="secondary" className="text-xs gap-1 bg-black/50 backdrop-blur-sm border-0">
              <Eye className="w-3 h-3" />
              {stream.viewers.toLocaleString()}
            </Badge>
          </div>
        )}

        {/* Current bid */}
        {isLive && stream.currentBid && (
          <div className="absolute bottom-2 right-2 z-20">
            <Badge className="gradient-coral text-white border-0 text-sm font-bold px-2.5 py-1">
              ${stream.currentBid}
            </Badge>
          </div>
        )}

        {/* Current item */}
        {isLive && stream.currentItem && (
          <div className="absolute bottom-2 left-2 right-16 z-20">
            <p className="text-xs text-white/80 truncate">{stream.currentItem}</p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start gap-2.5">
          {/* Seller avatar */}
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
            {stream.seller.displayName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {stream.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {stream.seller.displayName}
              {stream.seller.verified && (
                <span className="inline-block ml-1 text-primary">✓</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
