"use client";

import { useState } from "react";
import { Users, FileText, Mail, TrendingUp, Search, Download, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalPosts: number;
  activePosts: number;
  inactivePosts: number;
  waitlistCount: number;
  newUsersThisWeek: number;
}

interface Profile {
  id: string;
  full_name: string | null;
  headline: string | null;
  location: string | null;
  avatar_url: string | null;
  is_public: boolean;
  contact_email: string | null;
  created_at: string;
  post_count: number;
}

interface Post {
  id: string;
  user_id: string;
  post_type: string;
  title: string;
  description: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
  author_name: string;
}

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
}

type Tab = "overview" | "users" | "posts" | "waitlist";

export default function AdminClient({
  stats,
  profiles: initialProfiles,
  posts: initialPosts,
  waitlist,
}: {
  stats: Stats;
  profiles: Profile[];
  posts: Post[];
  waitlist: WaitlistEntry[];
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [profiles, setProfiles] = useState(initialProfiles);
  const [posts, setPosts] = useState(initialPosts);
  const [userSearch, setUserSearch] = useState("");
  const [postSearch, setPostSearch] = useState("");
  const [waitlistSearch, setWaitlistSearch] = useState("");
  const [loading, setLoading] = useState<string | null>(null);

  const filteredProfiles = profiles.filter(p =>
    (p.full_name || "").toLowerCase().includes(userSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
    p.author_name.toLowerCase().includes(postSearch.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(postSearch.toLowerCase())
  );

  const filteredWaitlist = waitlist.filter(w =>
    w.email.toLowerCase().includes(waitlistSearch.toLowerCase())
  );

  async function apiCall(action: string, data: Record<string, unknown>) {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...data }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed");
    }
    return res.json();
  }

  // toggleVisibility removed — visibility is per-post now

  async function togglePostActive(id: string, current: boolean) {
    setLoading(id);
    try {
      await apiCall("toggle_post_active", { id, is_active: !current });
      setPosts(prev => prev.map(p => p.id === id ? { ...p, is_active: !current } : p));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Error");
    }
    setLoading(null);
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post permanently?")) return;
    setLoading(id);
    try {
      await apiCall("delete_post", { id });
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Error");
    }
    setLoading(null);
  }

  function exportWaitlistCSV() {
    const header = "Email,Signed Up\n";
    const rows = waitlist.map(w => `${w.email},${new Date(w.created_at).toLocaleDateString()}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "waitlist.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { id: "posts", label: "Posts", icon: <FileText className="w-4 h-4" /> },
    { id: "waitlist", label: "Waitlist", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-slate-200 pb-0">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? "border-teal-700 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Users" value={stats.totalUsers} icon={<Users className="w-6 h-6" />} />
          <StatCard label="Total Posts" value={stats.totalPosts} subtitle={`${stats.activePosts} active · ${stats.inactivePosts} inactive`} icon={<FileText className="w-6 h-6" />} />
          <StatCard label="Waitlist Signups" value={stats.waitlistCount} icon={<Mail className="w-6 h-6" />} />
          <StatCard label="New This Week" value={stats.newUsersThisWeek} icon={<TrendingUp className="w-6 h-6" />} />
        </div>
      )}

      {/* Users */}
      {tab === "users" && (
        <div>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full max-w-md border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Name</th>
                    <th className="text-left px-4 py-3 font-medium">Location</th>
                    <th className="text-left px-4 py-3 font-medium">Signed Up</th>
                    <th className="text-center px-4 py-3 font-medium">Posts</th>
                    <th className="text-center px-4 py-3 font-medium">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProfiles.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">{p.full_name || "—"}</div>
                        <div className="text-xs text-slate-400">{p.headline || ""}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{p.location || "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{new Date(p.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{p.post_count}</td>
                      <td className="px-4 py-3 text-center text-slate-600 text-xs">{p.contact_email || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProfiles.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">No users found.</div>
            )}
          </div>
        </div>
      )}

      {/* Posts */}
      {tab === "posts" && (
        <div>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, author, category..."
              value={postSearch}
              onChange={e => setPostSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full max-w-md border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Title</th>
                    <th className="text-left px-4 py-3 font-medium">Type</th>
                    <th className="text-left px-4 py-3 font-medium">Author</th>
                    <th className="text-left px-4 py-3 font-medium">Date</th>
                    <th className="text-center px-4 py-3 font-medium">Status</th>
                    <th className="text-center px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900 max-w-xs truncate">{p.title}</td>
                      <td className="px-4 py-3 text-slate-600 capitalize">{p.post_type}</td>
                      <td className="px-4 py-3 text-slate-600">{p.author_name}</td>
                      <td className="px-4 py-3 text-slate-600">{new Date(p.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-center">
                        {p.is_active ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full"><ToggleRight className="w-3 h-3" />Active</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"><ToggleLeft className="w-3 h-3" />Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => togglePostActive(p.id, p.is_active)}
                          disabled={loading === p.id}
                          className="text-xs text-teal-700 hover:text-teal-900 font-medium disabled:opacity-50"
                        >
                          {p.is_active ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => deletePost(p.id)}
                          disabled={loading === p.id}
                          className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredPosts.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">No posts found.</div>
            )}
          </div>
        </div>
      )}

      {/* Waitlist */}
      {tab === "waitlist" && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by email..."
                value={waitlistSearch}
                onChange={e => setWaitlistSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button
              onClick={exportWaitlistCSV}
              className="flex items-center gap-2 px-4 py-2 bg-teal-700 text-white text-sm font-medium rounded-lg hover:bg-teal-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Signed Up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWaitlist.map(w => (
                  <tr key={w.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900">{w.email}</td>
                    <td className="px-4 py-3 text-slate-600">{new Date(w.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredWaitlist.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">No waitlist entries found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, subtitle, icon }: { label: string; value: number; subtitle?: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
    </div>
  );
}
