"use client";

import { useState } from "react";
// Make sure your server action is imported correctly (rename if needed)
import { MarkAttendanceAction } from "@/server/actions/attendance-action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { Save, Loader2, Lock, User as UserIcon, LoaderIcon } from "lucide-react";
import { usePathname } from "next/navigation";

type Member = {
  participantId: string;
  name: string;
  isPresent: boolean; 
};

interface BulkTeamAttendanceProps {
  eventId: string;
  teamId: string | null; // Nullable for Solo
  teamName: string;
  members: Member[];
  isLocked: boolean;
}

export function BulkTeamAttendance({
  eventId,
  teamId,
  teamName,
  members: initialMembers,
  isLocked
}: BulkTeamAttendanceProps) {
  const pathname=usePathname();  // get the current url
  // Initialize state with DB data
  const [members, setMembers] = useState(initialMembers);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (id: string, current: boolean) => {
    if (isLocked) return;
    
    setMembers((prev) =>
      prev.map((m) => (m.participantId === id ? { ...m, isPresent: !current } : m))
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Prepare payload
    const updates = members.map((m) => ({
      participantId: m.participantId,
      isPresent: m.isPresent
    }));

    // Call the Universal Server Action
    const result = await MarkAttendanceAction(eventId, teamId, updates,pathname);
    
    setIsSaving(false);
    if (result.success) {
      toast.success(result.message || "Attendance saved successfully");
      setHasChanges(false);
    } else {
      toast.error(result.message);
    }
    
    //  
  };

  // Visual Styles
  const containerStyle = isLocked 
    ? "bg-gray-900/50 border-gray-800 opacity-75 grayscale cursor-not-allowed" 
    : "bg-[#0a0a0a] border-white/10 shadow-lg hover:border-emerald-500/30";

  return (
    <div className={`border rounded-xl p-5 sm:p-6 transition-all duration-300 ${containerStyle}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
           <div className={`p-2 rounded-lg ${isLocked ? "bg-white/5" : "bg-emerald-500/10 text-emerald-400"}`}>
             <UserIcon size={20} />
           </div>
           <div>
             <h3 className="text-lg font-bold text-white leading-none mb-1">{teamName}</h3>
             <p className="text-xs text-slate-500">
                {teamId ? "Mark present members below" : "Mark participant status"}
             </p>
           </div>
           
           {/* LOCK BADGE */}
           {isLocked && (
             <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-wider border border-red-500/20">
               <Lock size={10} /> Results Declared
             </span>
           )}
        </div>
        
        {/* SAVE BUTTON */}
        {!isLocked && (
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isSaving}
            size="sm"
            className={`transition-all ${
                hasChanges 
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                : "bg-white/5 text-gray-500 hover:bg-white/10"
            }`}
          >
            {isSaving ? <LoaderIcon className="w-4 h-4 animate-spin mr-2"/> : <Save className="w-4 h-4 mr-2"/>}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {members.map((member) => (
          <div 
            key={member.participantId} 
            onClick={() => !isLocked && handleToggle(member.participantId, member.isPresent)}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer select-none group
              ${member.isPresent 
                ? "bg-emerald-500/5 border-emerald-500/30 shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]" 
                : "bg-white/2 border-white/5 hover:bg-white/5 hover:border-white/10"
              }
              ${isLocked ? "pointer-events-none" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                member.isPresent ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20" : "bg-slate-800 text-slate-500"
              }`}>
                {member.name.charAt(0)}
              </div>
              <span className={`text-sm font-medium transition-colors ${member.isPresent ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>
                {member.name}
              </span>
            </div>

            <Checkbox 
              checked={member.isPresent}
              disabled={isLocked} 
              className={`data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-all ${
                  member.isPresent ? "shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "border-white/20"
              }`}
            />
          </div>
        ))}
      </div>
      
      {isLocked && (
        <p className="mt-4 text-center text-xs text-red-500/60 font-medium bg-red-500/5 py-2 rounded-lg border border-red-500/10">
          Attendance modification is disabled because results have been declared.
        </p>
      )}
    </div>
  );
}