import { useState } from "react";
import { Gavel, TrendingUp, Timer, Users, Zap, ShoppingCart, Shield, Bot, AlertTriangle, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Bid } from "@/data/mockData";

interface BidPanelProps {
  currentBid: number;
  currentItem: string;
  bidCount: number;
  timeLeft: number;
  viewers: number;
  bids: Bid[];
  isActive: boolean;
  winner: Bid | null;
  autoBidEnabled: boolean;
  autoBidMax: number;
  snipeProtectionActive: boolean;
  buyNowPrice?: number;
  onBid: (amount: number) => void;
  onAutoBid: (maxAmount: number) => void;
  onBuyNow?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function BidPanel({
  currentBid,
  currentItem,
  bidCount,
  timeLeft,
  viewers,
  bids,
  isActive,
  winner,
  autoBidEnabled,
  autoBidMax,
  snipeProtectionActive,
  buyNowPrice,
  onBid,
  onAutoBid,
  onBuyNow,
}: BidPanelProps) {
  const [customBid, setCustomBid] = useState("");
  const [autoBidInput, setAutoBidInput] = useState("");
  const [showAutoBid, setShowAutoBid] = useState(false);
  const [showBidHistory, setShowBidHistory] = useState(false);

  const quickBids = [
    currentBid + 5,
    currentBid + 10,
    currentBid + 25,
  ];

  const isUrgent = timeLeft <= 30 && timeLeft > 0;
  const isCritical = timeLeft <= 10 && timeLeft > 0;
  const userIsWinning = bids.length > 0 && bids[bids.length - 1]?.userId === "you";

  const handleBid = (amount: number) => {
    onBid(amount);
    toast.success(`Bid placed: $${amount}`, {
      description: `You're now the highest bidder on ${currentItem}`,
    });
  };

  // Auction ended
  if (!isActive && winner) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-4 space-y-4">
        <div className="text-center space-y-3">
          <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
          <h3 className="font-display font-bold text-lg">Auction Ended!</h3>
          {winner.userId === "you" ? (
            <>
              <p className="text-success font-semibold">You won!</p>
              <p className="text-2xl font-display font-bold">${winner.amount}</p>
              <Button className="w-full gradient-primary text-white font-bold" onClick={() => toast.success("Proceeding to checkout...")}>
                Complete Purchase
              </Button>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">Won by <span className="font-semibold">{winner.username}</span></p>
              <p className="text-2xl font-display font-bold">${winner.amount}</p>
              <Button variant="outline" className="w-full" onClick={() => toast.info("We'll notify you of similar items!")}>
                Notify Me of Similar Items
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 space-y-4">
      {/* Current Item */}
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Current Item
        </p>
        <h3 className="font-display font-bold text-foreground text-lg mt-0.5">
          {currentItem}
        </h3>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary" className="gap-1 text-xs">
          <Users className="w-3 h-3" />
          {viewers} watching
        </Badge>
        <Badge variant="secondary" className="gap-1 text-xs">
          <Gavel className="w-3 h-3" />
          {bids.length} bids
        </Badge>
        <Badge
          className={cn(
            "gap-1 text-xs border-0 text-white",
            isCritical ? "bg-red-600 animate-pulse" : isUrgent ? "gradient-coral" : "bg-muted-foreground"
          )}
        >
          <Timer className="w-3 h-3" />
          {formatTime(timeLeft)}
        </Badge>
        {snipeProtectionActive && (
          <Badge className="gap-1 text-xs bg-amber-100 text-amber-800 border-amber-300">
            <AlertTriangle className="w-3 h-3" />
            Snipe Guard
          </Badge>
        )}
      </div>

      {/* Current Bid Display */}
      <div className={cn(
        "rounded-lg p-4 text-center transition-colors",
        userIsWinning ? "bg-green-50 border border-green-200" : "bg-secondary/80"
      )}>
        <p className="text-xs text-muted-foreground mb-1">
          {userIsWinning ? "You're winning!" : "Current Bid"}
        </p>
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className={cn("w-5 h-5", userIsWinning ? "text-green-600" : "text-success")} />
          <span className={cn(
            "font-display text-3xl font-bold",
            isCritical ? "text-red-600 animate-pulse" : "text-foreground"
          )}>
            ${currentBid}
          </span>
        </div>
        {userIsWinning && (
          <p className="text-xs text-green-600 mt-1 font-medium">You're the highest bidder</p>
        )}
      </div>

      {/* Quick Bid Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {quickBids.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            className={cn(
              "h-10 text-sm font-bold transition-all",
              isCritical
                ? "border-red-300 hover:bg-red-600 hover:text-white hover:border-red-600"
                : "hover:gradient-primary hover:text-white hover:border-transparent"
            )}
            onClick={() => handleBid(amount)}
            disabled={!isActive}
          >
            ${amount}
          </Button>
        ))}
      </div>

      {/* Custom Bid */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
          <input
            type="number"
            value={customBid}
            onChange={(e) => setCustomBid(e.target.value)}
            placeholder={`${currentBid + 1}+`}
            min={currentBid + 1}
            className="w-full h-10 pl-7 pr-3 rounded-lg bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button
          className={cn(
            "h-10 px-6 font-bold",
            isCritical ? "bg-red-600 hover:bg-red-700 text-white" : "gradient-primary text-white"
          )}
          onClick={() => {
            const amount = parseInt(customBid);
            if (amount > currentBid) {
              handleBid(amount);
              setCustomBid("");
            }
          }}
          disabled={!customBid || parseInt(customBid) <= currentBid || !isActive}
        >
          <Gavel className="w-4 h-4 mr-1.5" />
          BID
        </Button>
      </div>

      {/* Auto-Bid */}
      <div>
        <button
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
          onClick={() => setShowAutoBid(!showAutoBid)}
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="font-medium">Auto-Bid</span>
          {autoBidEnabled && (
            <Badge className="text-[10px] bg-green-100 text-green-700 border-0 ml-1">
              Active up to ${autoBidMax}
            </Badge>
          )}
          {showAutoBid ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
        </button>
        {showAutoBid && (
          <div className="mt-2 p-3 bg-secondary/50 rounded-lg space-y-2">
            <p className="text-xs text-muted-foreground">
              Set a max and we'll automatically bid for you in $5 increments.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  value={autoBidInput}
                  onChange={(e) => setAutoBidInput(e.target.value)}
                  placeholder="Max bid amount"
                  className="w-full h-9 pl-7 pr-3 rounded-lg bg-background border border-border/50 text-sm"
                />
              </div>
              <Button
                size="sm"
                variant={autoBidEnabled ? "destructive" : "default"}
                onClick={() => {
                  if (autoBidEnabled) {
                    onAutoBid(0);
                    toast.info("Auto-bid disabled");
                  } else {
                    const max = parseInt(autoBidInput);
                    if (max > currentBid) {
                      onAutoBid(max);
                      toast.success(`Auto-bid set up to $${max}`);
                    }
                  }
                }}
              >
                {autoBidEnabled ? "Stop" : "Set"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Buy Now Option */}
      {buyNowPrice && (
        <Button
          className="w-full h-12 gradient-coral text-white font-bold text-sm gap-2"
          onClick={() => {
            onBuyNow?.();
            toast.success("Purchased!", {
              description: `${currentItem} — Buy Now at $${buyNowPrice}`,
              action: { label: "View Order", onClick: () => {} },
            });
          }}
          disabled={!isActive}
        >
          <Zap className="w-4 h-4" />
          Buy Now — ${buyNowPrice}
        </Button>
      )}

      {/* Bid History */}
      <div>
        <button
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
          onClick={() => setShowBidHistory(!showBidHistory)}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span className="font-medium">Bid History ({bids.length})</span>
          {showBidHistory ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
        </button>
        {showBidHistory && (
          <div className="mt-2 max-h-32 overflow-y-auto space-y-1">
            {bids.slice().reverse().slice(0, 20).map((bid) => (
              <div
                key={bid.id}
                className={cn(
                  "flex items-center justify-between text-xs py-1 px-2 rounded",
                  bid.userId === "you" ? "bg-primary/5 text-primary font-medium" : ""
                )}
              >
                <span>{bid.username}</span>
                <span className="font-mono font-medium">${bid.amount}</span>
              </div>
            ))}
            {bids.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-2">No bids yet — be the first!</p>
            )}
          </div>
        )}
      </div>

      {/* Protection notice */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Shield className="w-3 h-3 text-green-600" />
        <span>Buyer protection · Secure checkout · Free returns</span>
      </div>
    </div>
  );
}
