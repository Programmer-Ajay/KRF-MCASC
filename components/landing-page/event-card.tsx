
"use client"


import { useState } from "react";
import {
  Calendar,
  Award,
  MessageCircle,
  HelpCircle,
  Code,
  Brush,
  MapPin,
  Clock,
  Info,
  User,
  Mail,
  Phone,
  Hourglass
} from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { GlobalLoader } from "../ui/loader";

/* ICON MAP */
const iconMap: any = {
  seminar: Calendar,
  project: Award,
  debate: MessageCircle,
  quiz: HelpCircle,
  programming: Code,
  shortfilm: Award,
  poster: Brush,
};

const glowStyles = {
  cyan: "hover:border-cyan-400/50 hover:shadow-cyan-500/30",
  pink: "hover:border-pink-400/50 hover:shadow-pink-500/30",
  orange: "hover:border-orange-400/50 hover:shadow-orange-500/30",
  purple: "hover:border-purple-400/50 hover:shadow-purple-500/30",
};

const iconBg = {
  cyan: "bg-cyan-500/20 text-cyan-400",
  pink: "bg-pink-500/20 text-pink-400",
  orange: "bg-orange-500/20 text-orange-400",
  purple: "bg-purple-500/20 text-purple-400",
};

type Props = {
  title: string;
  description: string;
  color: "cyan" | "pink" | "orange" | "purple";
  type: string;
  // Updated Prop Types
  venue: string;
  eventDate: string | null;
  eventTime: string | null;
  registrationDeadline: string | null;
  coordinatorName: string;
  coordinatorEmail: string;
  coordinatorMobile: string | null;
};

