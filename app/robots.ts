import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.dailyjobs.bd/sitemap.xml', // www যুক্ত করা হয়েছে
  };
}