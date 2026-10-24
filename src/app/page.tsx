import Hero from '@/component/Hero';
import ProductCard from '@/component/ProductCard';
import { getProducts } from '@/lib/api';
import { toBengaliNumber, type Product } from '@/lib/utils';

type SectionProps = {
  id?: string;
  title: string;
  icon?: string;
  iconColor?: string;
  subtitle?: string;
  products: Product[];
};

const Section = ({
  id,
  title,
  icon,
  iconColor,
  subtitle,
  products,
}: SectionProps) => (
  <section id={id} className="scroll-mt-4">
    <h2 className="flex items-center gap-2 text-xl font-bold text-[#1D271F]">
      {icon && <span className={`text-sm ${iconColor ?? ''}`}>{icon}</span>}
      {title}
    </h2>
    {subtitle && <p className="mt-1 text-xs text-[#1D271F]/70">{subtitle}</p>}
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

const HomePage = async () => {
  const products = await getProducts();

  const risers = products
    .filter(p => p.change.pct > 0)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter(p => p.change.pct < 0)
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <Hero />

      <Section
        icon="▲"
        iconColor="text-red-600"
        title="আজ দাম বেড়েছে"
        products={risers}
      />

      <Section
        icon="▼"
        iconColor="text-green-600"
        title="আজ দাম কমেছে"
        products={fallers}
      />

      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </div>
  );
};

export default HomePage;
