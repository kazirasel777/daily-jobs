// File: src/components/JobCard.tsx
import Link from 'next/link';

export default function JobCard({ job }: { job: any }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-5 group">
      
      {/* জবের ছবি */}
      <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-50">
        {job.headline_image_url ? (
          <img src={job.headline_image_url} alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <span className="text-slate-400 text-sm font-medium">ছবি নেই</span>
        )}
      </div>

      {/* জবের তথ্য */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 leading-snug mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
            {job.title}
          </h2>
          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 mb-4">
            <span className="flex items-center gap-1">📅 প্রকাশ: {job.circular_date}</span>
            <span className="flex items-center gap-1">👁 Views: {job.app_views + job.web_views}</span>
          </div>
        </div>

        {/* বিস্তারিত বাটন */}
        <div className="flex justify-end mt-auto">
          <Link 
            href={`/job/${job.slug}`} 
            className="bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-500 hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-all"
          >
            বিস্তারিত দেখুন
          </Link>
        </div>
      </div>

    </div>
  );
}