import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
