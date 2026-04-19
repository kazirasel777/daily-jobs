// File: app/job/[slug]/page.tsx
import Link from 'next/link';

// ✅ ডায়নামিক SEO মেটা ট্যাগ জেনারেট করার ফাংশন
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  
  try {
    const res = await fetch(`https://admin.jobsboxbd.com/api/v1/jobs/slug/${slug}`, { next: { revalidate: 3600 } });
    const responseData = await res.json();
    const job = responseData.data?.data || responseData.data;

    if (!job) return { title: 'চাকরি পাওয়া যায়নি | দৈনিক চাকরি' };

    const plainTextDescription = (job.description || job.details || job.body || '')
      .replace(/<[^>]+>/g, '')
      .substring(0, 160) + '...';

    return {
      title: `${job.title} | দৈনিক চাকরি`,
      description: plainTextDescription,
      openGraph: {
        title: job.title,
        description: plainTextDescription,
        images: job.headline_image_url ? [job.headline_image_url] : [],
        type: 'article',
      },
    };
  } catch (error) {
    return { title: 'বিস্তারিত | দৈনিক চাকরি' };
  }
}

// ✅ মূল পেজের কম্পোনেন্ট
export default async function JobDetails({ params }: any) {
  const { slug } = await params;

  let job = null;
  let errorMessage = "";

  try {
    const apiUrl = `https://admin.jobsboxbd.com/api/v1/jobs/slug/${slug}`;
    const res = await fetch(apiUrl, { cache: 'no-store' });

    if (res.ok) {
      const responseData = await res.json();
      job = responseData.data?.data || responseData.data;
    } else {
      errorMessage = "চাকরির বিস্তারিত তথ্য পাওয়া যায়নি!";
    }
  } catch (error) {
    errorMessage = "সার্ভারের সাথে কানেক্ট করা যাচ্ছেবিধা হচ্ছে না।";
  }

  const jobDescription = job?.description || job?.details || job?.body || '';

  const circularImages = [
    job?.circular_image_1_url || job?.circular_image_1,
    job?.circular_image_2_url || job?.circular_image_2,
    job?.circular_image_3_url || job?.circular_image_3,
    job?.circular_image_4_url || job?.circular_image_4,
  ].filter(Boolean); 

  return (
    <main className="min-h-screen bg-slate-50/80 py-8">
      {/* 🔴 ভুলটি এখানেই ছিল: আগের কোডে এই div-টি নিচে section হিসেবে ক্লোজ করা হয়েছিল */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ব্যাক বাটন */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 transition-colors mb-6 font-medium bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          সকল চাকরিতে ফিরে যান
        </Link>

        {errorMessage ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100 font-medium text-lg shadow-sm max-w-2xl mx-auto mt-10">
            {errorMessage}
          </div>
        ) : (
          job && (
            <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
              
              {/* মেইন কন্টেন্ট (বাম পাশ) */}
              <div className="flex-grow lg:w-2/3 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                
                {/* হেডলাইন ইমেজ */}
                {job.headline_image_url && (
                  <div className="w-full bg-slate-50 border-b border-slate-100 p-4 sm:p-6 flex justify-center">
                    <img 
                      src={job.headline_image_url} 
                      alt={job.title} 
                      className="max-h-[300px] w-auto object-contain rounded-xl shadow-sm"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-8 md:p-10">
                  {/* ক্যাটাগরি */}
                  {job.categories && job.categories.length > 0 && (
                    <div className="mb-4">
                      <span className="bg-orange-50 text-orange-600 border border-orange-100 text-xs font-bold px-3 py-1.5 rounded-md">
                        {job.categories[0].name || job.categories[0].value}
                      </span>
                    </div>
                  )}

                  {/* জব টাইটেল */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                    {job.title}
                  </h1>
                  
                  {/* জব মেটা ইনফো */}
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600 mb-8 pb-6 border-b border-slate-100">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      প্রকাশ: {job.circular_date || 'জানা নেই'}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      ভিউ: {(job.app_views_count || 0) + (job.web_views_count || 0)}
                    </span>
                  </div>

                  {/* বিস্তারিত বিবরণ (HTML Render) */}
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-orange-500 pl-3">বিজ্ঞপ্তির বিবরণ</h3>
                    {jobDescription ? (
                      <div 
                        className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-img:rounded-xl prose-img:shadow-sm"
                        dangerouslySetInnerHTML={{ __html: jobDescription }}
                      />
                    ) : (
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-500">
                        বিস্তারিত কোনো লিখিত তথ্য দেওয়া নেই। বিজ্ঞপ্তির ছবিগুলো দেখুন।
                      </div>
                    )}
                  </div>

                  {/* সার্কুলার ইমেজগুলো */}
                  {circularImages.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-slate-800 mb-5 border-l-4 border-orange-500 pl-3">অফিশিয়াল বিজ্ঞপ্তি</h3>
                      <div className="space-y-6">
                        {circularImages.map((imgUrl, index) => (
                          <img 
                            key={index}
                            src={imgUrl as string} 
                            alt={`${job.title} - Circular ${index + 1}`} 
                            className="w-full h-auto rounded-xl border border-slate-200 shadow-sm"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ডান পাশের সাইডবার (Apply Box) */}
              <div className="lg:w-1/3 flex-shrink-0">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-24">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">আবেদন প্রক্রিয়া</h3>
                  
                  {job.circular_link ? (
                    <>
                      <p className="text-sm text-slate-500 mb-5 leading-relaxed">
                        নিচের বাটনে ক্লিক করে সরাসরি অফিশিয়াল ওয়েবসাইটে গিয়ে অনলাইনে আবেদন সম্পন্ন করুন।
                      </p>
                      <a 
                        href={job.circular_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        অনলাইনে আবেদন করুন
                      </a>
                    </>
                  ) : (
                    <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-5 text-center">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 mb-2">অনলাইন আবেদন লিংক নেই</p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        এই চাকরিটিতে অনলাইনে আবেদনের কোনো লিংক দেওয়া নেই। অনুগ্রহ করে বিজ্ঞপ্তির বিস্তারিত বিবরণ বা ছবি পড়ে আবেদনের নিয়মাবলী জেনে নিন।
                      </p>
                    </div>
                  )}

                  {/* শেয়ার বাটন */}
                  <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-400 mb-3 font-medium uppercase tracking-wider">বন্ধুদের সাথে শেয়ার করুন</p>
                    <div className="flex justify-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-green-500 hover:bg-green-50 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )
        )}
      </div> {/* ✅ সঠিকভাবে div ক্লোজ করা হলো */}
    </main>
  );
}