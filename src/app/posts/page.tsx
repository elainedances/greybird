import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Browse Posts — Greybird",
  description: "Find professionals offering expertise or companies looking for talent.",
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

export default async function PostsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;
  const category = typeof params.category === "string" ? params.category : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;

  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("id, post_type, title, description, category, categories, skills, availability, hourly_rate_min, hourly_rate_max, location, remote_ok, engagement_type, duration, created_at, user_id")
    .eq("is_active", true);

  if (type === "offering" || type === "seeking") {
    query = query.eq("post_type", type);
  }

  if (category) {
    query = query.contains("categories", [category]);
  }

  const { data: posts, error: postsError } = await query.order("created_at", { ascending: false });

  // Fetch profiles for post authors
  const userIds = [...new Set((posts || []).map((p) => p.user_id))];
  let profileMap: Record<string, { full_name: string | null; avatar_url: string | null }> = {};
  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .in("id", userIds);
    if (profiles) {
      profileMap = Object.fromEntries(profiles.map((p) => [p.id, p]));
    }
  }

  const postsWithProfiles = (posts || []).map((p) => ({
    ...p,
    profiles: profileMap[p.user_id] || null,
  }));

  let filteredPosts = postsWithProfiles;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (p) =>
        p.title?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 py-12 pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Posts</h1>
          <p className="text-slate-600">
            Find professionals offering expertise or companies looking for talent.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search by title or description..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none"
              />
            </div>

            <select
              name="type"
              defaultValue={type || ""}
              className="px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none bg-white min-w-[180px]"
            >
              <option value="">All Types</option>
              <option value="offering">Offering Expertise</option>
              <option value="seeking">Looking for Talent</option>
            </select>

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

            <button
              type="submit"
              className="px-6 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200"
            >
              Search
            </button>
          </form>

          {(type || category || search) && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
              <span className="text-sm text-slate-500">Active filters:</span>
              {search && (
                <Link
                  href={`/posts?${new URLSearchParams({ ...(type && { type }), ...(category && { category }) }).toString()}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200"
                >
                  &quot;{search}&quot; <span className="text-slate-400">×</span>
                </Link>
              )}
              {type && (
                <Link
                  href={`/posts?${new URLSearchParams({ ...(search && { search }), ...(category && { category }) }).toString()}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200"
                >
                  {type === "offering" ? "Offering" : "Seeking"} <span className="text-slate-400">×</span>
                </Link>
              )}
              {category && (
                <Link
                  href={`/posts?${new URLSearchParams({ ...(search && { search }), ...(type && { type }) }).toString()}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200"
                >
                  {category} <span className="text-slate-400">×</span>
                </Link>
              )}
              <Link
                href="/posts"
                className="text-sm text-slate-500 hover:text-slate-700 ml-2"
              >
                Clear all
              </Link>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-500 mb-4">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} found
        </p>

        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">No posts found</h2>
            <p className="text-slate-600 mb-6">Try adjusting your filters or search terms.</p>
            <Link
              href="/posts"
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

function PostCard({ post }: { post: {
  id: string;
  post_type: string;
  title: string;
  description: string | null;
  categories: string[] | null;
  skills: string[] | null;
  availability: string | null;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  location: string | null;
  remote_ok: boolean | null;
  engagement_type: string | null;
  duration: string | null;
  created_at: string;
  user_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profiles: any;
}}) {
  const rawProfiles = post.profiles;
  const profile = Array.isArray(rawProfiles) ? rawProfiles[0] : rawProfiles;

  return (
    <Link href={`/posts/${post.id}`}>
      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col">
        {/* Type Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            post.post_type === "offering"
              ? "bg-teal-100 text-teal-800"
              : "bg-amber-100 text-amber-800"
          }`}>
            {post.post_type === "offering" ? "Offering Expertise" : "Looking for Talent"}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-400 flex-shrink-0">
            {profile?.full_name?.charAt(0) || "?"}
          </div>
          <span className="text-sm text-slate-600 truncate">{profile?.full_name || "Anonymous"}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>

        {/* Description */}
        {post.description && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">{post.description}</p>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
              >
                {category}
              </span>
            ))}
            {post.categories.length > 3 && (
              <span className="px-2 py-1 text-slate-400 text-xs">
                +{post.categories.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-3">
            {post.location && (
              <span className="text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {post.location}
              </span>
            )}
            {post.hourly_rate_min && post.hourly_rate_max && (
              <span className="text-slate-600">${post.hourly_rate_min}-${post.hourly_rate_max}/h</span>
            )}
          </div>
          {post.availability === "available" && (
            <span className="text-green-600 font-medium">Available</span>
          )}
          {post.availability === "limited" && (
            <span className="text-yellow-600 font-medium">Limited</span>
          )}
        </div>
      </div>
    </Link>
  );
}
