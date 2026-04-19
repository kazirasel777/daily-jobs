// File: src/components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* max-w-6xl থেকে max-w-7xl করা হয়েছে প্রস্থ বাড়ানোর জন্য */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center h-16">
        
        {/* লোগো */}
        <Link href="/" className="flex items-center group">
          <Image 
            src="/daily_jobs_logo.png" 
            alt="DailyJobs Logo" 
            width={200} 
            height={50} 
            priority
            className="w-auto h-12 object-contain transition-transform group-hover:scale-105" 
          />
        </Link>

        {/* নেভিগেশন মেনু (মাঝখানে থাকবে) - ডেস্কটপের জন্য */}
        <nav className="hidden md:flex gap-6 lg:gap-8 font-medium text-slate-700">
          <Link href="/" className="hover:text-orange-600 transition-colors">হোম</Link>
          <Link href="/jobs" className="hover:text-orange-600 transition-colors">সকল চাকরি</Link>
          <Link href="/category/govt" className="hover:text-orange-600 transition-colors">সরকারি চাকরি</Link>
          <Link href="/category/private" className="hover:text-orange-600 transition-colors">প্রাইভেট চাকরি</Link>
        </nav>

        {/* ডানদিকের বাটন (লগইনের বদলে 'চাকরি খুঁজুন' বাটন) */}
        <div className="flex items-center gap-4">
          <Link 
            href="/jobs" 
            className="hidden sm:inline-flex bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            সার্কুলার খুঁজুন
          </Link>

          {/* মোবাইল মেনু বাটন (ছোট স্ক্রিনের জন্য) */}
          <button className="md:hidden text-slate-600 hover:text-slate-900 p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}