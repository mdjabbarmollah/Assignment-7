import { Suspense } from 'react';
import { getCategories } from '@/lib/api';
import CategoryNav from '@/component/CategoryNav';

const Header = async () => {
  const categories = await getCategories();

  return (
    <div className="w-full border-b border-base-200 bg-base-100">
      <div className="mx-auto max-w-6xl px-4">
        <Suspense fallback={<div className="h-12" />}>
          <CategoryNav categories={categories} />
        </Suspense>
      </div>
    </div>
  );
};

export default Header;
