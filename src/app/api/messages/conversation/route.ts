import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Auth check with user's session
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { other_user_id } = await req.json();

  if (!other_user_id || other_user_id === user.id) {
    return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  // Use admin client (bypasses RLS) for conversation operations
  const admin = createAdminClient();

  // Check if conversation already exists
  const { data: myConvs } = await admin
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", user.id);

  if (myConvs?.length) {
    const convIds = myConvs.map((c) => c.conversation_id);
    
    const { data: otherInSame } = await admin
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", other_user_id)
      .in("conversation_id", convIds);

    if (otherInSame?.length) {
      for (const match of otherInSame) {
        const { count } = await admin
          .from("conversation_participants")
          .select("*", { count: "exact", head: true })
          .eq("conversation_id", match.conversation_id);
        
        if (count === 2) {
          return NextResponse.json({ conversation_id: match.conversation_id });
        }
      }
    }
  }

  // Create new conversation
  const { data: conv, error: convError } = await admin
    .from("conversations")
    .insert({})
    .select("id")
    .single();

  if (convError || !conv) {
    return NextResponse.json({ error: "Failed to create conversation", details: convError?.message }, { status: 500 });
  }

  // Add participants
  const { error: partError } = await admin
    .from("conversation_participants")
    .insert([
      { conversation_id: conv.id, user_id: user.id },
      { conversation_id: conv.id, user_id: other_user_id },
    ]);

  if (partError) {
    return NextResponse.json({ error: "Failed to add participants", details: partError.message }, { status: 500 });
  }

  return NextResponse.json({ conversation_id: conv.id });
}
