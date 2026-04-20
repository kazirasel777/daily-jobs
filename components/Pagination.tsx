// File: src/components/Pagination.tsx
'use client'; // এটি একটি ক্লায়েন্ট কম্পোনেন্ট হবে কারণ আমরা URL প্যারামিটার নিয়ে কাজ করব

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
}

// ইংরেজি নাম্বারকে বাংলায় রূপান্তর করার ফাংশন
const toBengaliNumber = (num: number | string) => {
  if (num === '...') return '...';
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (x) => bengaliDigits[Number(x)]);
};

export default function Pagination({ currentPage, lastPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // যদি মাত্র ১টি পেজ থাকে, তবে পেজিনেশন দেখানোর দরকার নেই
  if (lastPage <= 1) return null;

  // URL এ নতুন পেজ নাম্বার সেট করার ফাংশন (আগের ফিল্টার ঠিক রেখে)
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // ডাইনামিক পেজ লিস্ট তৈরি করার ম্যাজিক লজিক (১ ২ ৩ ... ১৩৬)
  const getPages = () => {
    if (lastPage <= 7) return Array.from({ length: lastPage }, (_, i) => i + 1);
    
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', lastPage];
    
    if (currentPage >= lastPage - 3) 
      return [1, '...', lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
      
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage];
  };

  const pages = getPages();

  return (
    <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-12 mb-6">
      
      {/* ⬅️ Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all shadow-sm"
          aria-label="পূর্ববর্তী পেজ"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <button disabled className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* 🔢 Numbered Pages */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-10 text-slate-400 font-bold tracking-widest">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <Link
              key={page}
              href={createPageURL(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm ${
                isActive
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none shadow-md scale-105'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
              }`}
            >
              {toBengaliNumber(page)}
            </Link>
          );
        })}
      </div>

      {/* ➡️ Next Button */}
      {currentPage < lastPage ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 transition-all shadow-sm"
          aria-label="পরবর্তী পেজ"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <button disabled className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

    </div>
  );
}