import { Link } from "react-router-dom";
import {
  ArrowLeft, User, Bell, Lock, CreditCard, Globe, Moon, Sun,
  ChevronRight, Shield, Trash2, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    liveAlerts: true,
    promotions: false,
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>

      {/* Account */}
      <section className="space-y-1">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Account</h2>
        {[
          { icon: User, label: "Edit Profile", desc: "Name, username, avatar", path: "/profile" },
          { icon: Lock, label: "Password & Security", desc: "Change password, 2FA" },
          { icon: CreditCard, label: "Payment Methods", desc: "Cards, bank accounts", path: "/payments" },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.path || "#"}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ))}
      </section>

      {/* Notifications */}
      <section className="space-y-1">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Notifications</h2>
        <div className="space-y-1">
          {[
            { key: "orders" as const, label: "Order Updates", desc: "Shipping, delivery notifications" },
            { key: "messages" as const, label: "Messages", desc: "When sellers reply to your questions" },
            { key: "liveAlerts" as const, label: "Live Stream Alerts", desc: "When followed sellers go live" },
            { key: "promotions" as const, label: "Promotions", desc: "Deals and community updates" },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-3 px-3 py-3 rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <button
                onClick={() => setNotifications((n) => ({ ...n, [item.key]: !n[item.key] }))}
                className={cn(
                  "w-11 h-6 rounded-full transition-colors relative",
                  notifications[item.key] ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                    notifications[item.key] ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="space-y-1">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">Privacy & Support</h2>
        {[
          { icon: Shield, label: "Privacy Policy", path: "/privacy" },
          { icon: Globe, label: "Terms of Service", path: "/terms" },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-secondary transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
              <item.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-foreground flex-1">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ))}
      </section>

      {/* Danger Zone */}
      <section className="space-y-3 pt-4 border-t border-border/50">
        <Button
          variant="ghost"
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </Button>
      </section>
    </div>
  );
}
