'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  
  useEffect(() => {
    if (!isPending && !session) {
      
      router.push('/signin?callbackUrl=/profile');
    }
  }, [isPending, session, router]);

 
  if (isPending) {
    return (
      <section className="mx-auto max-w-md space-y-4 p-6">
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-40 w-full" />
      </section>
    );
  }

 
  if (!session) return null;

  return (
    <section className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <div className="card mt-6 border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="space-y-3">
          <p>
            <span className="font-semibold">নাম:</span> {session.user.name}
          </p>
          <p>
            <span className="font-semibold">ইমেইল:</span> {session.user.email}
          </p>
        </div>

        
        <div className="mt-6 pt-4 border-t border-base-200">
          <Link
            href="/profile/update"
            className="btn bg-[#1E7B38] hover:bg-[#165a29] text-white btn-sm w-full"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
