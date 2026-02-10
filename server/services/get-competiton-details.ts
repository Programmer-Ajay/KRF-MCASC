
import { db } from "@/db";
import { unstable_cache } from "next/cache";
  export type getEventListType ={
    id:string;
    name: string;
    venue:string;
    coordinatorName:string;
    coordinatorEmail:string;
    coordinatorMobileNo:string | null;
    registrationDeadline: string |null;
    eventDate:string | null;
    eventTime: string |null;
  }

export async function getEventListRaw():Promise<getEventListType[]>{
     const data= await db.query.competitions.findMany({
       orderBy: (competitions, { desc }) => [desc(competitions.createdAt)], 
       columns:{
        id:true,
        venue:true,
        registrationDeadline:true,
        name:true, 
        eventTime:true,
        eventDate:true,
        coordinatorContactNumber:true,
       },
       with:{
        coordinator:{
          columns:{
            name:true,
            email:true,
          }
        }
       }
     });

      const res:getEventListType[]=data.map((m)=>({
          id:m.id,
          name:m.name,
          venue:m.venue?? "TBA",
         registrationDeadline: m.registrationDeadline 
      ? new Date(m.registrationDeadline).toISOString() 
      : null,
         eventDate: m.eventDate 
         ? new Date(m.eventDate).toDateString() 
      : "TBA",
          eventTime:m.eventTime,
          coordinatorName:m.coordinator.name ?? "unknown coordinator",
          coordinatorEmail:m.coordinator.email?? "No email",
          coordinatorMobileNo:m.coordinatorContactNumber ?? "N/A",
      }));

      return res;   
}

//  ---3 cached functions (the performance wrapper)---
export const getEventList = unstable_cache(
  async()=>{
    return await getEventListRaw();
  },
  ["landing-page-events"], // cache key
  {
    revalidate:3600,  // 1 hour
    tags:["events"]    // tag for manual invalidation
  } 
)

