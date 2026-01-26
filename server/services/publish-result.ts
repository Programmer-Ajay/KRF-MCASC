import { db } from "@/db";
import { results } from "@/db/schema";
import { competitions } from "@/db/schema";
import { eq } from "drizzle-orm";

export type PublishResultInput={
    eventId:string,
    type:"solo" | "team";
    winners:{
        1:string[],
        2:string[],
        3:string[];
    };
    declaredBy:string
};

export async function publishResultService(data:PublishResultInput){
    
    const {eventId,type,winners,declaredBy} =data;
    // 1: data integrity
    const event = await db.query.competitions.findFirst({
        where:eq(competitions.id,eventId),
        columns:{
          areCertificatesIssued:true
        }
    
    });

    if(!event) throw new Error("Event not found");

    // hard stop if the certificates are issued no changes allowed

    if(event.areCertificatesIssued){
        throw new Error( "CRITICAL: certificates have already  been issued.Action blocked");
    }

    // 2 prepare a rows
     const rowsToInsert:(typeof results.$inferInsert)[]=[];


     for(const [rankstr,candidateIds] of Object.entries(winners)){

        const rank = parseInt(rankstr);
        if(Number.isNaN(rank)){
            throw new Error(" Rank is Undefined or Not a number");
        }
        // loop over each canddidate id
        for (const candidateId of candidateIds){
            rowsToInsert.push({
                competitionId:eventId,
                rank:rank,
                declaredBy:declaredBy,
                // dynamic assignemnt 
                teamId:type === "team"? candidateId:null,
                participantId:type==="solo"? candidateId : null,
            });
        }

     }

     if(rowsToInsert.length===0) {
        throw new Error ("No winners selected");
     }

     // 3. transation  Reset  and replace
     await db.transaction(async(tx)=>{

        // delete old entries (this is for wheen we want to republish the result)
        await tx
        .delete(results)
        .where(eq(results.competitionId , eventId));
        // B. Insert new winners

        await tx.insert(results).values(rowsToInsert);

        // c lock the event falg
        await tx.update(competitions)
        .set({isResultDeclacred:true})
        .where(eq(competitions.id,eventId));

     });

     return { success :true};
}

