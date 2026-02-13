"use client";

import { useActionState, useState, useEffect } from "react";
import { signUp, signInWithGoogle } from "@/lib/supabase/action";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, UserPlus, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { GlobalLoader } from "./ui/loader"; // Ensure this path is correct
import { ApiResponse } from "@/types/api-response";

const initialState: ApiResponse<{ redirectTo: string }> = {
  success: false,
  message: "",
};

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(signUp, initialState);
  
  // Local state for smooth redirecting
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Handle side effects (toast and redirect)
  useEffect(() => {
    // Skip initial render
    if (!state.timestamp) return;

    if (state.success) {
      toast.success(state.message);
      
      if (state.data?.redirectTo) {
        setIsRedirecting(true); // Keep UI in loading state
        // REMOVED: router.refresh(); -> This caused the freeze
        router.replace(state.data.redirectTo);
      }
    } else if (state.message) {
      toast.error(state.message);
      setIsRedirecting(false); // Stop loading on error
    }
  }, [state, router]); // Fixed dependency array to watch entire 'state' object

  const isLoading = isPending || isRedirecting;

  async function handleGoogleClick() {
    try {
      setIsGoogleLoading(true);
      await signInWithGoogle("/");
    } catch (error) {
      console.log("google signup error:", error);
      setIsGoogleLoading(false);
    }
  }

  return (
    <>
      <GlobalLoader show={isGoogleLoading} message="Redirecting to Google..." />

      <div className={cn("flex flex-col gap-6 w-full max-w-md mx-auto px-4 sm:px-0", className)} {...props}>
        <div className="relative flex flex-col gap-6 w-full max-w-md mx-auto px-4 sm:px-0">
          
          {/* Animated background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Join KRE&apos;26
              </span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Create your account and start exploring
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl"
          >
            <form action={formAction} className="space-y-5">
              
              {/* Full Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative group"
              >
                <input type="hidden" name="redirectTo" value="/" />
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none group-focus-within:text-purple-500 transition-colors" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none group-focus-within:text-pink-500 transition-colors" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    required
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                disabled={isLoading}
                type="submit"
                className="w-full relative group mt-8 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {state.success ? "Redirecting..." : "Signing up..."}
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </span>
              </motion.button>

              {/* Google Sign Up */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={handleGoogleClick}
                disabled={isGoogleLoading}
                type="button"
                className="w-full px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGoogleLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <FcGoogle size={18} />
                )}
                Continue with Google
              </motion.button>

              {/* Sign In Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center pt-2"
              >
                <p className="text-xs sm:text-sm text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    Sign in here
                  </a>
                </p>
              </motion.div>
            </form>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs sm:text-sm text-gray-500"
          >
            <p>By signing up, you agree to our Terms & Privacy Policy</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}


// "use client";

// import { useActionState, useEffect, useState } from "react";
// import { signUp, signInWithGoogle } from "@/lib/supabase/action";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { User, Mail, Lock, UserPlus, Loader2 } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { GlobalLoader } from "./ui/loader";
// import { ApiResponse } from "@/types/api-response";

// const initialState: ApiResponse<{ redirectTo: string }> = {
//   success: false,
//   message: "",
// };

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const router = useRouter();

//   const [state, formAction, isPending] =
//     useActionState(signUp, initialState);

//   // UX-only states
//   const [isRedirecting, setIsRedirecting] = useState(false);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);

//   // 🔑 SAME EFFECT PATTERN AS LOGIN (THIS FIXES FREEZE)
//   useEffect(() => {
//     if (!state.timestamp) return;

//     if (state.success) {
//       toast.success(state.message);

//       if (state.data?.redirectTo) {
//         setIsRedirecting(true);
//         router.replace(state.data.redirectTo);
//       }
//     } else if (state.message) {
//       toast.error(state.message);
//       setIsRedirecting(false);
//     }
//   }, [state, router]);

//   const isLoading = isPending || isRedirecting;

//   async function handleGoogleClick() {
//     try {
//       setIsGoogleLoading(true);
//       await signInWithGoogle("/");
//     } catch (error) {
//       console.error("Google signup error:", error);
//       setIsGoogleLoading(false);
//     }
//   }

//   return (
//     <>
//       {/* ✅ OAuth loader ONLY */}
//       <GlobalLoader
//         show={isGoogleLoading}
//         message="Redirecting to Google..."
//       />

//       <div
//         className={cn(
//           "relative flex flex-col gap-6 w-full max-w-md mx-auto px-4 sm:px-0",
//           className
//         )}
//         {...props}
//       >
//         {/* Background */}
//         <div className="absolute inset-0 -z-10">
//           <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
//           <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
//         </div>

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-4"
//         >
//           <h1 className="text-3xl sm:text-4xl font-bold mb-2">
//             <span className="bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
//               Join KRF&apos;26
//             </span>
//           </h1>
//           <p className="text-gray-400">
//             Create your account and start exploring
//           </p>
//         </motion.div>

//         {/* Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl"
//         >
//           <form action={formAction} className="space-y-5">
//             {/* REQUIRED */}
//             <input type="hidden" name="redirectTo" value="/" />

//             {/* Name */}
//             <div className="relative">
//               <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 name="name"
//                 required
//                 placeholder="John Doe"
//                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
//               />
//             </div>

//             {/* Email */}
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 placeholder="Email"
//                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 placeholder="Password"
//                 className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
//               />
//             </div>

//             {/* Submit */}
//             <button
//               disabled={isLoading}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="inline animate-spin mr-2" />
//                   {state.success ? "Redirecting..." : "Signing up..."}
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="inline mr-2" />
//                   Create Account
//                 </>
//               )}
//             </button>

//             {/* Google */}
//             <button
//               type="button"
//               onClick={handleGoogleClick}
//               disabled={isGoogleLoading}
//               className="w-full py-4 border border-white/20 rounded-xl"
//             >
//               {isGoogleLoading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <FcGoogle />
//               )}
//               Continue with Google
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     </>
//   );
// }
