"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navigation from "@/components/Navigation";

type Company = {
  id: string;
  company_name: string | null;
  headline: string | null;
  description: string | null;
  industry: string | null;
  company_size: string | null;
  location: string | null;
  website_url: string | null;
  linkedin_url: string | null;
  logo_url: string | null;
  looking_for: string[] | null;
  contact_email: string | null;
  is_public: boolean;
};

export default function CompanyPage() {
  const params = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function loadCompany() {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", params.id)
        .eq("is_public", true)
        .single();

      if (!error && data) {
        setCompany(data);
      }
      setLoading(false);
    }

    loadCompany();
  }, [params.id, supabase]);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company?.contact_email) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: company.contact_email,
          fromName: contactForm.name,
          fromEmail: contactForm.email,
          message: contactForm.message,
          companyName: company.company_name,
          type: "company",
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch {
      alert("Failed to send message. Please try again.");
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading company...</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🏢</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Company not found</h1>
          <p className="text-slate-600 mb-6">This company profile doesn&apos;t exist or is not public.</p>
          <Link href="/companies" className="text-slate-700 hover:text-slate-900 font-medium">
            ← Browse all companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation transparent />

      {/* Company Profile */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-teal-700 to-teal-800 px-8 py-10 text-white">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                  {company.logo_url ? (
                    <Image
                      src={company.logo_url}
                      alt={company.company_name || "Company"}
                      width={80}
                      height={80}
                      className="rounded-2xl object-cover"
                    />
                  ) : (
                    "🏢"
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {company.company_name || "Company"}
                  </h1>
                  {company.headline && (
                    <p className="text-white/90 text-lg">{company.headline}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {company.industry && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {company.industry}
                      </span>
                    )}
                    {company.location && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        📍 {company.location}
                      </span>
                    )}
                    {company.company_size && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        👥 {company.company_size} employees
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* About */}
              {company.description && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-3">About</h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {company.description}
                  </p>
                </div>
              )}

              {/* Looking For */}
              {company.looking_for && company.looking_for.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-3">Looking For</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.looking_for.map((cat) => (
                      <span
                        key={cat}
                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 mb-8">
                {company.website_url && (
                  <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Website
                  </a>
                )}
                {company.linkedin_url && (
                  <a
                    href={company.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>

              {/* Contact Button */}
              {company.contact_email && !showContact && !sent && (
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full bg-teal-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200"
                >
                  Contact This Company
                </button>
              )}

              {/* Contact Form */}
              {showContact && !sent && (
                <form onSubmit={handleContact} className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Send a Message</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Your message..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 outline-none resize-none"
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowContact(false)}
                        className="px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={sending}
                        className="flex-grow bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200 disabled:opacity-50"
                      >
                        {sending ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Sent Confirmation */}
              {sent && (
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Your message has been sent to {company.company_name}. They&apos;ll get back to you via email.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Greybird" width={32} height={32} className="object-contain brightness-0 invert opacity-80" />
            <span className="text-xl font-bold text-white">Grey<span className="text-teal-400">bird</span></span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="text-sm">© 2026 Greybird. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
