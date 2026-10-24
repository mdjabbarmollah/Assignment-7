import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/component/ProductCard';
import SortSelect from '@/component/SortSelect';
import { getCategories, getProductsByCategory } from '@/lib/api';
import { sortByPrice, toBengaliNumber, type SortOrder } from '@/lib/utils';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

const VALID_SORTS: SortOrder[] = ['default', 'asc', 'desc'];

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { sort = 'default' } = await searchParams;

  const safeSort: SortOrder = VALID_SORTS.includes(sort as SortOrder)
    ? (sort as SortOrder)
    : 'default';

  // ক্যাটাগরির তালিকা আর এই ক্যাটাগরির পণ্য একসাথে আনা
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  // ক্যাটাগরির তালিকা থেকে এই slug খোঁজা
  const category = categories.find(c => c.slug === slug);

  // ক্যাটাগরির তালিকায় না থাকলে এবং পণ্যও না থাকলে 404
  if (!category && products.length === 0) notFound();

  // শিরোনাম ও আইকন: তালিকায় থাকলে সেটা, না থাকলে পণ্য থেকে
  const title = category?.nameBn ?? products[0]?.categoryNameBn ?? slug;
  const icon = category?.icon ?? products[0]?.categoryIcon ?? '';

  const sortedProducts = sortByPrice(products, safeSort);

  return (
    <div className="space-y-6">
      <div className="breadcrumbs text-sm text-base-content/60">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li className="font-semibold">{title}</li>
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1D271F]">
            {icon} {title}
          </h1>
          <p className="mt-1 text-sm text-base-content/60">
            মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য পাওয়া গেছে
          </p>
        </div>
        <SortSelect value={safeSort} />
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-base-200 bg-base-100 py-16 text-center shadow-sm">
          <div className="mb-3 text-5xl">🔍</div>
          <p className="mb-4 text-base-content/60">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="btn btn-sm border-none bg-[#1E7B38] text-white hover:bg-[#166a2e]"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
}
