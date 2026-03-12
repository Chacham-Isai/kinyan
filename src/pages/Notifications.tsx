import { Link } from "react-router-dom";
import {
  Bell, Gavel, Heart, Package, Radio, Truck, UserPlus, CheckCheck,
  Sparkles, TrendingDown, Zap, Trophy, Clock, Trash2, Volume2, VolumeX,
  Settings, BellOff
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNotificationSystem } from "@/hooks/useNotificationSystem";
import { useState } from "react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bid_outbid: Gavel,
  bid_won: Trophy,
  stream_starting: Clock,
  stream_live: Radio,
  order_shipped: Truck,
  order_delivered: Package,
  price_drop: TrendingDown,
  seller_live: Radio,
  auction_ending: Zap,
  new_follower: UserPlus,
  review_received: Heart,
  charity_goal: Heart,
};

const colorMap: Record<string, string> = {
  bid_outbid: "text-red-500 bg-red-50",
  bid_won: "text-yellow-600 bg-yellow-50",
  stream_starting: "text-blue-500 bg-blue-50",
  stream_live: "text-red-500 bg-red-50",
  order_shipped: "text-blue-500 bg-blue-50",
  order_delivered: "text-green-600 bg-green-50",
  price_drop: "text-green-600 bg-green-50",
  seller_live: "text-red-500 bg-red-50",
  auction_ending: "text-amber-600 bg-amber-50",
  new_follower: "text-primary bg-primary/10",
  review_received: "text-pink-500 bg-pink-50",
  charity_goal: "text-primary bg-primary/10",
};

function formatTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

type FilterTab = "all" | "bids" | "orders" | "streams" | "social";

export default function Notifications() {
  const {
    notifications,
    unreadCount,
    soundEnabled,
    setSoundEnabled,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotificationSystem();

  const [filter, setFilter] = useState<FilterTab>("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "bids") return ["bid_outbid", "bid_won", "auction_ending"].includes(n.type);
    if (filter === "orders") return ["order_shipped", "order_delivered", "price_drop"].includes(n.type);
    if (filter === "streams") return ["stream_starting", "stream_live", "seller_live"].includes(n.type);
    if (filter === "social") return ["new_follower", "review_received", "charity_goal"].includes(n.type);
    return true;
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="gradient-coral text-white border-0 text-xs font-bold">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-primary"
            onClick={markAllAsRead}
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {([
          { id: "all", label: "All" },
          { id: "bids", label: "Bids" },
          { id: "orders", label: "Orders" },
          { id: "streams", label: "Live" },
          { id: "social", label: "Social" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
              filter === tab.id
                ? "gradient-primary text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Live Notification Banner */}
      {unreadCount > 0 && filter === "all" && (
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-100 p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-red-800">
              {unreadCount} new notification{unreadCount > 1 ? "s" : ""}
            </p>
            <p className="text-[10px] text-red-600">Real-time updates are active</p>
          </div>
        </div>
      )}

      {/* Notification List */}
      <div className="space-y-1">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <BellOff className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;
            const color = colorMap[notification.type] || "text-primary bg-primary/10";

            return (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl transition-colors group",
                  notification.read
                    ? "hover:bg-secondary/50"
                    : "bg-primary/5 hover:bg-primary/10"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", color)}>
                  {notification.imageEmoji ? (
                    <span className="text-lg">{notification.imageEmoji}</span>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{notification.title}</p>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full gradient-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-[10px] text-muted-foreground/60">{formatTime(notification.timestamp)}</p>
                    {notification.actionUrl && (
                      <Link
                        to={notification.actionUrl}
                        className="text-[10px] text-primary font-medium hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View
                      </Link>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            );
          })
        )}
      </div>

      {/* Settings Link */}
      <div className="pt-4 border-t border-border/30">
        <Link to="/settings" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Settings className="w-3.5 h-3.5" />
          Manage notification preferences
        </Link>
      </div>
    </div>
  );
}
