'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type SyntheticEvent } from 'react';
import toast from 'react-hot-toast';
import { authClient, useSession } from '@/lib/auth-client';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();


  const [typedName, setTypedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const name = typedName ?? session?.user?.name ?? '';

  const handleUpdate = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      toast.error('নামের ঘর খালি রাখা যাবে না।');
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });

      if (error) {
        toast.error(error.message || 'প্রোফাইল আপডেট ব্যর্থ হয়েছে!');
        return;
      }

      toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে! 🎉');
      router.push('/profile');
    } catch {
      toast.error('সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <section className="mx-auto max-w-md p-6">
        <div className="skeleton h-32 w-full" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">প্রোফাইল আপডেট করুন</h1>
        <Link href="/profile" className="text-sm text-gray-500 hover:underline">
          ← ফিরে যান
        </Link>
      </div>

      <div className="card border border-base-300 bg-base-100 p-6 shadow-sm">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">
              আপনার নাম
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setTypedName(e.target.value)}
              className="input w-full"
              placeholder="আপনার নাম লিখুন"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn mt-2 w-full border-none bg-[#1E7B38] text-white hover:bg-[#166a2e]"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              'তথ্য আপডেট করুন'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
