import { Link } from "react-router-dom";
import { ArrowRight, Play, ShoppingBag, Video, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import kinyanKLogo from "@/assets/kinyan-k-logo.png";
import heroGradient from "@/assets/hero-gradient.png";
import blobArt from "@/assets/blob-art.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* HERO — Full-bleed immersive */}
      <section className="relative min-h-[100dvh] flex flex-col">
        {/* Background image */}
        <img
          src={heroGradient}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

        {/* Nav */}
        <nav className="relative z-10 px-5 pt-5 flex items-center justify-between">
          <img src={kinyanKLogo} alt="Kinyan" className="w-9 h-9 brightness-0 invert" />
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full font-semibold text-sm">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="bg-white text-foreground hover:bg-white/90 font-bold rounded-full px-5 shadow-lg">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </nav>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="animate-slide-up">
            <img
              src={kinyanKLogo}
              alt="Kinyan"
              className="w-24 h-24 mx-auto mb-5 brightness-0 invert drop-shadow-2xl"
            />
            <h1 className="font-display text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
              kinyan
            </h1>
            <p className="text-white/70 text-lg font-medium mt-3">
              Your Community. Your Marketplace.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 px-6 pb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/95 font-bold rounded-full h-14 text-base shadow-xl">
              <Link to="/signup">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white/90 hover:text-white hover:bg-white/10 rounded-full h-14 text-base font-semibold">
              <Link to="/browse">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Explore
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHAT IS KINYAN — Super clean */}
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto text-center space-y-4">
          <h2 className="font-display text-3xl font-black text-foreground">
            Buy. Sell. Go Live.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            The marketplace built for the frum community. Shop from trusted sellers, watch live auctions, and find everything you need — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mt-12">
          {[
            { icon: ShoppingBag, label: "Shop" },
            { icon: Video, label: "Live" },
            { icon: Shield, label: "Safe" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2.5">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BLOB ART SECTION */}
      <section className="relative overflow-hidden">
        <img
          src={blobArt}
          alt=""
          className="w-full h-64 sm:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-display text-4xl sm:text-5xl font-black text-white drop-shadow-lg">
              50K+
            </p>
            <p className="text-white/80 font-semibold text-sm mt-1 drop-shadow">Community Members</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES — Pill chips */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto">
          <h3 className="font-display text-xl font-extrabold text-foreground text-center mb-6">
            What are you looking for?
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {[
              { name: "Seforim", emoji: "📚" },
              { name: "Judaica", emoji: "✨" },
              { name: "Fashion", emoji: "👔" },
              { name: "Electronics", emoji: "📱" },
              { name: "Home", emoji: "🏠" },
              { name: "Simcha", emoji: "🎉" },
              { name: "Kids", emoji: "🧸" },
              { name: "Food", emoji: "🍕" },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/browse/${cat.name.toLowerCase()}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all text-sm font-semibold card-lift"
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-primary px-6 py-20">
          <div className="max-w-md mx-auto text-center space-y-6">
            <img src={kinyanKLogo} alt="" className="w-14 h-14 mx-auto brightness-0 invert" />
            <h2 className="font-display text-3xl font-black text-primary-foreground">
              Join the Community
            </h2>
            <p className="text-primary-foreground/60 font-medium">
              Thousands of families are already on KINYAN.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/95 font-bold rounded-full px-10 h-14 text-base shadow-xl">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER — Minimal */}
      <footer className="bg-card border-t border-border px-6 py-8">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <img src={kinyanKLogo} alt="Kinyan" className="w-6 h-6" />
            <span className="font-display font-bold text-foreground text-sm">kinyan</span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/help" className="hover:text-foreground transition-colors">Help</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} KINYAN
          </p>
        </div>
      </footer>
    </div>
  );
}
