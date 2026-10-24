import Link from 'next/link';
import {
  formatChange,
  formatPrice,
  formatUnit,
  getChangeColorClass,
  type Product,
} from '@/lib/utils';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-base-200 text-xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#1D271F]">
            {product.nameBn}
          </h3>
          <p className="text-xs text-base-content/60">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-base-content/60">আজকের দাম</p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <p className="text-lg font-bold text-[#1D271F]">
          {formatPrice(product.today)}
        </p>
        <span
          className={`rounded-full bg-base-200 px-2 py-0.5 text-xs font-semibold ${getChangeColorClass(
            product.change.pct,
          )}`}
        >
          {formatChange(product.change.pct)}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
