// File: src/components/HeroSearch.tsx
export default function HeroSearch() {
  return (
    <section className="relative bg-white border-b border-slate-100 overflow-hidden pt-12 pb-14">
      {/* হালকা ব্যাকগ্রাউন্ড শেপ (খুবই সূক্ষ্ম) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-slate-50 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* মেইন হেডিং (সাব-টাইটেল বাদ দিয়ে এটিকেই ফোকাস করা হয়েছে) */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-8">
          আপনার স্বপ্নের <span className="text-orange-600">চাকরি</span> খুঁজুন
        </h1>
        
        {/* সার্চ ফর্ম (আরও স্লিম ও স্মার্ট করা হয়েছে) */}
        <form action="/" method="GET" className="bg-white p-1.5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row max-w-2xl mx-auto gap-2">
          <div className="flex-grow flex items-center pl-4">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              name="search"
              placeholder="পদের নাম বা কোম্পানি লিখুন..."
              className="w-full py-2.5 px-3 text-slate-800 bg-transparent border-none focus:ring-0 text-base outline-none placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-6 rounded-lg transition-colors text-base sm:w-auto w-full flex-shrink-0"
          >
            সার্চ
          </button>
        </form>

      </div>
    </section>
  );
}