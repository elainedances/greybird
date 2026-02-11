import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { UserCircle, PlusCircle, Eye, EyeOff, Settings, ChevronRight, FileText } from "lucide-react";
import Footer from "@/components/Footer";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isProfileComplete = profile?.full_name && profile?.headline;
  const isPublic = profile?.is_public || false;

  // Fetch user's posts
  const { data: posts } = await supabase
    .from("posts")
    .select("id, post_type, title, is_active, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const activePosts = posts?.filter((p) => p.is_active) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {profile?.full_name ? `Welcome back, ${profile.full_name.split(" ")[0]}!` : "Welcome to Greybird!"}
          </h1>
          <p className="text-slate-600">
            Manage your profile and posts.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title={isProfileComplete ? "Edit Your Profile" : "Complete Your Profile"}
            description={isProfileComplete
              ? "Update your information, skills, and contact details."
              : "Add your information to get started on Greybird."}
            iconNode={<UserCircle className="w-7 h-7 text-teal-600" />}
            href="/profile/edit"
            cta="Edit Profile"
          />
          <DashboardCard
            title="Create a Post"
            description="Share what you're offering or what you're looking for."
            iconNode={<PlusCircle className="w-7 h-7 text-teal-600" />}
            href="/posts/new"
            cta="New Post"
          />
          <DashboardCard
            title="Your Visibility"
            description={isPublic
              ? "Your profile is public. People can find and contact you."
              : "Your profile is hidden. Make it public to get discovered."}
            iconNode={isPublic ? <Eye className="w-7 h-7 text-emerald-600" /> : <EyeOff className="w-7 h-7 text-amber-500" />}
            href="/profile/edit"
            cta={isPublic ? "Manage Visibility" : "Make Visible"}
          />
        </div>

        {/* Your Posts */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Your Posts</h2>
            <Link
              href="/posts/new"
              className="text-sm text-teal-700 hover:text-teal-800 font-medium flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              New Post
            </Link>
          </div>

          {posts && posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}/edit`}>
                  <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center justify-between hover:border-teal-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-slate-900">{post.title}</h3>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            post.post_type === "offering"
                              ? "bg-teal-100 text-teal-800"
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {post.post_type === "offering" ? "Offering" : "Seeking"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">
                          {post.is_active ? "Active" : "Hidden"} · Created {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-medium text-slate-900 mb-1">No posts yet</h3>
              <p className="text-slate-600 text-sm mb-4">Create your first post to start connecting.</p>
              <Link
                href="/posts/new"
                className="inline-flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-teal-800 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Create Post
              </Link>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Account Settings
          </Link>
        </div>

        {/* Status */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Status</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <StatusItem label="Email" value={user.email || "Not set"} status="verified" />
            <StatusItem
              label="Profile"
              value={isProfileComplete ? "Complete" : "Incomplete"}
              status={isProfileComplete ? "verified" : "pending"}
            />
            <StatusItem
              label="Active Posts"
              value={`${activePosts.length}`}
              status={activePosts.length > 0 ? "verified" : "pending"}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DashboardCard({
  title,
  description,
  iconNode,
  href,
  cta,
  disabled = false,
}: {
  title: string;
  description: string;
  iconNode: React.ReactNode;
  href: string;
  cta: string;
  disabled?: boolean;
}) {
  const content = (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col ${disabled ? "opacity-60" : "hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 hover:-translate-y-0.5 transition-all duration-300"}`}>
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4">{iconNode}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-4 flex-grow">{description}</p>
      <span className={`inline-flex items-center gap-2 text-sm font-medium ${disabled ? "text-slate-400" : "text-teal-700"}`}>
        {cta}
        {!disabled && <ChevronRight className="w-4 h-4" />}
      </span>
    </div>
  );

  if (disabled) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}

function StatusItem({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "verified" | "pending" | "error";
}) {
  const statusColors = {
    verified: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
  };

  const statusLabels = {
    verified: "✓",
    pending: "○",
    error: "✕",
  };

  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <div>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="font-medium text-slate-900">{value}</div>
      </div>
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${statusColors[status]}`}>
        {statusLabels[status]}
      </span>
    </div>
  );
}
