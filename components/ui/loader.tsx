
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LoaderIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GlobalLoaderProps {
  show: boolean;
  message?: string;
}

export function GlobalLoader({ show, message = "Loading..." }: GlobalLoaderProps) {
  // 2. Track mounting to avoid SSR errors
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Optional: Lock scroll when loader is active
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [show]);

  // Return null if hidden OR if not yet mounted on client
  if (!show || !mounted) return null;

  // 3. Wrap in Portal to escape the parent container
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // Ensure z-index is very high
        className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4 bg-[#0F0F0F] border border-white/10 backdrop-blur-md rounded-2xl p-10 shadow-2xl"
        >
          <LoaderIcon className="h-10 w-10 animate-spin text-pink-500" />
          <p className="text-white text-sm font-medium tracking-wide">{message}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body //  Renders directly into the <body>
  );
}



// "use client";
// import { useEffect } from "react";
// import { Loader2, LoaderIcon } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface GlobalLoaderProps {
//   show: boolean;
//   message?: string;
// }

// export function GlobalLoader({ show, message = "Loading..." }: GlobalLoaderProps) {
//   if (!show) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="flex flex-col items-center gap-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-10 shadow-2xl"
//         >
//           <LoaderIcon className="h-10 w-10 animate-spin text-pink-500" />
//           <p className="text-white text-sm font-medium tracking-wide">{message}</p>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
