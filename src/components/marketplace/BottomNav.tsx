import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Radio, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Compass, label: "Discover", path: "/discover" },
  { icon: Radio, label: "Live", path: "/feed" },
  { icon: Heart, label: "Charity", path: "/charity" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive =
            path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-0",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label === "Live" ? (
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse-live" />
                </div>
              ) : (
                <Icon className="w-5 h-5" />
              )}
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
