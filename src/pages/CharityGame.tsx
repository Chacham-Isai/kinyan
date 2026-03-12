import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, Heart, Trophy, Gift, Ticket, Sparkles,
  Plus, Minus, Users, Clock, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { mockAuctionGames, type AuctionGame, type AuctionPrize } from "@/data/mockData";

const typeConfig: Record<string, { label: string; color: string; icon: typeof Trophy; gradient: string }> = {
  "chinese-auction": { label: "Chinese Auction", color: "bg-purple-100 text-purple-700", icon: Trophy, gradient: "from-purple-500 to-indigo-600" },
  raffle: { label: "Raffle", color: "bg-blue-100 text-blue-700", icon: Ticket, gradient: "from-blue-500 to-blue-700" },
  "spin-wheel": { label: "Spin Wheel", color: "bg-green-100 text-green-700", icon: Sparkles, gradient: "from-green-500 to-emerald-600" },
  "mystery-box": { label: "Mystery Box", color: "bg-amber-100 text-amber-700", icon: Gift, gradient: "from-amber-500 to-orange-600" },
};

// ---- SPIN WHEEL ----
function SpinWheel({ prizes, ticketPrice, onSpin }: { prizes: AuctionPrize[]; ticketPrice: number; onSpin: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<AuctionPrize | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const extraSpins = 5 + Math.random() * 3;
    const targetDeg = extraSpins * 360 + Math.random() * 360;
    setRotation((prev) => prev + targetDeg);

    setTimeout(() => {
      const winner = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(winner);
      setSpinning(false);
      onSpin();
      toast.success(`You won: ${winner.name}!`, { description: `Value: $${winner.value.toLocaleString()}` });
    }, 4000);
  };

  const segAngle = 360 / prizes.length;

  return (
    <div className="space-y-6">
      {/* Wheel */}
      <div className="relative w-64 h-64 mx-auto">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-primary" />
        </div>

        {/* Wheel circle */}
        <div
          className="w-full h-full rounded-full border-4 border-primary/20 overflow-hidden relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          {prizes.map((prize, i) => {
            const colors = [
              "bg-blue-500", "bg-green-500", "bg-amber-500", "bg-rose-500",
              "bg-purple-500", "bg-cyan-500", "bg-orange-500", "bg-pink-500",
            ];
            return (
              <div
                key={prize.id}
                className={cn("absolute w-full h-full", colors[i % colors.length])}
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((Math.PI * 2 * i) / prizes.length - Math.PI / 2)}% ${50 + 50 * Math.sin((Math.PI * 2 * i) / prizes.length - Math.PI / 2)}%, ${50 + 50 * Math.cos((Math.PI * 2 * (i + 1)) / prizes.length - Math.PI / 2)}% ${50 + 50 * Math.sin((Math.PI * 2 * (i + 1)) / prizes.length - Math.PI / 2)}%)`,
                }}
              >
                <div
                  className="absolute text-lg"
                  style={{
                    left: `${50 + 30 * Math.cos((Math.PI * 2 * (i + 0.5)) / prizes.length - Math.PI / 2)}%`,
                    top: `${50 + 30 * Math.sin((Math.PI * 2 * (i + 0.5)) / prizes.length - Math.PI / 2)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {prize.emoji}
                </div>
              </div>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 p-4 text-center animate-slide-up">
          <span className="text-3xl">{result.emoji}</span>
          <p className="font-display font-bold text-foreground mt-2">{result.name}</p>
          <p className="text-sm text-green-600 font-semibold">Value: ${result.value.toLocaleString()}</p>
        </div>
      )}

      <Button
        className="w-full h-12 gradient-primary text-white font-bold"
        disabled={spinning}
        onClick={spin}
      >
        {spinning ? "Spinning..." : `Spin — $${ticketPrice}`}
      </Button>
    </div>
  );
}

