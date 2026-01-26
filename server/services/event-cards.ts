import { db } from "@/db";
import { competitions, profiles } from "@/db/schema";
import { eq,desc } from "drizzle-orm";
import { ApiResponse } from "@/types/api-response";
import { handleError,success,failure } from "@/lib/error-and-res/response";
import { resourceUsage } from "process";

// coordinator query


  type EventCardData = {
  id: string;
  name: string;
  type: "solo" | "team";
  registrationDeadline: string;
  totalRegistrations: number;
  coordinatorName?:string // optional only for the admin
};

export async function getCoordinatorEventCards(coordinatorId:string):Promise<ApiResponse<EventCardData[]>> {

//  Check exactly what ID is being passed
//   console.log("DEBUG: Coordinator ID passed to query:", coordinatorId); 
  
//   // If this logs "undefined" or a weird string, that's your bug.
//   if (!coordinatorId) throw new Error("User ID is missing!");
      
try{


     if(!coordinatorId){
        return failure("Coordinator ID is missing");
     }

    const data = await db.query.competitions.findMany({
        where:eq(competitions.coordinatorId,coordinatorId),
        orderBy:[desc(competitions.createdAt)],
        with:{
            registrations:true,
        }
    });

         const formatedData:EventCardData[]=data.map((comp)=>({
        id:comp.id,
        name:comp.name,
        type:comp.type as "solo" |"team",
        registrationDeadline:comp.registrationDeadline.toISOString(),
        // coordinator doesnt need to see their own name
        totalRegistrations:comp.registrations.length,
        coordinatorName:undefined,
    }));

    return success ("coordinator event card is fetch",formatedData);

}  catch(error){
    return handleError<EventCardData[]>(error);
}

}


// Admin query 
export async function getAdminEventCard():Promise<ApiResponse<EventCardData[]>>{

    try{
    const data= await db.query.competitions.findMany({
        orderBy:[desc(competitions.createdAt)],
        with:{
            registrations:true,
            coordinator:true,  // fetech the profile
        } 
    })

      const formatedData:EventCardData[]=data.map((comp)=>({
        id:comp.id,
        name:comp.name,
        type:comp.type as "solo" |"team",
        registrationDeadline:comp.registrationDeadline.toISOString(),
        // coordinator doesnt need to see their own name
        totalRegistrations:comp.registrations.length,
        coordinatorName:comp.coordinator?.name || "Not Assigned",
    }));

    return success("Admin Event card fetched successfully",formatedData)

}catch(error){
   return  handleError<EventCardData[]>(error)
}

}