import { ParticipantsListSkeleton } from "@/components/skeletons/dasboard/participants-list";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen relative pt-24 pb-12 px-4 sm:px-6 bg-black text-white">
      
      {/* Background (Same as Page to prevent flicker) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/10 border border-white/10">
              <ArrowLeft size={20} className="text-gray-600" />
            </div>
            <div>
              <div className="h-8 w-48 sm:w-64 bg-white/20 rounded-lg mb-2" />
              <div className="h-4 w-32 bg-white/10 rounded-lg" />
            </div>
          </div>
          <div className="h-14 w-32 bg-white/5 rounded-2xl border border-white/10" />
        </div>

        {/* The List Skeleton */}
        <div className="relative">
           <ParticipantsListSkeleton />
        </div>

      </div>
    </div>
  );
}