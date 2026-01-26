import { getAdminEventCard } from "@/server/services/event-cards";
import EventGrid from "../event-grid";
import { unstable_noStore as noStore } from "next/cache";

export async function EventCardSection(){
    // 1. Force fresh data every time (so new assignments show up instantly)
  noStore();

  // this component pasuse but the rest page keep displaying
  const res=await getAdminEventCard();
  const events=res.success && res.data? res.data:[];
    
  // render the grid once the data arrives
   return < EventGrid events={events} role ="admin"/>


}