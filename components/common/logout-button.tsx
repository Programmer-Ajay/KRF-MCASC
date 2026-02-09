"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "@/lib/supabase/action"
import {toast} from "react-toastify"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { GlobalLoader } from "../ui/loader"
export function LogoutButton() {
 const router=useRouter()
 const [isLoading,setIsLoading]=useState(false)

  async function handleLogout(e:React.MouseEvent) {
    e.stopPropagation()
    try {
      setIsLoading(true)

      const res=await signOut()   
    if (!res.success) {
      setIsLoading(false)
  toast.error(res.message);
  return;
    }

    const redirectTo = res.data?.redirectTo;

    router.replace(res.data?.redirectTo || "/login")
    // toast.success(res.message);  
    }
     catch (error:any) {
      console.log("logout error:",error) 
  }
}
  return (
    <>
    {/* show the loader */}
    <GlobalLoader show={isLoading} message="See you soon! We’ll be waiting ✨😊"/>
    <Button 
      onClick={handleLogout}
      className="w-full bg-linear-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg shadow-lg shadow-red-500/30 transition-all duration-300 active:scale-95"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
    </>
  )
}

