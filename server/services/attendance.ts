import { db } from "@/db";
import { attendance } from "@/db/schema";
import { competitions } from "@/db/schema";
import { eq,sql } from "drizzle-orm";

// type defination for the input
 export type  AttendanceUpdate={
      participantId:string;
      isPresent:boolean;
 };

 export async function MarkAttendanceService (
    eventId:string,
    teamId:string |null,
    updates:AttendanceUpdate[],
    markerId:string // the Id of user performing the action
 ){

    // lock check
    // ensure the event results havent been declared yet

    const event =await db.query.competitions.findFirst({
        where:eq(competitions.id,eventId),
        columns:{
            isResultDeclacred:true
        }
    });
    if(!event){
        throw new Error("Event not Found");
    }

    if(event.isResultDeclacred){
        throw new Error("Action Denied: Results have already been declared.");
    }

    // 2 optimizations: return early if nothing save
    if(updates.length===0) return;
 
   // prepare the data
   const valuesToInsert = updates.map((u)=>({
    competitionId:eventId,
    teamId:teamId,
    participantId:u.participantId,
    isPresent:u.isPresent,
    markedBy:markerId,
    markerAt:new Date(),
   }))

   // excute batch Upsert
   await db
   .insert(attendance)
    .values(valuesToInsert)
    .onConflictDoUpdate({
        // contraint:Unique(competitionId ,particpantId)
        target:[attendance.competitionId,attendance.participantId],
        set:{
            isPresent:sql `excluded.is_present`,
            markedBy:sql`excluded.marked_by`,
            markedAt:sql`excluded.marked_at`
        }
    }); 

return true;

}
