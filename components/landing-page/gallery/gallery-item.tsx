"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type Props={
    url:string;
    position:string;
    variants:any;
    isMobile:boolean;
};


export default function GalleryItem({
  url,
  position,
  variants,
  isMobile,
}: Props) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: isMobile ? "80%" : "40%",
        height: isMobile ? "50%" : "60%",
        transformStyle: "preserve-3d",
      }}
      variants={variants}
      animate={position}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">


        <Image
          src={url}
          alt="Gallery image"
          fill
          className="rounded-xl object-contain "
          sizes="(max-width: 768px) 90vw, 40vw"
          priority={position === "center"}
        />
      </div>
    </motion.div>
  );
}