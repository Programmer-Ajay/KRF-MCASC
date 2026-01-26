"use server"

import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole"
import { getCertificatePreview,publishCertificateService } from "../services/certificate-service"
import { revalidatePath } from "next/cache"
import { failure, success } from "@/lib/error-and-res/response"

// Action Generate the Preview list 
export async function getCertificatePreviewAction(eventId:string){
    try {
         const {user,role} = await getCurrentUserWithRole();
         if(!user) return failure("Unauthorized");
         
         const data = await getCertificatePreview(eventId);
        return success("Preview generated", data);
         
    } catch (error:any) {
      console.error("Preview Error:", error);
    return failure(error.message || "Failed to generate preview");  
    }
};


// Action Publish (commit to DB)
export async function publshCertificateAction(eventId:string){
    try{
    // 1 Auth Check 
    const {user, role}= await getCurrentUserWithRole();
    if (!user || (role !== "admin" && role !== "coordinator")) {
       return failure("Unauthorized: Only coordinators can issue certificates.");
    }
    // 2. Call Service
    const result = await publishCertificateService(eventId, user.sub);
    // updateUI
    revalidatePath(`/coordinator/${eventId}/participants`)
    return success(`Success! ${result.count} certificates have been issued.`);

    } catch (error: any) {
    // ERROR : This catches any DB crash or logic error from Service
    console.error("Certificate Publish Error:", error);
    
    // Return a clean message to the UI toast
    return failure(error.message || "Failed to issue certificates. Please try again.");
  }
}