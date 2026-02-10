"use client";

import { useState } from "react";

export function ContactForm({ expertId, expertName }: { expertId: string; expertName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expertId,
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccess(true);
      setForm({ senderName: "", senderEmail: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✉️</div>
        <h3 className="font-semibold text-green-800 mb-1">Message sent!</h3>
        <p className="text-green-700 text-sm mb-4">
          Your message has been sent to {expertName}. They&apos;ll reply to your email directly.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setIsOpen(false);
          }}
          className="text-green-700 text-sm hover:underline"
        >
          Close
        </button>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Send Message
      </button>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900">Contact {expertName}</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            value={form.senderName}
            onChange={(e) => setForm({ ...form, senderName: e.target.value })}
            required
            placeholder="John Smith"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Your Email *
          </label>
          <input
            type="email"
            value={form.senderEmail}
            onChange={(e) => setForm({ ...form, senderEmail: e.target.value })}
            required
            placeholder="john@company.com"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Message *
          </label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={4}
            placeholder="Hi, I'm interested in discussing a potential project..."
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 text-white py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors disabled:opacity-50 text-sm"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        <p className="text-xs text-slate-500 text-center">
          Your email will be shared so {expertName} can reply directly.
        </p>
      </form>
    </div>
  );
}
