// File: src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* টপ ফুটার গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* কলাম ১: লোগো এবং পরিচিতি */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              {/* আপনি চাইলে এখানে আপনার লোগোর ছবি (Image) বসাতে পারেন */}
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                <span className="bg-orange-600 text-white p-1.5 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                দৈনিক চাকরি
              </h2>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              বাংলাদেশের সকল সরকারি, বেসরকারি, ব্যাংক এবং এনজিওর সর্বশেষ চাকরির খবর সবার আগে পেতে আমাদের সাথেই থাকুন। আপনার স্বপ্নের ক্যারিয়ার গড়ার বিশ্বস্ত সঙ্গী।
            </p>
          </div>

          {/* কলাম ২: প্রয়োজনীয় লিংক */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 border-b border-slate-700 pb-2 inline-block">প্রয়োজনীয় লিংক</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> হোমপেজ</Link></li>
              <li><Link href="/?category=govt" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> সরকারি চাকরি</Link></li>
              <li><Link href="/?category=private" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> বেসরকারি চাকরি</Link></li>
              <li><Link href="/?category=bank" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> ব্যাংক জবস</Link></li>
            </ul>
          </div>

          {/* কলাম ৩: সাপোর্ট ও পলিসি */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 border-b border-slate-700 pb-2 inline-block">সাপোর্ট ও পলিসি</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> আমাদের সম্পর্কে</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> যোগাযোগ করুন</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> প্রাইভেসি পলিসি</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> শর্তাবলী (Terms)</Link></li>
            </ul>
          </div>

          {/* কলাম ৪: সোশ্যাল মিডিয়া */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 border-b border-slate-700 pb-2 inline-block">আমাদের সাথে যুক্ত থাকুন</h3>
            <p className="text-sm text-slate-400 mb-4">নতুন চাকরির আপডেট মিস না করতে আমাদের ফলো করুন:</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-blue-400 hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* নিচের কপিরাইট অংশ */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>
            &copy; {currentYear} <span className="text-white font-semibold">দৈনিক চাকরি</span>. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="flex items-center gap-1.5">
            উন্নয়নে: <span className="text-orange-500 font-medium">Kazi iT Solution</span>
          </p>
        </div>

      </div>
    </footer>
  );
}