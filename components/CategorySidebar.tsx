// File: src/components/CategorySidebar.tsx
import Link from 'next/link';

// 🔴 slug এর বদলে value দেওয়া হলো
interface Category {
  id: number;
  name: string;
  value: string; 
}

interface CategorySidebarProps {
  categories: Category[];
  currentCategory: string;
}

export default function CategorySidebar({ categories, currentCategory }: CategorySidebarProps) {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] sticky top-24 border border-slate-100">
        
        <h3 className="font-bold text-slate-800 text-lg mb-5 flex items-center gap-3">
          <span className="bg-orange-50 text-orange-600 p-2 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
          </span>
          ক্যাটাগরি
        </h3>

        <div className="flex flex-col gap-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 custom-scrollbar">
          
          <Link
            href="/"
            className={`group relative flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-200 overflow-hidden ${
              currentCategory === 'all'
                ? 'bg-orange-50/80 text-orange-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
            }`}
          >
            {currentCategory === 'all' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-md"></div>
            )}
            <span className="flex items-center gap-3 relative z-10">সকল চাকরি</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded-md transition-colors relative z-10 ${
              currentCategory === 'all' ? 'bg-orange-100/50 text-orange-700' : 'bg-slate-100 text-slate-500 group-hover:bg-white'
            }`}>All</span>
          </Link>

          {/* 🔴 এখানে cat.slug এর জায়গায় cat.value করা হয়েছে */}
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.value}`} 
              className={`group relative flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all duration-200 overflow-hidden ${
                currentCategory === cat.value
                  ? 'bg-orange-50/80 text-orange-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              {currentCategory === cat.value && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-md"></div>
              )}
              <span className="flex items-center gap-3 relative z-10">{cat.name}</span>
              <svg className={`w-4 h-4 transition-transform duration-200 relative z-10 ${
                currentCategory === cat.value ? 'text-orange-600 translate-x-1' : 'text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}