'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';

export default function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useOptimistic(value);

  const handleChange = (next: string) => {
    startTransition(() => {
      setSelected(next);
      router.replace(`${pathname}?sort=${next}`);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium">
        সাজান:
      </label>
      <select
        id="sort"
        value={selected}
        onChange={e => handleChange(e.target.value)}
        className="select select-sm w-auto"
        aria-busy={isPending}
      >
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}
