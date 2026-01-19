type Props = {
  stats: {
    totalEvents:number,
    soloRegistrations: number;
    teamRegistrations: number;
    totalRegistrations: number;
  };
};

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Solo Registrations"
        value={stats.soloRegistrations}
        gradient="from-pink-500/20 to-rose-500/20"
        borderColor="border-pink-500/30"
        textGradient="from-pink-400 to-rose-400"
      />
      <StatCard
        title="Team Registrations"
        value={stats.teamRegistrations}
        gradient="from-purple-500/20 to-indigo-500/20"
        borderColor="border-purple-500/30"
        textGradient="from-purple-400 to-indigo-400"
      />
      <StatCard
        title="Total Registrations"
        value={stats.totalRegistrations}
        gradient="from-blue-500/20 to-cyan-500/20"
        borderColor="border-blue-500/30"
        textGradient="from-blue-400 to-cyan-400"
      />
      <StatCard
        title="Total Events"
        value={stats.totalEvents}
        gradient="from-emerald-500/20 to-blue-500/20"
        borderColor="border-blue-500/30"
        textGradient="from-emerald-400 to-purple-400"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  gradient,
  borderColor,
  textGradient,
}: {
  title: string;
  value: number;
  gradient: string;
  borderColor: string;
  textGradient: string;
}) {
  return (
    <div
      className={`rounded-2xl border ${borderColor} bg-linear-to-br ${gradient} backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/50 hover:shadow-2xl hover:shadow-black/70 transition-all duration-300 hover:scale-105 relative overflow-hidden group`}
    >
      {/* Glow effect on hover */}
      <div className={`absolute -inset-1 bg-linear-to-r ${textGradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`} />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <p className="text-xs sm:text-sm text-gray-300 font-medium uppercase tracking-wider relative z-10">
        {title}
      </p>
      <p
        className={`text-4xl sm:text-5xl font-black bg-linear-to-r ${textGradient} bg-clip-text text-transparent mt-4 relative z-10`}
      >
        {value}
      </p>
    </div>
  );
}
