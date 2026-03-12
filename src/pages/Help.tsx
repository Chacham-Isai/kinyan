import { Link } from "react-router-dom";
import {
  ArrowLeft, HelpCircle, ShoppingBag, Truck, CreditCard,
  Shield, Radio, MessageCircle, ChevronDown, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    category: "Buying",
    icon: ShoppingBag,
    questions: [
      { q: "How do I place an order?", a: "Browse items, add to cart, and checkout with secure payment. Your order is protected by our buyer guarantee." },
      { q: "Can I return an item?", a: "Yes! You have 7 days after delivery to request a return if the item doesn't match the listing description." },
      { q: "How do live auctions work?", a: "Join a live stream, place bids in real-time, and win items at great prices. You'll be charged only if you win." },
    ],
  },
  {
    category: "Selling",
    icon: Radio,
    questions: [
      { q: "How do I start selling?", a: "Go to your Profile > Seller Dashboard > Create Listing. Fill in details, add photos, and publish." },
      { q: "What are the seller fees?", a: "KINYAN charges a competitive 8% commission on completed sales. No listing fees." },
      { q: "How do I go live?", a: "From the Sell page, switch to 'Go Live' tab, add a title and category, then start streaming to your audience." },
    ],
  },
  {
    category: "Payments",
    icon: CreditCard,
    questions: [
      { q: "What payment methods are accepted?", a: "We accept all major credit cards, debit cards, and bank transfers through our secure payment system." },
      { q: "When do sellers get paid?", a: "Sellers receive payment 3 business days after the buyer confirms delivery." },
    ],
  },
  {
    category: "Shipping",
    icon: Truck,
    questions: [
      { q: "How long does shipping take?", a: "Sellers ship within 2-3 business days. Standard shipping takes 3-7 business days depending on location." },
      { q: "Do you ship internationally?", a: "Currently KINYAN operates within the US. International shipping is coming soon." },
    ],
  },
  {
    category: "Safety",
    icon: Shield,
    questions: [
      { q: "Is my payment information safe?", a: "Absolutely. We use industry-standard encryption and never store your full card details." },
      { q: "What is Buyer Protection?", a: "Every purchase is covered. If an item doesn't arrive or doesn't match the description, you get a full refund." },
    ],
  },
];

function FAQSection({ category, icon: Icon, questions }: typeof faqItems[0]) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h2 className="font-display font-bold text-foreground">{category}</h2>
      </div>
      {questions.map((item, i) => (
        <div key={i} className="border border-border/50 rounded-xl overflow-hidden bg-card">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="text-sm font-medium text-foreground pr-4">{item.q}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground shrink-0 transition-transform",
                openIndex === i && "rotate-180"
              )}
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-3">
              <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default function Help() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      <Link
        to="/profile"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Profile
      </Link>

      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto">
          <HelpCircle className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">Help & Support</h1>
        <p className="text-sm text-muted-foreground">Find answers or get in touch</p>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Need help?</p>
          <p className="text-xs text-muted-foreground">Our support team responds within 24 hours</p>
        </div>
        <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
          <Mail className="w-3.5 h-3.5" />
          Contact
        </Button>
      </div>

      {/* FAQ Sections */}
      {faqItems.map((section) => (
        <FAQSection key={section.category} {...section} />
      ))}
    </div>
  );
}
