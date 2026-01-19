// components/gallery/gallery.variants.ts

export const galleryVariants = (
  isMobile: boolean,
  reducedMotion: boolean
) => ({
  center: {
    x: "0%",
    scale: isMobile ? 1 : 1.1,
    zIndex: 5,
    opacity: 1,
    rotateY: reducedMotion ? 0 : 0,
    rotateX: reducedMotion ? 0 : 0,
    filter: "brightness(1.1)",
  },
  left1: {
    x: "-50%",
    scale: 0.7,
    zIndex: 3,
    opacity: 0.7,
    rotateY: reducedMotion ? 0 : 25,
    rotateX: reducedMotion ? 0 : -5,
    filter: "brightness(0.8)",
  },
  left: {
    x: "-90%",
    scale: 0.5,
    zIndex: 1,
    opacity: 0.4,
    rotateY: reducedMotion ? 0 : 35,
    rotateX: reducedMotion ? 0 : -10,
    filter: "brightness(0.6)",
  },
  right: {
    x: "90%",
    scale: 0.5,
    zIndex: 1,
    opacity: 0.4,
    rotateY: reducedMotion ? 0 : -35,
    rotateX: reducedMotion ? 0 : -10,
    filter: "brightness(0.6)",
  },
  right1: {
    x: "50%",
    scale: 0.7,
    zIndex: 3,
    opacity: 0.7,
    rotateY: reducedMotion ? 0 : -25,
    rotateX: reducedMotion ? 0 : -5,
    filter: "brightness(0.8)",
  },
  hidden: {
    x: "150%",
    scale: 0.5,
    zIndex: 0,
    opacity: 0,
  },
});
