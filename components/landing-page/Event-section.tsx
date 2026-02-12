"use client"

import EventCard from "./event-card"

import { getEventListType } from "@/server/services/get-competiton-details";

const getColorForType = (type: string) => {
  const map: Record<string, "cyan" | "pink" | "orange" | "purple"> = {
    seminar: "cyan",
    project: "pink",
    debate: "orange",
    technoQuiz: "purple",
    programming: "cyan",
    shortfilm: "purple",
    poster: "orange",
  };
  return map[type.toLowerCase()] || "cyan";
};


type Props={
  events:getEventListType[];
}
const EventsSection = ({ events }: Props) => {
  return (
    <section id="events" className="bg-black py-20 px-6">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-sm tracking-widest text-cyan-400 mb-3">
          WHAT'S HAPPENING
        </p>

        <h2 className="inline-block px-6 py-2 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-4xl font-bold mb-4">
          <span className="bg-linear-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Featured Events
          </span>
        </h2>

        <p className="text-gray-400">
          From technical challenges to cultural performances, there's something
          for everyone.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events && events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              // Basic Info
              title={event.name}
              description={"Join us for this exciting competition."} // You can add a description column to DB later if needed
              color={getColorForType(event.name.split(" ")[0] || "seminar")} // Fallback logic for color
              type={event.name} // You can store 'type' in DB or derive it
              
              // New Fields
              venue={event.venue}
              eventDate={event.eventDate} // String
              eventTime={event.eventTime} // String
              registrationDeadline={event.registrationDeadline} // String
              
              //  Coordinator Info
              coordinatorName={event.coordinatorName}
              coordinatorEmail={event.coordinatorEmail}
              coordinatorMobile={event.coordinatorMobileNo}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No upcoming events found.
          </p>
        )}
      </div>
    </section>
  );
};

export default EventsSection;




// const EventsSection = ({events}:Props) => {
//   return (
//     <section id="events" className="bg-black py-20 px-6">
//       {/* Heading */}
//       <div className="text-center max-w-3xl mx-auto mb-14">
//         <p className="text-sm tracking-widest text-cyan-400 mb-3">WHAT'S HAPPENING</p>

//         <h2 className="inline-block px-6 py-2 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-4xl font-bold mb-4">
//   <span className="bg-linear-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
//     Featured Events
//   </span>
// </h2>


//         <p className="text-gray-400">
//           From technical challenges to cultural performances, there's something
//           for everyone.
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//   <EventCard
//     title="Seminars"
//     description="Insightful talks from industry experts and thought leaders."
//     color="cyan"
//     type="seminar"
//   />

//   <EventCard
//     title="Project Competition"
//     description="Showcase your innovative projects and compete for prizes."
//     color="pink"
//     type="project"
//   />

//   <EventCard
//     title="Debate"
//     description="Battle of words and wits. Convince the judges."
//     color="orange"
//     type="debate"
//   />

//   <EventCard
//     title="Quiz"
//     description="Test your knowledge across various domains."
//     color="purple"
//     type="quiz"
//   />

//   <EventCard
//     title="Programming"
//     description="Code your way to victory in intense programming challenges and hackathons."
//     color="cyan"
//     type="programming"
//   />

// <EventCard
//     title="Short Film"
//     description="Every frame you shoot has a story to tell."
//     color="purple"
//     type="shortfilm"
//   />
//    <EventCard
//     title="Poster-Making"
//     description="Let your creativity run wild and speak louder than words through your poster."
//     color="orange"
//     type="poster"
//   />
// </div>


//     </section>
//   );
// };

// export default EventsSection;