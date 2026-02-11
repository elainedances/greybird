import Link from "next/link";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Privacy Policy — Greybird",
  description: "Privacy Policy for Greybird - how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last updated: February 10, 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Introduction</h2>
            <p className="text-slate-600 mb-4">
              Greybird (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website greybird.pro and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Information We Collect</h2>
            <p className="text-slate-600 mb-4">We collect information you provide directly to us:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li><strong>Contact Information:</strong> Email address when you join our waitlist</li>
              <li><strong>User Type:</strong> Whether you&apos;re a company or an expert</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent, and interactions (via analytics)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Notify you when Greybird launches</li>
              <li>Send relevant updates about our platform</li>
              <li>Improve our website and services</li>
              <li>Respond to your inquiries</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Data Storage & Security</h2>
            <p className="text-slate-600 mb-4">
              Your data is stored securely using Supabase, a trusted database provider with enterprise-grade security. We implement appropriate technical and organizational measures to protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Third-Party Services</h2>
            <p className="text-slate-600 mb-4">We use the following third-party services:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li><strong>Vercel:</strong> Website hosting and analytics</li>
              <li><strong>Supabase:</strong> Database storage</li>
              <li><strong>Resend:</strong> Email delivery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Your Rights</h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 mb-4 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Cookies</h2>
            <p className="text-slate-600 mb-4">
              We use essential cookies for website functionality and analytics cookies to understand how visitors use our site. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Changes to This Policy</h2>
            <p className="text-slate-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have questions about this Privacy Policy, please contact us at:{" "}
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
    </div>
  );
}
