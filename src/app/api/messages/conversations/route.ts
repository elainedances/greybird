import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all conversation IDs for this user
  const { data: myParticipations } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", user.id);

  if (!myParticipations?.length) {
    return NextResponse.json({ conversations: [] });
  }

  const convIds = myParticipations.map((p) => p.conversation_id);

  // Get other participants
  const { data: otherParticipants } = await supabase
    .from("conversation_participants")
    .select("conversation_id, user_id")
    .in("conversation_id", convIds)
    .neq("user_id", user.id);

  // Get profiles for other users
  const otherUserIds = [...new Set((otherParticipants || []).map((p) => p.user_id))];
  
  const nameMap = new Map<string, string>();
  
  if (otherUserIds.length) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", otherUserIds);
    
    profiles?.forEach((p) => nameMap.set(p.id, p.full_name || "Unknown User"));

    const { data: companies } = await supabase
      .from("companies")
      .select("id, company_name")
      .in("id", otherUserIds);
    
    companies?.forEach((c) => {
      if (c.company_name && !nameMap.has(c.id)) {
        nameMap.set(c.id, c.company_name);
      }
    });
  }

  // Build conversation list
  const conversations = [];
  for (const convId of convIds) {
    const otherP = (otherParticipants || []).find((p) => p.conversation_id === convId);
    if (!otherP) continue;

    const { data: lastMsg } = await supabase
      .from("messages")
      .select("content, created_at")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const { count } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("conversation_id", convId)
      .neq("sender_id", user.id)
      .is("read_at", null);

    conversations.push({
      id: convId,
      other_user_id: otherP.user_id,
      other_user_name: nameMap.get(otherP.user_id) || "Unknown User",
      last_message: lastMsg?.content || null,
      last_message_at: lastMsg?.created_at || null,
      unread_count: count || 0,
    });
  }

  conversations.sort((a, b) => {
    if (!a.last_message_at) return 1;
    if (!b.last_message_at) return -1;
    return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
  });

  return NextResponse.json({ conversations });
}
