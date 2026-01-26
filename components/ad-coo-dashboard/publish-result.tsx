"use client";

import { useState } from "react";
import { 
  Trophy, Plus, Trash2, AlertTriangle, 
  CheckCircle2, Lock, Loader2, Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import {
  Command, CommandEmpty, CommandGroup, 
  CommandInput, CommandItem, CommandList
} from "@/components/ui/command";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify"; // or "react-toastify" if you use that
import { publishResultAction } from "@/server/actions/publish-result-action";



// candidate props

type Candidate = {
  id: string;  // this will be teamId or particpantID
  name: string;
  leaderName:string | null;
  status: "present" | "absent"; 
};

interface PublishResultDialogProps {
  candidates : Candidate[];
  eventId: string;
  eventType: "solo" | "team";
  totalParticipants:number;
  presentCount : number;
  isCertificateIssued : boolean;
  isResultDeclared:boolean;
}


export function PublishResultDialog({

  candidates,
  eventId ,
  eventType ,
  totalParticipants,
  presentCount,
  isCertificateIssued,
  isResultDeclared,  
}: PublishResultDialogProps) {
  
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<{ [key: number]: boolean }>({});
  const [hasJustPublished,setHasJustPublished]=useState(false);

  // State: Maps Position (1, 2, 3) to an array of Winner IDs
  const [winners, setWinners] = useState<{ [key: number]: string[] }>({
    1: [],
    2: [],
    3: []
  });

  // Helper to add a winner to a position
  const addWinner = (position: number, id: string) => {
    setWinners(prev => ({
      ...prev,
      [position]: [...prev[position], id]
    }));
    // Close the popover for this position
    setIsPopoverOpen(prev => ({ ...prev, [position]: false }));
  };

  // Helper to remove a winner
  const removeWinner = (position: number, id: string) => {
    setWinners(prev => ({
      ...prev,
      [position]: prev[position].filter(x => x !== id)
    }));
  };

  // Filter out candidates who are already selected in ANY position
  const getAvailableCandidates = () => {
    const allSelected = Object.values(winners).flat();
    return candidates.filter(c => !allSelected.includes(c.id) && c.status === 'present');
  };
    
  const handlePublish = async () => {
    if (winners[1].length === 0) {
      toast.error("You must select at least a 1st Place winner.");
      return;
    }

    setIsSubmitting(true);
    // Server call
    const result = await publishResultAction({
      eventId,
      type:eventType,
      winners:winners as any
    })

    setIsSubmitting(false);

    if(result.success){
      setHasJustPublished(true) // instant lock
      setOpen(false);
    toast.success("Results published successfully!");
    }else{
    toast.error(result.message || "Failed to publish results");
    }
    
  };

  // --- RENDER HELPERS ---
  const isLocked=isCertificateIssued || isResultDeclared || hasJustPublished;
  

  const renderWinnerSelection = (position: number, colorClass: string, label: string) => (
    <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner">
       <div className="flex items-center justify-between">
          <h4 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${colorClass}`}>
             <Trophy size={14} /> {label}
          </h4>
          <span className="text-[10px] text-slate-500 uppercase font-bold">
             {winners[position].length > 1 ? "Tie Declared" : winners[position].length === 0 ? "Not Selected" : "Single Winner"}
          </span>
       </div>

       {/* Selected Winners List */}
       <div className="space-y-2">
         {winners[position].map(winnerId => {
            const candidate = candidates.find(c => c.id === winnerId);
            return (
              <div key={winnerId} className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a0a0a] border border-white/10 animate-in fade-in slide-in-from-left-2 group">
                 <div className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {candidate?.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-200">{candidate?.name}</span>
                 </div>
                 <Button 
                   variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-red-400 hover:bg-red-400/10"
                   onClick={() => removeWinner(position, winnerId)}
                 >
                   <Trash2 size={12} />
                 </Button>
              </div>
            )
         })}
       </div>


       {/* Selection Input (Searchable) */}
       <Popover 
        open={isPopoverOpen[position]} 
        onOpenChange={(v) => setIsPopoverOpen(prev => ({ ...prev, [position]: v }))}
       >
         <PopoverTrigger asChild>
           <Button variant="outline" size="sm" className="w-full justify-start text-slate-400 border-dashed border-white/20 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/5 bg-transparent">
             <Plus size={14} className="mr-2" /> Add {winners[position].length > 0 ? "Tie Winner" : "Winner"}
           </Button>
         </PopoverTrigger>
         <PopoverContent className="p-0 w-[320px] bg-[#0a0a0a] border-white/10 text-slate-200" align="start" side="bottom">
           <Command className="bg-[#0a0a0a]">
             <div className="flex items-center border-b border-white/10 px-3" cmdk-input-wrapper="">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput placeholder="Search participants..." className="placeholder:text-slate-500 flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50" />
             </div>
             <CommandList className="max-h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
               <CommandEmpty className="py-6 text-center text-sm text-slate-500">No present participants found.</CommandEmpty>
               <CommandGroup heading="Present Candidates" className="text-slate-400">
                 {getAvailableCandidates().map((candidate) => (
                   <CommandItem
                     key={candidate.id}
                     value={candidate.name} // Important for search to work
                     onSelect={() => addWinner(position, candidate.id)}
                     className="cursor-pointer p-2 rounded-md m-1 text-slate-300 aria-selected:bg-white/10 aria-selected:text-white data-disabled:opacity-50"
                   >
                     <CheckCircle2 size={14} className={cn("mr-2 h-4 w-4 opacity-0")} />
                     <div className="flex flex-col">
                        <span className="font-medium">{candidate.name}</span>

                        {candidate.leaderName && (
                            <span className="text-[10px] text-slate-500">{candidate.leaderName}</span>
                        )}
                     </div>
                   </CommandItem>
                 ))}
               </CommandGroup>
             </CommandList>
           </Command>
         </PopoverContent>
       </Popover>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
           disabled={isLocked}
           className={cn(
             "gap-2 font-bold shadow-lg transition-all",
             isLocked 
               ? "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
               : "bg-amber-500 hover:bg-amber-600 text-black border border-amber-400 hover:shadow-amber-500/20"
           )}
        >
          {isLocked ? <Lock size={16} /> : <Trophy size={16} />}
          {isCertificateIssued 
            ? "Results Locked" 
            : isResultDeclared || hasJustPublished 
                ? "Results Published" 
                : "Publish Results"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-[#050505] border-white/10 text-slate-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="text-amber-500" /> Declare Event Results
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Select the winners. You can add multiple teams for ties.
          </DialogDescription>
        </DialogHeader>

        {/* --- 1. ATTENDANCE WARNING --- */}
        {presentCount < totalParticipants && (
           <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-3 mt-2">
              <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={16} />
              <div className="text-xs">
                 <p className="font-bold text-yellow-500 mb-1">Attendance Incomplete</p>
                 <p className="text-yellow-200/70">
                    Only <strong>{presentCount}/{totalParticipants}</strong> participants are marked present. 
                    Absent participants cannot be selected as winners.
                 </p>
              </div>
           </div>
        )}

        {/* --- 2. WINNER SELECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
           {/* First Place takes full width on mobile, or span-2 style */}
           <div className="md:col-span-2">
               {renderWinnerSelection(1, "text-amber-400", "1st Place (Winner)")}
           </div>
           {renderWinnerSelection(2, "text-slate-300", "2nd Place (Runner Up)")}
           {renderWinnerSelection(3, "text-amber-700", "3rd Place (2nd Runner Up)")}
        </div>

        {/* --- 3. FOOTER & LOCK WARNING --- */}
        <DialogFooter className="flex-col sm:flex-col gap-3 items-stretch border-t border-white/10 pt-4">
           <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
              <Lock size={12} />
              <span>
                 This action will <strong>Freeze Attendance</strong>. Results become permanent once certificates are issued.
              </span>
           </div>
           <div className="flex gap-3 justify-end">
             <Button variant="ghost" onClick={() => setOpen(false)} className="hover:bg-white/5 hover:text-white">Cancel</Button>
             <Button 
               onClick={handlePublish} 
               disabled={isSubmitting || winners[1].length === 0}
               className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
             >
               {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
               Confirm & Publish
             </Button>
           </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}