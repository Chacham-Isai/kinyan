import { useState, useEffect } from "react";
import { Bell, BellOff, Clock, Flame, Lock, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface Drop {
  id: string;
  title: string;
  description: string;
  sellerName: string;
  sellerAvatar: string;
  scheduledFor: Date;
  category: string;
  itemCount: number;
  interestedCount: number;
  isExclusive: boolean;
  previewEmoji: string;
  type: "flash_sale" | "exclusive_drop" | "mystery_box" | "auction_event";
}

interface ScheduledDropCardProps {
  drop: Drop;
}

function getCountdown(target: Date): { hours: number; minutes: number; seconds: number } {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function ScheduledDropCard({ drop }: ScheduledDropCardProps) {
  const [notifyMe, setNotifyMe] = useState(false);
  const [countdown, setCountdown] = useState(getCountdown(drop.scheduledFor));
  const [interested, setInterested] = useState(drop.interestedCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(drop.scheduledFor));
    }, 1000);
    return () => clearInterval(timer);
  }, [drop.scheduledFor]);

  const isStartingSoon = countdown.hours === 0 && countdown.minutes <= 30;
  const typeLabel = {
    flash_sale: "Flash Sale",
    exclusive_drop: "Exclusive Drop",
    mystery_box: "Mystery Box",
    auction_event: "Auction Event",
  }[drop.type];

  const typeColor = {
    flash_sale: "bg-red-100 text-red-700",
    exclusive_drop: "bg-purple-100 text-purple-700",
    mystery_box: "bg-amber-100 text-amber-700",
    auction_event: "bg-blue-100 text-blue-700",
  }[drop.type];

  return (
    <div className={cn(
      "rounded-xl border overflow-hidden transition-all hover:shadow-md",
      isStartingSoon ? "border-red-300 ring-1 ring-red-200" : "border-border/50"
    )}>
      {/* Preview Banner */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 via-primary/10 to-cyan-100 flex items-center justify-center">
        <span className="text-5xl">{drop.previewEmoji}</span>
        {drop.isExclusive && (
          <Badge className="absolute top-2 left-2 bg-purple-600 text-white border-0 gap-1 text-[10px]">
            <Lock className="w-2.5 h-2.5" />
            Exclusive
          </Badge>
        )}
        <Badge className={cn("absolute top-2 right-2 border-0 text-[10px]", typeColor)}>
          {typeLabel}
        </Badge>
        {isStartingSoon && (
          <div className="absolute bottom-2 left-2 right-2">
            <Badge className="bg-red-600 text-white border-0 w-full justify-center gap-1 py-1 animate-pulse">
              <Flame className="w-3 h-3" />
              Starting Soon!
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-white">
            {drop.sellerAvatar}
          </div>
          <span className="text-xs text-muted-foreground">{drop.sellerName}</span>
        </div>

        <h3 className="font-display font-bold text-sm">{drop.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{drop.description}</p>

        {/* Countdown */}
        <div className="flex items-center gap-3 py-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <div className="flex gap-2">
            {[
              { val: countdown.hours, label: "hr" },
              { val: countdown.minutes, label: "min" },
              { val: countdown.seconds, label: "sec" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <span className={cn(
                  "font-mono font-bold text-lg block leading-none",
                  isStartingSoon ? "text-red-600" : "text-foreground"
                )}>
                  {val.toString().padStart(2, "0")}
                </span>
                <span className="text-[9px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {interested.toLocaleString()} interested
          </span>
          <span>{drop.itemCount} items</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            size="sm"
            className={cn(
              "flex-1 text-xs gap-1",
              notifyMe ? "bg-secondary text-foreground hover:bg-secondary/80" : "gradient-primary text-white"
            )}
            onClick={() => {
              setNotifyMe(!notifyMe);
              if (!notifyMe) {
                setInterested((prev) => prev + 1);
                toast.success("You'll be notified when this drop starts!");
              } else {
                setInterested((prev) => prev - 1);
              }
            }}
          >
            {notifyMe ? <BellOff className="w-3 h-3" /> : <Bell className="w-3 h-3" />}
            {notifyMe ? "Notifying" : "Notify Me"}
          </Button>
        </div>
      </div>
    </div>
  );
}
