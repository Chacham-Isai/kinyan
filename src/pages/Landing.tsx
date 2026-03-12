import { Link } from "react-router-dom";
import { Users, Shield, Video, ArrowRight, Zap, Heart, TrendingUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import kinyanFullLogo from "@/assets/kinyan-logo-full.png";
import kinyanKLogo from "@/assets/kinyan-k-logo.png";
import KinyanLogo from "@/components/marketplace/KinyanLogo";

const features = [
  {
    icon: Users,
    title: "Trusted Community",
    description: "Buy and sell within the frum community. Every seller is verified, every transaction is backed by our guarantee.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Protected checkout with escrow-style payments. Your money is safe until you confirm delivery.",
  },
  {
    icon: Video,
    title: "Live Selling",
    description: "Watch live auctions and buy in real-time. Interact with sellers, ask questions, and bid on items you love.",
  },
];

const testimonials = [
  {
    name: "Ephraim Weiss",
    role: "Buyer",
    quote: "KINYAN completely changed how I shop for seforim. The live auctions are addictive — I've found rare editions I couldn't find anywhere else.",
    avatar: "EW",
  },
  {
    name: "Ashi Pinkowitz",
    role: "Seller",
    quote: "I started selling Judaica on KINYAN six months ago and my business has tripled. The community here actually appreciates quality craftsmanship.",
    avatar: "AP",
  },
  {
    name: "Leah Goldstein",
    role: "Buyer",
    quote: "Love that it's built for us. Shopping for simcha supplies used to be such a hassle — now I find everything in one place from people I trust.",
    avatar: "LG",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "10K+", label: "Sellers" },
  { value: "$2M+", label: "Monthly Sales" },
  { value: "4.9", label: "App Rating" },
];

const categories = [
  { name: "Seforim", emoji: "📚" },
  { name: "Judaica", emoji: "✨" },
  { name: "Fashion", emoji: "👔" },
  { name: "Electronics", emoji: "📱" },
  { name: "Home", emoji: "🏠" },
  { name: "Simcha", emoji: "🎉" },
  { name: "Kids", emoji: "🧸" },
  { name: "Food", emoji: "🍕" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section — Splash-style */}
      <section className="relative min-h-[100dvh] flex flex-col">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-hero" />

        {/* Decorative blobs */}
        <div className="absolute top-[10%] -left-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[5%] right-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[30%] left-[10%] w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-blob" style={{ animationDelay: "4s" }} />

        {/* Top nav */}
        <nav className="relative z-10 px-5 pt-4 pb-2 flex items-center justify-between">
          <div /> {/* spacer */}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-primary-foreground/90 hover:bg-primary-foreground/10 text-sm font-semibold rounded-full">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold rounded-full px-5">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </nav>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center -mt-16">
          <img
            src={kinyanKLogo}
            alt="Kinyan"
            className="w-28 h-28 sm:w-36 sm:h-36 mb-4 drop-shadow-2xl animate-slide-up"
          />
          <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-none animate-slide-up" style={{ animationDelay: "0.1s" }}>
            kinyan
          </h1>
        </div>

        {/* Bottom tagline + CTA */}
        <div className="relative z-10 px-6 pb-12 text-center space-y-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p className="font-display text-lg sm:text-xl font-semibold text-foreground/80">
            <span className="text-muted-foreground">Your Community.</span>{" "}
            <span className="text-primary font-extrabold">Your Marketplace.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground font-bold rounded-full h-14 text-base w-full sm:w-auto px-8">
              <Link to="/signup">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-14 text-base font-semibold border-2 border-primary/20 w-full sm:w-auto px-8">
              <Link to="/browse">
                Browse
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/browse/${cat.name.toLowerCase()}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all whitespace-nowrap text-sm font-semibold card-lift"
              >
                <span className="text-base">{cat.emoji}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-black text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 relative">
        {/* Subtle background blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/3 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
              Built for the Community
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto font-medium">
              Everything you need to buy and sell, designed with our values in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-3xl p-8 border border-border shadow-sm text-center card-lift">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse or Go Live", desc: "Explore listings or jump into a live auction. New items drop every day from trusted community sellers.", icon: Zap },
              { step: "2", title: "Bid, Buy, or Save", desc: "Place a bid in a live auction, buy instantly, or save items to your wishlist for later.", icon: Heart },
              { step: "3", title: "Get It Delivered", desc: "Secure checkout with buyer protection. Track your order and rate your experience.", icon: TrendingUp },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto">
                  <span className="font-display font-black text-xl">{item.step}</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">
              What Our Community Says
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-3xl p-6 border border-border shadow-sm relative card-lift">
                <div className="text-primary/15 text-6xl font-serif leading-none mb-2">&ldquo;</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-display font-extrabold text-primary text-sm uppercase tracking-wide">Kinyan Gives</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black text-foreground leading-tight">
                Give. Play. Win.<br />
                Change Lives.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Support community charities through live fundraisers, Chinese auctions,
                raffles, spin wheels, and mystery boxes. Every ticket makes a difference.
              </p>
              <Button asChild size="lg" className="gradient-primary text-primary-foreground font-bold rounded-full px-8">
                <Link to="/charity">
                  Explore Charity Hub
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🎰", title: "Chinese Auctions", desc: "Place tickets in prize baskets" },
                { emoji: "🎡", title: "Spin Wheels", desc: "Spin & win instant prizes" },
                { emoji: "🎁", title: "Mystery Boxes", desc: "Every box is a winner" },
                { emoji: "🎟️", title: "Raffles", desc: "Win big with a single ticket" },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl bg-card border border-border p-5 text-center card-lift">
                  <span className="text-3xl">{item.emoji}</span>
                  <p className="font-display font-extrabold text-sm text-foreground mt-2">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-5 py-20 text-center">
          <img src={kinyanKLogo} alt="" className="w-16 h-16 mx-auto mb-6 brightness-0 invert" />
          <h2 className="font-display text-3xl md:text-4xl font-black text-primary-foreground">
            Ready to Join?
          </h2>
          <p className="text-primary-foreground/70 mt-3 max-w-md mx-auto font-medium">
            Thousands of families are already buying and selling on KINYAN.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold rounded-full px-8 h-14 text-base">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 h-14 text-base font-semibold">
              <Link to="/browse">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <KinyanLogo size={28} showText showTagline textClassName="text-base" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-foreground mb-3">Marketplace</h4>
              <div className="space-y-2">
                <Link to="/browse" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Browse</Link>
                <Link to="/live" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Live Streams</Link>
                <Link to="/sell" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Start Selling</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-foreground mb-3">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link to="/help" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-foreground mb-3">Legal</h4>
              <div className="space-y-2">
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} KINYAN. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Your Community. Your Marketplace.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
