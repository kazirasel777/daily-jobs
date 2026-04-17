// File: app/page.tsx
import HeroSearch from '@/components/HeroSearch';
import CategorySidebar from '@/components/CategorySidebar';
import JobCard from '@/components/JobCard';
import Pagination from '@/components/Pagination'; // নতুন কম্পোনেন্ট ইমপোর্ট করা হলো

export default async function Home({ searchParams }: any) {
  const params = await searchParams;
  const currentCategory = params?.category || 'all';
  const searchQuery = params?.search || '';
  const currentPage = Number(params?.page) || 1; // URL থেকে পেজ নাম্বার নেওয়া, ডিফল্ট ১

  let jobs = [];
  let categories = [];
  let meta = null; // পেজিনেশনের তথ্য রাখার জন্য
  let errorMessage = "";

  try {
    const homeRes = await fetch('https://admin.jobsboxbd.com/api/v1/home', { next: { revalidate: 3600 } });
    if (homeRes.ok) {
      const homeData = await homeRes.json();
      categories = homeData.data?.categories || [];
    }

    // API লিংকে category, search এবং page নাম্বার একসাথে পাঠানো হচ্ছে
    let apiUrl = `https://admin.jobsboxbd.com/api/v1/jobs?category=${currentCategory}&page=${currentPage}`;
    if (searchQuery) {
      apiUrl += `&search=${encodeURIComponent(searchQuery)}`;
    }

    const jobsRes = await fetch(apiUrl, { cache: 'no-store' });
    const contentType = jobsRes.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      const responseData = await jobsRes.json();
      jobs = responseData.data || [];
      meta = responseData.meta || null; // API থেকে meta ডেটা নেওয়া হলো
    } else {
      errorMessage = "API সার্ভার থেকে সঠিক ডেটা আসছে না।";
    }
  } catch (error) {
    errorMessage = "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।";
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSearch />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 text-center border border-red-100 font-medium">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="flex-1 w-full space-y-5">
            {searchQuery && !errorMessage && (
              <div className="mb-4 text-slate-600 font-medium bg-white px-4 py-2 rounded-lg border border-slate-200 inline-block shadow-sm">
                "{searchQuery}" এর জন্য অনুসন্ধান ফলাফল
              </div>
            )}

            {/* জবের লিস্ট */}
            {!errorMessage && jobs.length > 0 ? (
              <>
                {jobs.map((job: any) => (
                  <JobCard key={job.id} job={job} />
                ))}

                {/* পেজিনেশন কম্পোনেন্ট (লিস্টের একদম নিচে) */}
                {meta && (
                  <Pagination currentPage={meta.current_page} lastPage={meta.last_page} />
                )}
              </>
            ) : (
              !errorMessage && (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <p className="text-slate-600 font-medium text-lg">
                    {searchQuery ? `"${searchQuery}" এর জন্য কোনো চাকরি পাওয়া যায়নি।` : "এই ক্যাটাগরিতে আপাতত কোনো চাকরি নেই।"}
                  </p>
                </div>
              )
            )}
          </div>

          <CategorySidebar categories={categories} currentCategory={currentCategory} />

        </div>
      </section>
    </main>
  );
}