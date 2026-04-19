// File: src/components/JobCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface Job {
  id: number | string;
  slug?: string; // ✅ slug যুক্ত করা হয়েছে
  title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary: string;
  deadline: string;
  logo_url?: string | null;
}

// কোম্পানির নামের প্রথম অক্ষর বের করার ফাংশন
const getInitials = (name: string) => {
  if (!name) return 'C'; 
  return name.charAt(0).toUpperCase();
};

// নামের ওপর ভিত্তি করে ডাইনামিক কালার জেনারেট করার ফাংশন
const getDynamicColor = (name: string) => {
  const colors = [
    'bg-gradient-to-br from-orange-400 to-orange-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-emerald-400 to-emerald-600',
    'bg-gradient-to-br from-purple-400 to-purple-600',
    'bg-gradient-to-br from-rose-400 to-rose-600',
  ];
  if (!name) return colors[0];
  const index = name.length % colors.length;
  return colors[index];
};

export default function JobCard({ job }: { job: Job }) {
  const hasValidLogo = job.logo_url && job.logo_url.length > 5;

  return (
    <div className="group bg-white rounded-2xl p-4 md:p-6 border border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 relative overflow-hidden mb-4">
      
      {/* বাম পাশের হোভার ইন্ডিকেটর */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 rounded-l-2xl"></div>

      <div className="flex flex-row gap-4 md:gap-5 items-start">
        
        {/* 🔴 লোগো / হেডলাইন ইমেজ সেকশন (লিংক ঠিক করা হয়েছে) */}
        <Link href={`/job/${job.slug || job.id}`} className="flex-shrink-0 block">
          {hasValidLogo ? (
            <div className="w-24 sm:w-28 md:w-36 aspect-[4/3] rounded-xl border border-slate-100 p-1 flex items-center justify-center bg-slate-50 group-hover:bg-white transition-colors overflow-hidden relative">
              <Image 
                src={job.logo_url as string} 
                alt={job.company_name} 
                fill 
                className="object-contain p-1" 
              />
            </div>
          ) : (
            <div className={`w-24 sm:w-28 md:w-36 aspect-[4/3] rounded-xl flex items-center justify-center text-white font-bold text-3xl md:text-4xl shadow-inner ${getDynamicColor(job.company_name)}`}>
              {getInitials(job.company_name)}
            </div>
          )}
        </Link>

        {/* জবের বিস্তারিত তথ্য */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              {/* 🔴 জব টাইটেল (লিংক ঠিক করা হয়েছে) */}
              <Link href={`/job/${job.slug || job.id}`} className="inline-block">
                <h2 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 md:line-clamp-1">
                  {job.title}
                </h2>
              </Link>
              <p className="text-slate-500 font-medium mt-1 text-sm md:text-base line-clamp-1">
                {job.company_name}
              </p>
            </div>
          </div>

          {/* মেটা ইনফরমেশন */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-sm text-slate-600">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {job.location || 'বাংলাদেশ'}
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {job.job_type || 'Full Time'}
            </div>
          </div>

          {/* ডেডলাইন এবং বাটন */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 w-fit">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              শেষ সময়: {job.deadline || 'শীঘ্রই'}
            </span>

            {/* 🔴 বিস্তারিত দেখুন বাটন (লিংক ঠিক করা হয়েছে) */}
            <Link 
              href={`/job/${job.slug || job.id}`} 
              className="bg-slate-900 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors text-center shadow-sm w-full sm:w-auto"
            >
              বিস্তারিত দেখুন
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}