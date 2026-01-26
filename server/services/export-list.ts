import { db } from "@/db";
import { eq } from "drizzle-orm";
import { failure,success,handleError } from "@/lib/error-and-res/response";
import { registrations,participants,teamMembers,teams } from "@/db/schema";
 import { ApiResponse } from "@/types/api-response";

 export type ExportParticipantProfile={
    fullName: string;
    mobileNo: string;
    collegeName: string;
    courseName: string;
    class: string;
    category:string,
 };
 export type ExportRegistrationData={
    id:string;
    registrationType: "solo" | "team" |string;
    // data if it is solo
    participant:ExportParticipantProfile |null;
    // data if it is team registration
    team:{
        teamName:string;
        leaderProfileId:string;
        members:{
            participant:ExportParticipantProfile & {profileId:string}  // We fetch profileId for members to identify the leader
        }[];

    } |null;
 }
export async function getExportData(eventId:string):Promise<ApiResponse<ExportRegistrationData[]>>{
     if(!eventId){
        return failure("Event Id is missing");
     }
           try{
     const data=await db.query.registrations.findMany({
        where:eq(registrations.competitionId,eventId),
        columns:{
            id:true,
            registrationType:true,
        },
        with:{
            participant:{
                columns:{
                 fullName:true,
                 mobileNo:true,
                 collegeName:true,
                 courseName:true,
                 class:true,
                 category:true,
                 
                },
            },
            
            team:{
                columns: {
                    teamName: true,
                    leaderProfileId: true,
                        },
                  with:{
                    members:{
                        with:{
                           participant:{
                columns:{
                    profileId:true,
                 fullName:true,
                 mobileNo:true,
                 collegeName:true,
                 courseName:true,
                 class:true,
                 category:true,
                 
                },
            },
                        },
                    },
                },
            },
        },
     })
     if( !data ||data.length===0 ) return failure("No registration found");

     return success("Data fetch successfully",data as unknown as ExportRegistrationData[]);

     }catch(error){
         return handleError (error);
     }
}