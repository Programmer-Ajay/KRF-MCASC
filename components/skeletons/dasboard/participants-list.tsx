import { Users, User, Mail, Phone } from "lucide-react";

export function ParticipantsListSkeleton() {
  return (
    <div className="w-full animate-pulse">
      
      {/* Desktop Table Skeleton */}
      <div className="hidden sm:block rounded-3xl border border-white/10 bg-black/40 overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Header */}
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <th key={i} className="px-8 py-6">
                    <div className="h-3 w-24 bg-white/10 rounded-full" />
                  </th>
                ))}
              </tr>
            </thead>
            {/* Body */}
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5,6,7].map((row) => (
                <tr key={row} className="bg-transparent">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-white/20 rounded-full" />
                        <div className="h-3 w-20 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-white/10 rounded-full" />
                      <div className="h-3 w-32 bg-white/10 rounded-full" />
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="h-3 w-40 bg-white/10 rounded-full" />
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="h-8 w-8 mx-auto bg-white/10 rounded-lg" />
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="h-8 w-20 ml-auto bg-white/10 rounded-xl" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="sm:hidden space-y-4">
        {[1, 2, 3,4].map((i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-white/10" />
                 <div className="h-5 w-32 bg-white/20 rounded-full" />
              </div>
              <div className="w-8 h-8 rounded-xl bg-white/10" />
            </div>
            <div className="h-px w-full bg-white/10 my-4" />
            <div className="grid grid-cols-2 gap-3">
               <div className="h-10 bg-white/5 rounded-xl border border-white/5" />
               <div className="h-10 bg-white/5 rounded-xl border border-white/5" />
               <div className="col-span-2 h-10 bg-white/5 rounded-xl border border-white/5" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}