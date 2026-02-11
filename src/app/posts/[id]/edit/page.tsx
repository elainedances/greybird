"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Navigation from "@/components/Navigation";
import { Lightbulb, Search } from "lucide-react";

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

export default function EditPostPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postType, setPostType] = useState<"offering" | "seeking">("offering");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [remoteOk, setRemoteOk] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [availability, setAvailability] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [hourlyRateMin, setHourlyRateMin] = useState("");
  const [hourlyRateMax, setHourlyRateMax] = useState("");
  const [engagementType, setEngagementType] = useState("");
  const [duration, setDuration] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function loadPost() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", user.id)
        .single();

      if (error || !post) {
        router.push("/dashboard");
        return;
      }

      setPostType(post.post_type);
      setTitle(post.title);
      setDescription(post.description || "");
      setCategories(post.categories || []);
      setSkills(post.skills || []);
      setLocation(post.location || "");
      setRemoteOk(post.remote_ok ?? true);
      setIsActive(post.is_active ?? true);
      setAvailability(post.availability || "");
      setHoursPerWeek(post.hours_per_week || "");
      setHourlyRateMin(post.hourly_rate_min?.toString() || "");
      setHourlyRateMax(post.hourly_rate_max?.toString() || "");
      setEngagementType(post.engagement_type || "");
      setDuration(post.duration || "");
      setLoading(false);
    }
    loadPost();
  }, [supabase, router, params.id]);

  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (!skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from("posts")
      .update({
        post_type: postType,
        title,
        description: description || null,
        category: categories.length > 0 ? categories[0] : null,
        categories,
        skills,
        location: location || null,
        remote_ok: remoteOk,
        is_active: isActive,
        availability: availability || null,
        hours_per_week: hoursPerWeek || null,
        hourly_rate_min: hourlyRateMin ? parseInt(hourlyRateMin) : null,
        hourly_rate_max: hourlyRateMax ? parseInt(hourlyRateMax) : null,
        engagement_type: engagementType || null,
        duration: duration || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      setError(error.message);
      setSaving(false);
    } else {
      router.push("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Post</h1>
          <p className="text-slate-600">Update your post details.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Post Type */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Post type</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPostType("offering")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  postType === "offering"
                    ? "border-teal-700 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="text-2xl mb-1"><Lightbulb className="w-6 h-6 text-teal-700" /></div>
                <div className="font-semibold text-slate-900">Offering Expertise</div>
                <div className="text-sm text-slate-500">I&apos;m available for projects or advisory</div>
              </button>
              <button
                type="button"
                onClick={() => setPostType("seeking")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  postType === "seeking"
                    ? "border-amber-600 bg-amber-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="text-2xl mb-1"><Search className="w-6 h-6 text-amber-600" /></div>
                <div className="font-semibold text-slate-900">Looking for Talent</div>
                <div className="text-sm text-slate-500">I need experienced professionals</div>
              </button>
            </div>
          </section>

          {/* Title & Description */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  maxLength={2000}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">{description.length}/2000 characters</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="London, UK"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remoteOk}
                      onChange={(e) => setRemoteOk(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Remote OK</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Offering-specific */}
          {postType === "offering" && (
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Availability & Rates</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="available">Available now</option>
                    <option value="limited">Limited availability</option>
                    <option value="starting_soon">Starting soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hours per week</label>
                  <select
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="5-10">5-10 hours</option>
                    <option value="10-20">10-20 hours</option>
                    <option value="20-40">20-40 hours</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Hourly Rate (USD)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={hourlyRateMin}
                      onChange={(e) => setHourlyRateMin(e.target.value)}
                      placeholder="Min"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                    />
                    <span className="text-slate-400">—</span>
                    <input
                      type="number"
                      value={hourlyRateMax}
                      onChange={(e) => setHourlyRateMax(e.target.value)}
                      placeholder="Max"
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Seeking-specific */}
          {postType === "seeking" && (
            <section className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Engagement Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Engagement Type</label>
                  <select
                    value={engagementType}
                    onChange={(e) => setEngagementType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="advisory">Advisory</option>
                    <option value="part-time">Part-time</option>
                    <option value="project">Project-based</option>
                    <option value="board">Board position</option>
                    <option value="mentoring">Mentoring</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* Categories */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Categories</h2>
            <p className="text-sm text-slate-600 mb-4">Select relevant areas</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categories.includes(category)
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
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Skills</h2>
            <p className="text-sm text-slate-600 mb-4">Add specific skills or tags</p>
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
              {skills.map((skill) => (
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

          {/* Active toggle */}
          <section className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">Post Status</h2>
                <p className="text-sm text-slate-600">
                  {isActive ? "This post is visible to everyone." : "This post is hidden."}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
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
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
