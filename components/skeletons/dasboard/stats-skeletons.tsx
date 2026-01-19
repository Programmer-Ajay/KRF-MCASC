export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex justify-between items-start">
            <div className="h-8 w-8 bg-white/10 rounded-full animate-pulse" />
            <div className="h-4 w-12 bg-white/5 rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-8 w-16 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-4 w-24 bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="h-48 w-full bg-white/10 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}