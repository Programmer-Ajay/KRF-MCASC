"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { UserProfilePopup } from "./user-profile-popup"
import { NAV_LINKS } from "../navigation/nav-links"
import { cn } from "@/lib/utils"

type Props={
  user:any,
  role:string
}

export default function DesktopNav({ user,role }:Props) {
  const [open, setOpen] = useState(false)
  const isAdmin = role === "admin"


// console.log("isAdmin",isAdmin)
//   console.log("USER:",user)
//   console.log("ADMIN:",role)
  return (
    <nav className="hidden md:block fixed top-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <span className="text-3xl font-black bg-linear-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent" 
        >
          KRF&apos;26
        </span>

        <div className="flex items-center gap-8">
          {NAV_LINKS.map(link => (
             <Link
           key={link.name}
          href={link.href}
           className={cn(
           "text-gray-300 transition-colors duration-200",
           link.effect
            )}
        >  {link.name}
           </Link>
          ))}

          {!user ? (
            <>
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
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-linear-to-br from-pink-500/20 to-blue-500/20 border border-white/20 flex items-center justify-center hover:from-pink-500/30 hover:to-blue-500/30 transition-all duration-200"
              >
                <User className="text-white" />
              </button>

              <UserProfilePopup
                user={user}
                role={role}
                isOpen={open}
                onClose={() => setOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
