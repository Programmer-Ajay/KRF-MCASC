"use client"

import { useEffect,useState } from "react"
import { useReducedMotion } from "framer-motion"
import { POSITIONS } from "./gallery.constants"
import GalleryItem from "./gallery-item"
import { galleryVariants } from "./gallery.variants"

type ImageItem={
    id:string,
    url:string
}

type Props={
    images:ImageItem[]
}

export default function GalleryCarousel({images}:Props){

    const count= images.length
    const reducedMotion=useReducedMotion()??false

    const isMobile=typeof window != "undefined"&&window.innerWidth<768;


     const [indexes, setIndexes] = useState(
    images.map((_, i) => i)
  );

  useEffect(() => {
    if (count === 0) return;

    const interval = setInterval(() => {
      setIndexes((prev) => prev.map((i) => (i + 1) % count));
    }, 3000);

    return () => clearInterval(interval);
  }, [count]);

  const variants = galleryVariants(isMobile, reducedMotion);

   return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
      {images.map((img, idx) => {
        const position = POSITIONS[indexes[idx] % POSITIONS.length];

        return (
          <GalleryItem
            key={img.id}
            url={img.url}
            position={position}
            variants={variants}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
}

