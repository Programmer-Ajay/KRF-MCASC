"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Info, 
  Sparkles, 
  X, 
  Award, 
  Ticket, 
  Home
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LogoutButton } from "./logout-button"
import { cn } from "@/lib/utils"
import { MyCertificatesDialog } from "../landing-page/user/my-certificates"
import { Button } from "../ui/button"


type Props = {
  user: any,
  role: string
}

export default function MobileNav({ user, role }: Props) {
  const [open, setOpen] = useState(false)
  
  const isAdmin = role === "admin";
  const isCoordinator = role === "coordinator";
  // Regular user is anyone who is NOT an admin AND NOT a coordinator
  const isRegularUser = !isAdmin && !isCoordinator;

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  // Helper: Avatar Component
  const UserAvatar = ({ className, textClass }: { className?: string, textClass?: string }) => (
    <div className={cn("rounded-full overflow-hidden border border-white/20 bg-zinc-900 flex items-center justify-center shrink-0 relative", className)}>
      {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
        <img
          src={user.user_metadata.avatar_url || user.user_metadata.picture}
          alt={user?.user_metadata?.name ?? "User"}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className={cn("font-bold text-white uppercase leading-none", textClass)}>
          {user?.user_metadata?.name?.charAt(0) ?? "U"}
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* --- TOP NAVBAR --- */}
      <nav className="md:hidden fixed top-0 w-full z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 h-16">
        <div className="px-4 h-full flex justify-between items-center">

          {/* 1. LOGO */}
          <Link href="/" className="shrink-0">
            <span className="text-xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent flex items-center gap-1.5">
              KRF
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            </span>
          </Link>

          {/* 2. RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {!user ? (
                /* GUEST MODE */
                <>
                <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white">About</Link>

    <Button asChild>
      <Link
    href="/login"
    className="
      rounded-full
      px-3 py-2
      cursor-pointer
      text-pink-400
      border-2 border-pink-500
      bg-transparent
      transition-all duration-300 ease-out
      hover:text-pink-300
      hover:bg-pink-500/15
      hover:shadow-[0_0_20px_rgba(236,72,153,0.75)]
      hover:-translate-y-0.5
      active:scale-95
    "
  >
    Sign in
  </Link>
</Button>


 <Button asChild>
  <Link
    href="/register"
    className="
      rounded-full
      px-3 py-2
      cursor-pointer
      text-white
      border-2 border-purple-500
      bg-purple-500/15
      transition-all duration-300 ease-out
      hover:bg-purple-500/25
      hover:shadow-[0_0_24px_rgba(168,85,247,0.8)]
      hover:-translate-y-0.5
      active:scale-95
    "
  >
    Sign up
  </Link>
</Button>


        </>
            ) : (
                /* USER MODE - Trigger Drawer */
                <button 
                  onClick={() => setOpen(true)}
                  className="relative focus:outline-none transition-transform active:scale-95"
                >
                  <UserAvatar className="w-10 h-10 border-2 border-transparent hover:border-purple-500/50" textClass="text-lg" />
                </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- SIDE DRAWER (SLIDE IN) --- */}
      <AnimatePresence>
        {open && user && (
          <>
            {/* A. Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm md:hidden"
            />

            {/* B. The Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-70 bg-[#0a0a0a] border-l border-white/10 z-50 shadow-2xl flex flex-col md:hidden"
            >
              
              {/* 1. Drawer Header (Profile) */}
              <div className="p-6 border-b border-white/10 relative bg-white/5">
                <button 
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col gap-3 mt-4">
                   <UserAvatar className="w-14 h-14 border-2 border-white/10" textClass="text-xl" />
                   <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {user.user_metadata?.name ?? "User"}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium truncate w-full">
                        {user.email}
                      </p>
                   </div>
                </div>
              </div>

              {/* 2. Main Navigation Links */}
              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                
                {/* GLOBAL LINKS */}
                <DrawerLink href="/" icon={<Home size={18} />} label="Home" onClick={() => setOpen(false)} />
                
                <div className="my-2 h-px bg-white/5" /> {/* Divider */}

                {/* --- CONDITIONAL SECTION: SWAPPING LINKS BASED ON ROLE --- */}
                
                {isAdmin ? (
                  // STATE A: ADMIN
                  <DrawerLink 
                    href="/admin" 
                    icon={<LayoutDashboard size={18} className="text-purple-400" />} 
                    label="Admin Dashboard" 
                    onClick={() => setOpen(false)}
                    className="bg-purple-500/10 text-purple-300 border border-purple-500/20" 
                  />
                ) : isCoordinator ? (
                  // STATE B: COORDINATOR
                  <DrawerLink 
                    href="/coordinator" 
                    icon={<LayoutDashboard size={18} className="text-cyan-400" />} 
                    label="Coordinator Panel" 
                    onClick={() => setOpen(false)}
                    className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20" 
                  />
                ) : (
                  // STATE C: REGULAR USER (Student)
                  // STATE C: REGULAR USER (Student)
                  <>
                    {/* <DrawerLink 
                      href="/" 
                      icon={<Ticket size={18} />} 
                      label="My Registrations" 
                      onClick={() => setOpen(false)} 
                    /> */}
                    
                  
                    <MyCertificatesDialog>
                        <button 
                           // We style this button exactly like your DrawerLink
                           className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all active:scale-95 text-left"
                           // Optional: Close the drawer when they click it (for a cleaner feel)
                          //  onClick={() => setOpen(false)}
                        >
                           <Award size={18} />
                           <span className="font-medium">My Certificates</span>
                        </button>
                    </MyCertificatesDialog>

                  </>
                )}

                <div className="my-2 h-px bg-white/5" /> {/* Divider */}

                <DrawerLink href="/about" icon={<Info size={18} />} label="About Us" onClick={() => setOpen(false)} />

              </div>

              {/* 3. Footer (Logout) */}
              <div className="p-4 border-t border-white/10 bg-black/20">
                 <LogoutButton />
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Helper Component for consistent links
function DrawerLink({ href, icon, label, onClick, className }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all active:scale-95",
        className
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}