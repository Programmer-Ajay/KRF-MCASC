"use server"

import { redirect } from "next/navigation"
import { createClient } from "./server"

export async function signWithGoogle(redirectTo?:string){

    const supabase = await createClient()
    console.log("redirectTo:",redirectTo)
    const {data,error}=await supabase.auth.signInWithOAuth({
        provider:"google",
        options:{
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${redirectTo ?? "/"}`
        }
    })

    if(error){
        throw new Error (error.message)
    }

    if(data?.url){
        redirect (data.url)
    }
}