import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Browse Experts — Greybird",
  description: "Find experienced professionals for part-time projects, advisory sessions, and flexible work.",
};

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

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ExpertsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const category = typeof params.category === "string" ? params.category : undefined;
  const availability = typeof params.availability === "string" ? params.availability : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;

  const supabase = await createClient();

  let query = supabase
    .from("profiles")
    .select("id, full_name, headline, location, years_experience, availability, categories, hourly_rate_min, hourly_rate_max")
    .eq("is_public", true)
    .eq("user_type", "expert");

  // Filter by category
  if (category) {
    query = query.contains("categories", [category]);
  }

  // Filter by availability
  if (availability) {
    query = query.eq("availability", availability);
  }

  const { data: experts } = await query.order("created_at", { ascending: false });

  // Client-side search filter (for name/headline)
  let filteredExperts = experts || [];
  if (search) {
    const searchLower = search.toLowerCase();
    filteredExperts = filteredExperts.filter(
      (e) =>
        e.full_name?.toLowerCase().includes(searchLower) ||
        e.headline?.toLowerCase().includes(searchLower)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12 pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Experts</h1>
          <p className="text-slate-600">
            Find experienced professionals for part-time projects, advisory sessions, and flexible work.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-grow">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by name or headline..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
              />
            </div>

            {/* Category */}
            <select
              name="category"
              defaultValue={category || ""}
              className="px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none bg-white min-w-[180px]"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Availability */}
            <select
              name="availability"
              defaultValue={availability || ""}
              className="px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none bg-white min-w-[160px]"
            >
              <option value="">Any Availability</option>
              <option value="available">Available Now</option>
              <option value="limited">Limited</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              className="px-6 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200"
            >
              Search
            </button>
          </form>

          {/* Active Filters */}
          {(category || availability || search) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500">Active filters:</span>
              {search && (
                <Link
                  href={`/experts?${new URLSearchParams({ ...(category && { category }), ...(availability && { availability }) }).toString()}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200"
                >
                  &quot;{search}&quot; <span className="text-slate-400">×</span>
                </Link>
              )}
              {category && (
                <Link
                  href={`/experts?${new URLSearchParams({ ...(search && { search }), ...(availability && { availability }) }).toString()}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200"
                >
                  {category} <span className="text-slate-400">×</span>
                </Link>
              )}
              {availability && (
                <Link
                  href={`/experts?${new URLSearchParams({ ...(search && { search }), ...(category && { category }) }).toString()}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200"
                >
                  {availability} <span className="text-slate-400">×</span>
                </Link>
              )}
              <Link
                href="/experts"
                className="text-sm text-slate-500 hover:text-slate-700 ml-2"
              >
                Clear all
              </Link>
            </div>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-slate-500 mb-4">
          {filteredExperts.length} expert{filteredExperts.length !== 1 ? "s" : ""} found
        </p>

        {/* Experts Grid */}
        {filteredExperts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No experts found</h2>
            <p className="text-slate-600 mb-6">Try adjusting your filters or search terms.</p>
            <Link 
              href="/experts" 
              className="inline-flex items-center gap-2 text-slate-800 font-medium hover:underline"
            >
              Clear all filters
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
      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 hover:-translate-y-0.5 transition-all duration-300 h-full">
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
