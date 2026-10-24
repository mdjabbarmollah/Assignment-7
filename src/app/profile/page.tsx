'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signOut, useSession } from '@/lib/auth-client';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const signingOut = useRef(false);

  useEffect(() => {
    if (!isPending && !session && !signingOut.current) {
      router.push('/signin?callbackUrl=/profile');
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    signingOut.current = true;
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('সাইন আউট সফল!');
          router.push('/');
          router.refresh();
        },
        onError: () => {
          signingOut.current = false;
          toast.error('সাইন আউট করা যায়নি।');
        },
      },
    });
  };

  if (isPending) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 p-4">
        <div className="skeleton h-10 w-48" />
        <div className="skeleton h-28 w-full rounded-2xl" />
        <div className="skeleton h-48 w-full rounded-2xl" />
      </section>
    );
  }

  if (!session) return null;

  const { name, email, image } = session.user;
  const initial = name?.charAt(0).toUpperCase() || '?';

  return (
    <section className="mx-auto max-w-2xl space-y-5 p-4">
      <div>
        <h1 className="text-2xl font-bold text-[#1D271F]">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-[#1D271F]/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      
      <div className="flex flex-col gap-4 rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#1E7B38] text-2xl font-bold text-white">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              initial
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-[#1D271F]">
              {name}
            </p>
            <p className="truncate text-sm text-[#1D271F]/70">{email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-sm btn-outline border-red-500 text-red-600 hover:border-red-600 hover:bg-red-50 hover:text-red-600 sm:btn-md"
        >
          ↩ সাইন আউট
        </button>
      </div>

      
      <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-[#1D271F]">তথ্য</h2>

        <div className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-[#1D271F]"
            >
              নাম
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              readOnly
              className="input w-full text-[#1D271F]"
            />
          </div>

          <Link
            href="/profile/update"
            className="btn w-full border-none bg-[#1E7B38] text-white hover:bg-[#166a2e]"
          >
            আপডেট
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
