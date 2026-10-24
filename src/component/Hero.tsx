import Image from 'next/image';
import CurrentDate from '@/component/date';

const Hero = () => {
  return (
    <section className="grid items-center gap-6 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm md:grid-cols-2 md:p-10">
      <div>
        <div className="inline-block rounded-full bg-[#DDF3E3] px-3 py-1">
          <CurrentDate className="text-xs font-medium text-[#1E7B38]" />
        </div>

        <h1 className="mt-3 text-3xl font-bold text-[#1D271F] sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-base-content/60">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিশ্লেষণ, বড়, সর্বনিম্ন এবং দামের প্রবণতাসহ।
        </p>

        <a
          href="#সব-পণ্য"
          className="btn mt-5 border-none bg-[#1E7B38] text-white hover:bg-[#166a2e]"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className="flex justify-center">
        <Image
          src="/bazar-hero.png"
          alt="সবজির ঝুড়ি"
          width={320}
          height={320}
          priority
          className="h-auto w-48 sm:w-64 md:w-72"
        />
      </div>
    </section>
  );
};

export default Hero;
