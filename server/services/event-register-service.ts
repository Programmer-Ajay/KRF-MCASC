
import {db} from "@/db"
import { competitions,
        participants,
        teams,
        teamMembers,
        registrations,
        profiles,
 } from "@/db/schema"
 import { eq,and } from "drizzle-orm"
 import z from "zod"
 import { eventRegistrationSchema } from "@/lib/validations/events-validations"
import { PrimaryKey } from "drizzle-orm/gel-core"

// first types of event registeration form
//types
type EventRegistrationData=z.infer<typeof eventRegistrationSchema>


// response of service result
interface ServiceResult{
   success:boolean,
   data?:{
     registrationId: string;
     type:"solo"|"team";
     teamName?:string;
   },
   error?:string;
}


// main function --> use the drizzle transations

export  async function createEventRegistration(
    userId:string,
    data:EventRegistrationData
):Promise<ServiceResult>{

try{
  return  await db.transaction(async(tx)=>{
     
    // step -1 fetech the competition details
       const competition=await tx.query.competitions.findFirst({
        where:and(
            eq(competitions.name,data.eventType),
            eq(competitions.isActive,true)
        ),
       });
      
       if (!competition) {
        throw new Error(`Competition "${data.eventType}" not found or inactive.`);
      }

       // Check if registration deadline has passed or not
      if (new Date() > new Date(competition.registrationDeadline)) {
        throw new Error("Registration deadline has passed for this competition.");
      }

      // step- 2 get the user profile
      const userProfile=await tx.query.profiles.findFirst({
        where:eq(profiles.id,userId),
      })

       if (!userProfile) {
        throw new Error("User profile not found.");
      }

      // step -3 create and update leader participants (enter a row in participants)

          const [leader]= await tx.insert(participants).values(
            {
                profileId:userId,
                fullName:data.commonFields.fullName,
                email:data.commonFields.email,
                mobileNo:data.commonFields.mobileNo,
                gender:data.commonFields.gender,
                guardianMobile:data.commonFields.guardianMobile,
                collegeName:data.commonFields.collegeName,
                courseName: data.commonFields.courseName,
                class: data.commonFields.class,
               category: data.commonFields.category,
               status: "current-accedemic"
            }).onConflictDoUpdate({
                target:participants.email,   // look for the match on email
                set:{
                    ...data.commonFields,
                        profileId:userId  // ensure the profile link is kept
                }
            }).returning();

            // step-4 handle the team or solo registearation
            if(competition.type==="team" && data.team?.teamName){

                 return await handleTeamRegistration(
                    tx,
                    competition,
                    leader,
                    userId,
                    data,
                 )
            }else{
              return await handleSoloRegistration(
          tx,
          competition,
          leader,
          userId,
          data
        );
      }


  })


}catch(error:any){
    console.log("Event registeration service error::",error)
    return {
        success:false,
        error:error.message || "failed complete registeration."
    };
}

}


// handle the team registerations

