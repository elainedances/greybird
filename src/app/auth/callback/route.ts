import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = searchParams.get("redirect") ?? searchParams.get("next") ?? "/dashboard";

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorDescription || error)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError) {
      // Successful auth - redirect to dashboard or intended destination
      const redirectUrl = next.startsWith("/") ? `${origin}${next}` : next;
      return NextResponse.redirect(redirectUrl);
    }
    
    console.error("Code exchange error:", exchangeError);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`);
  }

  // No code provided
  return NextResponse.redirect(`${origin}/login?error=missing_code`);
}
