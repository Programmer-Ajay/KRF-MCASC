
// "use client";

import Link from "next/link";
import { Eye, Users, User, Mail, Phone } from "lucide-react";
import { ParticipantListItem } from "@/server/services/participants-list";

export function ParticipantsList({ 
  data, 
  eventId 
}: { 
  data: ParticipantListItem[], 
  eventId: string 
}) {
  
  // 1. Empty State
  if (data.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
           <Users className="text-gray-600" size={32} />
        </div>
        <p className="text-gray-400 font-medium">No registrations found yet.</p>
      </div>
    );
  }

  const isTeamEvent = data[0].type === "team";

  return (
    <div className="w-full">
      
      {/* --- DESKTOP TABLE VIEW --- */}
      <div className="hidden sm:block rounded-3xl border border-white/10 bg-black/40 overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Header */}
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 align-middle text-left">
                  {isTeamEvent ? "Team Profile" : "Participant"}
                </th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 align-middle text-left">
                  Contact
                </th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 align-middle text-left">
                  College
                </th>
                {isTeamEvent && (
                  <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 align-middle text-center">
                    Members
                  </th>
                )}
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-[0.15em] text-gray-400 align-middle text-right">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-white/5">
              {data.map((row) => (
                <tr 
                  key={row.registrationId} 
                  // ✨ FIXED: Applied gradient directly to TR instead of using a fake TD
                  className="group transition-all duration-300 hover:bg-linear-to-r hover:from-purple-500/10 hover:via-white/2 hover:to-transparent"
                >
                  
                  {/* COL 1: Name */}
                  <td className="px-8 py-5 align-middle">
                    {isTeamEvent ? (
                      <div>
                        <div className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors flex items-center gap-3">
                          <Users size={18} className="text-purple-500" />
                          {row.teamName}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 pl-8 font-medium">
                          Leader: <span className="text-gray-300 group-hover:text-white transition-colors">{row.name}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors flex items-center gap-3">
                        <User size={18} className="text-cyan-500" />
                        {row.name}
                      </div>
                    )}
                  </td>

                  {/* COL 2: Contact */}
                  <td className="px-8 py-5 align-middle">
                    <div className="space-y-1.5">
                       <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Phone size={14} className="text-gray-600 group-hover:text-emerald-400 transition-colors" />
                          {row.mobileNo}
                       </div>
                       <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Mail size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                          {row.email}
                       </div>
                    </div>
                  </td>

                  {/* COL 3: College */}
                  <td className="px-8 py-5 align-middle">
                    <div className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors line-clamp-2 max-w-50">
                      {row.collegeName}
                    </div>
                  </td>

                  {/* COL 4: Members (Team Only) */}
                  {isTeamEvent && (
                    <td className="px-8 py-5 align-middle text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 text-gray-300 group-hover:text-purple-300 transition-all font-bold text-sm">
                         {row.totalMember}
                      </div>
                    </td>
                  )}

                  {/* COL 5: Action */}
                  <td className="px-8 py-5 align-middle text-right">
                     <Link

                      href={`/coordinator/${eventId}/participants/${row.registrationId}/participants-details`}

                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-blue-500/30 to-cyan-500/30 border border-blue-500/50 text-blue-200 hover:from-blue-500/50 hover:to-cyan-500/50 hover:border-blue-400 text-xs font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] active:scale-95"

                    >

                      <Eye size={14} className="group-hover:animate-pulse" />

                      <span>View</span>

                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MOBILE CARD VIEW (Unchanged) --- */}
      {/* --- MOBILE CARD VIEW --- */}
      <div className="sm:hidden space-y-4">
        {data.map((row) => (
          <div
            key={row.registrationId}
            className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl transition-all duration-300 active:scale-[0.98]"
          >
            {/* 1. Background Glow (Subtle) */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 p-5">
              {/* 2. Header Section: Name & Action */}
              <div className="flex justify-between items-start gap-4 mb-5">
                <div className="flex-1 min-w-0">
                  {isTeamEvent ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                          <Users size={16} />
                        </span>
                        <h3 className="font-bold text-white text-lg truncate">
                          {row.teamName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 pl-1">
                        <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
                        <span>Leader:</span>
                        <span className="text-cyan-300 font-medium truncate">{row.name}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                       <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                          <User size={16} />
                        </span>
                        <h3 className="font-bold text-white text-lg truncate">
                          {row.name}
                        </h3>
                    </div>
                  )}
                </div>

                <Link
                  href={`/coordinator/${eventId}/participants/${row.registrationId}/participants-details`}

                  className="shrink-0 p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105 transition-all shadow-lg shadow-black/20"
                >
                  <Eye size={18} />
                </Link>
              </div>

              {/* 3. Data Grid (Mini-Widgets) */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Mobile Widget */}
                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                   <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Mobile</p>
                   <p className="text-sm font-medium text-emerald-300 tracking-wide truncate">
                      {row.mobileNo}
                   </p>
                </div>

                {/* Member Count Widget (Team Only) or Placeholder */}
                {isTeamEvent ? (
                  <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                     <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Team Size</p>
                     <div className="flex items-center gap-1.5">
                        <Users size={12} className="text-purple-400"/>
                        <p className="text-sm font-bold text-purple-200">{row.totalMember} Members</p>
                     </div>
                  </div>
                ) : (
                   // If solo, allow Mobile widget to be wider or add Email? 
                   // Let's add Email for solo to fill space
                   <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                     <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Email</p>
                     <p className="text-sm font-medium text-blue-300 truncate">
                        {row.email.split('@')[0]}...
                     </p>
                  </div>
                )}

                {/* College Widget (Full Width) */}
                <div className="col-span-2 bg-black/20 rounded-xl p-3 border border-white/5">
                   <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">College / Institute</p>
                   <p className="text-sm text-gray-300 line-clamp-1">
                      {row.collegeName}
                   </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}









// "use client";

// import Link from "next/link";
// import { Eye, Users, User, Mail, Phone, Award } from "lucide-react";
// import { ParticipantListItem } from "@/server/services/participants-list";

// export function ParticipantsList({ 
//   data, 
//   eventId 
// }: { 
//   data: ParticipantListItem[], 
//   eventId: string 
// }) {
  
//   // 1. Empty State
//   if (data.length === 0) {
//     return (
//       <div className="py-12 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
//         <p className="text-gray-400 text-sm">No participants found.</p>
//       </div>
//     );
//   }

//   // Detect mode
//   const isTeamEvent = data[0].type === "team";

//   // Desktop Table View
//   return (
//     <div className="w-full">
      
//       {/* Desktop Table - Hidden on Mobile */}
//       <div className="hidden sm:block rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             {/* --- HEADER --- */}
//             <thead>
//               <tr className="border-b border-white/10 bg-white/5 text-xs uppercase text-gray-400 font-medium">
//                 {/* Name Column */}
//                 <th className="px-6 py-4 text-left tracking-wider">
//                   {isTeamEvent ? "Team Details" : "Participant"}
//                 </th>
                
//                 {/* Contact Column */}
//                 <th className="px-6 py-4 text-left tracking-wider">
//                   Contact Info
//                 </th>
                
//                 {/* College Column */}
//                 <th className="px-6 py-4 text-left tracking-wider">
//                   College
//                 </th>
                
//                 {/* Members Column (Team Only) */}
//                 {isTeamEvent && (
//                   <th className="px-6 py-4 text-center tracking-wider">
//                     Members
//                   </th>
//                 )}
                
//                 {/* Action Column */}
//                 <th className="px-6 py-4 text-right tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>

//             {/* --- BODY --- */}
//             <tbody className="divide-y divide-white/5 text-sm">
//               {data.map((row) => (
//                 <tr 
//                   key={row.registrationId} 
//                   className="hover:bg-white/5 transition-colors duration-200"
//                 >
//                   {/* COL 1: Name / Team Name (Aligned Left) */}
//                   <td className="px-6 py-4 align-top">
//                     {isTeamEvent ? (
//                       <div>
//                         <div className="font-bold text-white flex items-center gap-2 mb-1">
//                           <Users size={16} className="text-purple-400" />
//                           <span>{row.teamName}</span>
//                         </div>
//                         <div className="text-xs text-gray-400 flex items-center gap-1">
//                           <span className="text-gray-500">Leader:</span>
//                           <span className="text-gray-300">{row.name}</span>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="font-bold text-white flex items-center gap-2">
//                         <User size={16} className="text-cyan-400" />
//                         <span>{row.name}</span>
//                         {/* Verified Badge */}
                        
//                       </div>
//                     )}
//                   </td>

//                   {/* COL 2: Contact (Aligned Left) */}
//                   <td className="px-6 py-4 align-top">
//                     <div className="space-y-1.5">
//                       <div className="flex items-center gap-2 text-gray-300">
//                         <Phone size={13} className="text-gray-500" />
//                         <span className="text-xs">{row.mobileNo}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-gray-300">
//                         <Mail size={13} className="text-gray-500" />
//                         <span className="text-xs">{row.email}</span>
//                       </div>
//                     </div>
//                   </td>

//                   {/* COL 3: College (Aligned Left) */}
//                   <td className="px-6 py-4 align-top">
//                     <span className="text-xs text-gray-300 line-clamp-2 max-w-50">
//                       {row.collegeName}
//                     </span>
//                   </td>

//                   {/* COL 4: Members (Aligned Center) */}
//                   {isTeamEvent && (
//                     <td className="px-6 py-4 align-middle text-center">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-white">
//                         {row.totalMember}
//                       </span>
//                     </td>
//                   )}

//                   {/* COL 5: Action Button (Aligned Right) */}
//                   <td className="px-6 py-4 align-middle text-right">
//                     <Link
//                       href={`/coordinator/${eventId}/participants/${row.registrationId}`}
//                       className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-400 text-blue-300 hover:text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 transition-all duration-300"
//                     >
//                       <Eye size={14} />
//                       View
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>


//       {/* Mobile Card View (Simple Stack) */}
//       <div className="sm:hidden space-y-3">
//         {data.map((row) => (
//           <div
//             key={row.registrationId}
//             className="rounded-lg border border-white/10 bg-white/5 p-4"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-start mb-3">
//               <div>
//                 {isTeamEvent ? (
//                   <>
//                     <div className="font-bold text-white text-base flex items-center gap-2">
//                       <Users size={16} className="text-purple-400"/>
//                       {row.teamName}
//                     </div>
//                     <div className="text-xs text-gray-400 mt-1">
//                        Leader: <span className="text-gray-200">{row.name}</span>
//                     </div>
//                   </>
//                 ) : (
//                   <div className="font-bold text-white text-base flex items-center gap-2">
//                     <User size={16} className="text-cyan-400"/>
//                     {row.name}
//                   </div>
//                 )}
//               </div>
//               <Link
//                 href={`/coordinator/${eventId}/participants/${row.registrationId}`}
//                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-400 text-blue-300 hover:text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 transition-all duration-300"
//               >
//                 <Eye size={16} />
//               </Link>
//             </div>

//             {/* Details */}
//             <div className="space-y-2 pt-3 border-t border-white/10">
//               <div className="grid grid-cols-2 gap-2 text-xs">
//                 <div className="text-gray-500">Mobile</div>
//                 <div className="text-gray-300 text-right">{row.mobileNo}</div>
                
//                 <div className="text-gray-500">College</div>
//                 <div className="text-gray-300 text-right truncate">{row.collegeName}</div>

//                 {isTeamEvent && (
//                   <>
//                     <div className="text-gray-500">Members</div>
//                     <div className="text-gray-300 text-right">{row.totalMember}</div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }