"use client"

import {  useRef, useEffect ,useState} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Shield, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "./logout-button"
import { GlobalLoader } from "../ui/loader"
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
   const [isLoading,setIsLoading]=useState(false);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () =>
        document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
     <>
     {/* <GlobalLoader show={isLoading} message="loading..."/> */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-3 w-80 rounded-2xl bg-linear-to-br from-slate-950 via-purple-950/50 to-black border border-purple-500/30 backdrop-blur-xl p-6 shadow-2xl shadow-purple-900/40 z-50"
        >
          {/* User Info Section */}
          <div className="mb-5 pb-5 border-b border-purple-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-pink-500/30 to-purple-500/30 border border-purple-400/50 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <User className="w-7 h-7 text-pink-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {user?.user_metadata?.name ?? "User"}
                </p>
                <p className="text-xs text-purple-300/70 truncate">{user?.email}</p>
              </div>
            </div>

            {role ==="admin" && (
              <>
              <div className="flex items-center gap-2 px-3 mb-3 py-2 rounded-lg bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 shadow-lg shadow-purple-500/10">
                <Shield className="w-4 h-4 text-purple-300" />
                <span className="text-xs font-semibold text-purple-300">
                  Admin User
                </span>
              </div>
              <Link
              href="/admin"
              onClick={()=>{
                onClose;
                setIsLoading(true)
              }}
              className="block w-full mb-2  px-4 py-3 rounded-xl bg-linear-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/40 text-sm font-semibold text-purple-200 hover:from-purple-500/30 hover:to-indigo-500/30 hover:border-purple-400/60 transition-all duration-200 text-center shadow-lg shadow-purple-500/10"
            >
              <div className="flex items-center justify-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Admin 
              </div>
            </Link>
            </>
            )}
              
              {role ==="coordinator" && (
              <>
              <div className="flex items-center gap-2 px-3 mb-3 py-2 rounded-lg bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 shadow-lg shadow-purple-500/10">
                <Shield className="w-4 h-4 text-purple-300" />
                <span className="text-xs font-semibold text-purple-300">
                  Coordinator
                </span>
              </div>
              <Link
              href="/coordinator"
              onClick={()=>{
                onClose;
                setIsLoading(true)
              }}
              className="block w-full  px-4 py-3 rounded-xl bg-linear-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/40 text-sm font-semibold text-purple-200 hover:from-purple-500/30 hover:to-indigo-500/30 hover:border-purple-400/60 transition-all duration-200 text-center shadow-lg shadow-purple-500/10"
            >
              <div className="flex items-center justify-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Coordinator Dashboard
              </div>
            </Link>
            </>
            )}

            
          </div>

            


          {/* Logout Button */}
          <div onClick={onClose} className="mb-4">
            <LogoutButton />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-purple-500/20 text-center">
            <p className="text-xs text-purple-300/50">
              Logged in as <span className="text-purple-300 font-semibold">{role}</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
