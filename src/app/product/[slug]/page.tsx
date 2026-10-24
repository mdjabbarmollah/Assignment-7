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

  const diff = product.today - product.yesterday;
  const summary =
    diff === 0 ? (
      <>
        গতকালের তুলনায় আজ দাম{' '}
        <strong className="text-[#1D271F]">অপরিবর্তিত</strong>
      </>
    ) : (
      <>
        গতকালের তুলনায় আজ দাম{' '}
        <strong className="text-[#1D271F]">
          {diff > 0 ? 'বেড়েছে' : 'কমেছে'}
        </strong>{' '}
        · {formatBengaliNumber(Math.abs(diff))} টাকা
      </>
    );

  const stats = [
    {
      label: 'সর্বনিম্ন দাম',
      value: formatBengaliNumber(min),
      note: 'সবচেয়ে কম দামের বাজার',
      valueClass: 'text-green-600',
    },
    {
      label: 'সর্বাধিক দাম',
      value: formatBengaliNumber(max),
      note: 'সবচেয়ে বেশি দামের বাজার',
      valueClass: 'text-red-600',
    },
    {
      label: 'গড় দাম',
      value: formatBengaliNumber(avg),
      note: UNIT_HINT[product.unit],
      valueClass: 'text-green-600',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="breadcrumbs text-sm text-[#1D271F]/70">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li>{product.nameBn}</li>
        </ul>
      </div>

      <section className="flex flex-col items-center gap-5 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm sm:flex-row">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-base-200 text-4xl">
          {product.image}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-bold text-[#1D271F]">
            {product.nameBn}
          </h1>
          <p className="mt-1 text-sm text-[#1D271F]/70">
            {formatUnit(product.unit)} · {product.categoryNameBn}
          </p>
          <p className="mt-1 text-sm text-[#1D271F]/70">{summary}</p>
        </div>

        <div className="min-w-36 rounded-xl bg-base-200/70 px-6 py-4 text-center">
          <p className="text-xs text-[#1D271F]/70">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-[#1D271F]">
            {formatBengaliNumber(product.today)}
          </p>
          <p className="text-xs text-[#1D271F]/70">
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
        <h2 className="mb-4 text-lg font-bold text-[#1D271F]">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(s => (
            <div
              key={s.label}
              className="rounded-xl border border-base-200 p-4"
            >
              <p className="text-xs text-[#1D271F]/70">{s.label}</p>
              <p className={`mt-1 text-xl font-bold ${s.valueClass}`}>
                {s.value} <span className="text-xs font-semibold">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-[#1D271F]/70">{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-[#1D271F]">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-xl border border-base-200 bg-white">
          <table className="w-full min-w-[640px] border-collapse text-sm text-[#1D271F]">
            <thead>
              <tr className="bg-white text-xs text-[#1D271F]/70">
                <th className="px-4 py-3 text-left font-medium">বাজার</th>
                <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, i) => (
                <tr
                  key={`${m.market}-${i}`}
                  className={i % 2 === 1 ? 'bg-[#F0F5F0]' : 'bg-white'}
                >
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3">{m.division}</td>
                  <td className="px-4 py-3 text-right">{formatPrice(m.min)}</td>
                  <td className="px-4 py-3 text-right">{formatPrice(m.max)}</td>
                  <td className="px-4 py-3 text-right font-semibold">
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
