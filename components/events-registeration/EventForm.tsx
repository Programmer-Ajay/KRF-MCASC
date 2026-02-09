"use client";

import { useActionState, useEffect, useState ,useRef} from "react";
import { EVENT_FORMS } from "@/config/eventForms";
import CommonFields from "./CommonFields";
import DynamicField from "./DynamicFields";
import TeamSection from "./TeamSection";
import { motion } from "framer-motion";
import { registerEventAction } from "@/server/actions/event-registeration";
import { toast } from "react-toastify";
import { FormState } from "@/types";
import {  BookOpen,CheckCircle2,ShieldAlert,X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  eventType: keyof typeof EVENT_FORMS;
};

const intialState:FormState={
  success:false,
  message:"",
  errors:undefined
}

export default function EventForm({ eventType }: Props) {
   
  const config = EVENT_FORMS[eventType];
   const router=useRouter();
  const formRef=useRef<HTMLFormElement>(null);

  const [state,formAction,isPending]=useActionState( registerEventAction,intialState)
  const {success,message,errors}=state
   
  // console.log("state::",state)
  // for clearing the error fields
  // Record<Key,Value> means [key:string]:value it bascially used for define object where we dont know about key but we know about thier types

  const [clearedErrors,setClearedErrors]=useState<Record<string,boolean>>({})

  // rules and Declarations
  const [showRules,setShowRules]=useState(false)
  const [hasReadRules,setHasReadRules]=useState(false);
  const [isDeclared,setIsDeclared]=useState(false)


  const getFieldErrors = (fieldName: string): string[] => {
  if (!errors) return [];
  return (errors as Record<string, string[]>)[fieldName] ?? [];
   // type casting the error
};


// toast Handling
useEffect(()=>{
  if(success){
    toast.success(message);
    
    formRef.current?.reset();
    setHasReadRules(false);
      setIsDeclared(false);
      setClearedErrors({});
      router.push("/events/registered");
      
  }else if(!success && message){
    toast.error(message)
  }
},[success,message])

// Reset cleared errors when form submission happens
useEffect(()=>{
  setClearedErrors({})
},[errors])

  
const getError=(name:string):string[]=>{
  if(clearedErrors[name]) return [];
  return getFieldErrors(name)
}




  const getEventIcon = () => {
    const icons: Record<string, string> = {
      seminar: "🎤",
      debate: "🗣️",
      programming: "💻",
      shortfilm: "🎬",
      quiz: "📚",
      project: "🚀",
      poster:"🎨"
    };
    return icons[eventType] || "🎯";
  };


  return (
    <>
    <motion.form
      action={formAction}
      className="w-full max-w-2xl mx-auto px-4 sm:px-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input type="hidden"  name="eventType"value={eventType} />

      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-4xl sm:text-5xl mb-4">{getEventIcon()}</div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
          <span className="bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
          </span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-lg">Register for {eventType} and showcase your talent</p>
      </motion.div>

      {/* Form Container */}
      <div className="bg-linear-to-br from-white/5 via-white/3 to-transparent border border-white/10 backdrop-blur-xl rounded-2xl p-5 sm:p-8 shadow-2xl">
        {/* Common fields */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-linear-to-b from-pink-500 to-purple-500 rounded"></span>
            Participant (Team leader) Details
          </h2>
          <CommonFields
           getError={getError} 
           onClearError={(name) =>
          setClearedErrors((prev) => ({ ...prev, [name]: true }))
        }
          />
        </motion.div>

        {/* Event-specific fields */}
        {config.fields.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-linear-to-b from-purple-500 to-blue-500 rounded"></span>
              Event Details
            </h2>
            <div className="space-y-5">
              {config.fields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <DynamicField
                    field={field} 
                    getError={getError}
                    onClearError={(name) =>
                      setClearedErrors((prev) => ({ ...prev, [name]: true }))
                    }
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Team section */}
        {config.isTeam && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-linear-to-b from-blue-500 to-pink-500 rounded"></span>
              Team Information
            </h2>
            <TeamSection  
              getError={getError}
              onClearError={(name) =>
                setClearedErrors((prev) => ({ ...prev, [name]: true }))
              }
            />
          </motion.div>
        )}
         {/* Rules button */}

      <button
       type="button"
       onClick={()=>setShowRules(true)}
       className={`inline-flex items-center gap-2 px-4 py-2 bg-white/5 border mt-3 rounded-full text-sm transition-colors  ${hasReadRules ? 'border-green-500/30 text-green-400' : 'border-white/10 text-cyan-400 hover:bg-white/10'}`}
      >
        <BookOpen size={16}/>
        {hasReadRules?"Rules Accepted":"view Rules"}
        {hasReadRules && <CheckCircle2 size={16}/>}

      </button>
      {/* Declarations box */}
         <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-0.5">
                <input 
                  type="checkbox" 
                  checked={isDeclared}
                  onChange={(e) => setIsDeclared(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-white/5 transition-all checked:border-pink-500 checked:bg-pink-500 hover:border-pink-500/50"
                />
                <CheckCircle2 size={14} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
              </div>
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors select-none leading-tight">
                I declare that all the information given by me is correct. I have read the rules and understand that any false statement or violation of rules may lead to disqualification.
              </p>
            </label>
          </div>


        {/* Submit Button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            type="submit"
            disabled={isPending ||!hasReadRules ||!isDeclared}
            
            className="w-full relative group px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white text-base sm:text-lg rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-50"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 opacity-100 group-hover:opacity-90 transition-opacity"></div>
            
            {/* Animated border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 blur opacity-30"></div>
            </div>

            {/* Content */}
            <span className="relative flex items-center justify-center gap-2">
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Registering...
                </>
              ) :!hasReadRules?(
                "Please Read Rules First"
              ):!isDeclared?(
                "Please Accept Declaration"
              )
              : (
                "Register Now"
              )}
            </span>
          </button>

        </motion.div>
      </div>
    </motion.form>




    {/* //  Rules modal */}
    <AnimatePresence>
        {showRules && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRules(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="text-pink-500" />
                  Rules & Guidelines
                </h3>
                <button onClick={() => setShowRules(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <ul className="space-y-4">
                  {config.rules?.map((rule, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-white/5 text-xs flex items-center justify-center border border-white/10 text-cyan-400 font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 mt-auto">
                <button
                  onClick={() => {
                    setHasReadRules(true);
                    setShowRules(false);
                  }}
                  className="w-full py-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  I Have Read & Understood the Rules
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </>
  );
}



