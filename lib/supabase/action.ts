
"use server";

import { createClient } from "@/lib/supabase/server";
import { AppError } from "../error-and-res/error";
import { success,handleError } from "../error-and-res/response";
import { ApiResponse } from "@/types/api-response";
import { redirect } from "next/navigation";

// --- SIGN UP ---
export async function signUp(
  prevState: ApiResponse<{redirectTo:string}>,
  formData: FormData
): Promise<ApiResponse<{ redirectTo: string }>> {
  try {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const redirectTo = (formData.get("redirectTo") as string) || "/";

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) throw new AppError(error.message, "SIGNUP_FAILED");

    // Success response - Client hook handles the redirect
    return success("Account created successfully! 🎉",{redirectTo});
  } catch (error) {
    return handleError(error);
  }
}

// --- SIGN IN ---
export async function signIn(
  prevState: ApiResponse<{ redirectTo: string }>,
  formData: FormData
): Promise<ApiResponse<{ redirectTo: string }>> {
  try {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const redirectTo = (formData.get("redirectTo") as string) || "/";

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new AppError("Invalid email or password", "AUTH_INVALID");

    return success("Successfully logged in ✅", { redirectTo });
  } catch (error) {
    return handleError(error);
  }
}

// --- GOOGLE SIGN IN ---
export async function signInWithGoogle(redirectTo: string = "/") {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error) {
    console.error("Google Auth Error:", error);
    throw new AppError(error.message, "OAUTH_FAILED");
  }

  if (data.url) {
    redirect(data.url); // Use Next.js redirect for OAuth
  }
}


// src/actions/auth.ts

export async function signOut(): Promise<ApiResponse<{ redirectTo: string }>> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    return success("Logged out successfully 👋", {
      redirectTo: "/login",
    });
  } catch (error) {
    // ✅ Fix: Just return the result of handleError
    // Typescript infers <{ redirectTo: string }> automatically
    return handleError(error);
  }
}










// "use server"
// import { redirect
//  } from "next/navigation"
//  import { createClient } from "./server"

//  import { AppError } from "../error-and-res/error"
//  import { ApiResponse } from "@/types/api-response"
// import { failure ,success} from "../error-and-res/response"

//  export async function signUp(formData:FormData):Promise<ApiResponse<{redirectTo:string}|null>>{
     
//   try{
//     const supabase= await createClient()
//     const email=formData.get("email") as string
//     const password=formData.get("password") as string
//     const name=formData.get("name") as string
//     const redirectTo=formData.get("redirectTo") as string |"/";

//     const {error}= await supabase.auth.signUp({
//         email,
//         password,
//         options:{
//           data:{
//             name,
//           }
//         }
//     })
 
//  if(error){
//  throw new AppError(error.message,"SIGNUP_FAILED")
//  }

// //  redirect(redirectTo||"/")
//   return success("Account created Successfully 🎉",{redirectTo,});
//  }

//  catch (error){
//   console.log("sugnup error,",error);
//   if(error instanceof AppError){
//     return failure(error.message, error.code);
//   }

//   return failure("Unable to signup up.Please try again")
// }
// }



// export async function signIn(formData: FormData):Promise<ApiResponse<{redirectTo:string}|null>> {
//   try{
//   const supabase = await createClient()

//   const email = formData.get("email") as string
//   const password = formData.get("password") as string
//   const redirectTo=formData.get("redirectTo") as string |"/";
  
//   console.log("email:",email)
//   console.log("password:",password)
//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   })

//   if (error) {
//     console.log("error:",error)
//     throw new AppError("Invalid email or password", "AUTH_INVALID");
//   }

//     return success("Successfully logged in ✅", {
//       redirectTo,
//     });

//   // after login
//   // console.log("redirect:login",redirectTo)
//   // redirect(redirectTo||"/")


// } catch (error) {
//     console.error(error);

//     if (error instanceof AppError) {
//       return failure(error.message, error.code);
//     }

//     return failure("Login failed. Please try again.");
//   }
// }

// export async function signOut(): Promise<ApiResponse<{ redirectTo: string }|null>> {
//   try {
//     const supabase = await createClient();
//     await supabase.auth.signOut();

//     return success("Logged out successfully 👋", {
//       redirectTo: "/login",
//     });
//   } catch {
//     return failure("Failed to logout");
//   }
// }
