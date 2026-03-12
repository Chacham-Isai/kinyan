import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
  startTime: number;
}

const REACTION_EMOJIS = ["❤️", "🔥", "😍", "👏", "💎", "🙌", "✡️", "🕎"];

export default function StreamReactions() {
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const counterRef = useRef(0);

  // Simulate other viewers' reactions
  useEffect(() => {
    const interval = setInterval(() => {
      const emoji = REACTION_EMOJIS[Math.floor(Math.random() * REACTION_EMOJIS.length)];
      addReaction(emoji);
    }, 2000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

  // Clean up old reactions
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setReactions((prev) => prev.filter((r) => now - r.startTime < 3000));
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  const addReaction = (emoji: string) => {
    counterRef.current++;
    setReactions((prev) => [
      ...prev,
      {
        id: counterRef.current,
        emoji,
        x: 10 + Math.random() * 80,
        startTime: Date.now(),
      },
    ]);
  };

  return (
    <div className="relative">
      {/* Floating reactions */}
      <div className="absolute bottom-full right-0 w-20 h-48 pointer-events-none overflow-hidden">
        {reactions.map((r) => (
          <span
            key={r.id}
            className="absolute text-2xl animate-float-up"
            style={{
              left: `${r.x}%`,
              bottom: 0,
              animation: "floatUp 3s ease-out forwards",
            }}
          >
            {r.emoji}
          </span>
        ))}
      </div>

      {/* Reaction buttons */}
      <div className="flex items-center gap-1">
        {REACTION_EMOJIS.slice(0, 5).map((emoji) => (
          <button
            key={emoji}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors text-lg active:scale-125"
            onClick={() => addReaction(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-180px) scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
