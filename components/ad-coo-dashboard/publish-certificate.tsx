"use client";

import { useState } from "react";
import { Medal, ScrollText, CheckCircle2, Loader2, AlertCircle, Award, LoaderIcon,LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "react-toastify";
import { getCertificatePreviewAction, publshCertificateAction } from "@/server/actions/publish-certificate"
import { CertificateRecipient } from "@/server/services/certificate-service";
import { cn } from "@/lib/utils";


interface PublishCertificateDialogProps {
  eventId: string;
  isResultDeclared: boolean;     // Button disabled if false
  areCertificatesIssued: boolean; //  Shows "Issued" if true
}

export function PublishCertificateDialog({ 
    eventId, 
    isResultDeclared, 
    areCertificatesIssued 
}: PublishCertificateDialogProps) {
  

  const [open, setOpen] = useState(false); // for modal
  const [step, setStep] = useState<"idle" | "loading" | "preview">("idle");
  const [recipients, setRecipients] = useState<CertificateRecipient[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  
  // Instant visual update (locks button immediately on success)
  const [hasJustIssued, setHasJustIssued] = useState(false);


  // 1. Load Preview Data
  const handleOpenPreview = async () => {
    setStep("loading");
    setOpen(true); 

    const res = await getCertificatePreviewAction(eventId);
    
    if (res.success && res.data) {
        setRecipients(res.data);
        setStep("preview");
    } else {
        toast.error("Failed to load eligible list.");
        setOpen(false);
    }
  };

  // 2. Commit to DB

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    const res = await publshCertificateAction(eventId);
    setIsPublishing(false);

    if (res.success) {
        setHasJustIssued(true); // Instant Lock
        toast.success(res.message);
        setOpen(false);
    } else {
        toast.error(res.message);
    }
  };

  // Logic: Active only if Results are Declared AND Certs NOT issued yet
  // If `hasJustIssued` is true, we treat it as done.
  const isDone = areCertificatesIssued || hasJustIssued;
  const isButtonEnabled = isResultDeclared && !isDone;


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
           // VARIANTS: 
           // 1. Done (Green) 
           // 2. Disabled (Grey - No Result) 
           // 3. Active (Blue - Ready to Issue)
           variant={isDone ? "outline" : "default"}
           disabled={!isResultDeclared} 
           onClick={isResultDeclared ? handleOpenPreview : undefined}
           className={cn(
               "gap-2 font-bold transition-all shadow-md",
               isDone 
                 ? "text-emerald-500 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 " 
                 : !isResultDeclared 
                     ? "opacity-50 cursor-not-allowed bg-gray-800 text-gray-400" 
                     : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/20"
           )}
        >
          {isDone ? <CheckCircle2 size={16} /> : <ScrollText size={16} />}
          {isDone ? "Certificates Issued" : "Issue Certificates"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-[#050505] border-white/10 text-slate-200 max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Medal className="text-blue-500" /> Issue Certificates
          </DialogTitle>
          <DialogDescription className="text-slate-400">
         {isDone ?
         "Certificates have been issued to the following participants."
        :"Review eligibility. Only participants marked Present will appear here." }
          </DialogDescription>
        </DialogHeader>

        {/* STEP: LOADING */}
        {step === "loading" && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-3">
                <LoaderIcon className="animate-spin text-blue-500" size={32} />
                <p className="animate-pulse">Calculating eligibility...</p>
            </div>
        )}

        {/* STEP: PREVIEW LIST */}
        {step === "preview" && (
            <div className="flex-1 overflow-hidden flex flex-col gap-4">
                
                {/* 1. Stats Cards (Responsive Grid) */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1.5 text-xs text-amber-500 uppercase font-bold mb-1">
                           <TrophyIcon size={12} /> Winner
                        </div>
                        <p className="text-2xl font-black text-amber-400">
                            {recipients.filter(r=>r.type==="winner").length}
                        </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center flex flex-col items-center justify-center">
                        <div className="flex items-center gap-1.5 text-xs text-blue-500 uppercase font-bold mb-1">
                           <Award size={12} /> Participation
                        </div>
                        <p className="text-2xl font-black text-blue-400">
                            {recipients.filter(r => r.type === 'participation').length}
                        </p>
                    </div>
                </div>

                {/* 2. Scrollable List Header */}
                <div className="rounded-t-md border border-b-0 border-white/10 bg-white/5 p-2 px-4 text-[10px] font-bold text-slate-500 uppercase flex justify-between shrink-0">
                   <span>Participant / Team</span>
                   <span>Type</span>
                </div>

                {/* 3. The List (Scrollable) */}
                <div className="border border-white/10 rounded-b-md bg-white/2 flex-1 overflow-hidden relative">
                   <ScrollArea className="h-62.5 sm:h-75 w-full">
                       {recipients.length === 0 ? (
                           <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2 p-8">
                               <AlertCircle className="text-red-400 opacity-50" size={32} />
                               <p className="font-medium text-slate-300">No eligible participants found.</p>
                               <p className="text-xs max-w-50 text-center">
                                  Ensure you have marked <strong>Attendance</strong> and declared <strong>Results</strong> first.
                               </p>
                           </div>
                       ) : (
                           <div className="divide-y divide-white/5">

                               {recipients.map((r, i) => (
                                   <div key={i} className="flex justify-between items-center p-3 px-4 hover:bg-white/5 transition-colors group">
                                       <div className="flex flex-col gap-0.5">
                                           <p className="font-medium text-slate-200 text-sm">{r.name}</p>
                                           {r.teamName && (
                                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                 <span className="w-1 h-1 rounded-full bg-slate-600" />
                                                 {r.teamName}
                                              </div>
                                           )}
                                       </div>
                                       
                                       <div className={cn(
                                           "text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider",
                                           r.type === 'winner' 
                                             ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                                             : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                       )}>
                                           {r.type === 'winner' 
                                              ? `Winner ${r.rank ? `#${r.rank}` : ''}` 
                                              : 'Participant'}
                                       </div>
                                   </div>
                               ))}
                           </div>
                       )}
                   </ScrollArea>
                </div>
            </div>
        )}

        {/* Footer */}
        <DialogFooter className="gap-2 sm:gap-0 mt-2 sm:justify-between items-center">

            {/* left side status message(only when it is locked) */}
            {isDone &&(
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-medium px-2">
                 <LockIcon size={12} />
                 <span>Issued & Locked</span>
              </div>
            )}

           <Button variant="ghost" onClick={() => setOpen(false)} className="hover:bg-white/5 hover:text-white">Cancel</Button>

           { !isDone && step === "preview" && recipients.length > 0 && (
               <Button 
                 onClick={handleConfirmPublish} 
                 disabled={isPublishing}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full sm:w-auto"
               >
                 {isPublishing ? <LoaderIcon className="animate-spin mr-2" size={16} /> : <CheckCircle2 className="mr-2" size={16} />}
                 Confirm & Issue All
               </Button>
           )}
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}




// Simple Icon helper
function TrophyIcon({size}:{size:number}) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}