import { Link, useNavigate } from "react-router-dom";
import {
  Settings, ShoppingBag, Heart, Radio, Star, LogOut,
  ChevronRight, Plus, User, CreditCard, Bell, HelpCircle,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/contexts/UserDataContext";

export default function Profile() {
  const { user, profile, signOut } = useAuth();
  const { getFavoriteCount, getFollowingCount } = useUserData();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <User className="w-12 h-12 text-muted-foreground mx-auto" />
        <h1 className="font-display text-xl font-bold">Sign in to KINYAN</h1>
        <p className="text-sm text-muted-foreground">
          Buy, sell, and bid on live streams
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild className="gradient-primary text-white">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: ShoppingBag, label: "My Orders", path: "/orders", badge: "3" },
    { icon: Heart, label: "Saved Items", path: "/saved" },
    { icon: Radio, label: "Following", path: "/following" },
    { icon: Star, label: "My Reviews", path: "/reviews" },
    { icon: Store, label: "Seller Dashboard", path: "/dashboard", highlight: true },
    { icon: CreditCard, label: "Payment Methods", path: "/payments" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-white">
          {profile?.display_name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-xl font-bold text-foreground">
            {profile?.display_name || "User"}
          </h1>
          <p className="text-sm text-muted-foreground">@{profile?.username || user.email?.split("@")[0]}</p>
        </div>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate("/settings")}>
          Edit
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Saved", value: String(getFavoriteCount()) },
          { label: "Reviews", value: "8" },
          { label: "Following", value: String(getFollowingCount()) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-3 rounded-xl border border-border/50 bg-card"
          >
            <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Start Selling CTA */}
      <div className="rounded-xl gradient-primary p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(290_80%_50%/0.4),transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="font-display font-bold text-white text-lg">Start Selling</h2>
          <p className="text-white/70 text-sm mt-1">
            Go live and reach thousands of buyers in the community
          </p>
          <Button
            className="mt-3 bg-white text-blue-700 hover:bg-white/90 font-bold"
            size="sm"
            onClick={() => navigate("/start-selling")}
          >
            <Plus className="w-4 h-4 mr-1" />
            Start Selling
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        {menuItems.map(({ icon: Icon, label, path, badge, highlight }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              highlight
                ? "bg-primary/10 hover:bg-primary/15"
                : "hover:bg-secondary"
            }`}
          >
            <Icon className={`w-5 h-5 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`flex-1 text-sm font-medium ${highlight ? "text-primary" : "text-foreground"}`}>
              {label}
            </span>
            {badge && (
              <span className="w-5 h-5 rounded-full gradient-coral text-white text-xs flex items-center justify-center font-bold">
                {badge}
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Sign Out */}
      <Button
        variant="ghost"
        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
        onClick={handleSignOut}
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </Button>
    </div>
  );
}
