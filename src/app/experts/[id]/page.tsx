import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

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
    return { title: "Expert Not Found — Greybird" };
  }

  return {
    title: `${profile.full_name} — Greybird`,
    description: profile.headline || profile.bio || "Experienced professional on Greybird",
  };
}

export default async function ExpertProfilePage({ params }: Props) {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Greybird" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold text-slate-800">
              Grey<span className="text-slate-600">bird</span>
            </span>
          </Link>
          <Link 
            href="/experts" 
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← Browse Experts
          </Link>
        </div>
      </header>

      {/* Profile */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900" />
          
          {/* Profile Header */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="-mt-16 mb-4">
              <div className="w-32 h-32 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center text-4xl font-bold text-slate-400">
                {profile.full_name?.charAt(0) || "?"}
              </div>
            </div>

            {/* Name & Headline */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {profile.full_name}
              </h1>
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

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              {profile.years_experience && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-slate-900">{profile.years_experience}+</span>
                  <span className="text-slate-600 ml-1">years experience</span>
                </div>
              )}
              {profile.availability && (
                <div className={`px-4 py-2 rounded-lg ${
                  profile.availability === "available" 
                    ? "bg-green-100 text-green-800"
                    : profile.availability === "limited"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {profile.availability === "available" && "✓ Available for projects"}
                  {profile.availability === "limited" && "Limited availability"}
                  {profile.availability === "unavailable" && "Not available"}
                </div>
              )}
              {profile.hourly_rate_min && profile.hourly_rate_max && (
                <div className="bg-slate-100 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-slate-900">
                    ${profile.hourly_rate_min} - ${profile.hourly_rate_max}
                  </span>
                  <span className="text-slate-600 ml-1">/hour</span>
                </div>
              )}
            </div>

            {/* Contact Button */}
            <div className="flex gap-3">
              {profile.contact_email && (
                <a
                  href={`mailto:${profile.contact_email}`}
                  className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              )}
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#004182] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
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
          {/* Categories */}
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

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <section className="bg-white rounded-xl border border-slate-200 p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-800 text-white rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center text-slate-500 text-sm">
          <Link href="/" className="hover:text-slate-700">Greybird</Link>
          {" · "}
          <Link href="/experts" className="hover:text-slate-700">Browse Experts</Link>
          {" · "}
          <Link href="/signup" className="hover:text-slate-700">Join as Expert</Link>
        </div>
      </footer>
    </div>
  );
}