async function handleTeamRegistration(
    tx: any,
  competition: any,
  leader: any,
  userId: string,
  data: EventRegistrationData
): Promise<ServiceResult> {
     
    if(!data.team?.teamName){
        throw new Error("team name is reuquired for the teamc competitions")
    }

    //check if the team name is already exist in this competition
    const existingTeam=await tx.query.teams.findFirst({
        where: and(
      eq(teams.competitionId, competition.id),
      eq(teams.teamName, data.team.teamName),
      eq(teams.isActive, true)
    ),
    })
    if (existingTeam) {
    throw new Error(`Team name "${data.team.teamName}" is already taken.`);
  }

  // calculate total team size (leader +teammates)
  // we use ||[] to be safe if teammembers is undefined
   const teammateCount = data.team.teamMembers?.length || 0;
  const totalMembers = 1 + teammateCount;
  // if the project comp is solo then the team is 1+0 =1 

   // 2. CHECK: Minimum Size (Prevents 1 person entering a "2-person only" debate)
  // If your DB doesn't have minTeamSize column yet, assume 1.
  const minSize = competition.minTeamSize || 1;

  if(totalMembers < minSize){
    throw new Error(
      `This event requires a minimum of ${minSize} team members. You only have ${totalMembers}.`
    );
  }

  // check the maximum size (prevents 5 people entering a "max 4" project)
  if(totalMembers>competition.maxTeamSize){
    throw new Error(
      `This event allows a maximum of ${competition.maxTeamSize} team members. You have ${totalMembers}.`
    );
  }

  // create team 
  const [newTeam]= await tx.insert(teams).values(
    {
     competitionId: competition.id,
      teamName: data.team.teamName,
      leaderProfileId: userId,
    }).returning();

   // Add leader as first team member
  await tx.insert(teamMembers).values({
    competitionId: competition.id,
    teamId: newTeam.id,
    participantId: leader.id,
  });

  // add the other team members 
  if(data.team?.teamMembers && data.team.teamMembers.length>0){
    // check the team limit size
     const totalMembers = 1 + data.team.teamMembers.length;
    if (totalMembers > competition.maxTeamSize) {
      throw new Error(
        `Team size exceeds maximum limit of ${competition.maxTeamSize} members.`
      );
    }

    for(const memberData of data.team.teamMembers){
        // check if participaants already exist by email
        let existingParticipant=await tx.query.participants.findFirst({
            where:eq(participants.email,memberData.email),
        })
        let memberId:string;
        if(existingParticipant){
             // Participant exists - use their ID
        memberId = existingParticipant.id;
        }else {
        // Create new participant
        const [newMember] = await tx
          .insert(participants)
          .values({
            profileId: null, // Team members may not have accounts
            fullName: memberData.fullName,
            email: memberData.email,
            mobileNo: memberData.mobileNo,
            gender: memberData.gender,
            guardianMobile: memberData.guardianMobile,
            collegeName: memberData.collegeName,
            courseName: memberData.courseName,
            class: memberData.class,
            category: memberData.category,
            status: "current-year",
          }).onConflictDoUpdate({
            target: participants.email,
            set: { ...memberData }
        })
          .returning();

        memberId = newMember.id;
      }

      // Check if member is already in another team for this competition
      const existingMembership = await tx.query.teamMembers.findFirst({
        where: and(
          eq(teamMembers.competitionId, competition.id),
          eq(teamMembers.participantId, memberId)
        ),
      });

      if (existingMembership) {
        throw new Error(
          `${memberData.fullName} is already registered in another team for this competition.`
        );
      }
      // add the team
      await tx.insert(teamMembers).values({
        competitionId: competition.id,
        teamId: newTeam.id,
        participantId: memberId,
      });
    }

  }

  // create a registeration record
   const [registration] = await tx
   .insert(registrations)
   .values({
    competitionId: competition.id,
      teamId: newTeam.id,
      participantId: null, // Team registration
      registeredBy: userId,
      registrationType: "team",
      submissionData: data.dynamicFields || null
   }).returning();

   return {
    success:true,
    data:{
        registrationId:registration.id,
        type:"team",
        teamName:newTeam.teamName,
    }
   }
}


// handle the solo registeration 
async function handleSoloRegistration(
  tx: any,
  competition: any,
  leader: any,
  userId: string,
  data: EventRegistrationData
): Promise<ServiceResult> {
  // Check if already registered
  const existingRegistration = await tx.query.registrations.findFirst({
    where: and(
      eq(registrations.competitionId, competition.id),
      eq(registrations.participantId, leader.id)
    ),
  });

  if (existingRegistration) {
    throw new Error("You are already registered for this competition.");
  }

  // Create registration record
  const [registration] = await tx
    .insert(registrations)
    .values({
      competitionId: competition.id,
      teamId: null, // Solo registration
      participantId: leader.id,
      registeredBy: userId,
      registrationType: "solo",
      submissionData: data.dynamicFields || null,
    })
    .returning();

  return {
    success: true,
    data: {
      registrationId: registration.id,
      type: "solo",
    },
  };
}


//check if user can register 

export async function canUserRegister(
  userId: string,
  competitionId: string
): Promise<{ allowed: boolean; reason?: string }> {
  try {
    const competition = await db.query.competitions.findFirst({
      where: eq(competitions.id, competitionId),
    });

    if (!competition) {
      return { allowed: false, reason: "Competition not found." };
    }

    if (!competition.isActive) {
      return { allowed: false, reason: "Competition is not active." };
    }

    if (new Date() > new Date(competition.registrationDeadline)) {
      return { allowed: false, reason: "Registration deadline has passed." };
    }

    return { allowed: true };
  } catch (error) {
    return { allowed: false, reason: "Error checking registration eligibility." };
  }
}


