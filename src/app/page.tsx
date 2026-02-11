"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navigation from "@/components/Navigation";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Monitor,
  BarChart3,
  Target,
  Megaphone,
  Users,
  Scale,
  Wrench,
  Sparkles,
  Clock,
  Globe,
  MessageCircle,
  DollarSign,
  Building2,
  UserCircle,
  ArrowRight,
  Rocket,
  Search,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

// Navigation imported from @/components/Navigation

// Hero Section
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 overflow-hidden relative">
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-100/20 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-teal-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              Now accepting early signups
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
              Experience Meets<br />
              <span className="gradient-text">Opportunity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed">
              Connect with senior professionals for part-time projects, advisory sessions, and flexible work. 
              Access <strong>decades of expertise</strong> on demand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/posts" className="btn-primary flex items-center justify-center gap-2">
                <span>Browse Posts</span>
                <Search className="w-5 h-5" />
              </Link>
              <Link href="/signup" className="btn-secondary flex items-center justify-center gap-2">
                <span>Create a Post</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-teal-700">20+</div>
                <div className="text-slate-500 font-medium text-sm">Years Avg. Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-teal-700">100%</div>
                <div className="text-slate-500 font-medium text-sm">Remote</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-teal-700">Direct</div>
                <div className="text-slate-500 font-medium text-sm">Contact</div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <Image 
              src="/hero-image.webp" 
              alt="Connecting talent to opportunity" 
              width={600} 
              height={600}
              className="w-full h-auto rounded-2xl shadow-2xl shadow-slate-300/40"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Categories Section
function Categories() {
  const categories = [
    { name: "Tech & IT", icon: Monitor },
    { name: "Finance", icon: BarChart3 },
    { name: "Strategy", icon: Target },
    { name: "Marketing", icon: Megaphone },
    { name: "HR & Recruiting", icon: Users },
    { name: "Legal", icon: Scale },
    { name: "Engineering", icon: Wrench },
    { name: "Other", icon: Sparkles },
  ];

  return (
    <section id="categories" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Find Expertise In Every Field
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Browse posts from senior professionals across industries, ready for advisory calls, projects, or part-time collaboration.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.name} delay={i * 75}>
              <div
                className="category-pill flex flex-col items-center py-6 group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-teal-50 flex items-center justify-center mb-3 transition-colors duration-300">
                  <cat.icon className="w-6 h-6 text-slate-400 group-hover:text-teal-600 transition-colors duration-300" />
                </div>
                <span className="font-semibold text-slate-800">{cat.name}</span>
                <span className="text-sm text-slate-400 mt-1">Coming soon</span>
              </div>
            </ScrollReveal>
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
      icon: Clock,
      title: "Decades of Experience",
      description: "Access professionals with 20-40 years of real-world expertise. No juniors, no guesswork.",
      color: "teal",
    },
    {
      icon: Globe,
      title: "Global & Remote",
      description: "Work with experts from anywhere in the world. Timezone-flexible, location-independent.",
      color: "blue",
    },
    {
      icon: MessageCircle,
      title: "Direct Contact",
      description: "No middlemen, no agencies. Connect directly with experts and start conversations immediately.",
      color: "amber",
    },
    {
      icon: DollarSign,
      title: "Flexible Engagement",
      description: "Advisory calls, part-time projects, or ongoing collaboration. You decide the format.",
      color: "emerald",
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; hover: string }> = {
    teal: { bg: "bg-teal-50", icon: "text-teal-600", hover: "group-hover:bg-teal-100" },
    blue: { bg: "bg-blue-50", icon: "text-blue-600", hover: "group-hover:bg-blue-100" },
    amber: { bg: "bg-amber-50", icon: "text-amber-600", hover: "group-hover:bg-amber-100" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", hover: "group-hover:bg-emerald-100" },
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-teal-50/20">
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
          {props.map((prop, i) => {
            const colors = colorMap[prop.color];
            return (
              <ScrollReveal key={prop.title} delay={i * 100}>
              <div className="card flex gap-6 group">
                <div className={`flex-shrink-0 w-14 h-14 ${colors.bg} ${colors.hover} rounded-xl flex items-center justify-center transition-colors duration-300`}>
                  <prop.icon className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{prop.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{prop.description}</p>
                </div>
              </div>
              </ScrollReveal>
            );
          })}
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
          <ScrollReveal delay={0}>
          <div className="bg-gradient-to-br from-teal-700 to-teal-800 rounded-3xl p-8 text-white shadow-xl shadow-teal-200/30">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" /> For Companies
            </div>
            <h3 className="text-2xl font-bold mb-8">Find the right expert, fast</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Browse Posts</div>
                  <div className="text-white/80">Search by industry, expertise, or availability</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Contact Directly</div>
                  <div className="text-white/80">Reach out to experts with one click</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Engage On Your Terms</div>
                  <div className="text-white/80">Advisory call, project, or ongoing — you decide</div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* For Experts */}
          <ScrollReveal delay={150}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-300/30">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserCircle className="w-4 h-4" /> For Experts
            </div>
            <h3 className="text-2xl font-bold mb-8">Share your experience, flexibly</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Create Profile (5 min)</div>
                  <div className="text-white/70">Highlight your experience and expertise</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Set Availability</div>
                  <div className="text-white/70">Define how many hours and what type of work</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Get Contacted</div>
                  <div className="text-white/70">Companies reach out for opportunities</div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
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
          alert('This email is already on the waitlist!');
        } else {
          console.error('Error:', error);
          alert('Something went wrong. Please try again.');
        }
      } else {
        try {
          await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, type }),
          });
        } catch (emailErr) {
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
    <section id="join" className="py-20 px-6 bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Rocket className="w-4 h-4" /> Be First In Line
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Join the Waitlist
        </h2>
        
        <p className="text-xl text-teal-100 mb-10 max-w-xl mx-auto">
          Get early access when we launch. We&apos;ll notify you as soon as Greybird goes live.
        </p>
        
        {submitted ? (
          <div className="bg-white/20 backdrop-blur rounded-2xl p-8 max-w-md mx-auto">
            <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-teal-100">We&apos;ll be in touch soon.</p>
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
              <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all ${type === "company" ? "bg-white border-white" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}>
                <input
                  type="radio"
                  name="type"
                  value="company"
                  checked={type === "company"}
                  onChange={() => setType("company")}
                  className="sr-only"
                />
                <Building2 className={`w-4 h-4 ${type === "company" ? "text-teal-700" : ""}`} />
                <span className={type === "company" ? "text-teal-800 font-medium" : ""}>I&apos;m hiring</span>
              </label>
              <label className={`flex items-center gap-2 cursor-pointer px-4 py-3 rounded-xl border-2 transition-all ${type === "expert" ? "bg-white border-white" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}>
                <input
                  type="radio"
                  name="type"
                  value="expert"
                  checked={type === "expert"}
                  onChange={() => setType("expert")}
                  className="sr-only"
                />
                <UserCircle className={`w-4 h-4 ${type === "expert" ? "text-teal-700" : ""}`} />
                <span className={type === "expert" ? "text-teal-800 font-medium" : ""}>I&apos;m an expert</span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading || !email || !type}
              className="w-full bg-amber-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
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
              Grey<span className="text-teal-400">bird</span>
            </span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
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
      <ScrollReveal><Categories /></ScrollReveal>
      <ScrollReveal><ValueProps /></ScrollReveal>
      <ScrollReveal><HowItWorks /></ScrollReveal>
      <ScrollReveal><Waitlist /></ScrollReveal>
      <Footer />
    </main>
  );
}
