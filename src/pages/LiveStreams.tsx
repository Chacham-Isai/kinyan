import { Link } from "react-router-dom";
import { Radio, Clock, Flame, Calendar, Play, Trophy, Gavel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LiveStreamCard from "@/components/marketplace/LiveStreamCard";
import CategoryGrid from "@/components/marketplace/CategoryGrid";
import PreBidPanel from "@/components/stream/PreBidPanel";
import { mockLiveStreams, mockUpcomingStreams } from "@/data/mockData";
import { isLiveStreamingDisabled, getTimeUntilStreaming } from "@/lib/shabbos";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LiveStreams() {
  const [filter, setFilter] = useState<"all" | "live" | "upcoming">("all");
  const [preBidStream, setPreBidStream] = useState<string | null>(null);
  const shabbosMode = isLiveStreamingDisabled();
  const streamingTime = getTimeUntilStreaming();

  const filters = [
    { id: "all" as const, label: "All", icon: Flame },
    { id: "live" as const, label: "Live Now", icon: Radio },
    { id: "upcoming" as const, label: "Upcoming", icon: Calendar },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-500" />
          <h1 className="font-display text-2xl font-bold text-foreground">Live</h1>
          {!shabbosMode && (
            <Badge className="bg-red-600 text-white border-0 live-glow text-xs font-bold gap-1 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-live" />
              {mockLiveStreams.length} LIVE
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          Watch, bid, and buy from live sellers
        </p>
      </div>

      {/* Full-Screen Feed CTA + Rewards */}
      {!shabbosMode && (
        <div className="flex gap-3">
          <Button
            asChild
            className="flex-1 h-14 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-base gap-2 rounded-xl shadow-lg shadow-red-500/20"
          >
            <Link to="/feed">
              <Play className="w-5 h-5" />
              Watch Live Feed — Swipe, Bid & Buy
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-14 rounded-xl gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <Link to="/rewards">
              <Trophy className="w-5 h-5" />
              Rewards
            </Link>
          </Button>
        </div>
      )}

      {/* Shabbos Mode Banner */}
      {shabbosMode && (
        <div className="rounded-xl bg-gradient-to-r from-blue-900/60 to-cyan-900/60 border border-blue-700/30 p-6 text-center space-y-2">
          <p className="text-lg font-display font-bold text-blue-200">
            Good Shabbos!
          </p>
          <p className="text-sm text-blue-300/70">
            Live streams are paused for Shabbos. See you after Havdalah!
          </p>
          {streamingTime && (
            <Badge variant="secondary" className="gap-1 mt-2">
              <Clock className="w-3 h-3" />
              {streamingTime}
            </Badge>
          )}
        </div>
      )}

      {/* Filter Categories */}
      <CategoryGrid compact />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {filters.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
              filter === id
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Live Streams Grid */}
      {(filter === "all" || filter === "live") && !shabbosMode && (
        <section>
          {filter === "all" && (
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse-live" />
              <h2 className="font-display font-semibold text-foreground">Live Now</h2>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLiveStreams.map((stream) => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Streams with Pre-Bidding */}
      {(filter === "all" || filter === "upcoming") && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-display font-semibold text-foreground">Coming Up</h2>
            <Badge variant="secondary" className="text-[10px] gap-1">
              <Gavel className="w-2.5 h-2.5" />
              Pre-Bidding Open
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUpcomingStreams.map((stream) => (
              <div key={stream.id}>
                <LiveStreamCard stream={stream} />
                {/* Pre-Bid Toggle */}
                <button
                  className={cn(
                    "w-full mt-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors",
                    preBidStream === stream.id
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setPreBidStream(preBidStream === stream.id ? null : stream.id)}
                >
                  <Gavel className="w-3 h-3" />
                  {preBidStream === stream.id ? "Hide Pre-Bids" : "Pre-Bid on Items"}
                </button>
                {preBidStream === stream.id && (
                  <div className="mt-2 p-3 rounded-xl border border-border/50 bg-card">
                    <PreBidPanel
                      streamTitle={stream.title}
                      scheduledFor={stream.scheduledFor || "Soon"}
                      items={[]}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {shabbosMode && filter === "live" && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-sm">
            Live streams are paused for Shabbos. Check back after Havdalah!
          </p>
        </div>
      )}
    </div>
  );
}
