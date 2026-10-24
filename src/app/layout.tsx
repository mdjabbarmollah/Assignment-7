import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/component/navbar';
import Header from '@/component/Header';
import PriceTicker from '@/component/PriceTicker';
import Footer from '@/component/footer';
import './globals.css';

const notoserifBengali = Noto_Serif_Bengali({
  variable: '--font-geist-sans',
  subsets: ['latin', 'bengali'],
});

export const metadata: Metadata = {
  title: 'বাজার দর | BazarDor',
  description: 'নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoserifBengali.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-[#F0F5F0]"
        suppressHydrationWarning
      >
        <Navbar />
        <Header />
        <PriceTicker />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
