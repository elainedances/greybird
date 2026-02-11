import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import MessageButton from "@/components/MessageButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, Users } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, headline, bio")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (!profile) {
    return { title: "User Not Found — Greybird" };
  }

  return {
    title: `${profile.full_name} — Greybird`,
    description: profile.headline || profile.bio || "Professional on Greybird",
  };
}

export default async function UserProfilePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (error || !profile) {
    notFound();
  }

  // Fetch user's active posts
  const { data: posts } = await supabase
    .from("posts")
    .select("id, post_type, title, description, categories, skills, availability, hourly_rate_min, hourly_rate_max, location, created_at")
    .eq("user_id", id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900" />

          <div className="px-8 pb-8">
            <div className="-mt-16 mb-4">
              <div className="w-32 h-32 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center text-4xl font-bold text-slate-400">
                {profile.full_name?.charAt(0) || "?"}
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{profile.full_name}</h1>
              {profile.headline && (
                <p className="text-xl text-slate-600">{profile.headline}</p>
              )}
              {profile.location && (
                <p className="text-slate-500 mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {profile.location}
                </p>
              )}
            </div>

            {/* Company info */}
            {profile.company_name && (
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-slate-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-slate-900 flex items-center gap-1"><Building2 className="w-4 h-4" /> {profile.company_name}</span>
                </div>
                {profile.industry && (
                  <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm text-slate-600">
                    {profile.industry}
                  </div>
                )}
                {profile.company_size && (
                  <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm text-slate-600">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {profile.company_size} employees</span>
                  </div>
                )}
              </div>
            )}

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              {profile.years_experience && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-slate-900">{profile.years_experience}+</span>
                  <span className="text-slate-600 ml-1">years experience</span>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-3">
              <MessageButton targetUserId={profile.id} label="Message" />
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#004182] transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {profile.website_url && (
                <a
                  href={profile.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <section className="mt-8 bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">About</h2>
            <p className="text-slate-600 whitespace-pre-wrap">{profile.bio}</p>
          </section>
        )}

        {/* Categories & Skills */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {profile.categories && profile.categories.length > 0 && (
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Expertise Areas</h2>
              <div className="flex flex-wrap gap-2">
                {profile.categories.map((category: string) => (
                  <span
                    key={category}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </section>
          )}

          {profile.skills && profile.skills.length > 0 && (
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-teal-700 text-white rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Active Posts */}
        {posts && posts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Active Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 hover:-translate-y-0.5 transition-all duration-300 h-full">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      post.post_type === "offering"
                        ? "bg-teal-100 text-teal-800"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {post.post_type === "offering" ? "Offering" : "Seeking"}
                    </span>
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                    {post.description && (
                      <p className="text-slate-600 text-sm line-clamp-2">{post.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-sm pt-4 border-t border-slate-100 mt-4">
                      {post.location && <span className="text-slate-500">{post.location}</span>}
                      {post.hourly_rate_min && post.hourly_rate_max && (
                        <span className="text-slate-600">${post.hourly_rate_min}-${post.hourly_rate_max}/h</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
