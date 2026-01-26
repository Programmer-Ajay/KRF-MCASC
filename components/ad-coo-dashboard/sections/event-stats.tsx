import { getEventStats } from "@/server/services/events-stats";
import StatsCards from "../stats-card";
import { unstable_noStore as noStore } from "next/cache";

const DEFAULT_STATS = {
  totalEvents: 0,
  totalRegistrations: 0,
  soloRegistrations: 0,
  teamRegistrations: 0,
};
export async function StatsSection(){
     noStore()
    const res=await getEventStats();
   const  stats = res.success && res.data? res.data:DEFAULT_STATS
    return <StatsCards stats={stats}/>

}




// import { getCoordinatorEvents } from "@/server/services/coordinator-events";
// import EventGrid from "@/components/admin-dashboard/event-grid";

// export async function EventsSection({ userId }: { userId: string }) {
//   const events = await getCoordinatorEvents(userId);

//   if (events.length === 0) {
//     return (
//       <div className="p-10 border border-white/10 rounded-xl bg-white/5 text-center">
//         <p className="text-gray-400">You haven't been assigned any events yet.</p>
//       </div>
//     );
//   }
  
//   return <EventGrid events={events} />;
// }