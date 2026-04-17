// File: src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center h-16">
        
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl rotate-3 flex items-center justify-center text-white font-bold text-xl shadow-md">
            দ
          </div>
          <div className="font-extrabold text-2xl text-slate-900 tracking-tight">
            দৈনিক <span className="text-orange-600">চাকরি</span>
          </div>
        </Link>

        {/* অ্যাডমিন বাটন */}
        <a 
          href="https://admin.jobsboxbd.com" 
          target="_blank" 
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          অ্যাডমিন
        </a>
      </div>
    </header>
  );
}