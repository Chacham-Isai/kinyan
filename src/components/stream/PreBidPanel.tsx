import { useState } from "react";
import { Gavel, Clock, Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PreBidItem {
  id: string;
  title: string;
  startingBid: number;
  estimatedValue: number;
  emoji: string;
}

interface PreBidPanelProps {
  streamTitle: string;
  scheduledFor: string;
  items: PreBidItem[];
}

const MOCK_PRE_BID_ITEMS: PreBidItem[] = [
  { id: "pb1", title: "Antique Siddur (1890)", startingBid: 100, estimatedValue: 500, emoji: "📖" },
  { id: "pb2", title: "Silver Kiddush Cup Set", startingBid: 75, estimatedValue: 350, emoji: "🥂" },
  { id: "pb3", title: "First Edition Mishnah Berurah", startingBid: 200, estimatedValue: 800, emoji: "📚" },
  { id: "pb4", title: "Handwritten Megillah", startingBid: 500, estimatedValue: 2000, emoji: "📜" },
];

export default function PreBidPanel({
  streamTitle,
  scheduledFor,
  items = MOCK_PRE_BID_ITEMS,
}: PreBidPanelProps) {
  const [preBids, setPreBids] = useState<Record<string, number>>({});
  const [notified, setNotified] = useState(false);

  const placPreBid = (itemId: string, amount: number) => {
    setPreBids((prev) => ({ ...prev, [itemId]: amount }));
    toast.success(`Pre-bid of $${amount} placed!`, {
      description: "You'll be auto-entered when the item goes live.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Gavel className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Pre-Bidding Open</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{streamTitle}</p>
        </div>
        <Badge variant="secondary" className="gap-1 text-xs">
          <Clock className="w-3 h-3" />
          {scheduledFor}
        </Badge>
      </div>

      {/* Remind Me */}
      <Button
        variant={notified ? "secondary" : "outline"}
        size="sm"
        className={cn("w-full text-xs gap-1.5", notified && "text-green-700")}
        onClick={() => {
          setNotified(true);
          toast.success("You'll be notified when this show starts!");
        }}
      >
        {notified ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
        {notified ? "Reminder Set" : "Remind Me When It Starts"}
      </Button>

      {/* Pre-Bid Items */}
      <div className="space-y-2">
        {items.map((item) => {
          const hasBid = preBids[item.id] !== undefined;
          return (
            <div
              key={item.id}
              className={cn(
                "rounded-lg border p-3 transition-all",
                hasBid ? "border-green-200 bg-green-50" : "border-border/50 bg-card"
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Starting: <span className="font-bold text-foreground">${item.startingBid}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Est: ${item.estimatedValue}
                    </span>
                  </div>

                  {hasBid ? (
                    <div className="mt-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-xs text-green-700 font-medium">
                        Your pre-bid: ${preBids[item.id]}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-1.5">
                      {[item.startingBid, item.startingBid * 1.5, item.startingBid * 2].map((amount) => (
                        <Button
                          key={amount}
                          size="sm"
                          variant="outline"
                          className="text-xs h-7 px-2.5"
                          onClick={() => placPreBid(item.id, Math.round(amount))}
                        >
                          ${Math.round(amount)}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-muted-foreground text-center">
        Pre-bids are entered automatically when the item goes live. You can be outbid during the live auction.
      </p>
    </div>
  );
}
