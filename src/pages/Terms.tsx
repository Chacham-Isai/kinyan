import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      <Link
        to="/home"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>

      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: March 13, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using KINYAN ("the Platform"), you agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use the Platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">2. Description of Service</h2>
          <p>
            KINYAN is a live shopping marketplace designed for the frum community. The Platform enables
            users to buy, sell, and participate in live auctions for a wide range of products including
            seforim, judaica, electronics, fashion, and more.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">3. User Accounts</h2>
          <p>
            To use certain features of the Platform, you must create an account. You are responsible
            for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. You must be at least 18 years old to create an account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">4. Buying & Selling</h2>
          <p>
            All transactions on KINYAN are between buyers and sellers. KINYAN facilitates the
            transaction but is not a party to the sale. Sellers are responsible for accurately
            describing their products, fulfilling orders, and complying with applicable laws.
            Buyers are responsible for reviewing listings carefully before purchasing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">5. Live Auctions</h2>
          <p>
            Bids placed during live auctions are binding. Once you place a bid, you are committing to
            purchase the item at that price if you are the winning bidder. KINYAN employs snipe
            protection to ensure fair bidding — auction timers may be extended if bids are placed in
            the final seconds.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">6. Payments & Fees</h2>
          <p>
            KINYAN processes payments securely through our payment partners. Sellers may be subject to
            transaction fees and payment processing fees. Fee schedules are available on the seller
            dashboard and may be updated from time to time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">7. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Post fraudulent, misleading, or inaccurate listings</li>
            <li>Manipulate bids or engage in shill bidding</li>
            <li>Harass other users or use offensive language</li>
            <li>Sell counterfeit or stolen goods</li>
            <li>Circumvent the Platform's payment system</li>
            <li>Use the Platform for any unlawful purpose</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">8. Charity & Fundraising</h2>
          <p>
            Charity campaigns on KINYAN are conducted by verified organizations. KINYAN verifies
            charity status but does not guarantee outcomes of fundraising campaigns. Donations made
            through the Platform are non-refundable unless required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">9. Limitation of Liability</h2>
          <p>
            KINYAN is provided "as is" without warranties of any kind. We are not liable for any
            damages arising from your use of the Platform, including but not limited to disputes
            between buyers and sellers, product quality, or delivery issues.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">10. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the Platform after changes
            constitutes acceptance of the updated Terms. We will notify users of material changes
            via email or Platform notification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <a href="mailto:support@kinyan.com" className="text-primary hover:underline">
              support@kinyan.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
