import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import Navigation from "@/components/Navigation";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Greybird" };
  
  return {
    title: `${post.title} | Greybird Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Simple markdown to HTML (basic conversion)
function markdownToHtml(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-slate-900 mt-10 mb-6">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-slate-700 underline hover:text-slate-900">$1</a>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-2 my-4">$&</ul>')
    // Tables (basic)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) return ''; // Skip separator row
      const cellHtml = cells.map(c => `<td class="px-4 py-2 border border-slate-200">${c.trim()}</td>`).join('');
      return `<tr>${cellHtml}</tr>`;
    })
    // Horizontal rule
    .replace(/^---$/gim, '<hr class="my-8 border-slate-200" />')
    // Paragraphs (lines that aren't already wrapped)
    .split('\n\n')
    .map(para => {
      if (para.startsWith('<')) return para;
      if (para.trim() === '') return '';
      return `<p class="text-slate-600 leading-relaxed mb-4">${para.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = markdownToHtml(post.content);

  return (
    <main className="min-h-screen bg-white">
      <Navigation transparent />

      {/* Article */}
      <article className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-slate-400">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-500">
              <span>{post.author}</span>
              <span>•</span>
              <time>
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Share / CTA */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <div className="bg-slate-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Ready to find experienced talent?
              </h3>
              <p className="text-slate-600 mb-6">
                Join Greybird and connect with senior professionals for advisory, projects, or flexible work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/experts" className="bg-white text-slate-800 px-6 py-3 rounded-lg font-medium border border-slate-200 hover:bg-slate-100 transition-colors">
                  Browse Experts
                </Link>
                <Link href="/signup" className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition-colors">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Greybird" width={32} height={32} className="object-contain brightness-0 invert opacity-80" />
            <span className="text-xl font-bold text-white">Grey<span className="text-slate-400">bird</span></span>
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
