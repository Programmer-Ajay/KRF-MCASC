
"use client";
import { useState } from "react";
import {
  Calendar,
  Award,
  MessageCircle,
  HelpCircle,
  Code,
 
} from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { GlobalLoader } from "../ui/loader";
/* ICON MAP */
const iconMap = {
  seminar: Calendar,
  project: Award,
  debate: MessageCircle,
  quiz: HelpCircle,
  programming: Code,
  shortfilm: Award,
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
  type:
    | "seminar"
    | "project"
    | "debate"
    | "quiz"
    | "programming"
    | "shortfilm" ;
};

export default function EventCard({
  title,
  description,
  color,
  type,
}: Props) {
  const Icon = iconMap[type] || HelpCircle;
  const [isLoading,setIsLoading]=useState(false);
  // Mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Convert mouse → rotation
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
  }

  return (
    <>
    <GlobalLoader show={isLoading} message=""/>
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
      `}
    >
      {/*  clickable card */}
      <Link
        href={`/events?event=${type}`}
        onClick={()=>setIsLoading(true)}>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${iconBg[color]}`}
        style={{ transform: "translateZ(30px)" }}
      >
        <Icon size={22} />
      </div>

      <h3
        className="text-lg font-semibold mb-2 text-white"
        style={{ transform: "translateZ(20px)" }}
      >
        {title}
      </h3>

      <p
        className="text-gray-400 text-sm mb-6"
        style={{ transform: "translateZ(15px)" }}
      >
        {description}
      </p>

      <div
        
        className="text-cyan-400 hover:text-pink-500 transition"
        style={{ transform: "translateZ(20px)" }}
      >
        Register Now →
        </div>
      </Link>
    </motion.div>
    </>
  );
}


