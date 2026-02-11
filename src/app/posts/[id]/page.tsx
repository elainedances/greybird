import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import MessageButton from "@/components/MessageButton";
import EmailContactButton from "@/components/EmailContactButton";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { timeAgo } from "@/lib/timeAgo";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("title, description, post_type")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (!post) {
    return { title: "Post Not Found — Greybird" };
  }

  return {
    title: `${post.title} — Greybird`,
    description: post.description || `${post.post_type === "offering" ? "Expertise offering" : "Talent request"} on Greybird`,
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("is_active", true)
    .single();

  if (error || !post) {
    notFound();
  }

  // Fetch profile separately (no FK from posts to profiles)
  const { data: profileData } = await supabase
    .from("profiles")
    .select("id, full_name, headline, avatar_url, location, linkedin_url, website_url, contact_email")
    .eq("id", post.user_id)
    .single();

  const profile = profileData as {
    id: string;
    full_name: string | null;
    headline: string | null;
    avatar_url: string | null;
    location: string | null;
    linkedin_url: string | null;
    website_url: string | null;
    contact_email: string | null;
  } | null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        {/* Post Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Banner */}
          <div className={`h-24 ${post.post_type === "offering" ? "bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900" : "bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900"}`} />

          <div className="px-8 pb-8 -mt-4">
            {/* Type Badge + Date */}
            <div className="mb-6 flex items-center gap-3">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                post.post_type === "offering"
                  ? "bg-teal-100 text-teal-800"
                  : "bg-amber-100 text-amber-800"
              }`}>
                {post.post_type === "offering" ? "Offering Expertise" : "Looking for Talent"}
              </span>
              <span className="text-sm text-slate-400">Posted {timeAgo(post.created_at)}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{post.title}</h1>

            {/* Author Info */}
            {profile && (
              <Link href={`/users/${profile.id}`} className="flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-400 flex-shrink-0">
                  {profile.full_name?.charAt(0) || "?"}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {profile.full_name || "Anonymous"}
                  </div>
                  {profile.headline && (
                    <div className="text-sm text-slate-500">{profile.headline}</div>
                  )}
                </div>
              </Link>
            )}

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              {post.location && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm">
                  <span className="text-slate-600">📍 {post.location}</span>
                  {post.remote_ok && <span className="text-slate-400 ml-2">· Remote OK</span>}
                </div>
              )}
              {post.availability && (
                <div className={`px-4 py-2 rounded-lg text-sm ${
                  post.availability === "available"
                    ? "bg-green-100 text-green-800"
                    : post.availability === "limited"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {post.availability === "available" && "✓ Available"}
                  {post.availability === "limited" && "Limited availability"}
                  {post.availability === "starting_soon" && "Starting soon"}
                </div>
              )}
              {post.hourly_rate_min && post.hourly_rate_max && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm">
                  <span className="font-semibold text-slate-900">
                    ${post.hourly_rate_min} - ${post.hourly_rate_max}
                  </span>
                  <span className="text-slate-600 ml-1">/hour</span>
                </div>
              )}
              {post.hours_per_week && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm">
                  <span className="text-slate-600">{post.hours_per_week} hrs/week</span>
                </div>
              )}
              {post.engagement_type && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm capitalize">
                  <span className="text-slate-600">{post.engagement_type}</span>
                </div>
              )}
              {post.duration && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm">
                  <span className="text-slate-600">{post.duration}</span>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-3 mb-8">
              {profile && (
                <MessageButton targetUserId={profile.id} label="Message" />
              )}
              {profile?.contact_email && (
                <EmailContactButton targetUserId={profile.id} targetName={profile.full_name || "this user"} />
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#004182] transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {profile?.website_url && (
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

        {/* Description */}
        {post.description && (
          <section className="mt-8 bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Description</h2>
            <p className="text-slate-600 whitespace-pre-wrap">{post.description}</p>
          </section>
        )}

        {/* Categories & Skills */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {post.categories && post.categories.length > 0 && (
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category: string) => (
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

          {post.skills && post.skills.length > 0 && (
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {post.skills.map((skill: string) => (
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
      </main>

      <Footer />
    </div>
  );
}
