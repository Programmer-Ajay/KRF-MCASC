

// components/header.tsx
// import { createClient } from "@/lib/supabase/server"
import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole"
import DesktopNav from "./desktop-nav"
import MobileNav from "./mobile-nav"

export default async function Header() {
  // const supabase = await createClient()
  // const { data } = await supabase.auth.getClaims()
  // const user = data?.claims ?? null

  const {user,role}= await getCurrentUserWithRole();

  return (
    <>
      <DesktopNav user={user} role={role} />
      <MobileNav user={user} role={role} />
    </>
  )
}




































// import Link from "next/link"
// import { createClient } from "@/lib/supabase/server"
// import { Button } from "@/components/ui/button"
// // import { signOut } from "@/lib/supabase/action"
// import { LogoutButton } from "./login-button"
// export default async function Header() {

  
//   const supabase = await createClient()
//   const { data } = await supabase.auth.getClaims();

//   const user = data?.claims;

  
  

//   return (
//     <nav className="w-full border-b border-border bg-background">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
//         {/* Logo */}
//         <Link href="/" className="text-lg font-semibold">
//           MyApp
//         </Link>

//         {/* Right side */}
//         {!user ? (
//           <div className="flex items-center gap-3">
//             <Link href="/login" prefetch={false}>
//               <Button variant="ghost">Sign in</Button>
//             </Link>

//             <Link href="/register" prefetch={false}>
//               <Button>Sign up</Button>
//             </Link>
//           </div>
//         ) : (
//           <div className="flex items-center gap-4">
//             <div className="text-right text-sm">
//               <p className="font-medium">
//                 {user.user_metadata?.full_name ?? "User"}
//               </p>
//               <p className="text-muted-foreground">
//                 {user.email}
//               </p>
//             </div>
                
//               {/* <Button variant="outline" type="submit" >
//                 Logout
//               </Button> */}
//               <LogoutButton />
            
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }






// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";

// const navLinks = [
//   { name: "Home", href: "/", effect: "hover:text-blue-400" },
//   { name: "Events", href: "/#events", effect: "hover:text-pink-500" },
//   { name: "Gallery", href: "/#gallery", effect: "hover:text-cyan-400" },
//   { name: "About", href: "/about", effect: "hover:text-purple-400" },
// ];

// export default function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-9 py-4 flex items-center justify-between">
        
//         <span className="text-2xl md:text-4xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-black">
//           KRF&apos;26
//         </span>

//         <div className="hidden md:flex items-center gap-8">
//           <div className="flex space-x-6 text-lg font-semibold">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`text-gray-400 ${link.effect} transition`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           <Link href="/register">
//             <Button className="bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 text-black px-6 py-2 rounded-xl">
//               Register
//             </Button>
//           </Link>
//         </div>

//         <motion.button
//           className="md:hidden w-10 h-10 flex items-center justify-center text-white"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           whileTap={{ scale: 0.9 }}
//         >
//           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </motion.button>
//       </div>

//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
//           >
//             <div className="px-6 py-6 space-y-6">
//               {navLinks.map((link) => (
//                 <motion.div key={link.name} whileHover={{ x: 10 }}>
//                   <Link
//                     href={link.href}
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="block text-lg text-zinc-300 hover:text-white"
//                   >
//                     {link.name}
//                   </Link>
//                 </motion.div>
//               ))}

//               <Link href="/register">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 text-black font-semibold"
//                 >
//                   Register
//                 </motion.button>
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }