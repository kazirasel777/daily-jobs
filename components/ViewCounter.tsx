// File: src/components/ViewCounter.tsx
'use client';

import { useEffect } from 'react';

export default function ViewCounter({ jobId }: { jobId: number | string }) {
  useEffect(() => {
    if (!jobId) return;
    
    // API কে বলে দেওয়া হচ্ছে যে এটি একটি 'web' ভিউ
    fetch(`https://admin.jobsboxbd.com/api/v1/jobs/${jobId}/view?type=web`, { 
      method: 'POST' 
    }).catch((err) => console.error("View count error:", err));
    
  }, [jobId]);

  return null; // এটি স্ক্রিনে কিছু দেখাবে না, শুধু ব্যাকগ্রাউন্ডে কাজ করবে
}