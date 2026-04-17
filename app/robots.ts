// File: app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://dailyjobs.bd/sitemap.xml', // আপনার ডোমেইনের নাম
  };
}