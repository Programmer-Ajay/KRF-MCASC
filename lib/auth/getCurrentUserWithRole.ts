// "use server"
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server"
export async function getCurrentUserWithRole(){
    
// cache() = Request Memoization (Per-request cache)
    const supabase = await createClient()

    // get the auth claims

    const {data,error}=await supabase.auth.getClaims();

    const claims=data?.claims?? null;

    if(!claims || error){
        return {
            user:null,
            role:null,
        }
    }

    // fetch role from profiles
    const {data:profile,error:profileError,} = await supabase.from("profiles")
    .select("role")
    .eq("id",claims.sub)    // jwt subjet= user id
    .single() 

    const role=profile?.role?.trim() ||"user";

    return {
        user:claims,
        role,
    }

}




