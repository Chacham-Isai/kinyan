import { Link } from "react-router-dom";
import { ArrowLeft, Users, Shield, Video, Heart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import KinyanLogo from "@/components/marketplace/KinyanLogo";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-10">
      <Link
        to="/home"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>

      {/* Hero */}
      <div className="text-center space-y-4">
        <KinyanLogo size={48} showText showTagline textClassName="text-3xl" />
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          The Frum Community Marketplace
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          KINYAN was built to give the frum community a trusted, modern platform
          for buying and selling. From seforim to electronics, live auctions to
          instant purchases — everything you need, from people you trust.
        </p>
      </div>

      {/* Mission */}
      <div className="rounded-2xl gradient-brand p-8 text-center text-white space-y-3">
        <h2 className="font-display text-2xl font-bold">Our Mission</h2>
        <p className="text-white/80 max-w-md mx-auto leading-relaxed">
          To build the most trusted and vibrant marketplace for the Jewish community,
          where every transaction strengthens our connections.
        </p>
      </div>

      {/* Values */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-foreground text-center">What We Believe</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Shield, title: "Trust First", desc: "Every seller is verified. Every transaction is protected. Your money is safe with us." },
            { icon: Users, title: "Community Driven", desc: "Built by the community, for the community. We listen and build what matters to you." },
            { icon: Heart, title: "Values Aligned", desc: "Shabbos-aware technology. Tznius product guidelines. We respect our shared values." },
            { icon: Zap, title: "Innovation", desc: "Live selling, real-time auctions, instant payments. Modern tech that serves the community." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border/50 bg-card p-5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "50K+", label: "Active Users" },
          { value: "10K+", label: "Sellers" },
          { value: "200K+", label: "Items Sold" },
          { value: "4.9", label: "App Rating" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-4 rounded-xl border border-border/50 bg-card">
            <p className="font-display text-2xl font-bold text-gradient">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <div className="text-center space-y-4 pb-8">
        <h2 className="font-display text-2xl font-bold text-foreground">Ready to join?</h2>
        <div className="flex gap-3 justify-center">
          <Button asChild size="lg" className="gradient-primary text-white font-bold rounded-full px-8">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-semibold">
            <Link to="/browse">Browse</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
