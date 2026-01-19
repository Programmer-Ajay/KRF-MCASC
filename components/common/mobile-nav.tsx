"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, X, LayoutDashboard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LogoutButton } from "./logout-button"
import { NAV_LINKS } from "../navigation/nav-links"
import { cn } from "@/lib/utils"

type Props={
  user:any,
  role:string
}

export default function MobileNav({ user , role }: Props) {
  const [open, setOpen] = useState(false)
  const isAdmin = role==="admin";
  const isCoordinator= role ==="coordinator";

  return (
    <nav className="md:hidden fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="px-4 py-4 flex justify-between items-center">

        <span className="text-2xl font-black bg-linear-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
          KRF&apos;26
        </span>

        <button 
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500/20 to-blue-500/20 border border-white/20 flex items-center justify-center hover:from-pink-500/30 hover:to-blue-500/30 transition-all duration-200"
        >
          {open ? <X className="text-white" /> : <User className="text-white" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-linear-to-b from-black/95 to-black/80 border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              {NAV_LINKS.map(link => (
                <Link
              key={link.name}
               href={link.href}
               className={cn(
               "block  text-gray-300 transition-colors duration-200",
                link.effect
                  )}
               >{link.name}
               </Link>
              ))}

              {!user ? (
                <div className="flex flex-col gap-2">
     <Button asChild>
     <Link
    href="/login"
    className="
       rounded-full 
      cursor-pointer
      bg-linear-to-r
      from-cyan-400 via-pink-400 to-orange-400
      text-primary-foreground
      transition-all duration-300
      hover:from-cyan-500 hover:via-pink-500 hover:to-orange-500
      hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30
    ">
    Sign in
  </Link>
</Button>

  <Button asChild>
     <Link
    href="/register"
    className="
     block
       rounded-full 
      cursor-pointer
      bg-linear-to-r
      from-cyan-400 via-pink-400 to-orange-400
      text-primary-foreground
      transition-all duration-300
      hover:from-cyan-500 hover:via-pink-500 hover:to-orange-500
      hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30
    "
  >
    Sign up
  </Link>
    </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="pb-3">
                    <p className="text-sm font-semibold text-white">
                      {user.user_metadata?.name ?? "User"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user.email}
                    </p>
                    {isAdmin && (
                      <>
                      <p className="text-xs text-purple-400 font-medium mt-1">Admin</p>
                      <Button asChild className="w-full bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300">
                      <Link href="/admin" className="flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Admin
                      </Link>
                    </Button>
                    </>
                    )}
                  </div>
                  {isCoordinator && (
                    <>
                      <p className="text-xs text-purple-400 font-medium mt-1">Coordinator</p>
                      <Button asChild className="w-full bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300">
                      <Link href="/coordinator" className="flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Coordinator
                      </Link>
                    </Button>
                    </>
                  )}
                  <LogoutButton />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
