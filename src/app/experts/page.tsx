import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Experts — Greybird",
  description: "Find experienced professionals for part-time projects, advisory sessions, and flexible work.",
};

export default async function ExpertsPage() {
  const supabase = await createClient();

  const { data: experts } = await supabase
    .from("profiles")
    .select("id, full_name, headline, location, years_experience, availability, categories, hourly_rate_min, hourly_rate_max")
    .eq("is_public", true)
    .eq("user_type", "expert")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Greybird" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold text-slate-800">
              Grey<span className="text-slate-600">bird</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors"
            >
              Join as Expert
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Experts</h1>
          <p className="text-slate-600">
            Find experienced professionals for part-time projects, advisory sessions, and flexible work.
          </p>
        </div>

        {/* Experts Grid */}
        {experts && experts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <div className="text-4xl mb-4">🐦</div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No experts yet</h2>
            <p className="text-slate-600 mb-6">Be the first to join our community of experienced professionals.</p>
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition-colors"
            >
              Create Your Profile
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

function ExpertCard({ expert }: { expert: {
  id: string;
  full_name: string | null;
  headline: string | null;
  location: string | null;
  years_experience: number | null;
  availability: string | null;
  categories: string[] | null;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
}}) {
  return (
    <Link href={`/experts/${expert.id}`}>
      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all h-full">
        {/* Avatar & Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-400 flex-shrink-0">
            {expert.full_name?.charAt(0) || "?"}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{expert.full_name || "Anonymous"}</h3>
            {expert.location && (
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {expert.location}
              </p>
            )}
          </div>
        </div>

        {/* Headline */}
        {expert.headline && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{expert.headline}</p>
        )}

        {/* Categories */}
        {expert.categories && expert.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {expert.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
              >
                {category}
              </span>
            ))}
            {expert.categories.length > 3 && (
              <span className="px-2 py-1 text-slate-400 text-xs">
                +{expert.categories.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            {expert.years_experience && (
              <span className="text-slate-600">{expert.years_experience}+ yrs</span>
            )}
            {expert.hourly_rate_min && expert.hourly_rate_max && (
              <span className="text-slate-600">${expert.hourly_rate_min}-${expert.hourly_rate_max}/h</span>
            )}
          </div>
          {expert.availability === "available" && (
            <span className="text-green-600 font-medium">Available</span>
          )}
          {expert.availability === "limited" && (
            <span className="text-yellow-600 font-medium">Limited</span>
          )}
        </div>
      </div>
    </Link>
  );
}
