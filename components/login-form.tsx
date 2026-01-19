
"use client";

import { useActionState, useEffect, useState } from "react"; // Direct import
import { cn } from "@/lib/utils";
import { signIn, signInWithGoogle } from "@/lib/supabase/action";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GlobalLoader } from "@/components/ui/loader";
import { ApiResponse } from "@/types/api-response";

const initialState: ApiResponse<{ redirectTo: string }> = {
  success: false,
  message: "",
};

export function LoginForm({
  redirectTo,
  className,
  ...props
}: { redirectTo?: string } & React.ComponentProps<"div">) {
  
  const router = useRouter();

  // 1. DIRECT USE (Just like EventForm)
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  // 2. Local state for "Smooth Redirect" (Keep spinner moving while page changes)
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // 3. Handle Side Effects (Toast & Redirect)
  useEffect(() => {
    // Skip initial render
    if (!state.timestamp) return;

    if (state.success) {
      toast.success(state.message);
      
      // Handle Redirect
      if (state.data?.redirectTo) {
        // console.log("login-form log:",state.data?.redirectTo)
        setIsRedirecting(true); // Keep button loading
        router.replace(state.data?.redirectTo);
         
      }
    } else if (state.message) {
      toast.error(state.message);
      setIsRedirecting(false); // Stop loading on error
    }
  }, [state, router]);

  // Combined Loading State
  const isLoading = isPending || isRedirecting;

  async function handleGoogleClick() {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle(redirectTo ?? "/");
    } catch (error) {
      setIsGoogleLoading(false);
    }
  }

  return (
    <>
      <GlobalLoader show={isGoogleLoading} message="Redirecting to Google..." />

      <div className={cn("flex flex-col gap-6 w-full max-w-md mx-auto px-4 sm:px-0", className)} {...props}>
        
      

   {/* Animated background effects */}
       <div className="absolute inset-0 -z-10">
         <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
       </div>

       {/* Header */}
      <motion.div
         initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
        <span className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
             Welcome Back
           </span>
         </h1>
         <p className="text-gray-400 text-sm sm:text-base">Sign in to your KRF account</p>
       </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <form action={formAction} className="space-y-5">
            <input type="hidden" name="redirectTo" value={redirectTo ?? "/"} />
             
             <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
            {/* Email Field */}
            <div className="relative group">
               <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
               <input id="email" type="email" name="email" required placeholder="Email"
                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-pink-500/50 outline-none transition-all" />
            </div>

            {/* Password Field */}
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
            <div className="relative group">
               <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
               <input id="password" type="password" name="password" required placeholder="Password"
                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 outline-none transition-all" />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading} // Uses combined state
              className="w-full relative group mt-6 px-6 py-4 font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {state.success ? "Redirecting..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Sign In
                  </>
                )}
              </span>
            </motion.button>

            {/* Google Button */}
            <button type="button" onClick={handleGoogleClick} disabled={isGoogleLoading}
               className="w-full px-6 py-4 font-semibold text-white rounded-xl border-2 border-white/20 hover:bg-white/5 flex justify-center gap-2 transition-all">
               {isGoogleLoading ? <Loader2 className="animate-spin" /> : <FcGoogle size={20} />}
               Continue with Google
            </button>
            
            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-400 mt-4">
               Don't have an account? <a href="/register" className="text-pink-500 hover:underline">Sign up</a>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}







// "use client";

// import { cn } from "@/lib/utils"
// import { signIn } from "@/lib/supabase/action"
// import { motion } from "framer-motion"
// import { Mail, Lock, LogIn, } from "lucide-react"
// import { FcGoogle } from "react-icons/fc";
// import { signWithGoogle } from "@/lib/supabase/oauth";
// import {toast} from "react-toastify"
// import {useRouter} from "next/navigation";

// export function LoginForm({
//   redirectTo,
//   className,
//   ...props
// }:{redirectTo?:string} & React.ComponentProps<"div">) {

//   const router = useRouter();

//   async function handleSubmit(formData: FormData) {
//     const res = await signIn(formData);

//    if (!res.success) {
//   toast.error(res.message);
//   return;
// }

// const redirectTo = res.data?.redirectTo;

// toast.success(res.message);

// // if (redirectTo) {
// //   router.push(redirectTo);
// // }

//   }
//   return (
//     <div className={cn("flex flex-col gap-6 w-full max-w-md mx-auto px-4 sm:px-0", className)} {...props}>


//       {/* Animated background effects */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-center mb-4"
//       >
//         <h1 className="text-3xl sm:text-4xl font-bold mb-2">
//           <span className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
//             Welcome Back
//           </span>
//         </h1>
//         <p className="text-gray-400 text-sm sm:text-base">Sign in to your KRF account</p>
//       </motion.div>

//       {/* Form Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="bg-linear-to-br from-white/5 via-white/3 to-transparent border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl"
//       >
//         <form action={handleSubmit} className="space-y-5">
//            <input
//             type="hidden"
//             name="redirectTo"
//             value={redirectTo ?? "/"}
//           /> 

//           {/* Email Field */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="relative group"
//           >
//             <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none group-focus-within:text-pink-500 transition-colors" />
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 required
//                 className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
//               />
//               <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity -z-10 blur"></div>
//             </div>
//           </motion.div>

//           {/* Password Field */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative group"
//           >
//             <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none group-focus-within:text-purple-500 transition-colors" />
//               <input
//                 id="password"
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 required
//                 className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
//               />
//               <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity -z-10 blur"></div>
//             </div>
//           </motion.div>

//           {/* Submit Button */}
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//             type="submit"
//             className="w-full relative group mt-6 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
//           >
//             <div className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
//               <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 blur opacity-30"></div>
//             </div>
//             <span className="relative flex items-center justify-center gap-2">
//               <LogIn size={18} />
//               Sign In
//             </span>
//           </motion.button>

//           {/* Google Login */}
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             type="button"
//             onClick={()=>signWithGoogle(redirectTo?? "/")}
//             className="w-full px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
//           >
//             <FcGoogle/>
//             Continue with Google
//           </motion.button>

//           {/* Sign Up Link */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="text-center pt-2"
//           >
//             <p className="text-xs sm:text-sm text-gray-400">
//               Don&apos;t have an account?{" "}
//               <a href="/register" className="font-semibold text-pink-500 hover:text-pink-400 transition-colors">
//                 Sign up here
//               </a>
//             </p>
//           </motion.div>
//         </form>
//       </motion.div>

//       {/* Footer Note */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.7 }}
//         className="text-center text-xs sm:text-sm text-gray-500"
//       >
//         <p>By signing in, you agree to our Terms & Privacy Policy</p>
//       </motion.div>
//     </div>
//   )
// }
