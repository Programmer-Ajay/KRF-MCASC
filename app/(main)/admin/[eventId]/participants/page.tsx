
import { getEventParticipants } from "@/server/services/participants-list";
import { ParticipantsList } from "@/components/ad-coo-dashboard/participants-list";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default async function Page({ params }: { params: { eventId: string } }) {
  const { eventId } = await params;

  // 1. Fetch Data
  const response = await getEventParticipants(eventId);
  const participants = response.success && response.data ? response.data : [];

  return (
    <div className="min-h-screen relative pt-24 pb-12 px-4 sm:px-6 bg-black text-white">
      
      {/* --- BACKGROUND FX (Matching Dashboard) --- */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size[24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 2. Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                Registrations
                <Sparkles size={24} className="text-purple-500 animate-pulse hidden sm:block" />
              </h1>
              <p className="text-gray-400 text-sm font-medium mt-1">
                 Manage participants for this event
              </p>
            </div>
          </div>

          {/* Counter Badge */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
             <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Total Count</p>
                <p className="text-2xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {participants.length.toString().padStart(2, '0')}
                </p>
             </div>
          </div>
        </div>

        {/* 3. The List UI */}
        <div className="relative">
           {/* Decorative top border gradient */}
           <div className="absolute -top-px left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent"></div>
           
           <ParticipantsList data={participants} eventId={eventId} />
        </div>

      </div>
    </div>
  );
}