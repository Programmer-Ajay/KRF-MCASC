import { useState } from "react";
import { Plus, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommonFields from "./CommonFields";
type Props={
  getError:(fieldName:string)=>string[]
  onClearError:(name:string)=>void
}
type TeamMember = {
  id: string;
};

export default function TeamSection({getError, onClearError}:Props) {
  const [members, setMembers] = useState<TeamMember[]>([]);

  const addMember = () => {
    const newId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setMembers([...members, { id: newId }]);
  };

  const removeMember = (id: string) => {
      setMembers(members.filter((m) => m.id !== id));
    
  };

  return (
    <div className="space-y-6">
      {/* Team Name Input */}
      <div className="relative group">
        <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
          Team Name <span className="text-pink-500 ml-1">*</span>
        </label>

        <div className="relative">
          <Users className="absolute left-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 " />

          <input
            name="team.teamName"
            type="text"
            placeholder="Enter your team name"
            onChange={()=>onClearError("team.teamName")}
            required
            className="w-full px-4 pl-10 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          />
          
          {getError("team.teamName").length > 0 && (
            <p className="mt-1 text-sm text-red-400">
              {getError("team.teamName").join(", ")}
            </p>
          )}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity -z-10 blur"></div>
            </div>

               
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        <h4 className="text-xs sm:text-sm font-semibold text-gray-200">
          Team Members ({members.length})
        </h4>

        <AnimatePresence>
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 sm:p-5 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm font-medium text-gray-300">
                  Member {index + 1}
                </span>

              
                  <button
                    type="button"
                    onClick={() => removeMember(member.id)}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
              
              </div>
               {/* resued the components */}
              <CommonFields namePrefix={`team.teamMembers.${index}`} getError={getError} onClearError={onClearError} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Member Button */}
      <button
        type="button"
        onClick={addMember}
        className="w-full py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl border-2 border-dashed border-white/20 hover:border-purple-500/50 text-sm text-gray-300 hover:text-purple-300 flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Team Member
      </button>
    </div>
  );
}
