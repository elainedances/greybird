import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { action } = body;

  try {
    switch (action) {
      case "toggle_visibility": {
        const { id, is_public } = body;
        const { error } = await supabase
          .from("profiles")
          .update({ is_public })
          .eq("id", id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      case "toggle_post_active": {
        const { id, is_active } = body;
        const { error } = await supabase
          .from("posts")
          .update({ is_active })
          .eq("id", id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      case "delete_post": {
        const { id } = body;
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
