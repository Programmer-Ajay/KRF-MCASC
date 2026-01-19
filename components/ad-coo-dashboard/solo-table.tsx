export default function SoloTable({ participants }: { participants: any[] }) {
  if (participants.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-16 rounded-2xl border border-gray-700/50 bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black backdrop-blur-sm">
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-400">No participants found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-700/50 bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50">
      {/* Table wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-white/10 bg-linear-to-r from-pink-500/10 to-rose-500/10">
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider">Name</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider">College</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider">Year</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider">Course</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider">Mobile</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider">Email</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-pink-300 uppercase tracking-wider">Registered</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {participants.map((p, index) => (
              <tr
                key={p.registration_id}
                className={`border-b border-white/10 transition-colors duration-200 hover:bg-white/5 ${
                  index % 2 === 0 ? "bg-white/2" : ""
                }`}
              >
                <td className="px-4 sm:px-6 py-4 text-sm text-white font-medium">{p.participant_name}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{p.college_name}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{p.year}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{p.course_name}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{p.mobile_no}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-300">{p.email}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-400">
                  {new Date(p.registered_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 bg-linear-to-r from-pink-500/5 to-rose-500/5 px-4 sm:px-6 py-3">
        <p className="text-xs sm:text-sm text-gray-400">
          Total Participants: <span className="font-bold text-pink-300">{participants.length}</span>
        </p>
      </div>
    </div>
  );
}
