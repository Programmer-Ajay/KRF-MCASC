import { db } from "@/db";
import { registrations,teams,teamMembers,participants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { failure,success,handleError } from "@/lib/error-and-res/response";
import { ApiResponse } from "@/types/api-response";

// define the types of the object we want to fetch

// 1. Extract the common fields into a base type
export type ParticipantProfile = {
  name: string;
  email: string;
  mobileNo: string;
  gender: string;
  guardianNo: string,
  course: string;
  class: string;
  collegeName: string;
  category: string;
  status: string;
  isPresent:boolean;  //attendance
  participantId: string;
};

// 2. Define the specific Team Member type by combining the Base + New Fields
export type TeamMember = ParticipantProfile & {
  memberId: string;
  participantId: string;
  isLeader: boolean;
};

// 3. Use them in your main type
export type RegistrationDetails = {
  // Meta data
  id: string;
  type: "solo" | "team";
  registratedAt: string;
  submissionData: Record<string, any> | {};

  // Event info
  event: {
    id: string;
    name: string;
    date: string;
    isResultDeclared:boolean;
    areCertificatesIssued:boolean;
  };

  primaryContact: ParticipantProfile;

  team?: {
    id: string;
    name: string;
    members: TeamMember[]; // Array<TeamMember>
  };
};

export async function getRegistrationDetails(registrationId:string):Promise<ApiResponse<RegistrationDetails>>{

    try{

        if(!registrationId){
            return failure("Registration Id is required");
        }

        // 1. PRE-FETCH: Get the Competition ID first
    // We need the explicit ID value to filter the nested query correctly.
    const regMeta = await db.query.registrations.findFirst({
      where: eq(registrations.id, registrationId),
      columns: { competitionId: true } // Fetch only what we need
    });

    if (!regMeta) {
      return failure("Registration not found");
    }

    const TARGET_COMPETITION_ID = regMeta.competitionId;
            // mega query

            // console.log("COMPETITION_ID",TARGET_COMPETITION_ID)

            const reg=await db.query.registrations.findFirst({
                where:eq(registrations.id,registrationId),
                with:{
                    // add competions
                    competition:true,
                    // B--> solo participants details
                    participant:{
                        with:{
                          attendances:{
                            // fetch the attendance to specific competition
                            where:(att,{eq})=> eq(att.competitionId , TARGET_COMPETITION_ID),
                            limit:1,
                          }
                        }
                    },
                
                    // c--> team details
                    team:{
                        with:{
                            members:{
                                with:{
                                   participant:{
                        with:{
                          attendances:{
                            // fetch the attendance to specific competition
                            where:(att,{eq})=> eq(att.competitionId , TARGET_COMPETITION_ID),
                            limit:1,
                                      }
                                     }
                                   } 
                                }
                            }
                        }
                    }
                }
            });
            
            // console.log("registration query::",reg?.team?.members[1].participant.attendances)
            if(!reg){
                return failure("Registration not found");
            }
              
            // helper function that extract the is present from the realtion array
            const getIsPresent=(p:any)=>{
              if(p.attendances && p.attendances.length>0){
                return p.attendances[0].isPresent;
              }
              return false;
            };


            const isTeam= reg?.registrationType==="team";
            let primarySource:any=null;

            //3--> logic to find the main person
            if(isTeam && reg?.team){
          // Find the Leader inside the members list using  leaderProfileId
          // Fallback: If logic fails, just pick the first member

      const leaderMember=reg?.team?.members.find((m)=>m.participant.profileId===reg?.team?.leaderProfileId);
     
      primarySource=leaderMember?.participant || reg?.team?.members[0].participant;

     }else{
        // solo
        primarySource=reg?.participant;
     }

     if(!primarySource){
        //edge case
        return failure("participant data is missing for this competitio");
     }

     // construct the team members list (if the team is there)

     const memberList=isTeam && reg?.team? reg?.team?.members.map((m)=>({
     memberId:m.participantId,
     participantId:m.participantId,
     name: m.participant.fullName,
     email: m.participant.email,
     mobileNo: m.participant.mobileNo,
    gender: m.participant.gender,
    guardianNo: m.participant.guardianMobile?? "None",
    course: m.participant.courseName,
    class: m.participant.class,
    collegeName: m.participant.collegeName,
    category: m.participant.category,
    status: m.participant.status??"unknown",
    isLeader:m.participant.profileId===reg?.team?.leaderProfileId,
    // popuplate the Attendace form the relation helper
    isPresent:getIsPresent(m.participant),
     })):[];

     // sort the members so that leader should be on the top
     memberList?.sort((a,b)=>(b.isLeader?1:0)-(a.isLeader? 1:0));

    //  5--> assemble a final obect--
   const result: RegistrationDetails = {
      id: reg.id,
      type: reg.registrationType as "solo" | "team",
      registratedAt: reg.registeredAt.toISOString(),
      submissionData: reg.submissionData || {},

      event: {
        id: reg.competition.id,
        name: reg.competition.name,
        date: reg.competition.eventDate,
        isResultDeclared:reg.competition.isResultDeclacred,
        areCertificatesIssued:reg.competition.areCertificatesIssued,
      },

      primaryContact: {
        participantId:primarySource.id,
        name: primarySource.fullName,
        email: primarySource.email,
        mobileNo: primarySource.mobileNo,
        gender: primarySource.gender,
        guardianNo: primarySource.guardianMobile??"None",
        course: primarySource.courseName,
        class: primarySource.class,
        collegeName: primarySource.collegeName,
        category: primarySource.category,
        status: primarySource.status ?? "unknown",
        isPresent:getIsPresent(primarySource),
      },
      team:isTeam && reg.team
          ? {
              id: reg.team.id,
              name: reg.team.teamName,
              members: memberList,
            }
          : undefined,
    };

    return success("Registration details fetched successfully", result);

    }
    catch(error){
        console.log("registrations-participants details:",error);
        return handleError<RegistrationDetails>(error)

    }
}
