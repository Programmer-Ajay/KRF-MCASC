import { 
  User, Mail, Phone, Building2, 
  FileText, Users, ShieldCheck, GraduationCap,
  ExternalLink, Hash, AlignLeft, HelpCircle,
  Sparkles, Globe, ClipboardCheck
} from "lucide-react";
import { RegistrationDetails } from "@/server/services/get-registration-details";
import { BulkTeamAttendance } from "./attendace";
// Update this path to where you saved the EVENT_FORMS constant
import { EVENT_FORMS } from "@/config/eventForms"; 

export function ParticipantDetailsView({ data }: { data: RegistrationDetails }) {
  const isTeam = data.type === "team";

  // attendance 
  // we normalize the data so the bulk comonent can handle both solo and team attenadace
  const attendanceMembers=isTeam && data.team? data.team.members.map((m)=>({
   participantId:m.participantId,
   name:m.name,
   // default to false if undefined
    isPresent:m.isPresent,
  })): 
  [{
   //for solo
   participantId:data?.primaryContact.participantId,
   name:data?.primaryContact.name,
   isPresent:data?.primaryContact.isPresent || false
  }];

  const teamName=isTeam && data?.team?data.team.name :"Individual Participant";
  const teamId=isTeam &&  data.team? data.team.id:null; // pass null is the solo is there 

  // get locked status from the event Object
   const isResultDeclared= data?.event.isResultDeclared || false;


  // 1. Logic to find the matching configuration from EVENT_FORMS
  const eventKey=Object.keys(EVENT_FORMS).find((key)=>
    data.event.name.toLowerCase().includes(key)
    )as keyof typeof EVENT_FORMS |undefined;


  const eventConfig = eventKey ? EVENT_FORMS[eventKey] : null;

  // 2. Helper to render icon based on field type
  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'url': return <Globe size={15} className="text-cyan-400" />;
      case 'number': return <Hash size={15} className="text-emerald-400" />;
      case 'select': return <HelpCircle size={15} className="text-purple-400" />;
      default: return <AlignLeft size={15} className="text-pink-400" />;
    }
  };

  // 3. Date Formatter
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-4 sm:p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="relative group">
          {/* Ambient Glow Behind */}
          <div className={`absolute -inset-1 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-700 blur-xl ${
             isTeam ? "bg-purple-600" : "bg-cyan-600"
          }`} />
          
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* Left: Name & ID */}
                <div>
                   <div className="flex flex-wrap items-center gap-4 mb-2">
                      <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                         {isTeam ? data.team?.name : data.primaryContact.name}
                      </h1>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border shadow-[0_0_15px_rgba(0,0,0,0.4)] ${
                         isTeam 
                         ? "bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-purple-500/20" 
                         : "bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-cyan-500/20"
                      }`}>
                         {data.type}
                      </span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-slate-400 font-medium pl-1">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                      </span>
                      <span className="font-mono text-slate-300 tracking-wide">ID: <span className="opacity-70">{data.id.split("-")[0]}</span></span>
                   </div>
                </div>

                {/* Right: Event Info */}
                <div className="flex items-center gap-5 bg-white/3 px-6 py-3 rounded-xl border border-white/5 hover:bg-white/6 transition-colors group/badge">
                   <div>
                      <p className="text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider group-hover/badge:text-purple-400 transition-colors">Event</p>
                      <p className="text-base font-bold text-white leading-none">{data.event.name.toUpperCase()}</p>
                   </div>
                   <div className="h-8 w-px bg-white/10" />
                   <div>
                      <p className="text-[10px] font-bold uppercase text-slate-500 mb-1 tracking-wider group-hover/badge:text-purple-400 transition-colors">Date</p>
                      <p className="text-sm font-semibold text-slate-300 leading-none">{formatDate(data.event.date)}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>


        {/* --- 2. INFO CARDS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card A: Contact Info */}
          <div className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)] transition-all duration-300">
             <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-shadow">
                   <User size={18} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Primary Contact</h3>
             </div>

             <div className="space-y-5">
                <div>
                   <label className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1 block">Full Name</label>
                   <p className="text-white font-bold text-lg tracking-tight">{data.primaryContact.name}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                   <div className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5 group-hover:bg-white/4 transition-colors">
                      <Mail size={16} className="text-slate-500 shrink-0" />
                      <div className="min-w-0">
                         <p className="text-[10px] text-slate-500 font-bold uppercase">Email</p>
                         <p className="text-sm text-slate-200 truncate font-medium" title={data.primaryContact.email}>{data.primaryContact.email}</p>
                      </div>
                   </div>

                   <div className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5 group-hover:bg-white/4 transition-colors">
                      <Phone size={16} className="text-slate-500 shrink-0" />
                      <div>
                         <p className="text-[10px] text-slate-500 font-bold uppercase">Mobile</p>
                         <p className="text-sm text-slate-200 font-mono tracking-wide">{data.primaryContact.mobileNo}</p>
                      </div>
                   </div>

                   {data.primaryContact.guardianNo && data.primaryContact.guardianNo.toLowerCase() !== "none" && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/5 group-hover:bg-white/4 transition-colors">
                         <ShieldCheck size={16} className="text-slate-500 shrink-0" />
                         <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">Guardian</p>
                            <p className="text-sm text-slate-200 font-mono tracking-wide">{data.primaryContact.guardianNo}</p>
                         </div>
                      </div>
                   )}
                </div>
             </div>
          </div>

          {/* Card B: Academic Info */}
          <div className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)] transition-all duration-300">
             <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-shadow">
                   <GraduationCap size={18} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Academic Info</h3>
             </div>

             <div className="space-y-4">
                <div>
                   <label className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-1 block">Institution</label>
                   <p className="text-white font-semibold text-base leading-snug wrap-break-word" title={data.primaryContact.collegeName}>
                      {data.primaryContact.collegeName}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div className="bg-white/2 p-3 rounded-xl border border-white/5">
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1 block">Course</label>
                      <p className="text-sm text-slate-200 font-medium truncate" title={data.primaryContact.course}>{data.primaryContact.course}</p>
                   </div>
                   <div className="bg-white/2 p-3 rounded-xl border border-white/5">
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1 block">Class</label>
                      <p className="text-sm text-slate-200 font-medium">{data.primaryContact.class}</p>
                   </div>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5 block">Category</label>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-900 text-xs font-bold uppercase text-slate-300 border border-white/10 w-full justify-center">
                         {data.primaryContact.category}
                      </span>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1.5 block">Status</label>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-950/30 text-xs font-bold uppercase text-emerald-400 border border-emerald-500/20 w-full justify-center shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                         {data.primaryContact.status}
                      </span>
                   </div>
                </div>
             </div>
          </div>

          {/* Card C: Submission Data */}
          <div className="group bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/40 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)] transition-all duration-300 flex flex-col">
             <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                <div className="p-2.5 bg-pink-500/10 rounded-xl text-pink-400 border border-pink-500/20 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-shadow">
                   <Sparkles size={18} />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Submission</h3>
             </div>

             <div className="flex-1 space-y-5">
                {eventConfig && Object.keys(data.submissionData || {}).length > 0 ? (
                   <div className="space-y-5">
                      {eventConfig.fields.map((field) => {
                         const value = data.submissionData[field.name as keyof typeof data.submissionData];
                         if(!value && !field.required) return null;  // for optional

                         // Logic for field types
                         const isLongText = ['textarea'].includes(field.type) || 
                                           ['projectDescription', 'synopsis', 'abstract', 'reason', 'story'].some(k => field.name.toLowerCase().includes(k));
                         const isTechStack = ['tech', 'stack', 'technologies'].some(k => field.name.toLowerCase().includes(k));

                         return (
                            <div key={field.name}>
                               <label className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 font-bold flex items-center gap-1.5">
                                  {getFieldIcon(field.type)} {field.label}
                               </label>
                               
                               {/* 1. URL */}
                               {field.type === 'url' ? (
                                  <a href={value} target="_blank" rel="noreferrer" className="text-sm text-pink-400 hover:text-pink-300 hover:underline break-all font-medium flex items-center gap-2 bg-pink-500/5 p-2.5 rounded-lg border border-pink-500/10 transition-colors">
                                     <span className="truncate">{value}</span> <ExternalLink size={12} className="shrink-0" />
                                  </a>
                               ) 
                               /* 2. TECH STACK PILLS */
                               : isTechStack ? (
                                  <div className="flex flex-wrap gap-2">
                                     {String(value).split(',').map((tech, i) => (
                                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 shadow-sm">
                                           {tech.trim()}
                                        </span>
                                     ))}
                                  </div>
                               )
                               /* 3. LONG SCROLLABLE TEXT */
                               : isLongText ? (
                                  <div className="relative group/box">
                                     <div className="text-sm font-medium text-slate-300 bg-white/3 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="max-h-35 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent leading-relaxed whitespace-pre-wrap">
                                           {value}
                                        </div>
                                     </div>
                                  </div>
                               ) 
                               /* 4. STANDARD TEXT */
                               : (
                                  <div className="text-sm font-medium text-white pl-3 border-l-2 border-white/10 py-0.5">
                                     {value || <span className="text-slate-600 italic">Not provided</span>}
                                  </div>
                               )}
                            </div>
                         )
                      })}
                   </div>
                ) : (
                   <div className="h-32 flex flex-col items-center justify-center text-slate-600 gap-3 border border-dashed border-white/10 rounded-xl bg-white/2">
                      <FileText size={24} className="opacity-40" />
                      <span className="text-sm font-medium">No submission data</span>
                   </div>
                )}
             </div>
          </div>
        </div>

         {/* --- 2. ATTENDANCE SECTION (NEW) --- */}
        <div className="animate-in slide-in-from-bottom-6 duration-700 delay-100">
           <div className="flex items-center gap-2 mb-4 pl-1">
              <ClipboardCheck className="text-emerald-500" size={20} />
              <h2 className="text-lg font-bold text-white">Attendance Action</h2>
           </div>
           
           {/* Universal Component for both Team & Solo */}
           <BulkTeamAttendance 
             eventId={data.event.id}
             teamId={teamId} 
             teamName={teamName}
             members={attendanceMembers}
             isLocked={isResultDeclared} 
           />
           <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
       <p className="text-sm font-medium text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]">
      ⚠️ <span className="font-semibold text-red-300">Important:</span> Once the result is published, 
     attendance will be <span className="font-semibold text-red-300">permanently locked</span> and 
     the action button will be <span className="font-semibold text-red-300">disabled</span>.  
     Please mark attendance carefully before submitting.
   </p>
  </div>
  
  </div>


        {/* --- 3. TEAM MEMBERS LIST (Auto-Switching) --- */}
        {isTeam && data.team && (
          <div className="space-y-5 pt-6 animate-in slide-in-from-bottom-8 duration-700 delay-100">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-lg">
                      <Users size={20} className="text-slate-200" />
                   </div>
                   <h2 className="text-xl font-bold text-white tracking-tight">Team Details</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold text-slate-300 border border-white/10 shadow-inner">
                   {data.team.members.length} Members
                </span>
             </div>

             {/* === MOBILE CARD VIEW (< 1024px) === */}
             <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.team.members.map((member) => (
                   <div key={member.memberId} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 relative overflow-hidden shadow-lg hover:border-white/20 transition-all hover:-translate-y-1">
                      {member.isLeader && (
                         <div className="absolute top-0 right-0 bg-yellow-500/10 px-2.5 py-1 rounded-bl-xl border-l border-b border-yellow-500/20 text-[10px] font-bold text-yellow-500 uppercase flex items-center gap-1.5">
                            <ShieldCheck size={12} /> Leader
                         </div>
                      )}
                      
                      <div className="flex items-center gap-4 mb-4">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg uppercase border-2 shadow-xl ${
                            member.isLeader 
                            ? "bg-linear-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 text-yellow-500" 
                            : "bg-slate-800/50 border-slate-700 text-slate-400"
                         }`}>
                            {member.name.charAt(0)}
                         </div>
                         <div className="min-w-0">
                            <p className="font-bold text-white text-base truncate">{member.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">{member.gender}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm border-t border-white/5 pt-4">
                         <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Course</p>
                            <p className="text-slate-300 text-xs font-medium truncate">{member.course}</p>
                            <p className="text-[10px] text-slate-500">({member.class})</p>
                         </div>
                         <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Category</p>
                            <p className="text-slate-300 text-xs font-medium capitalize">{member.category}</p>
                         </div>
                         <div className="col-span-2">
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">College</p>
                            <p className="text-slate-300 text-xs truncate">{member.collegeName}</p>
                         </div>
                         <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Status</p>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">{member.status}</span>
                         </div>
                         <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Contact</p>
                            <p className="text-slate-400 font-mono text-[10px]">{member.mobileNo}</p>
                         </div>
                      </div>
                   </div>
                ))}
             </div>

             {/* === DESKTOP TABLE VIEW (>= 1024px) === */}
             <div className="hidden lg:block rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm">
                   <thead>
                      <tr className="bg-white/2 border-b border-white/5 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                         <th className="px-6 py-4">Profile</th>
                         <th className="px-6 py-4">Academic</th>
                         <th className="px-6 py-4">Details</th>
                         <th className="px-6 py-4">Contact</th>
                         <th className="px-6 py-4 text-right">Role</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {data.team.members.map((member) => (
                         <tr key={member.memberId} className="hover:bg-white/3 transition-colors group">
                            {/* 1. Profile */}
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-4">
                                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs uppercase shadow-md ${
                                     member.isLeader ? "bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/30" : "bg-slate-800 text-slate-400 ring-1 ring-white/10"
                                  }`}>
                                     {member.name.charAt(0)}
                                  </div>
                                  <div>
                                     <div className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">{member.name}</div>
                                     <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">{member.gender}</div>
                                  </div>
                               </div>
                            </td>
                            {/* 2. Academic */}
                            <td className="px-6 py-4">
                               <div className="space-y-1">
                                  <p className="text-slate-200 text-xs font-medium">{member.course} <span className="text-slate-500">({member.class})</span></p>
                                  <p className="text-[11px] text-slate-500 truncate max-w-45" title={member.collegeName}>{member.collegeName}</p>
                               </div>
                            </td>
                            {/* 3. Details (Cat/Status) */}
                            <td className="px-6 py-4">
                               <div className="flex gap-2">
                                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-[10px] font-bold text-slate-400 uppercase">{member.category}</span>
                                  <span className="px-2 py-0.5 rounded bg-emerald-950/30 border border-emerald-500/10 text-[10px] font-bold text-emerald-500 uppercase">{member.status}</span>
                               </div>
                            </td>
                            {/* 4. Contact */}
                            <td className="px-6 py-4">
                               <div className="space-y-1">
                                  <p className="text-slate-300 font-mono text-[11px] tracking-tight">{member.mobileNo}</p>
                                  <p className="text-slate-500 text-[11px] truncate max-w-37.5">{member.email}</p>
                               </div>
                            </td>
                            {/* 5. Role */}
                            <td className="px-6 py-4 text-right">
                               {member.isLeader ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                                     <ShieldCheck size={12} /> LEADER
                                  </span>
                               ) : (
                                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider px-2">MEMBER</span>
                               )}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