export default function EventCard({
  title,
  description,
  color,
  type,
  venue,
  eventDate,
  eventTime,
  registrationDeadline,
  coordinatorName,
  coordinatorEmail,
  coordinatorMobile
}: Props) {
  
  const Icon = iconMap[type.toLowerCase()] || HelpCircle;
  const [isLoading, setIsLoading] = useState(false);
  const [showCoordinator, setShowCoordinator] = useState(false);

  // Mouse position logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setShowCoordinator(false); 
  }

  // Format the deadline for display (e.g., "Ends: Jan 20")
  const deadlineDisplay = registrationDeadline 
    ? new Date(registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : "Open";

  return (
    <>
      <GlobalLoader show={isLoading} message="Register now and be part of the fun 🎉" />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`
        tilt-card
        relative rounded-2xl border border-white/10 bg-white/5
        p-6 backdrop-blur-xl transition-shadow duration-300
        hover:shadow-2xl ${glowStyles[color]}
        flex flex-col h-full
      `}
      >

        {/* --- COORDINATOR POPUP (Top Right) --- */}
        {(coordinatorName !== "Unknown Coordinator") && (
            <div 
                className="absolute top-4 right-4 z-20" 
                style={{ transform: "translateZ(40px)" }}
            >
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowCoordinator(!showCoordinator);
                    }}
                    className={`p-2 rounded-full ${iconBg[color]} hover:bg-white/10 transition-colors`}
                >
                    <Info size={16} />
                </button>

                {/*  Expanded Info Popup */}
                <AnimatePresence>
                    {showCoordinator && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute right-0 top-full mt-2 w-64 p-4 rounded-xl bg-[#0a0a0a] border border-white/20 backdrop-blur-md shadow-2xl z-30"
                        >
                            <p className="text-[10px] uppercase text-gray-500 font-bold mb-3 tracking-wider">Event Lead</p>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white/5"><User size={14} className="text-gray-300" /></div>
                                    <span className="text-sm text-white font-medium">{coordinatorName}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 rounded-full bg-white/5"><Mail size={14} className="text-gray-300" /></div>
                                    <span className="text-xs text-gray-400 break-all">{coordinatorEmail}</span>
                                </div>
                                {coordinatorMobile !== "N/A" && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 rounded-full bg-white/5"><Phone size={14} className="text-gray-300" /></div>
                                        <span className="text-xs text-gray-400">{coordinatorMobile}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )}


        {/* --- CARD CONTENT --- */}
        <Link
          href={`/events?event=${type}`}
          onClick={() => setIsLoading(true)}
          className="flex-1 flex flex-col"
        >
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconBg[color]}`}
            style={{ transform: "translateZ(30px)" }}
          >
            <Icon size={22} />
          </div>

          {/* Title */}
          <h3
            className="text-lg font-semibold mb-2 text-white"
            style={{ transform: "translateZ(20px)" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-gray-400 text-sm mb-4 line-clamp-2"
            style={{ transform: "translateZ(15px)" }}
          >
            {description}
          </p>

          <div className="mt-auto space-y-3">
              {/*  Row 1: Date & Time */}
              <div 
                className={`flex items-center justify-between  gap-2 text-xs text-white ${iconBg[color]} p-2  rounded-lg border border-white/5`}
                style={{ transform: "translateZ(15px)" }}
              >  
              <div className="flex gap-2">
                 <Calendar size={14} className="text-purple-400" />
                 <span className="font-medium">{eventDate || "TBA"}</span>
                </div>
                 <div className="flex gap-2" >
                 {eventTime && (
                    <>
                        {/* <span className="text-gray-600">|</span> */}
                        <Clock size={14} className="text-purple-400" />
                        <span>{eventTime}</span>
                    </>
                 )}
                  </div>
              </div>

              {/* Row 2: Venue & Deadline */}
              <div 
                className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-white/10"
                style={{ transform: "translateZ(15px)" }}
              >
                <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="truncate max-w-50 min-w-35">{venue}</span>
                </div>
                
                {/* Registration Deadline Tooltip style */}
                <div className="flex items-center gap-1.5 text-orange-400/80" title={`Register by ${deadlineDisplay}`}>
                    <Hourglass size={14} />
                    <span>Ends {deadlineDisplay}</span>
                </div>
              </div>
          </div>

          {/* CTA */}
          <div
            className="mt-4 text-cyan-400 hover:text-pink-500 transition text-sm font-medium"
            style={{ transform: "translateZ(20px)" }}
          >
            Register Now →
          </div>
        </Link>
      </motion.div>
    </>
  );
}






// "use client";
// import { useState } from "react";
// import {
//   Calendar,
//   Award,
//   MessageCircle,
//   HelpCircle,
//   Code,
//  Brush
// } from "lucide-react";
// import Link from "next/link";
// import { motion, useMotionValue, useTransform } from "framer-motion";
// import { GlobalLoader } from "../ui/loader";
// /* ICON MAP */
// const iconMap = {
//   seminar: Calendar,
//   project: Award,
//   debate: MessageCircle,
//   quiz: HelpCircle,
//   programming: Code,
//   shortfilm: Award,
//   poster: Brush
// };

// const glowStyles = {
//   cyan: "hover:border-cyan-400/50 hover:shadow-cyan-500/30",
//   pink: "hover:border-pink-400/50 hover:shadow-pink-500/30",
//   orange: "hover:border-orange-400/50 hover:shadow-orange-500/30",
//   purple: "hover:border-purple-400/50 hover:shadow-purple-500/30",
// };

// const iconBg = {
//   cyan: "bg-cyan-500/20 text-cyan-400",
//   pink: "bg-pink-500/20 text-pink-400",
//   orange: "bg-orange-500/20 text-orange-400",
//   purple: "bg-purple-500/20 text-purple-400",
// };

// type Props = {
//   title: string;
//   description: string;
//   color: "cyan" | "pink" | "orange" | "purple";
//   type: string;
//   venue: string;
//   eventDate: string | null;
//   eventTime: string | null;
//   registrationDeadline: string | null;
//   coordinatorName: string;
//   coordinatorEmail: string;
//   coordinatorMobile: string;
// };

// export default function EventCard({
//   title,
//   description,
//   color,
//   type,
// }: Props) {
//   const Icon = iconMap[type] || HelpCircle;
//   const [isLoading,setIsLoading]=useState(false);
//   // Mouse position
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   // Convert mouse → rotation
//   const rotateX = useTransform(y, [-50, 50], [10, -10]);
//   const rotateY = useTransform(x, [-50, 50], [-10, 10]);

//   function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
//     const rect = e.currentTarget.getBoundingClientRect();
//     x.set(e.clientX - rect.left - rect.width / 2);
//     y.set(e.clientY - rect.top - rect.height / 2);
//   }

//   function handleMouseLeave() {
//     x.set(0);
//     y.set(0);
//   }

//   return (
//     <>
//     <GlobalLoader show={isLoading} message=""/>
//     <motion.div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         rotateX,
//         rotateY,
//         transformStyle: "preserve-3d",
//       }}
//       className={`
//         tilt-card
//         relative rounded-2xl border border-white/10 bg-white/5
//         p-6 backdrop-blur-xl transition-shadow duration-300
//         hover:shadow-2xl ${glowStyles[color]}
//       `}
//     >
//       {/*  clickable card */}
//       <Link
//         href={`/events?event=${type}`}
//         onClick={()=>setIsLoading(true)}>
//       <div
//         className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconBg[color]}`}
//         style={{ transform: "translateZ(30px)" }}
//       >
//         <Icon size={22} />
//       </div>

//       <h3
//         className="text-lg font-semibold mb-2 text-white"
//         style={{ transform: "translateZ(20px)" }}
//       >
//         {title}
//       </h3>

//       <p
//         className="text-gray-400 text-sm mb-6"
//         style={{ transform: "translateZ(15px)" }}
//       >
//         {description}
//       </p>

//       <div
        
//         className="text-cyan-400 hover:text-pink-500 transition"
//         style={{ transform: "translateZ(20px)" }}
//       >
//         Register Now →
//         </div>
//       </Link>
//     </motion.div>
//     </>
//   );
// }

