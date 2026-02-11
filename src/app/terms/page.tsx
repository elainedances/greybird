import Link from "next/link";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Greybird",
  description: "Terms of Service for Greybird - the rules and guidelines for using our platform.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Last updated: February 10, 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 mb-4">
              By accessing or using Greybird (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Description of Service</h2>
            <p className="text-slate-600 mb-4">
              Greybird is a platform connecting experienced professionals (40+ years of industry experience) with companies seeking part-time, advisory, or flexible work arrangements. We facilitate connections but are not a party to any agreements between users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Eligibility</h2>
            <p className="text-slate-600 mb-4">
              You must be at least 18 years old to use the Service. By using Greybird, you represent that you have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. User Accounts</h2>
            <p className="text-slate-600 mb-4">When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Acceptable Use</h2>
            <p className="text-slate-600 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post false, misleading, or fraudulent information</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or collect data</li>
              <li>Interfere with the proper functioning of the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Intellectual Property</h2>
            <p className="text-slate-600 mb-4">
              The Greybird name, logo, and all related content are the property of Greybird. You may not use our branding without prior written consent. Content you post remains yours, but you grant us a license to display it on the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-slate-600 mb-4">
              The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy of user profiles, the quality of matches, or the outcome of any professional engagement made through the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              To the maximum extent permitted by law, Greybird shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Termination</h2>
            <p className="text-slate-600 mb-4">
              We reserve the right to suspend or terminate your access to the Service at any time, for any reason, without notice. You may also delete your account at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Changes to Terms</h2>
            <p className="text-slate-600 mb-4">
              We may modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will notify users of significant changes via email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">11. Governing Law</h2>
            <p className="text-slate-600 mb-4">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">12. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have questions about these Terms, please contact us at:{" "}
              <a href="mailto:hello@greybird.pro" className="text-slate-800 underline">hello@greybird.pro</a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
