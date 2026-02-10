import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Delete profile (if exists)
    await supabase.from("profiles").delete().eq("id", user.id);
    
    // Delete company profile (if exists)
    await supabase.from("companies").delete().eq("id", user.id);
    
    // Delete avatar from storage (if exists)
    const { data: avatarFiles } = await supabase.storage
      .from("avatars")
      .list(user.id);
    
    if (avatarFiles && avatarFiles.length > 0) {
      const filesToDelete = avatarFiles.map((file) => `${user.id}/${file.name}`);
      await supabase.storage.from("avatars").remove(filesToDelete);
    }

    // Delete the user from auth (this requires admin/service role in production)
    // For now, we'll use the user's own session to sign out
    // The actual user deletion would need a server-side admin client
    // or Supabase Edge Function with service role
    
    // Sign out the user
    await supabase.auth.signOut();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
