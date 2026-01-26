import { db } from "@/db";
import { certificates, competitions, participants, teamMembers} from "@/db/schema";
import { results } from "@/db/schema";
import { registrations } from "@/db/schema";
import { eq,inArray,or,and } from "drizzle-orm";
// type defination
export type CertificateRecipient={
    participantId:string;
    teamId:string |null;
    name:string;
    teamName:string | null;
    type: "winner" | "participation",
    rank:number | null;
    status:"eligible";
};

// //   logic
//   Who gets a certificate?
//   - Must be registered.
//   - Must have marked attendance = true.
//   - "winner" if they are in the results table.(1,2,3)
//  - "Participation" otherwise.

async function calculateRecipients(eventId:string){

    // 1. fetch winners 
    const eventsResults=await db.query.results.findMany({
        where:eq(results.competitionId,eventId),
    });

    // we use sets for instant lookups
    const winningTeamIds = new Set(
        eventsResults
        .filter(r=>r.teamId)
        .map(r=>r.teamId)
    ); // this will give us only set og team id it filter out particpantId
  
   const winningSoloIds = new Set(
    eventsResults
    .filter(r=>r.participantId)
    .map(r=>r.participantId),
   )// this will give us only set of solo particpant id it filter out particpantId

   // 2 fetch all particpants + Attendacne (for this event)
   const allRegs= await db.query.registrations.findMany({
    where:eq(registrations.competitionId,eventId),
    with:{
        participant:{
            with:{
                attendances:{
                    where:(att,{eq})=>eq(att.competitionId,eventId),
                    limit:1,
                },
            },
        },
        team:{
            with:{
                members:{
                    with:{
                        participant:{
                            with:{
                                attendances:{
                                    where:(att,{eq})=>eq(att.competitionId,eventId),
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
   const recipients:CertificateRecipient[]=[];
 
   // 3. logic

    for(const reg of allRegs){
    
        // case 1 : team---
        if(reg?.registrationType==="team" && reg?.team){
            const isWinningTeam = winningTeamIds.has(reg.team.id);
            const teamRank = isWinningTeam? eventsResults.find(r=>r.teamId===reg.team?.id)?.rank : null;

         //cehck Each member individual
           for(const member of reg.team.members){
            //optional chaining in case of array is empty
            const attRecord=member.participant.attendances?.[0];
            const isPresent=attRecord?.isPresent===true;
            
            if(isPresent){
                 recipients.push({
                    participantId:member.participantId,
                    teamId:reg.team?.id,
                    name:member.participant.fullName,
                    teamName:reg.team?.teamName,
                    type:isWinningTeam ? "winner":"participation",
                    rank:teamRank || null,
                    status:"eligible"
                 });
            }
           }

        }
        //  case B: solo
        else if(reg.registrationType==="solo" && reg.participant){
             const isWinner=winningSoloIds.has(reg.participant.id);
             const soloRank=isWinner? eventsResults.find(r=>r.participantId===reg.participant?.id)?.rank : null;
             const attRecord= reg.participant.attendances?.[0];
             const isPresent=attRecord?.isPresent===true;

             if(isPresent){
                  recipients.push({
                    participantId:reg.participant.id,
                    teamId:null,
                    name:reg.participant.fullName,
                    teamName:null,
                    type:isWinner? "winner" : "participation",
                    rank:soloRank || null,
                    status:"eligible",
                  });
             };


            };



    }
   return recipients;
}

// main function  
// 1 for fetching the list
export async function getCertificatePreview(eventId:string){
    const list = await calculateRecipients(eventId);

    // sort based on the winner , then alphabetically
    return list.sort((a,b)=>{
        if(a.type !==b.type) return a.type==="winner"?-1:1;
        if(a.type==="winner" && b.type==="winner") return (a.rank || 0) - (b.rank||0);
         return a.name.localeCompare(b.name);
    });
}

export async function publishCertificateService(eventId:string,issuedByUserId:string){


    // 1--> recalucte the list of certificate issued people (not rely on frontend)
    const eligibleList= await calculateRecipients(eventId);

    if (eligibleList.length === 0) {
        // This error will be caught by the Action
        throw new Error("No eligible participants found. Please ensure attendance is marked.");
    }
    // 2 prepare data
    const rowsToInsert:(typeof certificates.$inferInsert)[]=eligibleList.map(p=>({
        competitionId:eventId,
        participantId:p.participantId,
        teamId:p.teamId,
        certificateType:p.type,
        issuedBy:issuedByUserId,
    }));
    
    // 3  transation(Atomic)
    await db.transaction(async (tx)=>{
        // A bulk Insert
        // onConflictDoNothing:If i Click button twice, it wont't crash, just ignores duplicates
        if(rowsToInsert.length>0){
            await tx.insert(certificates)
            .values(rowsToInsert)
            .onConflictDoNothing();
        }

        //b maek the event as done
         await tx.update(competitions)
         .set({areCertificatesIssued:true})
         .where(eq(competitions.id,eventId));
    
    });
    return { count: rowsToInsert.length};
}




// ----------Users--------------
export type UserCertificateStatus={
    eventId:string;
    eventName:string,
    eventDate:Date,
    status:"eligible" | "absent" | "team_only",
    certificateId:string | null; 
    type : "winner"|"participation"| "team_bundle" | null;
    isTeamLeader:boolean;
}
export async function getUserCertificatesList(userId:string):Promise<UserCertificateStatus[]>{


    // 1 Find Participant Record linked to this User Profile
    const participant= await db.query.participants.findFirst({
        where:eq(participants.profileId,userId),
    });
    if(!participant) return [];


    //2 --> find all the teamId the this user belogs to
    const myTeamMembersShip= await db.query.teamMembers.findMany({
        where:eq(teamMembers.participantId,participant.id),
        with:{ team:true},
    })
     const myTeamIds= myTeamMembersShip.map(tm=>tm.teamId).filter((id):id is string=> !!id) // it is srinf[] array

     // 3 registrations(solo or team)
     //logic-->get the registration where (particpationId is me ) or (in my Id)
     const whereClause = myTeamIds.length>0 ?
       or(
        eq(registrations.participantId,participant.id),
        inArray(registrations.teamId,myTeamIds)
       ):
       eq(registrations.participantId,participant.id);

    
     
   

    const myReg=await db.query.registrations.findMany({
        where:whereClause,
        with :{
            competition:true,
            team:true,
        }
    });
    
    //  filter only the issued evcents
    const issuedEvents = myReg.filter(r=>r.competition.areCertificatesIssued);
    
    if (issuedEvents.length === 0) return [];

    // 5 determine the certifcate status for each event
    const results= await Promise.all(issuedEvents.map(async (reg)=>{

        // check the leadershhhip : compare
        const isLeader= reg.team?.leaderProfileId===userId;

        //A chck ofr the personal certificares
        const myCerts= await db.query.certificates.findFirst({
            where:and(
                eq(certificates.competitionId,reg.competitionId),
                eq(certificates.participantId,participant.id)

            )
        });

        //B check for the proxy certificate (if team leadeer is absent)
        let proxyCert=null;
        if(!myCerts && isLeader && reg.teamId){

            proxyCert = await db.query.certificates.findFirst({
              where: and(
                  eq(certificates.competitionId, reg.competitionId),
                  eq(certificates.teamId, reg.teamId)
              )
          });
        }

        //C map to staatus object
        if(myCerts){
            // case 1 standard Eliglibily (i was present)
            return{
                eventId:reg.competitionId,
                eventName:reg.competition.name,
                eventDate: new Date(reg.competition.eventDate),
                status:"eligible",
                certificateId:myCerts.id,
                type:myCerts.certificateType as any,
                isTeamLeader:isLeader
            } as UserCertificateStatus;

        }else if(proxyCert){
            return{
            eventId: reg.competitionId,
              eventName: reg.competition.name,
              eventDate: new Date(reg.competition.eventDate),
              status: "team_only",
              certificateId: proxyCert.id, // Use teammate's cert ID to trigger download
              type: "team_bundle",
              isTeamLeader: true
          } as UserCertificateStatus;
        }
        else{
          // Case 3: Absent / Not Eligible
          return {
              eventId: reg.competitionId,
              eventName: reg.competition.name,
              eventDate: new Date(reg.competition.eventDate),
              status: "absent",
              certificateId: null,
              type: null,
              isTeamLeader: isLeader
          } as UserCertificateStatus;

        }
    }));

    // sort by event date ( )
    return results.sort((a,b)=>b.eventDate.getTime()-a.eventDate.getTime());

}

// -----------------------download the certificate
export type PdfCertificateData={
    id:string,
    recipientName:string,
    classAndCourse: string;
    collegeName:string,
    eventName:string,
    rankText:string;
};
// ---Helper :Rank NUmber to the text---
function getRankText(rank:number):string{
    const map:Record<number,string>={1:"First",2:"Second",3:"Third"};
    return map[rank]|| `${rank}th`
}

export async function getCertificateDownloadData(certId:string,userProfileId:string){

    // A fetch the certificates
    const targetCert= await db.query.certificates.findFirst({
        where:eq(certificates.id,certId),
        with:{
            participant:true,
            team:true,
            competition:true
        }
    });
    if (!targetCert) throw new Error("Certificate not found");

    // B securtity check (Owneer or leader)
   const requester= await db.query.participants.findFirst({
    where:eq(participants.profileId,userProfileId),
   });

   let isAuthorized=false;
   let isTeamBundleSize=false;
   // 1 check owner
   if(requester && targetCert.participantId===requester.id){
    isAuthorized=true;

   }
   if(targetCert.teamId && targetCert.team?.leaderProfileId===userProfileId){
    isAuthorized=true;
    isTeamBundleSize=true;
   }
   if (!isAuthorized) throw new Error("Unauthorized access to this certificate")


    // c- Bundle logic
    let certToProcess=[targetCert];
    if(isTeamBundleSize){
        const teamCerts = await db.query.certificates.findMany({
           where: and(
                eq(certificates.competitionId, targetCert.competitionId),
                eq(certificates.teamId, targetCert.teamId!)
            ),
            with:{
                participant:true,
                competition:true,
                team:true
            }
        });
        if(teamCerts.length>0) certToProcess=teamCerts;
    }

    // D format data for pdf
    const pdfData: PdfCertificateData[]= await Promise.all(certToProcess.map(async(c)=>{
     const classStr= c.participant.class || "";
     const courseStr=c.participant.courseName || "";
     const classAndCourse=`${classStr} ${courseStr}`.trim();
     let RankText ="Participant";
     if(c.certificateType==="winner"){
        // fetch the rank from the result table
        const resultRow=await db.query.results.findFirst({
            where:and(
                eq(results.competitionId,c.competitionId),
                or(
                    eq(results.participantId, c.participantId),
                    (c.teamId? eq(results.teamId,c.teamId):undefined)
                )
            )
        });
        if(resultRow){
            RankText=`Winner-${getRankText(resultRow.rank)}`
        }else{
            RankText="Winner";
        }
     }

     return {
        id:c.id,
        recipientName:c.participant.fullName,
        classAndCourse:classAndCourse,
        collegeName:c.participant.collegeName,
        eventName:c.competition.name,
        rankText:RankText,
     }
    }));
    return {
        data:pdfData,
        fileName:`${isTeamBundleSize ? 'Team-Bundle':'Certificate'}-${targetCert.competition.name.replace(/\s+/g,'-')}.pdf`
    };

}