"use client"
import { motion } from "framer-motion";
import { CheckCircle2, Home, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import Confetti from "react-confetti"


export default function RegistrationSuccessPage() {

  // Simple window size tracking for confetti (optional)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });


  useEffect(() => {
    // Set window size to ensure confetti covers the whole screen
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    //optional handle the rezsie if the user resiezes the browser
    const handleResize=()=>setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize',handleResize);
    return ()=> window.removeEventListener('resize',handleResize)
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">

        {windowSize.width > 0 && (
        <Confetti 
            width={windowSize.width} 
            height={windowSize.height}
            numberOfPieces={500} // Adjust density
            recycle={false} // Stops after one burst (set true for infinite)
            colors={['#EC4899', '#8B5CF6', '#3B82F6']} // Your brand colors (Pink, Purple, Blue)
        />
      )}
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="max-w-md w-full bg-[#0F0F0F] border border-white/10 rounded-3xl p-8 text-center relative z-10 shadow-2xl"
      >
        {/* Success Icon Animation */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={48} className="text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-2">Registration Confirmed!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for registering. Your spot has been reserved. We are excited to see you at the event!
        </p>

        {/* Buttons Stack */}
        <div className="space-y-4">
          
          {/* WhatsApp Button */}
          <Link
            href="https://chat.whatsapp.com/KrTBBqRG6hI4UCyEBwEHhs?mode=gi_t" 
            target="_blank"
            className="block w-full group relative overflow-hidden rounded-xl bg-[#25D366] p-1px transition-all hover:bg-[#20bd5a]"
          >
            <div className="relative flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-white transition-all group-hover:bg-opacity-90">
              <FaWhatsapp size={20} className="fill-white" />
              <span className="font-semibold">Join WhatsApp Group</span>
            </div>
          </Link>

          {/* Home Button */}
          <Link
            href="/"
            className="block w-full group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-1px transition-all hover:bg-white/10"
          >
            <div className="relative flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-gray-300 transition-all group-hover:text-white">
              <Home size={18} />
              <span className="font-medium">Back to Home</span>
            </div>
          </Link>

        </div>

       
      </motion.div>
    </div>
  );
}