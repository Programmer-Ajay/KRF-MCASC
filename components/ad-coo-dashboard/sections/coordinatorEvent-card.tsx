import { getCoordinatorEventCards } from "@/server/services/event-cards";
import EventGrid from "../event-grid";
import { unstable_noStore as noStore } from "next/cache";
export async function EventCardSection({coordinatorId}:{coordinatorId:string}){
    // 1. Force fresh data every time (so new assignments show up instantly)
  noStore();

  // this component pasuse but the rest page keep displaying
  const events=await getCoordinatorEventCards(coordinatorId);
    
  // render the grid once the data arrives
   return < EventGrid events={events} role ="coordinator"/>


}