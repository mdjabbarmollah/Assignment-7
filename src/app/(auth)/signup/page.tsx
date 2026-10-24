'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type SyntheticEvent } from 'react';
import toast from 'react-hot-toast';
import { signIn, signUp } from '@/lib/auth-client';

const LOGIN_FLAG = 'bazardor-login-pending';

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    if (!name) {
      toast.error('নাম লিখুন।');
      return;
    }
    if (password.length < 8) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড দুটো মেলেনি!');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signUp.email({ name, email, password });

      if (error) {
        toast.error(error.message || 'রেজিস্ট্রেশন ব্যর্থ!');
        return;
      }

      toast.success('রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন।');
      router.push('/signin');
    } catch {
      toast.error('সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    try {
      // সোশ্যাল সাইন আপ থেকে ফিরে এসে হোমে টোস্ট দেখানোর চিহ্ন
      localStorage.setItem(LOGIN_FLAG, provider);

      const { error } = await signIn.social({ provider, callbackURL: '/' });

      if (error) {
        localStorage.removeItem(LOGIN_FLAG);
        toast.error(error.message || 'সামাজিক লগইন ব্যর্থ!');
      }
    } catch {
      localStorage.removeItem(LOGIN_FLAG);
      toast.error('সামাজিক লগইন শুরু করা যায়নি।');
    }
  };

  return (
    <section className="px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-md text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-base-content/60">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <div className="card mt-8 border border-base-300 bg-base-100 text-left shadow-sm">
          <form className="card-body gap-4 p-6" onSubmit={handleSubmit}>
            <fieldset className="fieldset w-full p-0">
              <label className="label">নাম</label>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="যেমন: রহিম উদ্দিন"
                required
              />

              <label className="label">ইমেইল</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="you@example.com"
                required
              />

              <label className="label">পাসওয়ার্ড</label>
              <input
                type="password"
                name="password"
                className="input w-full"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                required
              />

              <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                type="password"
                name="confirmPassword"
                className="input w-full"
                placeholder="আবার লিখুন"
                minLength={8}
                required
              />
            </fieldset>

            <button
              type="submit"
              disabled={isLoading}
              className="btn mt-2 w-full border-none bg-[#1E7B38] text-white hover:bg-[#166a2e]"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'অ্যাকাউন্ট তৈরি করুন'
              )}
            </button>

            <div className="divider my-0 text-xs text-base-content/50">
              অথবা
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialSignUp('google')}
                className="btn btn-outline font-normal"
              >
                <GoogleIcon />
                <span className="text-xs sm:text-sm">
                  Google দিয়ে চালিয়ে যান
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialSignUp('github')}
                className="btn btn-outline font-normal"
              >
                <GithubIcon />
                <span className="text-xs sm:text-sm">
                  GitHub দিয়ে চালিয়ে যান
                </span>
              </button>
            </div>

            <p className="text-center text-sm">
              অ্যাকাউন্ট আছে?{' '}
              <Link
                href="/signin"
                className="font-medium text-[#1E7B38] hover:underline"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </form>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block text-xs text-base-content/50 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
};

export default SignupPage;
