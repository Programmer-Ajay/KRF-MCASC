export default function TeamList({ teams }: { teams: any[] }) {
  if (teams.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-16 rounded-2xl border border-gray-700/50 bg-linear-to-br from-gray-900/50 via-gray-900/30 to-black backdrop-blur-sm">
        <div className="text-center">
          <p className="text-sm sm:text-base text-gray-400">No teams found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {teams.map((team, teamIndex) => (
        <div
          key={team.team_id}
          className="rounded-2xl border border-purple-500/40 bg-linear-to-br from-purple-500/25 to-indigo-500/25 backdrop-blur-xl p-6 sm:p-7 shadow-2xl shadow-black/50 relative overflow-hidden group"
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Team Header */}
          <div className="mb-6 relative z-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {team.team_name}
                </h3>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-purple-300">{team.members.length}</span> members
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-linear-to-r from-purple-500/80 to-indigo-500/80 text-purple-50 text-xs font-semibold shadow-lg whitespace-nowrap">
                Team #{teamIndex + 1}
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="relative z-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/15 bg-linear-to-r from-purple-500/10 to-indigo-500/10">
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Member Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">College</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Mobile</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">Email</th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((m: any, memberIndex: number) => (
                  <tr
                    key={m.member_id}
                    className={`border-b border-white/10 transition-colors duration-200 hover:bg-white/5 ${
                      memberIndex % 2 === 0 ? "bg-white/2" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-sm text-white font-medium">{m.member_name}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{m.college_name}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{m.course_name}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{m.year}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{m.mobile_no}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{m.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Team Footer */}
          <div className="mt-4 pt-4 border-t border-white/15 relative z-10">
            <p className="text-xs text-gray-400">
              Members: <span className="font-bold text-purple-300">{team.members.length}</span>
            </p>
          </div>
        </div>
      ))}

      {/* Summary Footer */}
      <div className="mt-8 pt-6 border-t border-white/15">
        <p className="text-sm text-gray-400">
          Total Teams: <span className="font-bold text-purple-300">{teams.length}</span> | 
          Total Members: <span className="font-bold text-purple-300">{teams.reduce((sum, t) => sum + t.members.length, 0)}</span>
        </p>
      </div>
    </div>
  );
}
