# 🛒 বাজার দর (BazarDor)

নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে দেখার একটি ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম, বাজারভিত্তিক তুলনা এবং দামের পরিবর্তন দেখা যায়।

🔗 **Live:** https://assignment-7-mu-ebon.vercel.app
📦 **Repo:** https://github.com/mdjabbarmollah/Assignment-7

## ✨ মূল ফিচার

1. **লাইভ প্রাইস টিকার:** অনন্ত স্ক্রলিং স্ট্রিপে পণ্যের নাম, দাম ও ▲/▼ পরিবর্তন
2. **দাম বাড়া/কমার সেকশন:** আজ সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য
3. **ক্যাটাগরি ও সর্টিং:** ক্যাটাগরি অনুযায়ী পণ্য এবং দাম অনুযায়ী সাজানো (বাংলা সংখ্যাসহ)
4. **বাজারভিত্তিক দাম:** প্রতিটি পণ্যের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম, বাজারের তালিকাসহ
5. **ইউজার অথেনটিকেশন:** ইমেইল-পাসওয়ার্ড, Google ও GitHub লগইন, প্রোটেক্টেড রুট এবং প্রোফাইল আপডেট

## 🛠️ ব্যবহৃত প্রযুক্তি

- Next.js (App Router), TypeScript
- Tailwind CSS, DaisyUI
- Better Auth, MongoDB
- react-hot-toast

## 🚀 লোকালে চালানো

```bash
git clone https://github.com/mdjabbarmollah/Assignment-7.git
cd Assignment-7
npm install
npm run dev
```

প্রজেক্টের মূল ফোল্ডারে `.env` ফাইল বানিয়ে এই key-গুলো দিন: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`