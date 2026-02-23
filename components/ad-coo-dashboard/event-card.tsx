import Link from "next/link";
import { User } from "lucide-react";
 export type EventData = {
  id: string;
  name: string;
  type: "solo" | "team";
  registrationDeadline: string;
  totalRegistrations: number;
  coordinatorName?:string // optional only for the admin
};


interface EventcardProps{
  event:EventData;
  variant:"admin" |"coordinator";  // controls the UI logic
}
export default function EventCard({ event ,variant }: EventcardProps) {
  const isTeam = event.type === "team"

  const modeColor=isTeam
      ? "from-purple-500/25 to-indigo-500/25 border-purple-500/40"
      : "from-pink-500/25 to-rose-500/25 border-pink-500/40";
  const BadgeColor =isTeam
      ? "bg-linear-to-r from-purple-500/90 to-indigo-500/90 text-purple-50"
      : "bg-linear-to-r from-pink-500/90 to-rose-500/90 text-pink-50";
  
      // dynamic link base path
      const basePath= variant==="admin"? "/admin": "/coordinator";
  return (
    <div
      className={`rounded-2xl border bg-linear-to-br ${modeColor} backdrop-blur-xl p-6 sm:p-7 shadow-2xl shadow-black/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 hover:scale-105 space-y-4 relative overflow-hidden group`}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 ${BadgeColor.replace('bg-linear-to-r', 'bg-linear-to-br').replace('text-pink-50', '').replace('text-purple-50', '')} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
      
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start gap-3 relative z-10">
        <h3 className="text-base sm:text-lg font-bold text-white leading-tight flex-1 line-clamp-2">
          {event.name.toUpperCase()}
        </h3>


        {/* show the coordinator name  */}
        {
          variant==="admin" && event.coordinatorName &&(
            <div className="flex items-center gap-1.5 mt-2 text-xs text-cyan-400 font-medium bg-cyan-950/30 px-2 py-2  rounded-md w-fit border border-cyan-500/20">
              <User size={12} />
              <span>{event.coordinatorName}</span>
            </div>
          )
        }
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg ${BadgeColor}`}
        >
          {event.type.toUpperCase()}
        </span>
      </div>

      {/* Stats */}
      <div className="bg-linear-to-br from-white/10 to-white/5 rounded-xl p-4 border border-white/15 backdrop-blur-sm relative z-10 shadow-lg">
        <p className="text-3xl sm:text-4xl font-black text-white">
          {event.totalRegistrations}
        </p>
        <p className="text-xs sm:text-sm text-gray-300 mt-2 font-medium">
          {isTeam ? "Teams Registered" : "Participants Registered"}
        </p>
      </div>

      {/* Deadline */}
      <div className="border-t border-white/15 pt-4 relative z-10">
        <p className="text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wide">Registration Deadline</p>
        <p className="text-sm sm:text-base font-bold text-white">
          {new Date(event.registrationDeadline).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 relative z-10">
        <Link
          href={`${basePath}/${event.id}/participants`}
          className={`flex-1 text-center px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg text-white transition-all duration-200 hover:shadow-lg active:scale-95 
            ${
            variant === "admin" 
             ? "bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:shadow-blue-500/40"
             : "bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md" // Cleaner look for coordinator
          }`}
        >
          View 
        </Link>
       
       {/* manage Events */}

       {
        variant==="admin" && (
             
             <Link
            // href={`/admin/events/${event.id}/deadline`}
            href={`/admin`}
            className="flex-1 text-center px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-linear-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/40 active:scale-95"
          >
            Extend Deadline
          </Link>
          
          
        
        )
       }
        
      </div>
    </div>
  );
}
