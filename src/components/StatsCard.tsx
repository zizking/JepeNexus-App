interface StatsCardProps {
  label: string;
  value: string;
  darkMode: boolean;
}

export default function StatsCard({ label, value, darkMode }: StatsCardProps) {
  return (
    <div className={`p-3 rounded-xl border transition-all duration-200 active:scale-95 ${
      darkMode 
        ? "bg-slate-900/60 border-slate-700 hover:border-purple-500/50" 
        : "bg-white border-slate-200 hover:border-purple-300"
    }`}>
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className={`text-[10px] mb-0.5 truncate ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>{label}</p>
          <p className={`text-xl font-bold ${
            darkMode ? "text-white" : "text-slate-900"
          }`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
