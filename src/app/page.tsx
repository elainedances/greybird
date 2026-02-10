"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

// Logo Component
function Logo({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Greybird" 
        width={size} 
        height={size}
        className="object-contain"
      />
      <span className="text-2xl font-bold text-slate-800">
        Grey<span className="text-slate-600">bird</span>
      </span>
    </div>
  );
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
            How It Works
          </a>
          <a href="#categories" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
            Categories
          </a>
          <a href="#join" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
            Join Waitlist
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden sm:block text-slate-600 hover:text-slate-900 transition-colors font-medium">
            Log In
          </a>
          <a href="/signup" className="bg-slate-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-600"></span>
          </span>
          Now accepting early signups
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
          Experience Meets<br />
          <span className="gradient-text">Opportunity</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Connect with senior professionals for part-time projects, advisory sessions, and flexible work. 
          Access <strong>decades of expertise</strong> on demand.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#join" className="btn-primary flex items-center justify-center gap-2">
            <span>I&apos;m Hiring Talent</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="#join" className="btn-secondary flex items-center justify-center gap-2">
            <span>I&apos;m an Expert</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-700">20+</div>
            <div className="text-slate-500 font-medium">Years Avg. Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-700">100%</div>
            <div className="text-slate-500 font-medium">Remote</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-700">Direct</div>
            <div className="text-slate-500 font-medium">Contact</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Categories Section
function Categories() {
  const categories = [
    { name: "Tech & IT", icon: "💻", count: "Coming soon" },
    { name: "Finance", icon: "📊", count: "Coming soon" },
    { name: "Strategy", icon: "🎯", count: "Coming soon" },
    { name: "Marketing", icon: "📢", count: "Coming soon" },
    { name: "HR & Recruiting", icon: "👥", count: "Coming soon" },
    { name: "Legal", icon: "⚖️", count: "Coming soon" },
    { name: "Engineering", icon: "🔧", count: "Coming soon" },
    { name: "Other", icon: "✨", count: "Coming soon" },
  ];

  return (
    <section id="categories" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Find Expertise In Every Field
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Browse senior professionals across industries, ready for advisory calls, projects, or part-time collaboration.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-pill flex flex-col items-center py-6"
            >
              <span className="text-3xl mb-2 category-icon">{cat.icon}</span>
              <span className="font-semibold text-slate-800">{cat.name}</span>
              <span className="text-sm text-slate-400 mt-1">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Value Props Section
function ValueProps() {
  const props = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Decades of Experience",
      description: "Access professionals with 20-40 years of real-world expertise. No juniors, no guesswork.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global & Remote",
      description: "Work with experts from anywhere in the world. Timezone-flexible, location-independent.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Direct Contact",
      description: "No middlemen, no agencies. Connect directly with experts and start conversations immediately.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Flexible Engagement",
      description: "Advisory calls, part-time projects, or ongoing collaboration. You decide the format.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Greybird?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Built for companies who need senior expertise without the overhead of full-time hires or expensive consulting firms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {props.map((prop) => (
            <div key={prop.title} className="card flex gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                {prop.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{prop.title}</h3>
                <p className="text-slate-600 leading-relaxed">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600">
            Simple for both sides of the marketplace
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Companies */}
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-8 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🏢 For Companies
            </div>
            <h3 className="text-2xl font-bold mb-8">Find the right expert, fast</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <div className="font-semibold mb-1">Browse Profiles</div>
                  <div className="text-white/80">Search by industry, expertise, or availability</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <div className="font-semibold mb-1">Contact Directly</div>
                  <div className="text-white/80">Reach out to experts with one click</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <div className="font-semibold mb-1">Engage On Your Terms</div>
                  <div className="text-white/80">Advisory call, project, or ongoing — you decide</div>
                </div>
              </div>
            </div>
          </div>

          {/* For Experts */}
          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              👤 For Experts
            </div>
            <h3 className="text-2xl font-bold mb-8">Share your experience, flexibly</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <div className="font-semibold mb-1">Create Profile (5 min)</div>
                  <div className="text-white/70">Highlight your experience and expertise</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <div className="font-semibold mb-1">Set Availability</div>
                  <div className="text-white/70">Define how many hours and what type of work</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <div className="font-semibold mb-1">Get Contacted</div>
                  <div className="text-white/70">Companies reach out for opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonial Section (Placeholder)
function Testimonial() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <svg className="w-12 h-12 text-slate-300 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote className="text-2xl md:text-3xl font-medium text-slate-700 mb-8 leading-relaxed">
          &ldquo;Perfect for tapping into senior expertise without the overhead of full-time hires or expensive consulting firms.&rdquo;
        </blockquote>
        <div className="text-slate-500">
          — Early beta tester
        </div>
      </div>
    </section>
  );
}

// Waitlist Section
function Waitlist() {
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"company" | "expert" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !type) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, type }]);
      
      if (error) {
        if (error.code === '23505') {
          // Duplicate email
          alert('This email is already on the waitlist!');
        } else {
          console.error('Error:', error);
          alert('Something went wrong. Please try again.');
        }
      } else {
        // Send welcome email
        try {
          await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, type }),
          });
        } catch (emailErr) {
          // Don't block signup if email fails
          console.error('Email error:', emailErr);
        }
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <section id="join" className="py-20 px-6 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="category-icon">🚀</span> Be First In Line
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Join the Waitlist
        </h2>
        
        <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
          Get early access when we launch. We&apos;ll notify you as soon as Greybird goes live.
        </p>
        
        {submitted ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-slate-300">We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark w-full text-center"
                required
              />
            </div>
            
            <div className="flex gap-4 mb-6 justify-center">
              <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all ${type === "company" ? "bg-white border-slate-300" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}>
                <input
                  type="radio"
                  name="type"
                  value="company"
                  checked={type === "company"}
                  onChange={() => setType("company")}
                  className="sr-only"
                />
                <span className={type === "company" ? "text-slate-800" : ""}>🏢 I&apos;m hiring</span>
              </label>
              <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all ${type === "expert" ? "bg-white border-slate-300" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}>
                <input
                  type="radio"
                  name="type"
                  value="expert"
                  checked={type === "expert"}
                  onChange={() => setType("expert")}
                  className="sr-only"
                />
                <span className={type === "expert" ? "text-slate-800" : ""}>👤 I&apos;m an expert</span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading || !email || !type}
              className="w-full bg-white text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Joining..." : "Join Waitlist →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-6 bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="Greybird" 
              width={32} 
              height={32}
              className="object-contain brightness-0 invert opacity-80"
            />
            <span className="text-xl font-bold text-white">
              Grey<span className="text-slate-400">bird</span>
            </span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="mailto:hello@greybird.pro" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-sm">
            © 2026 Greybird. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page
export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Categories />
      <ValueProps />
      <HowItWorks />
      <Testimonial />
      <Waitlist />
      <Footer />
    </main>
  );
}
