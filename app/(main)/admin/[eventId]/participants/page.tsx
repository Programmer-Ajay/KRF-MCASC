// import { getEventMeta,getSoloParticipants,getTeamParticipants } from "@/lib/supabase/admin-queries/participants-queries";

// import SoloTable from "@/components/ad-coo-dashboard/solo-table";
// import TeamList from "@/components/ad-coo-dashboard/team-list";


// type Props = {
//   params: { eventId: string };
// };

// export default async function ParticipantsPage({ params }: Props) {
//     const {eventId} = await params;
//   const event = await getEventMeta(eventId);

//   if (!event) {
//     return <p>Event not found</p>;
//   }

//   if (event.mode === "solo") {
//     const participants = await getSoloParticipants(eventId);
//     return (
//       <section className="min-h-screen relative mt-20 px-4 sm:px-6 lg:px-8 overflow-hidden py-8 sm:py-12">
//         {/* Background */}
//         <div className="fixed inset-0 -z-10">
//           <div className="absolute inset-0 bg-black" />
//           <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
//           <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
//           <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
//           <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black" />
//         </div>

//         <div className="max-w-7xl mx-auto relative z-10">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
//               {event.name}
//             </h1>
//             <p className="text-sm sm:text-base text-gray-400">Solo Participants ({participants.length})</p>
//           </div>
//           <SoloTable participants={participants} />
//         </div>
//       </section>
//     );
//   }

//   const teams = await getTeamParticipants(eventId);
//   return (
//     <section className="min-h-screen relative mt-20 px-4 sm:px-6 lg:px-8 overflow-hidden py-8 sm:py-12">
//       {/* Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-black" />
//         <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
//         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
//         <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
//         <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black" />
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
//             {event.name}
//           </h1>
//           <p className="text-sm sm:text-base text-gray-400">Teams ({teams.length})</p>
//         </div>
//         <TeamList teams={teams} />
//       </div>
//     </section>
//   );
// }
