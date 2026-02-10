import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email and type are required" },
        { status: 400 }
      );
    }

    // Send welcome email to the user
    const { error } = await resend.emails.send({
      from: "Greybird <hello@greybird.pro>",
      to: email,
      subject: "Welcome to Greybird! 🐦",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e293b; margin-bottom: 10px;">Welcome to Greybird! 🐦</h1>
            <p style="color: #64748b; font-size: 18px;">Experience Meets Opportunity</p>
          </div>
          
          <p>Hi there,</p>
          
          <p>Thanks for joining the Greybird waitlist as ${type === "company" ? "a <strong>company looking for talent</strong>" : "an <strong>experienced professional</strong>"}!</p>
          
          <p>We're building a platform to connect businesses with senior professionals for part-time projects, advisory sessions, and flexible work.</p>
          
          <div style="background: #f1f5f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <p style="margin: 0; font-weight: 600; color: #1e293b;">What's next?</p>
            <ul style="margin: 10px 0 0; padding-left: 20px; color: #475569;">
              <li>We'll notify you as soon as we launch</li>
              <li>Early access members get priority placement</li>
              <li>You'll be among the first to connect with ${type === "company" ? "top-tier professionals" : "leading companies"}</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to reply to this email with any questions or ideas — we'd love to hear from you!</p>
          
          <p style="margin-top: 30px;">
            Cheers,<br>
            <strong>The Greybird Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            You're receiving this because you signed up at greybird.pro<br>
            © 2026 Greybird. All rights reserved.
          </p>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
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
