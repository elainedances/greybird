"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, X, Send } from "lucide-react";

export default function EmailContactButton({ targetUserId, targetName }: { targetUserId: string; targetName: string }) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ senderName: "", senderEmail: "", message: "" });
  const supabase = createClient();

  const handleOpen = async () => {
    // Pre-fill with logged-in user's info
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, contact_email")
        .eq("id", user.id)
        .single();
      setForm(f => ({
        ...f,
        senderName: profile?.full_name || "",
        senderEmail: profile?.contact_email || user.email || "",
      }));
    }
    setOpen(true);
    setSent(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId: targetUserId,
          senderName: form.senderName,
          senderEmail: form.senderEmail,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to send");
      } else {
        setSent(true);
        setForm(f => ({ ...f, message: "" }));
      }
    } catch {
      setError("Something went wrong");
    }
    setSending(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 border border-teal-300 text-teal-700 px-6 py-3 rounded-lg font-medium hover:bg-teal-50 transition-colors"
      >
        <Mail className="w-4 h-4" />
        Email
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Send email to {targetName}
              </h3>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-slate-900 font-medium">Email sent!</p>
                <p className="text-slate-500 text-sm mt-1">Your message has been delivered to {targetName}.</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 text-teal-700 font-medium text-sm hover:text-teal-800"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your name</label>
                  <input
                    type="text"
                    required
                    value={form.senderName}
                    onChange={e => setForm(f => ({ ...f, senderName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your email</label>
                  <input
                    type="email"
                    required
                    value={form.senderEmail}
                    onChange={e => setForm(f => ({ ...f, senderEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    placeholder={`Write your message to ${targetName}...`}
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-teal-800 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Email"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
