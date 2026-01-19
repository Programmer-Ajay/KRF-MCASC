"use client"

import GalleryTitle from "./gallery-title";
import GalleryCarousel from "./gallery-carousel";

import { GALLERY_IMAGES } from "./gallery.constants";
const GallerySection=()=>{

    return (
       <section
      id="gallery"
      className="relative flex items-center justify-center h-screen
                 bg-linear-to-b from-black via-gray-900 to-black
                 overflow-hidden"
    >
      <GalleryTitle />
      <GalleryCarousel images={GALLERY_IMAGES} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-600 opacity-10 blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600 opacity-10 blur-3xl" />
      </div>
    </section>
    )
}

export default GallerySection;