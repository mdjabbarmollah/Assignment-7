import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-4 text-6xl">🔍</div>
      <p className="mb-2 text-sm font-semibold text-[#1E7B38]">404</p>
      <h1 className="mb-2 text-3xl font-bold text-gray-800">
        পেজটি পাওয়া যায়নি
      </h1>
      <p className="mb-8 max-w-md text-gray-500">
        আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল টাইপ
        করেছেন।
      </p>
      <Link
        href="/"
        className="btn border-none bg-[#1E7B38] px-6 text-white hover:bg-[#166a2e]"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
