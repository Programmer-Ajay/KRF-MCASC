import { Users } from "lucide-react";

export function ParticipantDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-[#050505] p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        
        {/* --- 1. HEADER SKELETON --- */}
        <div className="relative bg-[#0a0a0a] border border-white/5 rounded-xl p-6 sm:p-8">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-3 w-full md:w-auto">
                 {/* Name Title */}
                 <div className="h-8 sm:h-10 w-48 sm:w-64 bg-white/10 rounded-lg" />
                 {/* ID Badge */}
                 <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/20" />
                    <div className="h-4 w-32 bg-white/5 rounded" />
                 </div>
              </div>

              {/* Event Badge Box */}
              <div className="bg-white/2 px-6 py-3 rounded-xl border border-white/5 w-full md:w-48">
                 <div className="h-3 w-12 bg-white/10 rounded mb-2" />
                 <div className="h-5 w-32 bg-white/10 rounded" />
              </div>
           </div>
        </div>

        {/* --- 2. INFO CARDS GRID SKELETON --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Contact */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-75">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="h-8 w-8 rounded-xl bg-purple-500/10" />
                <div className="h-4 w-32 bg-white/10 rounded" />
             </div>
             <div className="space-y-5">
                <div className="space-y-2">
                   <div className="h-3 w-16 bg-white/5 rounded" />
                   <div className="h-5 w-3/4 bg-white/10 rounded" />
                </div>
                <div className="space-y-3">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 w-full bg-white/2 rounded-xl border border-white/5" />
                   ))}
                </div>
             </div>
          </div>

          {/* Card 2: Academic */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-75">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="h-8 w-8 rounded-xl bg-cyan-500/10" />
                <div className="h-4 w-32 bg-white/10 rounded" />
             </div>
             <div className="space-y-5">
                <div className="space-y-2">
                   <div className="h-3 w-20 bg-white/5 rounded" />
                   <div className="h-5 w-full bg-white/10 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div className="h-16 w-full bg-white/2 rounded-xl border border-white/5" />
                   <div className="h-16 w-full bg-white/2 rounded-xl border border-white/5" />
                </div>
             </div>
          </div>

          {/* Card 3: Submission */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 h-3">
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="h-8 w-8 rounded-xl bg-pink-500/10" />
                <div className="h-4 w-24 bg-white/10 rounded" />
             </div>
             <div className="space-y-4">
                <div className="h-4 w-1/3 bg-white/5 rounded" />
                <div className="h-24 w-full bg-white/2 rounded-xl border border-white/5" />
                <div className="h-8 w-full bg-white/2 rounded-lg" />
             </div>
          </div>

        </div>


      {/* Attendance skeleton--- */}

      <div className="border border-white/10 rounded-xl p-5 sm:p-6 bg-[#0a0a0a]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Icon Placeholder */}
          <div className="w-9 h-9 rounded-lg bg-white/5 animate-pulse" />
          
          {/* Title & Subtitle Placeholders */}
          <div className="space-y-2">
            <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-48 bg-white/5 rounded animate-pulse" />
          </div>
        </div>

        {/* Save Button Placeholder */}
        <div className="h-9 w-32 bg-white/5 rounded animate-pulse" />
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Render 4 dummy items to simulate a team */}
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/2"
          >
            <div className="flex items-center gap-3">
              {/* Avatar Placeholder */}
              <div className="w-8 h-8 rounded-lg bg-white/10 animate-pulse" />
              {/* Name Placeholder */}
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
            </div>

            {/* Checkbox Placeholder */}
            <div className="w-5 h-5 rounded bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>
    </div>

        {/* --- 3. TEAM LIST SKELETON --- */}
        <div className="space-y-6 pt-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-white/5 rounded-lg">
                    <Users size={20} className="text-white/20" />
                 </div>
                 <div className="h-6 w-32 bg-white/10 rounded" />
              </div>
              <div className="h-6 w-20 bg-white/5 rounded-full" />
           </div>

           {/* Table/Card Rows */}
           <div className="rounded-xl border border-white/5 bg-[#0a0a0a] overflow-hidden">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center gap-4 p-4 border-b border-white/5 last:border-0">
                    <div className="h-10 w-10 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                       <div className="h-4 w-32 bg-white/10 rounded" />
                       <div className="h-3 w-20 bg-white/5 rounded" />
                    </div>
                    <div className="hidden sm:block h-4 w-24 bg-white/5 rounded" />
                    <div className="hidden sm:block h-4 w-32 bg-white/5 rounded" />
                    <div className="h-6 w-16 bg-white/10 rounded-full" />
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}