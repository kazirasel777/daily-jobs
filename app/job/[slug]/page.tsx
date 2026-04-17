// File: app/job/[slug]/page.tsx
import Link from 'next/link';

export default async function JobDetails({ params }: any) {
  const { slug } = await params;

  let job = null;
  let errorMessage = "";

  try {
    const apiUrl = `https://admin.jobsboxbd.com/api/v1/jobs/slug/${slug}`;
    const res = await fetch(apiUrl, { cache: 'no-store' });

    if (res.ok) {
      const responseData = await res.json();
      // Laravel Resource মাঝে মাঝে ডেটাকে ডাবল 'data' অবজেক্টের ভেতর পাঠায়, তাই এটি সেফটি হিসেবে দেওয়া হলো
      job = responseData.data?.data || responseData.data;
    } else {
      errorMessage = "চাকরির বিস্তারিত তথ্য পাওয়া যায়নি!";
    }
  } catch (error) {
    errorMessage = "সার্ভারের সাথে কানেক্ট করা যাচ্ছে না।";
  }

  // লারাভেল ডাটাবেসে বিস্তারিত লেখার ফিল্ডের নাম যাই হোক না কেন (description বা details), এটি তা ধরে নেবে।
  const jobDescription = job?.description || job?.details || job?.body || '';

  // সার্কুলারের অন্যান্য ছবিগুলো (যদি থাকে)
  const circularImages = [
    job?.circular_image_1_url || job?.circular_image_1,
    job?.circular_image_2_url || job?.circular_image_2,
    job?.circular_image_3_url || job?.circular_image_3,
    job?.circular_image_4_url || job?.circular_image_4,
  ].filter(Boolean); // যেগুলোতে ছবি নেই সেগুলো বাদ দিয়ে দেবে

  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* এখানে থেকে <Header /> সরিয়ে দেওয়া হয়েছে কারণ এটি layout.tsx থেকে অটোমেটিক আসবে */}
      
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 font-semibold mb-6 hover:text-orange-600 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          হোমপেজে ফিরে যান
        </Link>

        {errorMessage ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100 font-medium text-lg shadow-sm">
            {errorMessage}
          </div>
        ) : (
          job && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              
              {/* মেইন ছবি (Headline Image) */}
              {job.headline_image_url && (
                <div className="w-full h-auto bg-slate-100 relative border-b border-slate-100">
                  <img 
                    src={job.headline_image_url} 
                    alt={job.title} 
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              <div className="p-6 sm:p-10">
                {/* ক্যাটাগরি ট্যাগ */}
                {job.categories && job.categories.length > 0 && (
                  <div className="mb-4">
                    <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                      {job.categories[0].name || job.categories[0].value}
                    </span>
                  </div>
                )}

                {/* টাইটেল */}
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-snug">
                  {job.title}
                </h1>
                
                {/* ছোট তথ্যগুলো */}
                <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500 mb-8 pb-8 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    📅 প্রকাশ: {job.circular_date || 'জানা নেই'}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    👁 ভিউ: {(job.app_views_count || 0) + (job.web_views_count || 0)}
                  </span>
                </div>

                {/* জবের টেক্সট ডেসক্রিপশন */}
                {jobDescription ? (
                  <div 
                    className="text-slate-700 leading-relaxed text-lg 
                               [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 
                               [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 
                               [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:text-slate-900
                               [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-3 [&>h2]:text-slate-900
                               [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mb-2 [&>h3]:text-slate-900
                               [&>a]:text-orange-600 [&>a]:underline hover:[&>a]:text-orange-700"
                    dangerouslySetInnerHTML={{ __html: jobDescription }}
                  />
                ) : (
                  <p className="text-slate-500 italic mb-6">বিস্তারিত কোনো লিখিত তথ্য দেওয়া নেই। নিচের সার্কুলার ইমেজগুলো দেখুন।</p>
                )}

                {/* সার্কুলারের অন্যান্য ছবিগুলো (Circular Images) */}
                {circularImages.length > 0 && (
                  <div className="mt-10 space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">অফিশিয়াল সার্কুলার:</h3>
                    {circularImages.map((imgUrl, index) => (
                      <img 
                        key={index}
                        src={imgUrl} 
                        alt={`${job.title} - Circular ${index + 1}`} 
                        className="w-full h-auto rounded-lg border border-slate-200 shadow-sm"
                      />
                    ))}
                  </div>
                )}

                {/* অ্যাপ্লাই লিংক */}
                {job.circular_link && (
                  <div className="mt-12 pt-8 border-t border-slate-100 text-center sm:text-left">
                    <a 
                      href={job.circular_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:opacity-90 transition-all text-lg"
                    >
                      আবেদন করুন / মূল ওয়েবসাইট দেখুন
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
}