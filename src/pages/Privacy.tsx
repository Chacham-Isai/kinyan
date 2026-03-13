import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
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
        <h1 className="font-display text-3xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: March 13, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Account Information:</strong> Name, email address, and password when you create an account</li>
            <li><strong className="text-foreground">Profile Information:</strong> Username, location, and profile details you choose to provide</li>
            <li><strong className="text-foreground">Transaction Data:</strong> Purchase history, bids, and payment information</li>
            <li><strong className="text-foreground">Usage Data:</strong> How you interact with the Platform, including pages visited, searches, and features used</li>
            <li><strong className="text-foreground">Device Information:</strong> Browser type, operating system, and device identifiers</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process transactions and facilitate buying and selling</li>
            <li>Personalize your experience with relevant product recommendations</li>
            <li>Send notifications about bids, orders, and live streams</li>
            <li>Improve the Platform and develop new features</li>
            <li>Prevent fraud and ensure platform safety</li>
            <li>Communicate important updates and changes</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">3. Sharing Your Information</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-foreground">Other Users:</strong> Your public profile, listings, and reviews are visible to others</li>
            <li><strong className="text-foreground">Payment Processors:</strong> To complete transactions securely</li>
            <li><strong className="text-foreground">Service Providers:</strong> Who help us operate the Platform (hosting, analytics, support)</li>
            <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your information, including
            encryption of data in transit and at rest, secure payment processing, and regular
            security audits. However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access and download your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of marketing communications</li>
            <li>Request information about how your data is used</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">6. Cookies & Tracking</h2>
          <p>
            We use cookies and similar technologies to improve your experience, remember your
            preferences, and analyze Platform usage. You can manage cookie preferences through
            your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">7. Children's Privacy</h2>
          <p>
            KINYAN is not intended for users under 18 years of age. We do not knowingly collect
            personal information from children under 18.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material
            changes via email or Platform notification. Your continued use of the Platform after
            changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-foreground">Contact Us</h2>
          <p>
            For privacy-related questions or requests, contact us at{" "}
            <a href="mailto:privacy@kinyan.com" className="text-primary hover:underline">
              privacy@kinyan.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
