const SkeletonCard = () => (
  <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
    <div className="flex items-center gap-3">
      <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-1/3" />
      </div>
    </div>
    <div className="skeleton mt-4 h-3 w-1/4" />
    <div className="skeleton mt-2 h-6 w-1/2" />
  </div>
);

const Loading = () => (
  <div className="space-y-8">
    <p className="text-center text-sm text-base-content/60">লোডিং হচ্ছে...</p>

    <div className="skeleton h-56 w-full rounded-2xl" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export default Loading;
