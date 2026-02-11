import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Blog | Greybird",
  description: "Insights on flexible work, portfolio careers, and accessing senior expertise.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation transparent />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            The Greybird Blog
          </h1>
          <p className="text-xl text-slate-600">
            Insights on flexible work, portfolio careers, and the future of expertise.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {posts.map((post, index) => (
              <article key={post.slug} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                <Link href={`/blog/${post.slug}`} className="block p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-slate-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-slate-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="text-slate-800 font-medium flex items-center gap-1">
                      Read more 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-teal-700 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mb-8">
            Join Greybird and connect with experienced professionals or find flexible opportunities.
          </p>
          <Link href="/signup" className="inline-block bg-white text-slate-800 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors">
            Sign Up Free
          </Link>
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
