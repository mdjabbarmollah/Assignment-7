const Loading = () => (
  <div className="mx-auto max-w-4xl space-y-6">
  
    <div className="skeleton h-4 w-48" />

   
    <div className="skeleton h-36 w-full rounded-2xl" />

    
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="skeleton h-24 rounded-2xl" />
      <div className="skeleton h-24 rounded-2xl" />
      <div className="skeleton h-24 rounded-2xl" />
    </div>

   
    <div className="skeleton h-72 w-full rounded-2xl" />
  </div>
);

export default Loading;
