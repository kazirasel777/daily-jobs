import { MetadataRoute } from 'next';

// সাইটম্যাপ সবসময় ডায়নামিক রাখার জন্য
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // www যুক্ত করা হয়েছে
  const baseUrl = 'https://www.dailyjobs.bd';

  let jobUrls: MetadataRoute.Sitemap = [];
  let categoryUrls: MetadataRoute.Sitemap = [];

  try {
    const jobsRes = await fetch('https://admin.jobsboxbd.com/api/v1/jobs?per_page=100', { next: { revalidate: 3600 } });
    if (jobsRes.ok) {
      const responseData = await jobsRes.json();
      const jobs = responseData.data?.data || responseData.data || [];

      jobUrls = jobs.map((job: any) => ({
        url: `${baseUrl}/job/${job.slug || job.id}`,
        lastModified: new Date(job.created_at || new Date()),
        changeFrequency: 'daily',
        priority: 0.8,
      }));
    }

    const homeRes = await fetch('https://admin.jobsboxbd.com/api/v1/home', { next: { revalidate: 86400 } }); 
    if (homeRes.ok) {
      const homeData = await homeRes.json();
      const categories = homeData.data?.categories || [];

      categoryUrls = categories.map((cat: any) => ({
        url: `${baseUrl}/category/${cat.value}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));
    }

  } catch (error) {
    console.error("Sitemap error:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    ...categoryUrls,
    ...jobUrls,
  ];
}