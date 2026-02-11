"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { createClient } from "@/lib/supabase/client";

const TURNSTILE_SITE_KEY = "0x4AAAAAACaH98iceWTf3HhN";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void }) => string;
      reset: (widgetId?: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Render Turnstile widget when script loads
    const renderTurnstile = () => {
      if (window.turnstile && turnstileRef.current && !turnstileRef.current.hasChildNodes()) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setCaptchaToken(token),
        });
      }
    };
    
    // Check if already loaded
    if (window.turnstile) {
      renderTurnstile();
    } else {
      // Wait for script to load
      window.onTurnstileLoad = renderTurnstile;
    }
  }, []);

  const handleSocialLogin = async (provider: "google" | "linkedin_oidc") => {
    setSocialLoading(provider);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setSocialLoading(null);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setError("Please complete the captcha");
      return;
    }
    
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        captchaToken,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email!</h2>
            <p className="text-slate-600 mb-6">
              We&apos;ve sent a confirmation link to <strong>{email}</strong>. Click the link to activate your account.
            </p>
            <Link href="/login" className="text-slate-600 hover:text-slate-900 transition-colors">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <Image src="/logo.png" alt="Greybird" width={48} height={48} className="object-contain" />
          <span className="text-2xl font-bold text-slate-800">
            Grey<span className="text-slate-600">bird</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">Create your account</h1>
          <p className="text-slate-600 text-center mb-6">Join Greybird and connect with opportunities</p>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {socialLoading === "google" ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              <span className="font-medium text-slate-700">Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("linkedin_oidc")}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {socialLoading === "linkedin_oidc" ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              )}
              <span className="font-medium text-slate-700">Continue with LinkedIn</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all"
              />
              <p className="text-xs text-slate-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Turnstile Captcha */}
            <div ref={turnstileRef} className="flex justify-center" />

            <button
              type="submit"
              disabled={loading || !captchaToken}
              className="w-full bg-teal-700 text-white py-3 rounded-xl font-medium hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
          
          {/* Turnstile Script */}
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad"
            async
            defer
          />

          <p className="text-center text-slate-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-900 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-700">Terms</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-slate-700">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
