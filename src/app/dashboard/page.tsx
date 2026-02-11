import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { UserCircle, Building2, Search, Eye, EyeOff, Settings, ChevronRight } from "lucide-react";

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
      <Navigation />

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {profile?.full_name ? `Welcome back, ${profile.full_name.split(" ")[0]}!` : "Welcome to Greybird!"}
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
                iconNode={<UserCircle className="w-7 h-7 text-teal-600" />}
                href="/profile/edit"
                cta="Edit Profile"
              />
              <DashboardCard
                title="Browse Opportunities"
                description="See companies looking for experienced professionals like you."
                iconNode={<Search className="w-7 h-7 text-slate-400" />}
                href="#"
                cta="Coming Soon"
                disabled
              />
              <DashboardCard
                title="Your Visibility"
                description={isPublic 
                  ? "Your profile is visible to companies. They can find and contact you."
                  : "Your profile is hidden. Make it public to get discovered."}
                iconNode={isPublic ? <Eye className="w-7 h-7 text-emerald-600" /> : <EyeOff className="w-7 h-7 text-amber-500" />}
                href="/profile/edit"
                cta={isPublic ? "Manage Visibility" : "Make Visible"}
              />
            </>
          ) : (
            <>
              <DashboardCard
                title="Company Profile"
                description="Set up your company profile to attract the best talent."
                iconNode={<Building2 className="w-7 h-7 text-teal-600" />}
                href="/company/edit"
                cta="Edit Profile"
              />
              <DashboardCard
                title="Browse Experts"
                description="Find experienced professionals for your project or advisory needs."
                iconNode={<Search className="w-7 h-7 text-teal-600" />}
                href="/experts"
                cta="Browse Experts"
              />
              <DashboardCard
                title="Your Visibility"
                description="Make your company visible so experts can find and apply to you."
                iconNode={<Eye className="w-7 h-7 text-amber-500" />}
                href="/company/edit"
                cta="Manage Visibility"
              />
            </>
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