export async function getUserRegistrations(userId: string) {
  try {
    const userParticipants = await db.query.participants.findMany({
      where: eq(participants.profileId, userId),
      with: {
        registrations: {
          with: {
            competition: true,
            team: true,
          },
        },
      },
    });

    return {
      success: true,
      data: userParticipants,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}






// import { db } from "@/db";
// import {
//   competitions,
//   participants,
//   teams,
//   teamMembers,
//   registrations,
//   profiles,
// } from "@/db/schema";
// import { eq, and } from "drizzle-orm";
// import { z } from "zod";
// import { eventRegistrationSchema } from "@/lib/validations/events-validations";

// // Types
// type EventRegistrationData = z.infer<typeof eventRegistrationSchema>;

// interface ServiceResult {
//   success: boolean;
//   data?: {
//     registrationId: string;
//     type: "solo" | "team";
//     teamName?: string;
//   };
//   error?: string;
// }

// /**
//  * Main service function to handle event registration
//  * Uses database transactions to ensure data consistency
//  */
// export async function createEventRegistration(
//   userId: string,
//   data: EventRegistrationData
// ): Promise<ServiceResult> {
//   try {
//     return await db.transaction(async (tx) => {
//       // Step 1: Fetch Competition Details
//       const competition = await tx.query.competitions.findFirst({
//         where: and(
//           eq(competitions.name, data.eventType),
//           eq(competitions.isActive, true)
//         ),
//       });

//       if (!competition) {
//         throw new Error(`Competition "${data.eventType}" not found or inactive.`);
//       }

//       // Check if registration deadline has passed
//       if (new Date() > new Date(competition.registrationDeadline)) {
//         throw new Error("Registration deadline has passed for this competition.");
//       }

//       // Step 2: Get User Profile
//       const userProfile = await tx.query.profiles.findFirst({
//         where: eq(profiles.id, userId),
//       });

//       if (!userProfile) {
//         throw new Error("User profile not found.");
//       }

//       // Step 3: Create or Update Leader Participant
//       const [leader] = await tx
//         .insert(participants)
//         .values({
//           profileId: userId,
//           fullName: data.commonFields.fullName,
//           email: data.commonFields.email,
//           mobileNo: data.commonFields.mobileNo,
//           gender: data.commonFields.gender,
//           guardianMobile: data.commonFields.guardianMobile,
//           collegeName: data.commonFields.collegeName,
//           courseName: data.commonFields.courseName,
//           class: data.commonFields.class,
//           category: data.commonFields.category,
//           status: "current-year"
//         }).onConflictDoUpdate({
//             target: participants.email, // Look for match on Email
//             set: { 
//                 ...data.commonFields,
//                 profileId: userId // Ensure profile link is kept
//             }
//         })
//         .returning();

//       // Step 4: Handle Team vs Solo Registration
//       if (competition.type === "team" && data.team?.teamName) {
//         return await handleTeamRegistration(
//           tx,
//           competition,
//           leader,
//           userId,
//           data
//         );
//       } else {
//         return await handleSoloRegistration(
//           tx,
//           competition,
//           leader,
//           userId,
//           data
//         );
//       }
//     });
//   } catch (error: any) {
//     console.error("Event registration service error:", error);
//     return {
//       success: false,
//       error: error.message || "Failed to complete registration.",
//     };
//   }
// }

// /**
//  * Handle team registration logic
//  */
// async function handleTeamRegistration(
//   tx: any,
//   competition: any,
//   leader: any,
//   userId: string,
//   data: EventRegistrationData
// ): Promise<ServiceResult> {
//   if (!data.team?.teamName) {
//     throw new Error("Team name is required for team competitions.");
//   }

//   // Check if team name already exists in this competition
//   const existingTeam = await tx.query.teams.findFirst({
//     where: and(
//       eq(teams.competitionId, competition.id),
//       eq(teams.teamName, data.team.teamName),
//       eq(teams.isActive, true)
//     ),
//   });

//   if (existingTeam) {
//     throw new Error(`Team name "${data.team.teamName}" is already taken.`);
//   }


//   // 1. Calculate Total Team Size (Leader + Teammates)
//   // We use `|| []` to be safe if teamMembers is undefined
//   const teammateCount = data.team.teamMembers?.length || 0;
//   const totalMembers = 1 + teammateCount; 

//   // 2. CHECK: Minimum Size (Prevents 1 person entering a "2-person only" debate)
//   // If your DB doesn't have minTeamSize column yet, assume 1.
//   const minSize = competition.minTeamSize || 1;
  
//   if (totalMembers < minSize) {
//     throw new Error(
//       `This event requires a minimum of ${minSize} team members. You only have ${totalMembers}.`
//     );
//   }

//   // 3. CHECK: Maximum Size (Prevents 5 people entering a "Max 4" project)
//   if (totalMembers > competition.maxTeamSize) {
//     throw new Error(
//       `This event allows a maximum of ${competition.maxTeamSize} team members. You have ${totalMembers}.`
//     );
//   }

//   // Create team
//   const [newTeam] = await tx
//     .insert(teams)
//     .values({
//       competitionId: competition.id,
//       teamName: data.team.teamName,
//       leaderProfileId: userId,
//     })
//     .returning();

//   // Add leader as first team member
//   await tx.insert(teamMembers).values({
//     competitionId: competition.id,
//     teamId: newTeam.id,
//     participantId: leader.id,
//   });

//   // Add other team members
//   if (data.team.teamMembers && data.team.teamMembers.length > 0) {
//     // Check team size limit
//     const totalMembers = 1 + data.team.teamMembers.length;
//     if (totalMembers > competition.maxTeamSize) {
//       throw new Error(
//         `Team size exceeds maximum limit of ${competition.maxTeamSize} members.`
//       );
//     }

//     for (const memberData of data.team.teamMembers) {
//       // Check if participant already exists by email
//       let existingParticipant = await tx.query.participants.findFirst({
//         where: eq(participants.email, memberData.email),
//       });

//       let memberId: string;

//       if (existingParticipant) {
//         // Participant exists - use their ID
//         memberId = existingParticipant.id;
//       } else {
//         // Create new participant
//         const [newMember] = await tx
//           .insert(participants)
//           .values({
//             profileId: null, // Team members may not have accounts
//             fullName: memberData.fullName,
//             email: memberData.email,
//             mobileNo: memberData.mobileNo,
//             gender: memberData.gender,
//             guardianMobile: memberData.guardianMobile,
//             collegeName: memberData.collegeName,
//             courseName: memberData.courseName,
//             class: memberData.class,
//             category: memberData.category,
//             status: "current-year",
//           }).onConflictDoUpdate({
//             target: participants.email,
//             set: { ...memberData }
//         })
//           .returning();

//         memberId = newMember.id;
//       }

//       // Check if member is already in another team for this competition
//       const existingMembership = await tx.query.teamMembers.findFirst({
//         where: and(
//           eq(teamMembers.competitionId, competition.id),
//           eq(teamMembers.participantId, memberId)
//         ),
//       });

//       if (existingMembership) {
//         throw new Error(
//           `${memberData.fullName} is already registered in another team for this competition.`
//         );
//       }

//       // Add to team
//       await tx.insert(teamMembers).values({
//         competitionId: competition.id,
//         teamId: newTeam.id,
//         participantId: memberId,
//       });
//     }
//   }

//   // Create registration record
//   const [registration] = await tx
//     .insert(registrations)
//     .values({
//       competitionId: competition.id,
//       teamId: newTeam.id,
//       participantId: null, // Team registration
//       registeredBy: userId,
//       registrationType: "team",
//       submissionData: data.dynamicFields || null,
//     })
//     .returning();

//   return {
//     success: true,
//     data: {
//       registrationId: registration.id,
//       type: "team",
//       teamName: newTeam.teamName,
//     },
//   };
// }

// /**
//  * Handle solo registration logic
//  */
// async function handleSoloRegistration(
//   tx: any,
//   competition: any,
//   leader: any,
//   userId: string,
//   data: EventRegistrationData
// ): Promise<ServiceResult> {
//   // Check if already registered
//   const existingRegistration = await tx.query.registrations.findFirst({
//     where: and(
//       eq(registrations.competitionId, competition.id),
//       eq(registrations.participantId, leader.id)
//     ),
//   });

//   if (existingRegistration) {
//     throw new Error("You are already registered for this competition.");
//   }

//   // Create registration record
//   const [registration] = await tx
//     .insert(registrations)
//     .values({
//       competitionId: competition.id,
//       teamId: null, // Solo registration
//       participantId: leader.id,
//       registeredBy: userId,
//       registrationType: "solo",
//       submissionData: data.dynamicFields || null,
//     })
//     .returning();

//   return {
//     success: true,
//     data: {
//       registrationId: registration.id,
//       type: "solo",
//     },
//   };
// }

// /**
//  * Check if user can register (additional business rules)
//  */
// export async function canUserRegister(
//   userId: string,
//   competitionId: string
// ): Promise<{ allowed: boolean; reason?: string }> {
//   try {
//     const competition = await db.query.competitions.findFirst({
//       where: eq(competitions.id, competitionId),
//     });

//     if (!competition) {
//       return { allowed: false, reason: "Competition not found." };
//     }

//     if (!competition.isActive) {
//       return { allowed: false, reason: "Competition is not active." };
//     }

//     if (new Date() > new Date(competition.registrationDeadline)) {
//       return { allowed: false, reason: "Registration deadline has passed." };
//     }

//     return { allowed: true };
//   } catch (error) {
//     return { allowed: false, reason: "Error checking registration eligibility." };
//   }
// }

// /**
//  * Get user's registrations
//  */
// export async function getUserRegistrations(userId: string) {
//   try {
//     const userParticipants = await db.query.participants.findMany({
//       where: eq(participants.profileId, userId),
//       with: {
//         registrations: {
//           with: {
//             competition: true,
//             team: true,
//           },
//         },
//       },
//     });

//     return {
//       success: true,
//       data: userParticipants,
//     };
//   } catch (error: any) {
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }