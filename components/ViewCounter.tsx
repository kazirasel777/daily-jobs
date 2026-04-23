// File: src/components/ViewCounter.tsx
'use client';

import { useEffect } from 'react';

export default function ViewCounter({ jobId }: { jobId: number | string }) {
  useEffect(() => {
    if (!jobId) return;
    
    // 🔴 লিংকে /view এর বদলে সঠিক রাউট /update-view-count বসানো হলো
    fetch(`https://admin.jobsboxbd.com/api/v1/jobs/${jobId}/update-view-count?type=web`, { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      }
    }).catch((err) => console.error("View count error:", err));
    
  }, [jobId]);

  return null;
}