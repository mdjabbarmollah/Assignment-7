const Loading = () => (
  <div className="space-y-6">
    <p className="text-center text-sm text-base-content/60">লোডিং হচ্ছে...</p>

    <div className="skeleton h-24 w-full rounded-2xl" />

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton h-28 rounded-2xl" />
      ))}
    </div>
  </div>
);

export default Loading;
