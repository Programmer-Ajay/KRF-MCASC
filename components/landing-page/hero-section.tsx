  "use client"
  import { motion } from "framer-motion"
  import Kartikya from "@/public/images/Kartikya.jpg"
  import   logo  from "@/public/images/logo.png"
  import { Calendar ,MapPin } from "lucide-react"
  import Image from "next/image"

  const   HeroSection=()=> {
   return (
 <main className="relative h-screen w-full overflow-hidden">

{/* background video */}
  
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/video/main_bg.mp4" type="video/mp4" />
  </video>
     {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30"></div>

       <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-start sm:justify-center pt-24 sm:pt-0 px-4 text-center"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, delay: 0.1 }}
            >
             

{/* College Identity */}
<div className="pointer-events-auto text-center mb-4 mt-6">
  <p className="text-base sm:text-base font-medium text-white/75 leading-tight mb-1">
    Progressive Education Society&apos;s
  </p>

  <div className="flex items-center justify-center gap-3 flex-wrap">
    <Image
      src={logo}
      alt="College Logo"
      className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
    />

    <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
      MODERN COLLEGE OF ARTS, SCIENCE AND COMMERCE (AUTONOMOUS),
      <span className="text-white/80 font-medium">
        {" "}Shivajinagar, Pune – 411005
      </span>
    </p>
  </div>
</div>



                {/* Gradient Fest Name */}

                 <h2 className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg pointer-events-auto">
                     Kartikeya Rindani Fest
                 </h2> 

                 {/* Description */}
                 <p className="text-white/80 text-sm sm:text-base md:text-lg mt-3 max-w-2xl px-4 pointer-events-auto">
                     Where talent meets opportunity. Join us for an electrifying celebration of creativity, innovation, and endless possibilities.
                 </p>


{/* Circular Image of Kartikya*/}
<div className="relative mt-6 pointer-events-auto">
  <div
    className="
      relative rounded-full p-1
      bg-transparent
      shadow-[0_0_0_3px_rgba(200,190,255,0.85),0_0_40px_12px_rgba(140,120,255,0.45)]
    "
  >
    <Image
      src={Kartikya}
      alt="Kartikya Rindani"
      width={192}
      height={192}
      className="
        w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48
        rounded-full object-cover bg-black
      "
    />
  </div>
</div>





                {/* Date & Location badges like second image */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 pointer-events-auto">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/20 transition-colors duration-300">
                        <Calendar size={18} className="text-cyan-400" /> February 20-21, 2026
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/20 transition-colors duration-300">
                        <MapPin size={18} className="text-pink-500" />  Modern College Campus
                    </div>
                </div>  
      </motion.div>
 </main>
 

  )
}

export default HeroSection




