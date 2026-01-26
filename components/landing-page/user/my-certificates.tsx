
"use client";

import { useState } from "react";
import { Award, Download, Loader2, FileText, Users, XCircle, AlertCircle, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserCertificatesAction } from "@/server/actions/get-user-certificate";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

// Matches Service Type
type CertificateItem = {
  eventId: string;
  eventName: string;
  status: "eligible" | "team_only" | "absent";
  certificateId: string | null;
  type: "winner" | "participation" | "team_bundle" | null;
  isTeamLeader: boolean;
};

export function MyCertificatesDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);

  const handleOpen = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
        setLoading(true);
        const res = await getUserCertificatesAction();
        // console.log("certificate download:",res.data);
        if (res.success && res.data) {
             
            setCertificates(res?.data);
        } else {
            toast.error(res.message || "Failed to load certificates");
        }
        setLoading(false);
    }
  };

  const handleDownload = (cert: CertificateItem) => {
     if (!cert.certificateId) return;

     const message = cert.isTeamLeader 
        ? `Generating Team Bundle for ${cert.eventName}...` 
        : `Downloading certificate for ${cert.eventName}...`;
        
     toast.info(message);

     // Trigger API Download
     window.open(`/api/certificates/download?certId=${cert.certificateId}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {children || (
            <Button variant="outline" className="gap-2">
                <Award size={16} /> My Certificates
            </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-[#0a0a0a] border-white/10 text-slate-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-white">
            <Award className="text-amber-500" /> My Certificates
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Download your official event certificates.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
           <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-3">
               <LoaderIcon className="animate-spin text-amber-500" size={32} />
               <p className="text-xs font-medium">Checking records...</p>
           </div>
        ) : (
           <ScrollArea className="h-87.5pr-4 -mr-4">
              {certificates.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <FileText className="opacity-20" size={24} />
                      </div>
                      <p className="font-medium">No certificates available.</p>
                      <p className="text-xs text-gray-600 max-w-50">
                        Certificates will appear here once the Event Coordinator issues them.
                      </p>
                  </div>
              ) : (
                  <div className="space-y-3 p-1">
                      {certificates.map((cert) => {
                          const isDownloadable = cert.status === 'eligible' || cert.status === 'team_only';
                          
                          return (
                            <div 
                                key={cert.eventId} 
                                className={cn(
                                    "group p-4 rounded-xl border transition-all flex items-center justify-between",
                                    isDownloadable
                                        ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-500/30 cursor-pointer"
                                        : "bg-red-500/5 border-red-500/10 opacity-70 cursor-not-allowed"
                                )}
                                onClick={() => isDownloadable && handleDownload(cert)}
                            >
                                {/* LEFT: Info Section */}
                                <div className="space-y-1.5">
                                    <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                                        {cert.eventName}
                                    </h4>
                                    
                                    <div className="flex flex-wrap items-center gap-2">
                                        
                                        {/* BADGE 1: Team Only (Absent Leader) */}
                                        {cert.status === 'team_only' && (
                                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                                               <Users size={10} /> Team Bundle Only
                                            </span>
                                        )}
                                        
                                        {/* BADGE 2: Standard Eligible */}
                                        {cert.status === 'eligible' && (
                                            <>
                                                <span className={cn("text-[10px] uppercase font-bold px-2 py-0.5 rounded border", 
                                                    cert.type === 'winner' 
                                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                                                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                )}>
                                                    {cert.type === 'winner' ? 'Winner' : 'Participation'}
                                                </span>
                                                
                                                {cert.isTeamLeader && (
                                                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                                                        <Users size={10} /> Team Bundle
                                                    </span>
                                                )}
                                            </>
                                        )}

                                        {/* BADGE 3: Totally Absent */}
                                        {cert.status === 'absent' && (
                                            <span className="flex items-center gap-1.5 text-[10px] text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">
                                                <XCircle size={10} /> Not Eligible
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* RIGHT: Download Button */}
                                {isDownloadable ? (
                                    <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all shadow-lg">
                                        <Download size={16} />
                                    </div>
                                ) : (
                                    <div className="h-8 w-8 flex items-center justify-center text-red-500/30">
                                        <AlertCircle size={16} />
                                    </div>
                                )}
                            </div>
                          );
                      })}
                  </div>
              )}
           </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}

