// File: app/category/[slug]/page.tsx
import Link from 'next/link';
import JobCard from '@/components/JobCard';
import Pagination from '@/components/Pagination';

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const categoryName = slug.replace('-', ' ').toUpperCase();
  
  return {
    title: `${categoryName} Jobs | দৈনিক চাকরি`,
    description: `বাংলাদেশের সকল ${categoryName} চাকরির খবর সবার আগে পেতে ভিজিট করুন।`,
  };
}

export default async function CategoryJobs({ params, searchParams }: any) {
  const { slug } = await params; // এই slug-এর ভেতরেই মূলত আপনার 'value' টা আসবে (যেমন: 'govt')
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  let jobs = [];
  let meta = null;
  let errorMessage = "";

  try {
    // 🔴 আপনার API অনুযায়ী সরাসরি slug পাঠানো হচ্ছে
    const res = await fetch(`https://admin.jobsboxbd.com/api/v1/jobs?category=${slug}&page=${currentPage}`, { 
      cache: 'no-store' 
    });
    
    if (res.ok) {
      const responseData = await res.json();
      jobs = responseData.data || [];
      meta = responseData.meta || null;
    } else {
      errorMessage = "এই ক্যাটাগরিতে কোনো চাকরি পাওয়া যায়নি।";
    }
  } catch (error) {
    errorMessage = "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।";
  }

  const displayCategoryName = slug === 'govt' ? 'সরকারি' 
                            : slug === 'private' ? 'বেসরকারি'
                            : slug === 'bank' ? 'ব্যাংক'
                            : slug.replace('-', ' ');

  return (
    <main className="min-h-screen bg-slate-50/80 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-orange-600 hover:underline text-sm font-semibold mb-2 inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              হোমপেজে ফিরে যান
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 capitalize">
              {displayCategoryName} <span className="text-orange-600">চাকরি</span>
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">এই ক্যাটাগরির সর্বশেষ সকল বিজ্ঞপ্তি নিচে দেওয়া হলো</p>
          </div>
          
          <div className="bg-orange-50 px-4 py-2 rounded-xl border border-orange-100 text-center flex-shrink-0">
            <span className="block text-2xl font-black text-orange-600">{meta?.total || 0}</span>
            <span className="text-xs font-semibold text-orange-800">মোট চাকরি</span>
          </div>
        </div>

        {errorMessage ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 font-medium text-lg shadow-sm">
            {errorMessage}
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-0">
            {jobs.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-2xl text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <p className="text-slate-500 text-lg font-medium">বর্তমানে এই ক্যাটাগরিতে কোনো চাকরি নেই।</p>
          </div>
        )}

        {meta && meta.last_page > 1 && (
          <Pagination currentPage={meta.current_page} lastPage={meta.last_page} />
        )}

      </div>
    </main>
  );
}