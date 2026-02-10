import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image 
            src="/logo.png" 
            alt="Greybird" 
            width={48} 
            height={48}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-slate-800">
            Grey<span className="text-slate-600">bird</span>
          </span>
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-slate-300 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Page not found</h2>
        <p className="text-slate-600 mb-8">
          Looks like this bird has flown. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* CTA */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
