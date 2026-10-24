'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/lib/utils';

const baseClass =
  'flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs sm:px-3 sm:text-sm';
const activeClass = 'bg-[#1E7B38] font-semibold text-white';
const idleClass = 'text-[#1D271F] hover:bg-base-200';

const CategoryNav = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

 
  const activeSlug = pathname.startsWith('/category/')
    ? pathname.split('/')[2]
    : null;

  return (
    <nav
      aria-label="ক্যাটাগরি"
      className="flex flex-wrap items-center justify-start gap-1 py-2 sm:gap-2"
    >
      {categories.map(cat => {
        const isActive = activeSlug === cat.slug;

        return (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            aria-current={isActive ? 'page' : undefined}
            className={`${baseClass} ${isActive ? activeClass : idleClass}`}
          >
            <span>{cat.icon}</span>
            <span>{cat.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNav;
