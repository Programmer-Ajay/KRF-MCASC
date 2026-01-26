import { db } from "@/db";
import { ApiResponse } from "@/types/api-response";
import { success,handleError } from "@/lib/error-and-res/response";
import { competitions } from "@/db/schema";


// 1. Define the Shape
type Stats = {
  totalEvents: number;
  totalRegistrations: number;
  soloRegistrations: number;
  teamRegistrations: number;
};
export async function getEventStats():Promise<ApiResponse<Stats>>{
    // fetech all the events and their participants
  
    try {
        
        const allEvents=await db.query.competitions.findMany({
        with:{
            registrations:true,
        },
    });

    // 2 inialitize  counters
    const stats={
        totalEvents:0,
        totalRegistrations:0,
        soloRegistrations:0,
        teamRegistrations:0,
    }

    stats.totalEvents=allEvents.length;
    
    //3. loop thorugh to calculate registrations types
    for(const comp of allEvents){
        // total countd for this specific registrations
        stats.totalRegistrations+=comp.registrations.length;

        // analyze the each registrations to solo or team
        for(const reg of comp.registrations){
            const type = reg.registrationType;
            if(type==="solo"){
                stats.soloRegistrations++;
            }
            else if(type==="team"){
                stats.teamRegistrations++;
            }
        }
    }
    return  success("Events Stats fetched succussfully",stats);

    } catch (error) {
        console.log("Global stats::",error);
        return handleError <Stats>(error);
    }

   

}