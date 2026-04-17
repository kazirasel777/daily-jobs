// File: components/HeroSearch.tsx
'use client'; 

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL থেকে আগের সার্চ করা শব্দ থাকলে সেটি বক্সে দেখানোর জন্য
  const defaultSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(defaultSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // পেজ রিলোড হওয়া বন্ধ করবে

    // বর্তমান লিংকের অন্যান্য প্যারামিটার (যেমন category) ঠিক রাখার জন্য
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (searchTerm.trim()) {
      current.set('search', searchTerm.trim());
    } else {
      current.delete('search'); // বক্স ফাঁকা থাকলে সার্চ মুছে ফেলবে
    }

    // নতুন লিংকে পাঠিয়ে দেওয়া
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/${query}`);
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 via-slate-50 to-slate-50 py-16 px-4 border-b border-slate-100 text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">
        আপনার স্বপ্নের চাকরি খুঁজুন
      </h1>
      
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white p-2 rounded-full shadow-md border border-slate-200 flex items-center focus-within:ring-2 ring-orange-200 transition-all">
        <div className="pl-4 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="কী ধরনের চাকরি খুঁজছেন (যেমন: ব্যাংক, শিক্ষক)..." 
          className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-slate-700 placeholder-slate-400 w-full"
        />
        <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm cursor-pointer">
          খুঁজুন
        </button>
      </form>
    </section>
  );
}