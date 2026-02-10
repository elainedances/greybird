import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { expertId, senderName, senderEmail, message } = await request.json();

    if (!expertId || !senderName || !senderEmail || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Get expert's contact email
    const supabase = await createClient();
    const { data: expert, error: dbError } = await supabase
      .from("profiles")
      .select("full_name, contact_email")
      .eq("id", expertId)
      .eq("is_public", true)
      .single();

    if (dbError || !expert || !expert.contact_email) {
      return NextResponse.json(
        { error: "Expert not found" },
        { status: 404 }
      );
    }

    // Send email to expert
    const { error } = await resend.emails.send({
      from: "Greybird <hello@greybird.pro>",
      to: expert.contact_email,
      replyTo: senderEmail,
      subject: `New message from ${senderName} via Greybird`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e293b; margin-bottom: 10px;">New Message via Greybird 🐦</h1>
          </div>
          
          <p>Hi ${expert.full_name || "there"},</p>
          
          <p>You've received a new message through your Greybird profile:</p>
          
          <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <p style="margin: 0 0 10px;"><strong>From:</strong> ${senderName}</p>
            <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${senderEmail}" style="color: #1e293b;">${senderEmail}</a></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>You can reply directly to this email to respond to ${senderName}.</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            This message was sent via your Greybird profile<br>
            <a href="https://greybird.pro/dashboard" style="color: #64748b;">Manage your profile</a>
          </p>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
