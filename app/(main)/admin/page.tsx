import { EventCardSection } from "@/components/ad-coo-dashboard/sections/adminEventCard";
import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole";
import { redirect } from "next/navigation";
import { StatsSection } from "@/components/ad-coo-dashboard/sections/event-stats";
import { Suspense } from "react";
import { StatsSkeleton } from "@/components/skeletons/dasboard/stats-skeletons";
import { EventCardSkeleton } from "@/components/skeletons/dasboard/eventCard-skeletons";


const Admin = async () => {
   const {user, role}= await getCurrentUserWithRole();

   // check the login first
   if(!user) redirect("/login");
   if(role!=="admin") redirect("/unauthorized")


  return (
    <section className="min-h-screen relative mt-15 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background with gradients */}
      <div className="fixed inset-0 -z-10">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Gradient layers */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black" />
      </div>

      <div className="max-w-7xl mx-auto py-8 sm:py-12 relative z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
            welcome {user?.user_metadata?.name} 
          </h1>
          <p className="text-sm sm:text-base text-gray-400">Manage Events and Registrations</p>
        </div>

        {/* Stats Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Statistics</h2>
          {/* here the magic happen */}
             <Suspense fallback={<StatsSkeleton/>}>
                <StatsSection/>
                </Suspense>          
        </div>

         <h2>MANAGE EVENTS</h2>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Events</h2>
          <Suspense fallback={<EventCardSkeleton/>}>
              <EventCardSection />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default Admin;


