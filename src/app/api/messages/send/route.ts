import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conversation_id, content } = await request.json();

    if (!conversation_id || !content?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Verify user is in this conversation
    const { data: participant } = await supabase
      .from("conversation_participants")
      .select("user_id")
      .eq("conversation_id", conversation_id)
      .eq("user_id", user.id)
      .single();

    if (!participant) {
      return NextResponse.json({ error: "Not in conversation" }, { status: 403 });
    }

    // Insert message
    const { data: message, error } = await supabase
      .from("messages")
      .insert({
        conversation_id,
        sender_id: user.id,
        content: content.trim(),
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    // Get recipient for email notification
    const { data: otherParticipant } = await supabase
      .from("conversation_participants")
      .select("user_id")
      .eq("conversation_id", conversation_id)
      .neq("user_id", user.id)
      .single();

    if (otherParticipant) {
      // Check if recipient has unread messages (if so, they might not be online)
      const { count } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("conversation_id", conversation_id)
        .eq("sender_id", user.id)
        .is("read_at", null)
        .neq("id", message.id);

      // Send email notification if this is the first unread message
      if (count === 0) {
        // Get recipient email from profiles
        const { data: recipientProfile } = await supabase
          .from("profiles")
          .select("full_name, contact_email")
          .eq("id", otherParticipant.user_id)
          .single();

        const { data: senderProfile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();

        if (recipientProfile?.contact_email) {
          try {
            await resend.emails.send({
              from: "Greybird <hello@greybird.pro>",
              to: recipientProfile.contact_email,
              subject: `New message from ${senderProfile?.full_name || "someone"} on Greybird`,
              html: `
                <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #1e293b;">New message on Greybird 🐦</h2>
                  <p>Hi ${recipientProfile.full_name || "there"},</p>
                  <p><strong>${senderProfile?.full_name || "Someone"}</strong> sent you a message:</p>
                  <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin: 16px 0;">
                    <p style="margin: 0; white-space: pre-wrap;">${content.trim()}</p>
                  </div>
                  <a href="https://greybird.pro/messages?conversation=${conversation_id}" style="display: inline-block; background: #0f766e; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reply on Greybird</a>
                  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
                  <p style="color: #94a3b8; font-size: 12px;">Greybird — Connecting experienced professionals</p>
                </div>
              `,
            });
          } catch (emailErr) {
            console.error("Email notification error:", emailErr);
          }
        }
      }
    }

    return NextResponse.json({ success: true, message });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
