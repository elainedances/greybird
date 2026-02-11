import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { UserCircle, Building2, Handshake, Target, Zap, Gem } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Greybird",
  description: "We're building the platform where experience meets opportunity. Learn about our mission to connect seasoned professionals with companies that value expertise.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation transparent />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            We Believe Experience<br />Should Never Be Wasted
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Greybird connects companies with senior professionals who have decades of real-world expertise—without the overhead of full-time hires or expensive consultants.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                The Problem We Saw
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Too many experienced professionals are sidelined after decades of building expertise. They don&apos;t want to stop working—they want to work <em>differently</em>. On their terms. With flexibility.
                </p>
                <p>
                  Meanwhile, companies struggle to access senior talent. Full-time hires are expensive. Consulting firms charge premium rates but often staff projects with junior analysts. Direct expertise is hard to find.
                </p>
                <p>
                  <strong>We built Greybird to fix this disconnect.</strong>
                </p>
              </div>
            </div>
            <div className="bg-slate-100 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <UserCircle className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">For Professionals</div>
                    <div className="text-slate-600 text-sm">Keep using your expertise on your own terms</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">For Companies</div>
                    <div className="text-slate-600 text-sm">Access decades of experience without the overhead</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Direct Connection</div>
                    <div className="text-slate-600 text-sm">No agencies, no middlemen, no markup</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            To create a world where experience is valued, accessible, and flexible—where professionals can share their expertise on their terms, and companies can tap into decades of knowledge without traditional barriers.
          </p>
        </div>
      </section>

      {/* What We Value */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            What We Value
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Direct Access</h3>
              <p className="text-slate-600">
                No gatekeepers. Connect directly with the expertise you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Flexibility First</h3>
              <p className="text-slate-600">
                Work should fit your life, not the other way around.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gem className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Experience Matters</h3>
              <p className="text-slate-600">
                Decades of expertise have value that shouldn&apos;t be wasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Name */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-white rounded-3xl shadow-lg flex items-center justify-center">
                <Image src="/logo.png" alt="Greybird" width={80} height={80} className="object-contain" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why &ldquo;Greybird&rdquo;?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>&ldquo;Grey&rdquo;</strong> represents wisdom and experience—the kind that comes with time. It&apos;s not about age; it&apos;s about the depth that only years of work can bring.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong>&ldquo;Bird&rdquo;</strong> represents freedom and flexibility—the ability to fly in for a project, share your expertise, and move on. No cages. No constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
            Whether you&apos;re an experienced professional looking for flexible opportunities, or a company seeking senior expertise—we&apos;d love to have you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors"
            >
              Create Your Profile
            </Link>
            <Link
              href="/posts"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Browse Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Greybird" width={32} height={32} className="object-contain brightness-0 invert opacity-80" />
            <span className="text-xl font-bold text-white">Grey<span className="text-teal-400">bird</span></span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="text-sm">© 2026 Greybird. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
