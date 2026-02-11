import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (!isAdmin(user.email)) redirect("/dashboard");

  // Fetch all data in parallel
  const [profilesRes, postsRes, waitlistRes] = await Promise.all([
    supabase.from("profiles").select("id, full_name, headline, location, avatar_url, is_public, contact_email, created_at"),
    supabase.from("posts").select("id, user_id, post_type, title, description, category, is_active, created_at"),
    supabase.from("waitlist").select("id, email, created_at").order("created_at", { ascending: false }),
  ]);

  const profiles = profilesRes.data || [];
  const posts = postsRes.data || [];
  const waitlist = waitlistRes.data || [];

  // Get user emails from auth - we need to join with profiles
  // Since we can't query auth.users directly, we'll use the user_id from posts to map
  // For email display, we'll need the API route approach

  // Stats
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const newUsersThisWeek = profiles.filter(p => new Date(p.created_at) >= weekAgo).length;
  const activePosts = posts.filter(p => p.is_active).length;
  const inactivePosts = posts.length - activePosts;

  // Build post counts per user
  const postCountMap: Record<string, number> = {};
  posts.forEach(p => {
    postCountMap[p.user_id] = (postCountMap[p.user_id] || 0) + 1;
  });

  // Build author name map
  const authorMap: Record<string, string> = {};
  profiles.forEach(p => {
    authorMap[p.id] = p.full_name || "Unknown";
  });

  const enrichedProfiles = profiles.map(p => ({
    ...p,
    post_count: postCountMap[p.id] || 0,
  }));

  const enrichedPosts = posts.map(p => ({
    ...p,
    author_name: authorMap[p.user_id] || "Unknown",
  }));

  const stats = {
    totalUsers: profiles.length,
    totalPosts: posts.length,
    activePosts,
    inactivePosts,
    waitlistCount: waitlist.length,
    newUsersThisWeek,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage users, posts, and waitlist.</p>
        </div>
        <AdminClient
          stats={stats}
          profiles={enrichedProfiles}
          posts={enrichedPosts}
          waitlist={waitlist}
        />
      </main>
      <Footer />
    </div>
  );
}
