// File: components/Pagination.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  lastPage: number;
};

export default function Pagination({ currentPage, lastPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // পেজ পরিবর্তন করার ফাংশন
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > lastPage) return; // পেজ লিমিটের বাইরে গেলে কিছু করবে না

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', newPage.toString()); // লিংকে নতুন পেজ নাম্বার সেট করা
    
    // নতুন লিংকে পাঠানো এবং স্ক্রল করে একদম উপরে নিয়ে যাওয়া
    router.push(`/?${current.toString()}`, { scroll: true });
  };

  // যদি মাত্র ১টি পেজ থাকে, তবে পেজিনেশন দেখানোর দরকার নেই
  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-10 pt-6 border-t border-slate-100">
      
      {/* পূর্ববর্তী (Previous) বাটন */}
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
          currentPage === 1 
            ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
            : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 hover:border-orange-200 shadow-sm'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        পূর্ববর্তী
      </button>

      {/* পেজ নাম্বার */}
      <div className="text-sm font-semibold text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
        পেজ <span className="text-orange-600 text-base">{currentPage}</span> / {lastPage}
      </div>

      {/* পরবর্তী (Next) বাটন */}
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
          currentPage === lastPage 
            ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
            : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 hover:border-orange-200 shadow-sm'
        }`}
      >
        পরবর্তী
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
      </button>

    </div>
  );
}