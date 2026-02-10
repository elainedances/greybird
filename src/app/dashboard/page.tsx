import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogoutButton } from "./logout-button";

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

  const userType = profile?.user_type || user.user_metadata?.user_type || "expert";
  const isProfileComplete = profile?.full_name && profile?.headline;
  const isPublic = profile?.is_public || false;

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
            <span className="text-sm text-slate-600">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {profile?.full_name ? `Welcome back, ${profile.full_name.split(" ")[0]}!` : "Welcome to Greybird!"} 🐦
          </h1>
          <p className="text-slate-600">
            You&apos;re signed in as {userType === "expert" ? "an expert" : "a company"}.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userType === "expert" ? (
            <>
              <DashboardCard
                title={isProfileComplete ? "Edit Your Profile" : "Complete Your Profile"}
                description={isProfileComplete 
                  ? "Update your experience, skills, and availability."
                  : "Add your experience, skills, and availability to get discovered by companies."}
                icon="👤"
                href="/profile/edit"
                cta="Edit Profile"
              />
              <DashboardCard
                title="Browse Opportunities"
                description="See companies looking for experienced professionals like you."
                icon="🔍"
                href="#"
                cta="Coming Soon"
                disabled
              />
              <DashboardCard
                title="Your Visibility"
                description={isPublic 
                  ? "Your profile is visible to companies. They can find and contact you."
                  : "Your profile is hidden. Make it public to get discovered."}
                icon={isPublic ? "✅" : "👁️"}
                href="/profile/edit"
                cta={isPublic ? "Manage Visibility" : "Make Visible"}
              />
            </>
          ) : (
            <>
              <DashboardCard
                title="Post a Need"
                description="Describe what kind of expertise you're looking for."
                icon="📝"
                href="#"
                cta="Coming Soon"
                disabled
              />
              <DashboardCard
                title="Browse Experts"
                description="Find experienced professionals for your project or advisory needs."
                icon="🔍"
                href="/experts"
                cta="Browse Experts"
              />
              <DashboardCard
                title="Company Profile"
                description="Set up your company profile to attract the best talent."
                icon="🏢"
                href="/profile/edit"
                cta="Edit Profile"
              />
            </>
          )}
        </div>

        {/* Status */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Account Status</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <StatusItem label="Email" value={user.email || "Not set"} status="verified" />
            <StatusItem 
              label="Profile" 
              value={isProfileComplete ? "Complete" : "Incomplete"} 
              status={isProfileComplete ? "verified" : "pending"} 
            />
            <StatusItem 
              label="Visibility" 
              value={isPublic ? "Public" : "Hidden"} 
              status={isPublic ? "verified" : "pending"} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  icon,
  href,
  cta,
  disabled = false,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
  cta: string;
  disabled?: boolean;
}) {
  const content = (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col ${disabled ? "opacity-60" : "hover:border-slate-300 hover:shadow-md transition-all"}`}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-4 flex-grow">{description}</p>
      <span className={`inline-flex items-center gap-2 text-sm font-medium ${disabled ? "text-slate-400" : "text-slate-800"}`}>
        {cta}
        {!disabled && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
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
