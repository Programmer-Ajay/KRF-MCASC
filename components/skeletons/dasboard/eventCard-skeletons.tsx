export function EventCardSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Show 3 fake cards while loading */}
      {[1, 2, 3,4,5,6].map((i) => (
        <div 
          key={i} 
          className="rounded-2xl border border-white/10 bg-white/5 p-6 h-70 space-y-4 relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          
          {/* Title Placeholder */}
          <div className="flex justify-between items-start">
             <div className="h-6 w-3/4 bg-white/10 rounded-md" />
             <div className="h-6 w-16 bg-white/10 rounded-full" />
          </div>

          {/* Stats Big Number */}
          <div className="h-24 w-full bg-white/10 rounded-xl" />

          {/* Footer Lines */}
          <div className="space-y-2 pt-4">
             <div className="h-4 w-1/3 bg-white/10 rounded" />
             <div className="h-4 w-1/2 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}