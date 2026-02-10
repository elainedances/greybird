"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AvatarUpload from "@/components/AvatarUpload";

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Consulting",
  "Retail",
  "Energy",
  "Other",
];

const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const CATEGORIES = [
  "Tech & IT",
  "Finance & Accounting",
  "Marketing & Content",
  "HR & Recruiting",
  "Engineering",
  "Legal & Compliance",
  "Strategy & Consulting",
  "Operations",
  "Sales",
  "Other",
];

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

export default function EditCompanyPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadCompany() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      // Check if user is a company
      const userType = user.user_metadata?.user_type;
      if (userType !== "company") {
        router.push("/profile/edit");
        return;
      }

      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading company:", error);
      }

      if (data) {
        setCompany(data);
      } else {
        // Create default company profile
        setCompany({
          id: user.id,
          company_name: null,
          headline: null,
          description: null,
          industry: null,
          company_size: null,
          location: null,
          website_url: null,
          linkedin_url: null,
          logo_url: null,
          looking_for: [],
          contact_email: user.email || null,
          is_public: false,
        });
      }
      setLoading(false);
    }

    loadCompany();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from("companies")
      .upsert({
        ...company,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      router.push("/dashboard");
    }
  };

  const updateCompany = (field: keyof Company, value: unknown) => {
    if (!company) return;
    setCompany({ ...company, [field]: value });
  };

  const toggleLookingFor = (category: string) => {
    if (!company) return;
    const current = company.looking_for || [];
    if (current.includes(category)) {
      updateCompany("looking_for", current.filter((c) => c !== category));
    } else {
      updateCompany("looking_for", [...current, category]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading company profile...</div>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Greybird" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold text-slate-800">
              Grey<span className="text-slate-600">bird</span>
            </span>
          </Link>
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Company Profile</h1>
          <p className="text-slate-600">
            Complete your company profile to attract experienced professionals.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Logo */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Company Logo</h2>
            <div className="flex justify-center">
              <AvatarUpload
                userId={company.id}
                currentUrl={company.logo_url}
                onUpload={(url) => updateCompany("logo_url", url || null)}
                size={120}
              />
            </div>
          </section>

          {/* Basic Info */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Company Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={company.company_name || ""}
                  onChange={(e) => updateCompany("company_name", e.target.value)}
                  placeholder="Acme Corporation"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Headline *
                </label>
                <input
                  type="text"
                  value={company.headline || ""}
                  onChange={(e) => updateCompany("headline", e.target.value)}
                  placeholder="Leading innovator in sustainable technology solutions"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Industry
                </label>
                <select
                  value={company.industry || ""}
                  onChange={(e) => updateCompany("industry", e.target.value || null)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Size
                </label>
                <select
                  value={company.company_size || ""}
                  onChange={(e) => updateCompany("company_size", e.target.value || null)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                >
                  <option value="">Select size...</option>
                  {COMPANY_SIZES.map((size) => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={company.location || ""}
                  onChange={(e) => updateCompany("location", e.target.value || null)}
                  placeholder="San Francisco, CA"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  About Your Company
                </label>
                <textarea
                  value={company.description || ""}
                  onChange={(e) => updateCompany("description", e.target.value || null)}
                  placeholder="Tell professionals about your company, culture, and the kind of opportunities you offer..."
                  rows={4}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">{(company.description || "").length}/1000 characters</p>
              </div>
            </div>
          </section>

          {/* What You're Looking For */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">What Are You Looking For?</h2>
            <p className="text-sm text-slate-600 mb-4">
              Select the types of expertise you&apos;re interested in
            </p>
            
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleLookingFor(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    (company.looking_for || []).includes(category)
                      ? "bg-slate-800 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Contact & Links */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Contact Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={company.contact_email || ""}
                  onChange={(e) => updateCompany("contact_email", e.target.value || null)}
                  placeholder="hiring@company.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">Experts will contact you at this email</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={company.website_url || ""}
                  onChange={(e) => updateCompany("website_url", e.target.value || null)}
                  placeholder="https://company.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={company.linkedin_url || ""}
                  onChange={(e) => updateCompany("linkedin_url", e.target.value || null)}
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Visibility */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Profile Visibility</h2>
                <p className="text-sm text-slate-600">
                  Make your company visible to experienced professionals looking for opportunities
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={company.is_public}
                  onChange={(e) => updateCompany("is_public", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
              </label>
            </div>
          </section>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Company Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
