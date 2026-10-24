'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { signOut, useSession } from '@/lib/auth-client';
import CurrentDate from './date';

const LOGIN_FLAG = 'bazardor-login-pending';

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const welcomed = useRef(false);

  // লগইন সফল হলে একবার টোস্ট দেখানো
  useEffect(() => {
    // session লোড হওয়ার আগে কিছু করবে না
    if (isPending || !session || welcomed.current) return;

    const pending = localStorage.getItem(LOGIN_FLAG);
    if (pending) {
      welcomed.current = true;
      localStorage.removeItem(LOGIN_FLAG);
      toast.success(`স্বাগতম, ${session.user.name}! লগইন সফল হয়েছে।`);
    }
  }, [session, isPending]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('সাইন আউট সফল!');
          router.push('/');
          router.refresh();
        },
      },
    });
  };

  const userName = session?.user?.name ?? '';
  const userEmail = session?.user?.email ?? '';
  const userImage = session?.user?.image;
  const initial = userName.charAt(0).toUpperCase() || '?';

  return (
    <div className="w-full bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          aria-label="হোম পেজে যান"
          className="flex min-w-0 items-center gap-3"
        >
          <div className="overflow-hidden rounded-[12px] bg-[#1E7B38]">
            <Image
              className="h-10 w-10"
              height={50}
              width={50}
              src="/logo-icon.png"
              alt="বাজার দর"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold text-[#1D271F]">বাজার দর</p>
            <CurrentDate />
          </div>
        </Link>

        {isPending ? (
          <div className="skeleton h-10 w-28 rounded-lg" />
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="ইউজার মেনু"
              className="btn btn-ghost h-auto gap-2 px-2 py-1 font-normal normal-case"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1E7B38] text-sm font-bold text-white">
                {userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userImage}
                    alt={userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initial
                )}
              </span>
              <span className="hidden max-w-[8rem] truncate text-sm font-semibold sm:inline">
                {userName}
              </span>
              <span aria-hidden="true" className="text-xs">
                ▾
              </span>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu z-20 mt-3 w-60 rounded-box border border-base-200 bg-base-100 p-2 shadow-lg"
            >
              <li className="pointer-events-none">
                <div className="flex flex-col">
                  <span className="font-semibold">{userName}</span>
                  <span className="text-xs text-base-content/60">
                    {userEmail}
                  </span>
                </div>
              </li>
              <li>
                <Link href="/profile">আমার প্রোফাইল</Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-red-600"
                >
                  সাইন আউট
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/signin"
              className="btn btn-ghost btn-sm font-semibold sm:btn-md"
            >
              সাইন ইন
            </Link>
            <Link
              href="/signup"
              className="btn btn-sm border-none bg-[#1E7B38] text-white hover:bg-[#166a2e] sm:btn-md"
            >
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
