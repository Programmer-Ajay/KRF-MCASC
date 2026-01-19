"use client"

import { motion, useReducedMotion} from "framer-motion"

export default function GalleryTitle(){
    const  reducedMotion=useReducedMotion()

    return(
       <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="absolute top-10 w-full text-center z-20"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold
                   bg-linear-to-r from-purple-500 via-pink-500 to-indigo-600
                   bg-clip-text text-transparent"
        animate={{
          textShadow: reducedMotion
            ? "none"
            : [
                "0 0 8px rgba(123,79,160,0.3)",
                "0 0 18px rgba(123,79,160,0.6)",
                "0 0 8px rgba(123,79,160,0.3)",
              ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Memories
      </motion.h1>
    </motion.div> 
    )
}