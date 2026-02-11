"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navigation from "@/components/Navigation";
import AvatarUpload from "@/components/AvatarUpload";

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

type Profile = {
  id: string;
  user_type: string;
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string | null;
  years_experience: number | null;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  availability: string | null;
  categories: string[] | null;
  skills: string[] | null;
  contact_email: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  preferred_contact: string | null;
  is_public: boolean;
};

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        // Profile might not exist yet, create default
        setProfile({
          id: user.id,
          user_type: user.user_metadata?.user_type || "expert",
          full_name: null,
          headline: null,
          bio: null,
          location: null,
          avatar_url: null,
          years_experience: null,
          hourly_rate_min: null,
          hourly_rate_max: null,
          availability: null,
          categories: [],
          skills: [],
          contact_email: user.email || null,
          linkedin_url: null,
          website_url: null,
          preferred_contact: "email",
          is_public: false,
        });
      } else {
        setProfile(data);
      }
      setLoading(false);
    }

    loadProfile();
  }, [supabase, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase
      .from("profiles")
      .upsert({
        ...profile,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      // Redirect to dashboard after successful save
      router.push("/dashboard");
    }
  };

  const updateProfile = (field: keyof Profile, value: unknown) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const toggleCategory = (category: string) => {
    if (!profile) return;
    const current = profile.categories || [];
    if (current.includes(category)) {
      updateProfile("categories", current.filter((c) => c !== category));
    } else {
      updateProfile("categories", [...current, category]);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim() || !profile) return;
    const current = profile.skills || [];
    if (!current.includes(skillInput.trim())) {
      updateProfile("skills", [...current, skillInput.trim()]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    if (!profile) return;
    updateProfile("skills", (profile.skills || []).filter((s) => s !== skill));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const isExpert = profile.user_type === "expert";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Your Profile</h1>
          <p className="text-slate-600">
            Complete your profile to {isExpert ? "get discovered by companies" : "attract top talent"}.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-6">
            Profile saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Photo</h2>
            <div className="flex justify-center">
              <AvatarUpload
                userId={profile.id}
                currentUrl={profile.avatar_url}
                onUpload={(url) => updateProfile("avatar_url", url || null)}
                size={120}
              />
            </div>
          </section>

          {/* Basic Info */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Basic Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={profile.full_name || ""}
                  onChange={(e) => updateProfile("full_name", e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={profile.location || ""}
                  onChange={(e) => updateProfile("location", e.target.value)}
                  placeholder="London, UK"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Headline *
                </label>
                <input
                  type="text"
                  value={profile.headline || ""}
                  onChange={(e) => updateProfile("headline", e.target.value)}
                  placeholder={isExpert ? "Former CFO | 25+ Years in Finance | Board Advisor" : "Growing tech company seeking experienced advisors"}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio || ""}
                  onChange={(e) => updateProfile("bio", e.target.value)}
                  placeholder={isExpert ? "Tell companies about your experience, expertise, and what you're looking for..." : "Describe your company and what kind of expertise you're seeking..."}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">{(profile.bio || "").length}/500 characters</p>
              </div>
            </div>
          </section>

          {/* Expert-specific fields */}
          {isExpert && (
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Experience & Availability</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={profile.years_experience || ""}
                    onChange={(e) => updateProfile("years_experience", e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="15">15-20 years</option>
                    <option value="20">20-25 years</option>
                    <option value="25">25-30 years</option>
                    <option value="30">30+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={profile.availability || ""}
                    onChange={(e) => updateProfile("availability", e.target.value || null)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="available">Available for new projects</option>
                    <option value="limited">Limited availability</option>
                    <option value="unavailable">Not available currently</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hourly Rate (USD)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={profile.hourly_rate_min || ""}
                      onChange={(e) => updateProfile("hourly_rate_min", e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="Min"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                    />
                    <span className="text-slate-400">—</span>
                    <input
                      type="number"
                      value={profile.hourly_rate_max || ""}
                      onChange={(e) => updateProfile("hourly_rate_max", e.target.value ? parseInt(e.target.value) : null)}
                      placeholder="Max"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Categories */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Categories</h2>
            <p className="text-sm text-slate-600 mb-4">
              {isExpert ? "Select your areas of expertise" : "Select the expertise you're looking for"}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    (profile.categories || []).includes(category)
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Skills */}
          {isExpert && (
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Skills</h2>
              <p className="text-sm text-slate-600 mb-4">Add specific skills or tools you excel at</p>
              
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="e.g., Financial Modeling, M&A, Leadership"
                  className="flex-grow px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(profile.skills || []).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Contact */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Contact Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={profile.contact_email || ""}
                  onChange={(e) => updateProfile("contact_email", e.target.value || null)}
                  placeholder="contact@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">This email will be visible to people who want to contact you</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={profile.linkedin_url || ""}
                  onChange={(e) => updateProfile("linkedin_url", e.target.value || null)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={profile.website_url || ""}
                  onChange={(e) => updateProfile("website_url", e.target.value || null)}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  value={profile.preferred_contact || "email"}
                  onChange={(e) => updateProfile("preferred_contact", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                >
                  <option value="email">Email</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="website">Website</option>
                </select>
              </div>
            </div>
          </section>

          {/* Visibility */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Profile Visibility</h2>
                <p className="text-sm text-slate-600">
                  {isExpert
                    ? "Make your profile visible to companies looking for experts"
                    : "Make your company visible to experts"}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.is_public}
                  onChange={(e) => updateProfile("is_public", e.target.checked)}
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
              className="px-8 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
