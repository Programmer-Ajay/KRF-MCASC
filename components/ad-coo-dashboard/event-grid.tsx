import EventCard ,{EventData}from "./event-card";

interface EventGridProps{
  events:EventData[],
  role:"admin" |"coordinator"
}

export default function EventGrid({ events,role }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-16 rounded-2xl border border-gray-700/50 bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black backdrop-blur-sm">
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-400">No events found.</p>
          {role === "admin" && (
            <p className="text-xs text-gray-500">Create a new event to get started.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} variant={role} />
      ))}
    </div>
  );
}
