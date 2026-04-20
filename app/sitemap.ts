// File: app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dailyjobs.bd'; // আপনার মূল ডোমেইন

  let jobUrls: MetadataRoute.Sitemap = [];

  try {
    // 🔴 per_page=100 যুক্ত করা হয়েছে যাতে একসাথে ১০০টি জব সাইটম্যাপে চলে আসে
    const res = await fetch('https://admin.jobsboxbd.com/api/v1/jobs?per_page=100', { next: { revalidate: 3600 } });
    
    if (res.ok) {
      const responseData = await res.json();
      const jobs = responseData.data?.data || responseData.data || [];

      // প্রতিটি জবের জন্য একটি করে লিংক তৈরি করা
      jobUrls = jobs.map((job: any) => ({
        url: `${baseUrl}/job/${job.slug || job.id}`, // 🔴 slug না থাকলে id ফলব্যাক
        lastModified: new Date(job.created_at || new Date()),
        changeFrequency: 'daily',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Sitemap error:", error);
  }

  // 🔴 গুরুত্বপূর্ণ ক্যাটাগরি পেজগুলো ম্যানুয়ালি যুক্ত করা হলো
  const categoryUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/category/govt`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/category/private`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/category/bank`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/category/ngo`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  // হোমপেজ, ক্যাটাগরি এবং জবের লিংকগুলো একসাথে রিটার্ন করা
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