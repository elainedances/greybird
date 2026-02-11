"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MessageCircle } from "lucide-react";

export default function MessageButton({ targetUserId, label }: { targetUserId: string; label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.id === targetUserId) {
      setError("You can't message yourself");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/messages/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ other_user_id: targetUserId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`${data.error}: ${data.details || "unknown"}`);
        setLoading(false);
        return;
      }

      router.push(`/messages?conversation=${data.conversation_id}`);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200 disabled:opacity-50"
      >
        <MessageCircle className="w-5 h-5" />
        {loading ? "Loading..." : label}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
