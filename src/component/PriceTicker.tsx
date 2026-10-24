import { getProducts } from '@/lib/api';
import {
  formatBengaliNumber,
  formatChange,
  formatUnitShort,
  getChangeColorClass,
} from '@/lib/utils';

const PriceTicker = async () => {
  const products = await getProducts();

  if (products.length === 0) return null;

  
  const items = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-b border-base-200 bg-base-100">
      <div className="ticker-track py-2 text-xs sm:text-sm">
        {items.map((p, index) => (
          <div
            key={`${p.id}-${index}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>
              {formatBengaliNumber(p.today)} টাকা/{formatUnitShort(p.unit)}
            </span>
            <span
              className={`font-semibold ${getChangeColorClass(p.change.pct)}`}
            >
              {formatChange(p.change.pct)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
