// File: app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dailyjobs.bd'; // আপনার মূল ডোমেইন

  let jobUrls: MetadataRoute.Sitemap = [];

  try {
    // API থেকে সব জবের লিস্ট নিয়ে আসা
    const res = await fetch('https://admin.jobsboxbd.com/api/v1/jobs', { next: { revalidate: 3600 } });
    
    if (res.ok) {
      const responseData = await res.json();
      const jobs = responseData.data?.data || responseData.data || [];

      // প্রতিটি জবের জন্য একটি করে লিংক তৈরি করা
      jobUrls = jobs.map((job: any) => ({
        url: `${baseUrl}/job/${job.slug}`,
        lastModified: new Date(job.created_at || new Date()),
        changeFrequency: 'daily',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Sitemap error:", error);
  }

  // হোমপেজ এবং জবের লিংকগুলো একসাথে রিটার্ন করা
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    ...jobUrls,
  ];
}