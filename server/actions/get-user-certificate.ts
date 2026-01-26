"use server"

import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole";
import { getUserCertificatesList } from "../services/certificate-service";

import { success, failure } from "@/lib/error-and-res/response";

export async function getUserCertificatesAction(){
    try{
        const {user}= await getCurrentUserWithRole();
         
        if (!user) {
      return failure("Unauthorized access.");
    }
    const data= await getUserCertificatesList(user?.sub);
        console.log("certificate download:",data);

    return success("Certificates fetched successfully", data);

    }
    catch (error) {
    console.error("Certificate Action Error:", error);
    // Secure error message for the client
    return failure("Failed to load certificates. Please try again later.");
}

}