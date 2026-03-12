import { useState, useEffect } from "react";
import { Gift, Users, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GiveawayProps {
  isActive: boolean;
  prize?: string;
  onEnter?: () => void;
}

const MOCK_ENTRANTS = [
  "MosheDavid", "SarahR", "ChaimG", "RivkaM", "YossiB",
  "MendelK", "RachelS", "DovB", "LeahG", "ShlomoW",
  "MiriamF", "AviK", "EstherP", "NaftaliR", "TziporahD",
];

export default function StreamGiveaway({ isActive, prize = "Mystery Prize Box", onEnter }: GiveawayProps) {
  const [entered, setEntered] = useState(false);
  const [entrantCount, setEntrantCount] = useState(23);
  const [timeLeft, setTimeLeft] = useState(60);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawName, setDrawName] = useState("");

  useEffect(() => {
    if (!isActive || winner) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          startDraw();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Simulate entrants joining
    const entrantTimer = setInterval(() => {
      setEntrantCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(entrantTimer);
    };
  }, [isActive, winner]);

  const startDraw = () => {
    setIsDrawing(true);
    let i = 0;
    const shuffleInterval = setInterval(() => {
      setDrawName(MOCK_ENTRANTS[Math.floor(Math.random() * MOCK_ENTRANTS.length)]);
      i++;
      if (i > 20) {
        clearInterval(shuffleInterval);
        const finalWinner = entered && Math.random() > 0.7
          ? "You"
          : MOCK_ENTRANTS[Math.floor(Math.random() * MOCK_ENTRANTS.length)];
        setWinner(finalWinner);
        setDrawName(finalWinner);
        setIsDrawing(false);
      }
    }, 100);
  };

  if (!isActive) return null;

  return (
    <div className={cn(
      "rounded-xl border-2 p-3 space-y-2 transition-all",
      winner
        ? "border-yellow-400 bg-yellow-50"
        : isDrawing
        ? "border-primary bg-primary/5 animate-pulse"
        : "border-primary/30 bg-primary/5"
    )}>
      <div className="flex items-center gap-2">
        <Gift className={cn("w-5 h-5", winner ? "text-yellow-600" : "text-primary")} />
        <span className="font-display font-bold text-sm">
          {winner ? "Winner!" : isDrawing ? "Drawing..." : "GIVEAWAY"}
        </span>
        {!winner && !isDrawing && (
          <Badge className="ml-auto text-[10px] bg-primary/10 text-primary border-0 gap-1">
            <Timer className="w-2.5 h-2.5" />
            {timeLeft}s
          </Badge>
        )}
      </div>

      {winner ? (
        <div className="text-center py-2">
          <Trophy className="w-8 h-8 mx-auto text-yellow-500 mb-1" />
          <p className="font-display font-bold text-lg">
            {winner === "You" ? "YOU WON!" : `${winner} wins!`}
          </p>
          <p className="text-xs text-muted-foreground">{prize}</p>
        </div>
      ) : isDrawing ? (
        <div className="text-center py-2">
          <p className="font-display font-bold text-xl text-primary animate-pulse">
            {drawName}
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            Prize: <span className="font-medium text-foreground">{prize}</span>
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" />
              {entrantCount} entered
            </span>
            <Button
              size="sm"
              className={cn(
                "text-xs h-7",
                entered ? "bg-green-100 text-green-700 hover:bg-green-200" : "gradient-primary text-white"
              )}
              onClick={() => {
                if (!entered) {
                  setEntered(true);
                  setEntrantCount((prev) => prev + 1);
                  onEnter?.();
                }
              }}
              disabled={entered}
            >
              {entered ? "Entered!" : "Enter Giveaway"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
