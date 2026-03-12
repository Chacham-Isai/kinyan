import { cn } from "@/lib/utils";
import kinyanKLogo from "@/assets/kinyan-k-logo.png";

interface KinyanLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  textClassName?: string;
}

export default function KinyanLogo({
  size = 32,
  className,
  showText = false,
  showTagline = false,
  textClassName,
}: KinyanLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src={kinyanKLogo}
        alt="Kinyan"
        width={size}
        height={size}
        className="shrink-0 object-contain"
      />
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-display font-bold text-foreground tracking-tight leading-none",
              textClassName
            )}
          >
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
