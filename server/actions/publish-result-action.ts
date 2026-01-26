"use server"

import { db } from "@/db"
import { competitions } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole"
import { publishResultService , PublishResultInput } from "../services/publish-result"

import { revalidatePath } from "next/cache"
import { success,failure} from "@/lib/error-and-res/response"

// Omit declaredBy because we get it from the session
type ActionInput =Omit<PublishResultInput,"declaredBy">;

export async function publishResultAction(input:ActionInput){

    try{

        // authentication
        const {user,role}= await getCurrentUserWithRole();

        if(!user || !user.sub){
            return failure("Unauthorized: please log in");
        }


        // authorization (check if the user owns the competition or not)
        const event = await db.query.competitions.findFirst({
            where:eq(competitions.id,input.eventId),
            columns:{
                coordinatorId:true,
            }
        });

        if(!event) {
            return failure("event not found");
        }

        // check if the cordinator owns the competion or not
        if( role!=="admin" && event.coordinatorId!==user.sub){
         return failure("Permission Denied: You are not the coordinator for this event.")
        }

        // call the service 
       const res= await publishResultService({
            ...input,
            declaredBy:user.sub,
        });

        // revalidate the ui
        revalidatePath(`/coordinator/${input.eventId}/participants`);

        return success ("Results published successfully!",res);


    }catch(error:any){
     console.error("[Publish Result Error]:", error);
    return failure(error.message || "Failed to publish results.");
    }
}
