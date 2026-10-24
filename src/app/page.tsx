import Hero from '@/component/Hero';
import ProductCard from '@/component/ProductCard';
import { getProducts } from '@/lib/api';
import { toBengaliNumber, type Product } from '@/lib/utils';

type SectionProps = {
  id?: string;
  title: string;
  titleColor?: string;
  subtitle?: string;
  products: Product[];
};

const Section = ({
  id,
  title,
  titleColor,
  subtitle,
  products,
}: SectionProps) => (
  <section id={id} className="scroll-mt-4">
    <h2 className={`text-lg font-bold ${titleColor ?? 'text-[#1D271F]'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className="mt-1 text-xs text-base-content/60">{subtitle}</p>
    )}
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
        title="▲ আজ দাম বেড়েছে"
        titleColor="text-red-600"
        products={risers}
      />

      <Section
        title="▼ আজ দাম কমেছে"
        titleColor="text-green-600"
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
