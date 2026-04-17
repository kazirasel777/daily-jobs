// File: components/CategorySidebar.tsx
'use client'; 

import { useRouter, useSearchParams } from 'next/navigation';

type CategoryProps = {
  categories: any[];
  currentCategory: string;
};

export default function CategorySidebar({ categories, currentCategory }: CategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (value: string) => {
    // বর্তমান সার্চ প্যারামিটার ঠিক রেখে শুধু ক্যাটাগরি আপডেট করা
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('category', value);
    router.push(`/?${current.toString()}`);
  };

  return (
    <aside className="w-full lg:w-72 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 lg:sticky lg:top-24">
      <h3 className="font-bold text-slate-800 text-lg mb-4 pb-3 border-b border-slate-100">
        ক্যাটাগরি সমূহ
      </h3>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => handleCategoryClick('all')}
          className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
            currentCategory === 'all' 
              ? 'bg-orange-50 text-orange-700 border border-orange-200' 
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
          }`}
        >
          অল চাকরি
        </button>

        {categories.map((cat) => {
          const categoryValue = cat.value || cat.id.toString(); 
          const isActive = currentCategory === categoryValue;
          
          return (
            <button 
              key={cat.id}
              onClick={() => handleCategoryClick(categoryValue)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex justify-between items-center ${
                isActive 
                  ? 'bg-orange-50 text-orange-700 border border-orange-200' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <span>{cat.name}</span>
              {cat.jobs_count !== undefined && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${isActive ? 'bg-orange-200 text-orange-800' : 'bg-slate-200 text-slate-500'}`}>
                  {cat.jobs_count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </aside>
  );
}