
import { db} from "@/db";
import { competitions, registrations } from "@/db/schema";
import { eq,desc } from "drizzle-orm";
 import { success, handleError, failure } from "@/lib/error-and-res/response";
 import { ApiResponse } from "@/types/api-response";
import { isPgEnum } from "drizzle-orm/pg-core";

// type of respone list
export type ParticipantListItem={
    registrationId:string,
    type:"solo"|"team",
    participantId:string | null;
    teamId:string | null;
    name:string,
    email:string,
    mobileNo:string,
    collegeName:string,
    teamName:string |null,
    totalMember:number,
    isPresent:boolean; 
};


export async function getEventParticipants(eventId:string):Promise<ApiResponse<ParticipantListItem[]>> {
    
    try{

     if(!eventId){
        return failure("Event id is missing");
     }
     const data= await db.query.registrations.findMany({
        where:eq(registrations.competitionId,eventId),
        orderBy:[desc(registrations.registeredAt)],
        with:{
            // solo get the solo participant
            participant:{
                with:{
                    attendances:{
                      where:(att,{eq})=> eq(att.competitionId,eventId),
                      limit:1,
                    }
                }
            },
            // 2. TEAM: Get Team -> Members -> Participant
            team:{
                // We need members to 1--> Count them, and 2--> Find the leader's participant row
              with:{
                members:{
                    with:{
                        participant:{
                            with:{
                                attendances:{
                                    where:(att,{eq})=>eq(att.competitionId,eventId),
                                    limit:1
                                }
                            }
                        }
                    }
                }
              }     
            }
        }

     });

     const list:ParticipantListItem[]=data.map((reg)=>{
        const isTeam=reg.registrationType==="team";
        
        let source:any=null;
        let isPresent=false;

        if(isTeam && reg.team){

            // team logic 
            // 1--> get th e the leader profileId 
            const leaderProfileId= reg.team?.leaderProfileId;

            // 2--> find the leader profile among the team membersi of that team
              // We look for the member whose participant.profileId matches the leaderProfileId
              const leaderMember= reg.team.members.find((m)=>m.participant.profileId===leaderProfileId);

              // 3--> use that member as a source
                     // If for some reason leader isn't in members list, fallback to first member or null
              source=leaderMember?.participant || reg.team.members[0].participant;

              // calculate attendance (if any member is present then the team is present)
              // we chack the every member attendance array
              isPresent=reg?.team?.members.some((m)=>
              m.participant.attendances && 
              m.participant.attendances.length>0  &&
              m.participant.attendances[0].isPresent
            );

        }else{
            // solo logic
            source=reg.participant;

            if(reg?.participant?.attendances && reg.participant.attendances.length> 0){
                isPresent=reg.participant.attendances[0].isPresent;
            }
            
        }

        return {
            registrationId:reg.id,
            type:reg.registrationType as "solo" || "team",
            name:source?.fullName || "Unknown",
            email:source?.email || "N/A",
            mobileNo:source?.mobileNo || "N//A",
            collegeName:source.collegeName || "N/A",
            teamName:reg?.team?.teamName ||"N/A",
            teamId:reg?.team?.id || null,
            participantId:source?.id || null,
            totalMember: isTeam? (reg?.team?.members?.length || 0):0,
            isPresent:isPresent,
        }
     })
  return  success("participants fetched successfully",list);

    }catch(error){
        console.log("Participants list error:",error);
        return handleError <ParticipantListItem[]>(error);
    }
}




// import { db } from "@/db";
// import { registrations } from "@/db/schema";
// import { eq, desc } from "drizzle-orm";
// import { success, handleError, failure } from "@/lib/error-and-res/response";
// import { ApiResponse } from "@/types/api-response";

// export type ParticipantListItem = {
//   registrationId: string;
//   type: "solo" | "team";
  
//   // Normalized Contact Info (From 'participants' table)
//   name: string;
//   email: string;
//   mobile: string;
//   college: string;
  
//   status: string;
//   teamName: string | null;
//   memberCount: number;
// };
// export async function getEventParticipants(
//   eventId: string
// ): Promise<ApiResponse<ParticipantListItem[]>> {
//   try {
//     if (!eventId) return failure("Event ID is required");

//     const data = await db.query.registrations.findMany({
//       where: eq(registrations.competitionId, eventId),
//       orderBy: [desc(registrations.registeredAt)],
//       with: {
//         // ✅ 1. SOLO: Get Participant details directly
//         participant: true, 
        
//         // ✅ 2. TEAM: Get Team -> Members -> Participant
//         team: {
//             with: {
//                 // We need members to (A) Count them, and (B) Find the leader's participant row
//                 members: {
//                     with: {
//                         participant: true 
//                     }
//                 }
//             }
//         }, 
//       },
//     });

//     const list: ParticipantListItem[] = data.map((reg) => {
//       const isTeam = reg.registrationType === "team";
//       let source: any = null;

//       if (isTeam && reg.team) {
//         // 🔍 TEAM LOGIC:
//         // 1. Get the Leader's Profile ID from the Team table
//         const leaderProfileId = reg.team.leaderProfileId;

//         // 2. Find the Leader inside the 'members' list
//         // We look for the member whose participant.profileId matches the leaderProfileId
//         const leaderMember = reg.team.members.find(
//             (m) => m.participant.profileId === leaderProfileId
//         );

//         // 3. Use that member as the source. 
//         // If for some reason leader isn't in members list, fallback to first member or null
//         source = leaderMember?.participant || reg.team.members[0]?.participant;

//       } else {
    //         // 🔍 SOLO LOGIC:
//         // Direct link
//         source = reg.participant;
//       }
//       return {
//         registrationId: reg.id,
//         type: reg.registrationType as "solo" | "team",
//         status: "confirmed", // or reg.status if you add it later

//         // ✅ DATA MAPPING (Matches your schema exactly)
//         name: source?.fullName || "Unknown", 
//         email: source?.email || "N/A",
//         mobile: source?.mobileNo || "N/A", 
//         college: source?.collegeName || "N/A",

//         // ✅ TEAM SPECIFIC
//         teamName: isTeam ? reg.team?.teamName || "Unknown Team" : null,
//         memberCount: isTeam ? (reg.team?.members?.length || 0) : 0,
//       };
//     });

//     return success("Participants fetched", list);

//   } catch (error) {
//     return handleError<ParticipantListItem[]>(error);
//   }
// }
