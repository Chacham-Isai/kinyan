import { Link } from "react-router-dom";
import { Users, Shield, Video, Star, ArrowRight, ChevronRight, Zap, Heart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <KinyanLogo size={32} showText showTagline textClassName="text-xl" />
          <div className="hidden md:flex items-center gap-8">
            <Link to="/browse" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
            <Link to="/sell" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sell</Link>
            <Link to="/live" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Live</Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-sm">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="gradient-primary text-white font-semibold rounded-full px-5">
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blobs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <div className="space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                Your Community.<br />
                <span className="text-gradient">Your Marketplace.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                The marketplace for buying and selling in the frum community.
                Live auctions, trusted sellers, everything you need — all in one place.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg" className="gradient-primary text-white font-bold rounded-full px-8 h-12 text-base">
                  <Link to="/signup">
                    Start Shopping
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold border-2">
                  <Link to="/sell">Start Selling</Link>
                </Button>
              </div>
            </div>

            {/* Right — Product grid mockup */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-3 gap-3 transform rotate-2">
                {[
                  { bg: "bg-blue-50", label: "Electronics" },
                  { bg: "bg-amber-50", label: "Judaica" },
                  { bg: "bg-rose-50", label: "Fashion" },
                  { bg: "bg-emerald-50", label: "Home" },
                  { bg: "bg-purple-50", label: "Seforim" },
                  { bg: "bg-cyan-50", label: "Kids" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`${item.bg} rounded-2xl aspect-square flex items-center justify-center shadow-sm border border-white/80`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 border border-border/50 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">LIVE</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">342 watching</p>
                    <p className="text-[10px] text-muted-foreground">Seforim auction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="border-y border-border/50 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/browse/${cat.name.toLowerCase()}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-all whitespace-nowrap text-sm font-medium"
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-blobs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Built for the Community
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Everything you need to buy and sell, designed with our values in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-8 border border-border/50 shadow-sm text-center">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              How KINYAN Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Browse or Go Live", desc: "Explore listings or jump into a live auction. New items drop every day from trusted community sellers.", icon: Zap },
              { step: "2", title: "Bid, Buy, or Save", desc: "Place a bid in a live auction, buy instantly, or save items to your wishlist for later.", icon: Heart },
              { step: "3", title: "Get It Delivered", desc: "Secure checkout with buyer protection. Track your order and rate your experience.", icon: TrendingUp },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="font-display font-bold text-primary text-lg">{item.step}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blobs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              What Our Community Says
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm relative">
                {/* Quote mark */}
                <div className="text-primary/20 text-5xl font-serif leading-none mb-2">&ldquo;</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charity Section */}
      <section className="bg-white border-y border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                <span className="font-display font-bold text-primary text-sm">KINYAN Gives</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Give. Play. Win.<br />
                Change Lives.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Support community charities through live fundraisers, Chinese auctions,
                raffles, spin wheels, and mystery boxes. Every ticket makes a difference.
              </p>
              <Button asChild size="lg" className="gradient-primary text-white font-bold rounded-full px-8">
                <Link to="/charity">
                  Explore Charity Hub
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: "🎰", title: "Chinese Auctions", desc: "Place tickets in prize baskets" },
                { emoji: "🎡", title: "Spin Wheels", desc: "Spin & win instant prizes" },
                { emoji: "🎁", title: "Mystery Boxes", desc: "Every box is a winner" },
                { emoji: "🎟️", title: "Raffles", desc: "Win big with a single ticket" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-primary/5 border border-primary/10 p-4 text-center">
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="font-display font-bold text-sm text-foreground mt-2">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-brand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Ready to Join?
          </h2>
          <p className="text-white/80 mt-3 max-w-md mx-auto">
            Thousands of families are already buying and selling on KINYAN. Your Community. Your Marketplace.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-white/90 font-bold rounded-full px-8 h-12 text-base">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-12 text-base font-semibold">
              <Link to="/browse">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <KinyanLogo size={28} showText showTagline textClassName="text-base" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Marketplace</h4>
              <div className="space-y-2">
                <Link to="/browse" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Browse</Link>
                <Link to="/live" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Live Streams</Link>
                <Link to="/sell" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Start Selling</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Company</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link to="/help" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">Legal</h4>
              <div className="space-y-2">
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} KINYAN. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Your Community. Your Marketplace.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
