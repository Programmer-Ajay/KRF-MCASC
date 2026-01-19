"use client";

import { useSearchParams } from "next/navigation";
import { EVENT_FORMS } from "@/config/eventForms";
import EventForm from "@/components/events-registeration/EventForm";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const EventRegisteration = () => {
  const searchParams = useSearchParams();
  const eventType = searchParams.get("event");

  if (!eventType || !(eventType in EVENT_FORMS)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Invalid Event</h1>
          <p className="text-gray-400 mb-6">
            The event you're looking for doesn't exist or the link is broken.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </motion.div>
    );
  }

  const eventConfig = EVENT_FORMS[eventType as keyof typeof EVENT_FORMS];


  return (
    <main className="relative min-h-screen bg-black py-12 sm:py-20 px-4 sm:px-0">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute top-10 left-10 w-40 sm:w-72 h-40 sm:h-72 bg-pink-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute bottom-10 right-10 w-40 sm:w-96 h-40 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 sm:mb-12 text-center relative z-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
          <span className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Registration
          </span>
        </h1>

        <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-2">
          {eventConfig.description || "Join us and showcase your talent"}
        </p>
      </motion.div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 max-w-3xl mx-auto px-2 sm:px-4"
      >
        <EventForm eventType={eventType as keyof typeof EVENT_FORMS} />
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 sm:mt-12 max-w-3xl mx-auto px-2 sm:px-4"
      >
        {/* <div className="bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6 text-center text-gray-300">
          <p className="text-xs sm:text-sm md:text-base">
            <strong>Note:</strong> You will receive a confirmation email with all the details. 
            Make sure to check your spam folder if you don't see it in your inbox.
          </p>
        </div> */}
      </motion.div>
    </main>
  );
};

export default EventRegisteration;
