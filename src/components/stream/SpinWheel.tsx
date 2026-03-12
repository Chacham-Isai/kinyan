import { useState, useRef } from "react";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface WheelSegment {
  label: string;
  emoji: string;
  color: string;
}

interface SpinWheelProps {
  segments?: WheelSegment[];
  onResult?: (segment: WheelSegment) => void;
}

const DEFAULT_SEGMENTS: WheelSegment[] = [
  { label: "Free Shipping", emoji: "📦", color: "#FF6B6B" },
  { label: "10% Off", emoji: "🏷️", color: "#4ECDC4" },
  { label: "$5 Credit", emoji: "💵", color: "#45B7D1" },
  { label: "Mystery Box", emoji: "🎁", color: "#96CEB4" },
  { label: "Try Again", emoji: "🔄", color: "#FFEAA7" },
  { label: "25% Off", emoji: "🔥", color: "#DDA0DD" },
  { label: "$25 Credit", emoji: "💎", color: "#98D8C8" },
  { label: "Free Item", emoji: "⭐", color: "#F7DC6F" },
];

export default function SpinWheel({ segments = DEFAULT_SEGMENTS, onResult }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // Random winner
    const winnerIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length;
    // Spin 5-8 full rotations + land on winner
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 360;
    const targetAngle = extraRotations + (360 - winnerIndex * segmentAngle - segmentAngle / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(segments[winnerIndex]);
      onResult?.(segments[winnerIndex]);
      toast.success(`You won: ${segments[winnerIndex].emoji} ${segments[winnerIndex].label}!`);
    }, 4000);
  };

  const segmentAngle = 360 / segments.length;

  return (
    <div className="space-y-4">
      <div className="relative mx-auto" style={{ width: 260, height: 260 }}>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-red-500" />
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-foreground/20 overflow-hidden shadow-lg"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {segments.map((seg, i) => {
              const startAngle = (i * segmentAngle - 90) * (Math.PI / 180);
              const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);
              const largeArc = segmentAngle > 180 ? 1 : 0;

              const midAngle = ((i + 0.5) * segmentAngle - 90) * (Math.PI / 180);
              const textX = 100 + 60 * Math.cos(midAngle);
              const textY = 100 + 60 * Math.sin(midAngle);
              const textRotation = (i + 0.5) * segmentAngle;

              return (
                <g key={i}>
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={seg.color}
                    stroke="white"
                    strokeWidth="1"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="7"
                    fontWeight="bold"
                    transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    {seg.emoji}
                  </text>
                </g>
              );
            })}
            {/* Center circle */}
            <circle cx="100" cy="100" r="15" fill="white" stroke="#ddd" strokeWidth="2" />
            <text x="100" y="100" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="bold">
              🎰
            </text>
          </svg>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="text-center p-3 rounded-xl bg-green-50 border border-green-200 animate-in zoom-in-95">
          <p className="text-2xl mb-1">{result.emoji}</p>
          <p className="font-display font-bold text-green-800">{result.label}</p>
          <p className="text-xs text-green-600 mt-1">Added to your account!</p>
        </div>
      )}

      {/* Spin Button */}
      <Button
        className={cn(
          "w-full h-12 font-bold text-base gap-2",
          isSpinning ? "opacity-50" : "gradient-primary text-white"
        )}
        onClick={spin}
        disabled={isSpinning}
      >
        <RotateCw className={cn("w-5 h-5", isSpinning && "animate-spin")} />
        {isSpinning ? "Spinning..." : result ? "Spin Again" : "SPIN THE WHEEL"}
      </Button>
    </div>
  );
}
