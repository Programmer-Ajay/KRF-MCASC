import { db } from "@/db";
import { competitions, profiles } from "@/db/schema";
import { eq,desc } from "drizzle-orm";


// coordinator query

export async function getCoordinatorEventCards(coordinatorId:string){
//  Check exactly what ID is being passed
//   console.log("DEBUG: Coordinator ID passed to query:", coordinatorId); 
  
//   // If this logs "undefined" or a weird string, that's your bug.
//   if (!coordinatorId) throw new Error("User ID is missing!");

    const data = await db.query.competitions.findMany({
        where:eq(competitions.coordinatorId,coordinatorId),
        orderBy:[desc(competitions.createdAt)],
        with:{
            registrations:true,
        }
    });

    return data.map((comp)=>({
        id:comp.id,
        name:comp.name,
        type:comp.type as "solo" |"team",
        registrationDeadline:comp.registrationDeadline.toISOString(),
        // coordinator doesnt need to see their own name
        totalRegistrations:comp.registrations.length,
        coordinatorName:undefined,
    }));
}

// Admin query 
export async function getAdminEventCard(){
    const data= await db.query.competitions.findMany({
        orderBy:[desc(competitions.createdAt)],
        with:{
            registrations:true,
            coordinator:true,  // fetech the profile
        } 
    })

    return data.map((comp)=>({
        id:comp.id,
        name:comp.name,
        type:comp.type as "solo" |"team",
        registrationDeadline:comp.registrationDeadline.toISOString(),
        // coordinator doesnt need to see their own name
        totalRegistrations:comp.registrations.length,
        coordinatorName:comp.coordinator?.name || "Not Assigned",
    }));
}