// ---- MYSTERY BOX ----
function MysteryBox({ prizes, ticketPrice, onOpen }: { prizes: AuctionPrize[]; ticketPrice: number; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [result, setResult] = useState<AuctionPrize | null>(null);
  const [boxState, setBoxState] = useState<"closed" | "shaking" | "open">("closed");

  const openBox = () => {
    if (opening) return;
    setOpening(true);
    setResult(null);
    setBoxState("shaking");

    setTimeout(() => {
      setBoxState("open");
      const winner = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(winner);
      setOpening(false);
      onOpen();
      toast.success(`You won: ${winner.name}!`, { description: `Value: $${winner.value.toLocaleString()}` });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Box visual */}
      <div className="flex justify-center">
        <div
          className={cn(
            "w-40 h-40 rounded-2xl flex items-center justify-center transition-all cursor-pointer",
            boxState === "closed" && "bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-105",
            boxState === "shaking" && "bg-gradient-to-br from-amber-400 to-orange-500 animate-[wiggle_0.15s_ease-in-out_infinite]",
            boxState === "open" && "bg-gradient-to-br from-green-400 to-emerald-500 scale-110"
          )}
          onClick={boxState === "closed" ? openBox : undefined}
        >
          {boxState === "open" && result ? (
            <div className="text-center animate-slide-up">
              <span className="text-5xl">{result.emoji}</span>
            </div>
          ) : (
            <div className="text-center text-white">
              <Gift className="w-12 h-12 mx-auto" />
              <p className="text-sm font-bold mt-2">
                {boxState === "shaking" ? "Opening..." : "Tap to Open!"}
              </p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 p-4 text-center animate-slide-up">
          <p className="font-display font-bold text-foreground">{result.name}</p>
          <p className="text-sm text-amber-600 font-semibold">Value: ${result.value.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
        </div>
      )}

      <Button
        className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-700"
        disabled={opening}
        onClick={openBox}
      >
        <Gift className="w-4 h-4 mr-2" />
        {opening ? "Opening..." : `Open Mystery Box — $${ticketPrice}`}
      </Button>
    </div>
  );
}

// ---- RAFFLE ----
function RaffleGame({ game }: { game: AuctionGame }) {
  const [tickets, setTickets] = useState(1);

  const buy = () => {
    toast.success(`${tickets} ticket${tickets > 1 ? "s" : ""} purchased!`, {
      description: `You're entered in the ${game.title}. Good luck!`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Prizes list */}
      <div className="space-y-2">
        <h3 className="font-display font-bold text-foreground text-sm">Prizes</h3>
        {game.prizes.map((prize, i) => (
          <div key={prize.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card">
            <span className="text-2xl">{prize.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{prize.name}</p>
              <p className="text-xs text-muted-foreground">{prize.description}</p>
            </div>
            <span className="text-sm font-bold text-primary">${prize.value.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Ticket selector */}
      <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Number of tickets</span>
          <span className="text-sm font-bold text-primary">${(tickets * game.ticketPrice).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={() => setTickets(Math.max(1, tickets - 1))}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-display text-3xl font-bold text-foreground w-16 text-center">{tickets}</span>
          <button
            onClick={() => setTickets(tickets + 1)}
            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 justify-center">
          {[1, 5, 10, 25].map((n) => (
            <button
              key={n}
              onClick={() => setTickets(n)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                tickets === n ? "bg-primary text-white" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <Button className="w-full h-12 gradient-primary text-white font-bold" onClick={buy}>
        <Ticket className="w-4 h-4 mr-2" />
        Buy {tickets} Ticket{tickets > 1 ? "s" : ""} — ${(tickets * game.ticketPrice).toLocaleString()}
      </Button>
    </div>
  );
}

// ---- CHINESE AUCTION ----
function ChineseAuction({ game }: { game: AuctionGame }) {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const totalTickets = Object.values(allocations).reduce((a, b) => a + b, 0);

  const addTicket = (prizeId: string) => {
    setAllocations((prev) => ({ ...prev, [prizeId]: (prev[prizeId] || 0) + 1 }));
  };

  const removeTicket = (prizeId: string) => {
    setAllocations((prev) => {
      const current = prev[prizeId] || 0;
      if (current <= 0) return prev;
      const next = { ...prev, [prizeId]: current - 1 };
      if (next[prizeId] === 0) delete next[prizeId];
      return next;
    });
  };

  const buy = () => {
    if (totalTickets === 0) return;
    toast.success(`${totalTickets} tickets placed!`, {
      description: `Your tickets have been placed in ${Object.keys(allocations).length} prize basket${Object.keys(allocations).length > 1 ? "s" : ""}. Good luck!`,
    });
    setAllocations({});
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-primary/5 border border-primary/10 p-3 flex items-start gap-2">
        <Trophy className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">
          Place your tickets in the baskets of the prizes you want to win.
          More tickets in a basket = better odds for that prize!
        </p>
      </div>

      {/* Prize baskets */}
      <div className="space-y-3">
        {game.prizes.map((prize) => {
          const count = allocations[prize.id] || 0;
          return (
            <div
              key={prize.id}
              className={cn(
                "rounded-xl border bg-card p-4 transition-colors",
                count > 0 ? "border-primary/30 bg-primary/5" : "border-border/50"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{prize.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{prize.name}</p>
                  <p className="text-xs text-muted-foreground">{prize.description}</p>
                  <p className="text-xs font-semibold text-primary mt-0.5">Value: ${prize.value.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => removeTicket(prize.id)}
                    disabled={count === 0}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      count > 0
                        ? "bg-secondary hover:bg-destructive/10 hover:text-destructive"
                        : "bg-secondary/50 text-muted-foreground/30"
                    )}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm">{count}</span>
                  <button
                    onClick={() => addTicket(prize.id)}
                    className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary & buy */}
      <div className="sticky bottom-20 rounded-xl border border-border/50 bg-white shadow-lg p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{totalTickets} ticket{totalTickets !== 1 ? "s" : ""}</span>
          <span className="font-display font-bold text-foreground">
            ${(totalTickets * game.ticketPrice).toLocaleString()}
          </span>
        </div>
        <Button
          className="w-full h-11 gradient-primary text-white font-bold"
          disabled={totalTickets === 0}
          onClick={buy}
        >
          Buy {totalTickets} Ticket{totalTickets !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );
}

// ---- MAIN PAGE ----
export default function CharityGame() {
  const { gameId } = useParams<{ gameId: string }>();
  const game = mockAuctionGames.find((g) => g.id === gameId);

  if (!game) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <Trophy className="w-12 h-12 text-muted-foreground mx-auto" />
        <h1 className="font-display text-xl font-bold">Game not found</h1>
        <Button asChild className="gradient-primary text-white">
          <Link to="/charity">Browse charity games</Link>
        </Button>
      </div>
    );
  }

  const config = typeConfig[game.type];
  const ticketProgress = Math.round((game.ticketsSold / game.totalTickets) * 100);

  const handleGameAction = () => {
    // Track ticket purchase in a real app
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <Link
        to="/charity"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Charity Hub
      </Link>

      {/* Game Header */}
      <div className={cn("rounded-2xl p-6 text-white bg-gradient-to-br", config.gradient)}>
        <Badge className="bg-white/20 text-white border-0 text-xs gap-1 mb-3">
          <config.icon className="w-3 h-3" />
          {config.label}
        </Badge>
        <h1 className="font-display text-2xl font-bold">{game.title}</h1>
        <p className="text-white/80 text-sm mt-2">{game.description}</p>

        {/* Charity link */}
        <Link
          to={`/charity/${game.fundraiser.charity.slug}`}
          className="inline-flex items-center gap-2 mt-4 text-white/80 hover:text-white transition-colors"
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm font-medium">{game.fundraiser.charity.name}</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl border border-border/50 bg-card">
          <p className="font-display font-bold text-lg text-foreground">${game.ticketPrice}</p>
          <p className="text-xs text-muted-foreground">per ticket</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-border/50 bg-card">
          <p className="font-display font-bold text-lg text-foreground">{game.ticketsSold.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">tickets sold</p>
        </div>
        <div className="text-center p-3 rounded-xl border border-border/50 bg-card">
          <p className="font-display font-bold text-lg text-foreground">{game.prizes.length}</p>
          <p className="text-xs text-muted-foreground">prizes</p>
        </div>
      </div>

      {/* Ticket progress */}
      <div className="space-y-1.5">
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary/60" style={{ width: `${ticketProgress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {game.ticketsSold.toLocaleString()} of {game.totalTickets.toLocaleString()} tickets sold
        </p>
      </div>

      {/* Game-specific UI */}
      {game.type === "spin-wheel" && (
        <SpinWheel prizes={game.prizes} ticketPrice={game.ticketPrice} onSpin={handleGameAction} />
      )}

      {game.type === "mystery-box" && (
        <MysteryBox prizes={game.prizes} ticketPrice={game.ticketPrice} onOpen={handleGameAction} />
      )}

      {game.type === "raffle" && <RaffleGame game={game} />}

      {game.type === "chinese-auction" && <ChineseAuction game={game} />}

      {/* Fundraiser progress */}
      <div className="rounded-xl border border-border/50 bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Fundraiser Progress</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full gradient-primary"
              style={{ width: `${Math.min(Math.round((game.fundraiser.raisedAmount / game.fundraiser.goalAmount) * 100), 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="font-bold text-foreground">${game.fundraiser.raisedAmount.toLocaleString()}</span>
            <span className="text-muted-foreground">Goal: ${game.fundraiser.goalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
