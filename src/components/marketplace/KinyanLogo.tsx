import { cn } from "@/lib/utils";

interface KinyanLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  textClassName?: string;
}

/**
 * KINYAN butterfly-K logo mark
 * Inspired by the brand identity — 4 rounded petals forming a K shape
 */
export default function KinyanLogo({
  size = 32,
  className,
  showText = false,
  showTagline = false,
  textClassName,
}: KinyanLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Left half — two stacked rounded shapes */}
        <path
          d="M8 16C8 8 14 2 22 2H38C42 2 44 4 44 8V44C44 46 42 48 40 48H22C14 48 8 42 8 34V16Z"
          fill="url(#kinyan-grad)"
        />
        <path
          d="M8 66C8 58 14 52 22 52H40C42 52 44 54 44 56V92C44 96 42 98 38 98H22C14 98 8 92 8 84V66Z"
          fill="url(#kinyan-grad)"
        />
        {/* Right half — two angled petals forming butterfly wings */}
        <path
          d="M52 8C52 4 54 2 58 2C62 2 66 3 70 6L92 28C96 32 98 38 98 42C98 48 94 50 90 48L56 28C53 26 52 23 52 20V8Z"
          fill="url(#kinyan-grad)"
        />
        <path
          d="M52 80C52 77 53 74 56 72L90 52C94 50 98 52 98 58C98 62 96 68 92 72L70 94C66 97 62 98 58 98C54 98 52 96 52 92V80Z"
          fill="url(#kinyan-grad)"
        />
        <defs>
          <linearGradient id="kinyan-grad" x1="8" y1="2" x2="98" y2="98" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0040FF" />
            <stop offset="1" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-display font-bold text-foreground tracking-tight leading-none", textClassName)}>
            kinyan
          </span>
          {showTagline && (
            <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
              Your Community. Your Marketplace.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
