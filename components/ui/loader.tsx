"use client";
import { useEffect } from "react";
import { Loader2, LoaderIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GlobalLoaderProps {
  show: boolean;
  message?: string;
}

export function GlobalLoader({ show, message = "Loading..." }: GlobalLoaderProps) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-10 shadow-2xl"
        >
          <LoaderIcon className="h-10 w-10 animate-spin text-pink-500" />
          <p className="text-white text-sm font-medium tracking-wide">{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}