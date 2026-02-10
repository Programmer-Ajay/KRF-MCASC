"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { UserProfilePopup } from "./user-profile-popup"
import { NAV_LINKS } from "../navigation/nav-links"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"
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

       <Link href="/" className="shrink-0">
            <span className=" font-black bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent flex items-center gap-1.5 text-3xl">
              KRE
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </span>
          </Link>

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
      px-5 py-2
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
      px-5 py-2
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
            <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="
      w-10 h-10 rounded-full overflow-hidden
      bg-linear-to-br from-pink-500/30 to-purple-500/30
      border border-white/20
      shadow-lg shadow-pink-500/20
      flex items-center justify-center
      hover:from-pink-500/40 hover:to-purple-500/40
      transition-all duration-200
    "
  >
    {user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
      <img
        src={
          user.user_metadata.avatar_url ||
          user.user_metadata.picture
        }
        alt={user?.user_metadata?.name ?? "User avatar"}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    ) : (
      <span className="text-sm font-bold text-white uppercase leading-none">
        {user?.user_metadata?.name?.charAt(0) ?? "U"}
      </span>
    )}
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
