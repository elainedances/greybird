"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MessageCircle } from "lucide-react";

export default function MessageButton({ targetUserId, label }: { targetUserId: string; label: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleClick = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.id === targetUserId) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.rpc("get_or_create_conversation", {
      other_user_id: targetUserId,
    });

    if (error) {
      console.error("Error creating conversation:", error);
      setLoading(false);
      return;
    }

    router.push(`/messages?conversation=${data}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200 disabled:opacity-50"
    >
      <MessageCircle className="w-5 h-5" />
      {loading ? "Loading..." : label}
    </button>
  );
}
