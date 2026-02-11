import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Navigation from "@/components/Navigation";

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

export const metadata = {
  title: "Browse Companies | Greybird",
  description: "Find companies looking for experienced professionals for advisory, consulting, and part-time opportunities.",
};

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; industry?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  
  let query = supabase
    .from("companies")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  // Apply search filter
  if (params.q) {
    query = query.or(`company_name.ilike.%${params.q}%,headline.ilike.%${params.q}%,description.ilike.%${params.q}%`);
  }

  // Apply industry filter
  if (params.industry) {
    query = query.eq("industry", params.industry);
  }

  const { data: companies, error } = await query;

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation transparent />

      {/* Header */}
      <section className="pt-32 pb-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Companies Hiring Experts
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            Find companies looking for experienced professionals like you for advisory, consulting, and part-time opportunities.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6 px-6 bg-white border-b border-slate-100 sticky top-[73px] z-40">
        <div className="max-w-6xl mx-auto">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="Search companies by name, description..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
              />
            </div>
            <select
              name="industry"
              defaultValue={params.industry}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none bg-white"
            >
              <option value="">All Industries</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-6 py-3 bg-teal-700 text-white rounded-xl font-medium hover:bg-teal-800 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6">
              Error loading companies. Please try again.
            </div>
          )}

          {companies && companies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.id}`}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {company.logo_url ? (
                        <Image
                          src={company.logo_url}
                          alt={company.company_name || "Company"}
                          width={56}
                          height={56}
                          className="rounded-xl object-cover"
                        />
                      ) : (
                        "🏢"
                      )}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold text-slate-900 truncate">
                        {company.company_name || "Company"}
                      </h2>
                      {company.industry && (
                        <span className="text-sm text-slate-500">{company.industry}</span>
                      )}
                    </div>
                  </div>

                  {company.headline && (
                    <p className="text-slate-700 font-medium mb-2 line-clamp-1">
                      {company.headline}
                    </p>
                  )}

                  {company.description && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {company.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                        📍 {company.location}
                      </span>
                    )}
                    {company.company_size && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
                        👥 {company.company_size} employees
                      </span>
                    )}
                  </div>

                  {company.looking_for && company.looking_for.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {company.looking_for.slice(0, 3).map((cat: string) => (
                        <span
                          key={cat}
                          className="text-xs bg-teal-700 text-white px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                      {company.looking_for.length > 3 && (
                        <span className="text-xs text-slate-500">
                          +{company.looking_for.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No companies yet</h3>
              <p className="text-slate-600 mb-6">
                Be the first company to create a profile and find experienced talent!
              </p>
              <Link
                href="/signup"
                className="inline-block bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800 transition-colors"
              >
                Create Company Profile
              </Link>
            </div>
          )}
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
