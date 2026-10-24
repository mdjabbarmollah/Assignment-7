import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';

import {
  formatBengaliNumber,
  formatChange,
  formatPrice,
  formatUnit,
  getAveragePrice,
  getChangeColorClass,
  getMaxPrice,
  getMinPrice,
  type ProductUnit,
} from '@/lib/utils';

const bnAvg = (n: number) =>
  formatBengaliNumber(n, Number.isInteger(n) ? 0 : 2);

// একক অনুযায়ী "প্রতি কেজি-এর হিসাবে" লেখা
const UNIT_HINT: Record<ProductUnit, string> = {
  kg: 'প্রতি কেজি-এর হিসাবে',
  litre: 'প্রতি লিটার-এর হিসাবে',
  dozen: 'প্রতি ডজন-এর হিসাবে',
  piece: 'প্রতি পিস-এর হিসাবে',
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const markets = product.markets ?? [];
  const hasMarkets = markets.length > 0;

  const min = hasMarkets ? getMinPrice(markets) : product.today;
  const max = hasMarkets ? getMaxPrice(markets) : product.today;
  const avg = hasMarkets ? getAveragePrice(markets) : product.today;

  // সবচেয়ে কম দাম যে বাজারে
  const cheapest = hasMarkets
    ? markets.reduce((a, b) => (a.min <= b.min ? a : b))
    : null;

  // সবচেয়ে বেশি দাম যে বাজারে
  const costliest = hasMarkets
    ? markets.reduce((a, b) => (a.max >= b.max ? a : b))
    : null;

  // গতকালের তুলনা (ফিগমার মতো সামারি লাইন)
  const diff = product.today - product.yesterday;
  const summary =
    diff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatBengaliNumber(diff)} টাকা`
      : diff < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatBengaliNumber(Math.abs(diff))} টাকা`
        : 'গতকালের তুলনায় আজ দাম অপরিবর্তিত';

  // তিনটা কার্ড: লেবেল, মান, নিচের লাইন
  const stats = [
    {
      label: 'সর্বনিম্ন দাম',
      value: formatPrice(min),
      note: cheapest
        ? `সবচেয়ে কম দামের বাজার: ${cheapest.market}`
        : 'সবচেয়ে কম দামের বাজার',
      valueClass: 'text-green-600',
    },
    {
      label: 'সর্বাধিক দাম',
      value: formatPrice(max),
      note: costliest
        ? `সবচেয়ে বেশি দামের বাজার: ${costliest.market}`
        : 'সবচেয়ে বেশি দামের বাজার',
      valueClass: 'text-red-600',
    },
    {
      label: 'গড় দাম',
      value: formatPrice(avg),
      note: UNIT_HINT[product.unit],
      valueClass: 'text-[#1E7B38]',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="breadcrumbs text-sm text-base-content/60">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="font-semibold">{product.nameBn}</li>
        </ul>
      </div>

      <section className="flex flex-col items-center gap-5 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm sm:flex-row">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-base-200 text-5xl">
          {product.image}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-[#1D271F]">
            {product.nameBn}
          </h1>
          <p className="mt-1 text-sm text-base-content/60">
            {formatUnit(product.unit)} · {product.categoryNameBn}
          </p>
          <p className="mt-1 text-sm text-base-content/60">{summary}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <span className="badge badge-outline">
              {product.categoryNameBn}
            </span>
            <span className="badge badge-outline">
              {formatUnit(product.unit)}
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-base-200 bg-base-200/40 px-6 py-4 text-center">
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-[#1E7B38]">
            {formatBengaliNumber(product.today)}
          </p>
          <p className="text-xs">
            টাকা / {formatUnit(product.unit).replace('প্রতি ', '')}
          </p>
          <p
            className={`mt-1 text-sm font-semibold ${getChangeColorClass(product.change.pct)}`}
          >
            {formatChange(product.change.pct)}
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(s => (
            <div
              key={s.label}
              className="rounded-xl border border-base-200 p-4"
            >
              <p className="text-xs text-base-content/60">{s.label}</p>
              <p className={`mt-1 text-xl font-bold ${s.valueClass}`}>
                {s.value}
              </p>
              <p className="mt-1 text-xs text-base-content/60">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-right">সর্বনিম্ন</th>
                <th className="text-right">সর্বাধিক</th>
                <th className="text-right">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr key={`${m.market}-${i}`}>
                  <td className="font-medium">{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{formatPrice(m.min)}</td>
                  <td className="text-right">{formatPrice(m.max)}</td>
                  <td className="text-right font-semibold">
                    {bnAvg((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
