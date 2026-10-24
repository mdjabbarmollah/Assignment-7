

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export type ProductUnit = "kg" | "litre" | "dozen" | "piece";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: ProductUnit;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}



const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];


export const toBengaliNumber = (value: number | string): string =>
  String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);


export const formatBengaliNumber = (value: number, decimals = 0): string => {
  const [intPart, decPart] = value.toFixed(decimals).split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toBengaliNumber(decPart ? `${grouped}.${decPart}` : grouped);
};




export const formatPrice = (price: number): string =>
  `${formatBengaliNumber(price)} টাকা`;

const UNIT_BN: Record<ProductUnit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};


export const formatUnit = (unit: ProductUnit): string =>
  `প্রতি ${UNIT_BN[unit]}`;


export const formatUnitShort = (unit: ProductUnit): string => UNIT_BN[unit];


export const formatChange = (pct: number): string => {
  if (pct > 0) return `▲ ${formatBengaliNumber(pct, 1)}%`;
  if (pct < 0) return `▼ ${formatBengaliNumber(Math.abs(pct), 1)}%`;
  return `—${formatBengaliNumber(0, 1)}%`;
};


export const getChangeColorClass = (pct: number): string => {
  if (pct > 0) return "text-green-600";
  if (pct < 0) return "text-red-600";
  return "text-gray-500";
};


export const getMinPrice = (markets: Market[]): number =>
  Math.min(...markets.map((m) => m.min));


export const getMaxPrice = (markets: Market[]): number =>
  Math.max(...markets.map((m) => m.max));


export const getAveragePrice = (markets: Market[]): number => {
  if (markets.length === 0) return 0;
  const midPoints = markets.map((m) => (m.min + m.max) / 2);
  return Math.round(midPoints.reduce((sum, p) => sum + p, 0) / midPoints.length);
};



export type SortOrder = "default" | "asc" | "desc";


export const sortByPrice = <T extends { today: number }>(
  items: T[],
  order: SortOrder
): T[] => {
  if (order === "default") return items;
  return [...items].sort((a, b) =>
    order === "asc" ? a.today - b.today : b.today - a.today
  );
};