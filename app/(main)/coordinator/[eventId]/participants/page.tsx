import { db } from "@/db";
import { getEventParticipants } from "@/server/services/participants-list";
import { ParticipantsList } from "@/components/ad-coo-dashboard/participants-list";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getExportData } from "@/server/services/export-list";
import ExportButton from "@/components/ad-coo-dashboard/sections/export-button";
import { PublishResultDialog } from "@/components/ad-coo-dashboard/publish-result";  
import { eq } from "drizzle-orm";
import { competitions } from "@/db/schema";
import { PublishCertificateDialog } from "@/components/ad-coo-dashboard/publish-certificate";

export default async function Page({ params }: { params: { eventId: string } }) {
  const { eventId } = await params;

  // fetch the event meta data
  const eventData= await db.query.competitions.findFirst({
    where:eq(competitions.id,eventId),
    columns:{
      type:true,
      isResultDeclacred:true,
      areCertificatesIssued:true,
    }
  });


  // 1. Fetch Data
  const response = await getEventParticipants(eventId);
  const participants = response.success && response.data ? response.data : [];
    //  console.log("participants:",participants)
   
    if(!eventData) return <div>Event  not found</div>


    // prepare a data for dialog
    const isTeamEvent=eventData.type==="team";

    //now map the table data in in simple format
    const candidates=participants.map((p:any)=>({
      // use teamid for team and particpantid for sole
      id:isTeamEvent ?(p.teamId || p.particpantId) : p.participantId,

      // teamName for team and pName for solo
      name:isTeamEvent ?(p.teamName || p.name):p.name,
      leaderName:isTeamEvent? p.name:null,

      // Normalize status string
      status: (p.isPresent || p.status === 'present') ? "present" : "absent",

}))
console.log("candidates:",candidates)
 
// Deduplicate (Safety check: Ensure unique IDs in dropdown)
  // This prevents bugs if the API returns multiple members for the same team
  
  const uniqueCandidates = Array.from(
      new Map(candidates.map((c: any) => [c.id, c])).values()
  ) as any[];
  console.log("unique candidate:",uniqueCandidates)

  // Calculate Stats
  const totalCount = uniqueCandidates.length;
  const presentCount = uniqueCandidates.filter((c: any) => c.status === "present").length;
 
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
       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 w-full">
        
        {/* LEFT: Back Button & Title */}
        <div className="flex items-center gap-4">
          <Link 
            href="/coordinator"
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

        {/* RIGHT: Actions & Stats Group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
           
           {/* 1. Action Buttons Wrapper 
               Mobile: Flex-col + Stretch (Full width buttons)
               Desktop: Flex-row (Standard row) 
           */}
           <div className="flex flex-col sm:flex-row gap-3 items-stretch">
               <ExportButton eventId={eventId} />
               
               <PublishResultDialog 
                  candidates={uniqueCandidates}
                  eventId={eventId}
                  eventType={isTeamEvent ? "team" : "solo"}
                  totalParticipants={totalCount}
                  presentCount={presentCount}
                  isCertificateIssued={eventData.areCertificatesIssued || false}
                  isResultDeclared={eventData.isResultDeclacred || false}
               />

               <PublishCertificateDialog 
                  eventId={eventId}
                  isResultDeclared={eventData.isResultDeclacred || false}
                  areCertificatesIssued={eventData.areCertificatesIssued}
               />
           </div>

           {/* 2. Stat Badge 
               Mobile: Full width container with space-between
               Desktop: Auto width
           */}
           <div className="flex items-center justify-between sm:justify-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold sm:hidden">Total Registrations</p>
              <div className="text-right">
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold hidden sm:block">Total</p>
                 <p className="text-xl font-black bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                   {participants.length.toString().padStart(2, '0')}
                 </p>
              </div>
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
















// import { getEventParticipants } from "@/server/services/participants-list";
// import { ParticipantsList } from "@/components/ad-coo-dashboard/participants-list";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// export default async function Page({ params }: { params: { eventId: string } }) {
//   const { eventId } = await params;

//   // 1. Fetch Data
//   const response = await getEventParticipants(eventId);
//   const participants = response.success && response.data ? response.data : [];

//   return (
//     <div className="min-h-screen p-6 sm:p-10 mt-20 max-w-7xl mx-auto">
      
      

//       {/* 2. Header */}
//       <div className="mb-8 flex items-center gap-4">
//         <Link 
//           href="/coordinator"
//           className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
//         >
//           <ArrowLeft size={20} />
//         </Link>
//         <div>
//           <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">Registrations List</h1>
//           <p className="text-gray-400 text-sm">
//              Total: {participants.length} registrations
//           </p>
//         </div>
//       </div>

//       {/* 3. The List UI */}
//       <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
//          <ParticipantsList data={participants} eventId={eventId} />
//       </div>

//     </div>
//   );
// }
