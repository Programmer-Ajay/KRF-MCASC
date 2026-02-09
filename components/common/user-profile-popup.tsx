"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, LayoutDashboard, Ticket, Award } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "./logout-button"
import { MyCertificatesDialog } from "../landing-page/user/my-certificates"
type UserProfilePopupProps = {
  user: any
  role: string
  isOpen: boolean
  onClose: () => void
}

export function UserProfilePopup({
  user,
  role,
  isOpen,
  onClose,
}: UserProfilePopupProps) {

  const popupRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = role === "admin";
  const isCoordinator = role === "coordinator";
  const isRegularUser = !isAdmin && !isCoordinator;

  useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
   const target = event.target as HTMLElement;

      // 1. Check if the click is INSIDE the popup
      // If yes, we simply RETURN (do nothing), so the button click can happen
  if (popupRef.current && popupRef.current.contains(target as Node)) {
   return;
   }

      // 2. Check if the click is inside an open Dialog (Radix/Shadcn Portal)
      // If yes, we RETURN (do not close the user popup)
  if (target.closest('[role="dialog"]')) {
 return;
 }

      // 3. If the click was NEITHER inside the popup NOR inside a dialog...
      // THEN we close it (User clicked on the dark background/empty space)
    onClose(); }
   if (isOpen) {
   document.addEventListener("mousedown", handleClickOutside)
 return () =>
 document.removeEventListener("mousedown", handleClickOutside)

}
 }, [isOpen, onClose])

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-3 w-80 rounded-2xl bg-[#050505] border border-purple-500/30 backdrop-blur-xl p-6 shadow-2xl shadow-purple-900/40 z-50"
        >
          {/* User Info Section */}
          <div className="mb-5 pb-5 border-b border-purple-500/20">
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden 
                    bg-linear-to-br from-pink-500/30 to-purple-500/30 
                    border border-purple-400/50 
                    shadow-lg shadow-pink-500/20 
                    flex items-center justify-center shrink-0">

                {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                  <img
                    src={user.user_metadata.avatar_url || user.user_metadata.picture}
                    alt={user?.user_metadata?.name ?? "User avatar"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xl font-bold text-pink-300 uppercase">
                    {user?.user_metadata?.name?.charAt(0) ?? "U"}
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {user?.user_metadata?.name ?? "User"}
                </p>
                <p className="text-xs text-purple-300/70 truncate">{user?.email}</p>
              </div>
            </div>

            {/* --- ADMIN SECTION --- */}
            {isAdmin && (
              <>
                <div className="flex items-center gap-2 px-3 mb-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-300">Admin Access</span>
                </div>
                <Link
                  href="/admin"
                  onClick={() => { onClose(); setIsLoading(true); }}
                  className="block w-full px-4 py-3 rounded-xl bg-purple-600/20 border border-purple-500/40 text-sm font-semibold text-purple-200 hover:bg-purple-600/30 transition-all text-center shadow-lg shadow-purple-900/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Dashboard
                  </div>
                </Link>
              </>
            )}
            
            {/* --- COORDINATOR SECTION --- */}
            {isCoordinator && (
              <>
                <div className="flex items-center gap-2 px-3 mb-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-cyan-300">Coordinator Access</span>
                </div>
                <Link
                  href="/coordinator"
                  onClick={() => { onClose(); setIsLoading(true); }}
                  className="block w-full px-4 py-3 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-sm font-semibold text-cyan-200 hover:bg-cyan-600/30 transition-all text-center shadow-lg shadow-cyan-900/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Coordinator Dashboard
                  </div>
                </Link>
              </>
            )}

            {/* --- USER SECTION (Registrations & Certificates) --- */}
            {isRegularUser && (
                <div className="space-y-2">
                    {/* <Link
                        href="/"
                        onClick={() => { onClose(); setIsLoading(true); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all group"
                    >
                        <Ticket className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                        My Registrations
                    </Link> */}

                    {/*  Integrated Component */}
                    <MyCertificatesDialog>
                         <button 
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all group text-left"
                            // onClick={onClose} // Close this popup so the Dialog takes focus
                         >
                            <Award className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
                            My Certificates
                         </button>
                    </MyCertificatesDialog>
                </div>
            )}

          </div>

          {/* Logout Button */}
          <div onClick={onClose} className="mb-4">
            <LogoutButton />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-purple-500/20 text-center">
            <p className="text-[10px] text-purple-300/40 uppercase tracking-widest font-bold">
               Role: {role}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}