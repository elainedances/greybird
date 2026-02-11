"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type NavigationProps = {
  transparent?: boolean;
};

export default function Navigation({ transparent = false }: NavigationProps) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user ? { email: user.email || "" } : null);
      setLoading(false);
    }
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ? { email: session.user.email || "" } : null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const bgClass = transparent 
    ? "bg-white/80 backdrop-blur-md" 
    : "bg-white";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${bgClass} border-b border-slate-100`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Greybird" width={40} height={40} className="object-contain" />
          <span className="text-2xl font-bold text-slate-800">
            Grey<span className="text-teal-700">bird</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/experts" className="text-slate-600 hover:text-teal-700 transition-colors font-medium">
            Find Experts
          </Link>
          <Link href="/companies" className="text-slate-600 hover:text-teal-700 transition-colors font-medium">
            Browse Companies
          </Link>
          <Link href="/about" className="text-slate-600 hover:text-teal-700 transition-colors font-medium">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-20 h-8" /> // Placeholder to prevent layout shift
          ) : user ? (
            <>
              <Link href="/dashboard" className="text-slate-600 hover:text-teal-700 transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard" className="bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200">
                My Account
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-slate-600 hover:text-teal-700 transition-colors font-medium">
                Log In
              </Link>
              <Link href="/signup" className="bg-teal-700 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-teal-800 transition-all hover:shadow-lg hover:shadow-teal-200">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
