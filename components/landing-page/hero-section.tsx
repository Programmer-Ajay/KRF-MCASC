  "use client"
  import { motion } from "framer-motion"
  import dummy from "@/public/images/dummy.jpg"
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
             {/* Smaller KRF'26 */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 pointer-events-auto">
          <Image
            src={logo}
            alt="College Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain i"
          />

          <div className="text-white leading-tight">
            <p className="text-sm sm:text-base font-semibold">
              Progressive Education Society&apos;s
            </p>
            <p className="text-base sm:text-lg font-bold">
              Modern College of Arts, Science and Commerce (Autonomous)
            </p>
            <p className="text-xs sm:text-sm text-white/80">
              Shivajinagar, Pune – 411005
            </p>
          </div>
        </div>
                {/* Gradient Fest Name */}

                 <h2 className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg pointer-events-auto">
                     Kartikeya Rindani Fest (2026)
                 </h2> 

                 {/* Description */}
                 <p className="text-white/80 text-sm sm:text-base md:text-lg mt-3 max-w-2xl px-4 pointer-events-auto">
                     Where talent meets opportunity. Join us for an electrifying celebration of creativity, innovation, and endless possibilities.
                 </p>

              {/* Circular Image */}
                 <Image
                     src={dummy}
                     alt="picture"
                     width={192}
                     height={192}
                     className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full opacity-80 mt-6 pointer-events-auto hover:opacity-100 object-cover shadow-lg"
                 /> 

                {/* Date & Location badges like second image */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 pointer-events-auto">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/20 transition-colors duration-300">
                        <Calendar size={18} className="text-cyan-400" /> March 15-17, 2025
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/20 transition-colors duration-300">
                        <MapPin size={18} className="text-pink-500" />  modern College new building Campus
                    </div>
                </div>  
      </motion.div>
 </main>
 

  )
}

export default HeroSection




