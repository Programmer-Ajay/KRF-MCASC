// components/Preloader.tsx     
"use client"
import { motion } from "framer-motion"

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }} // Adds a slight "zoom out" effect on exit
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black overflow-hidden"
    >
      {/* The Video Container */}
      <div className="relative w-full h-full">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover sm:object-contain bg-black"
          onEnded={onComplete} // Triggers when the 3s video finishes
        >
          <source src="/video/preloader.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Skip Button - Accessible and mobile-friendly */}
        <button 
          onClick={onComplete}
          className="absolute bottom-10 right-10 z-1000 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium rounded-full transition-all active:scale-95"
        >
          Skip Intro
        </button>
      </div>

      {/* Decorative Overlay to match your Hero vibe */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/60 pointer-events-none" />
    </motion.div>
  )
}