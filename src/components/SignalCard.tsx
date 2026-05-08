interface Signal {
  id: number;
  symbol: string;
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  entry: string;
  target: string;
  stopLoss: string;
  timestamp: string;
  reasoning: string;
}

interface SignalCardProps {
  signal: Signal;
  t: Record<string, string>;
  darkMode: boolean;
}

export default function SignalCard({ signal, t, darkMode }: SignalCardProps) {
  const actionColors = {
    BUY: darkMode 
      ? "bg-green-500/20 text-green-400 border-green-500/50" 
      : "bg-green-100 text-green-700 border-green-200",
    SELL: darkMode 
      ? "bg-red-500/20 text-red-400 border-red-500/50" 
      : "bg-red-100 text-red-700 border-red-200",
    HOLD: darkMode 
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" 
      : "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  const actionIcons = {
    BUY: "↑",
    SELL: "↓",
    HOLD: "→",
  };

  const calculateRiskReward = () => {
    const entry = parseFloat(signal.entry.replace(",", ""));
    const target = parseFloat(signal.target.replace(",", ""));
    const stopLoss = parseFloat(signal.stopLoss.replace(",", ""));
    const risk = Math.abs(entry - stopLoss);
    const reward = Math.abs(target - entry);
    if (risk === 0) return "N/A";
    return `1:${(reward / risk).toFixed(2)}`;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <div className={`p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] ${
      darkMode 
        ? "bg-slate-900/60 border-slate-700 hover:border-purple-500/50" 
        : "bg-white border-slate-200 hover:border-purple-300"
    } shadow-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            darkMode ? "bg-slate-800" : "bg-slate-100"
          }`}>
            <span className={`text-xs font-bold ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}>{signal.symbol.split('/')[0]}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={`text-base font-bold truncate ${
              darkMode ? "text-white" : "text-slate-900"
            }`}>{signal.symbol}</h3>
            <p className={`text-[10px] ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}>{formatTime(signal.timestamp)}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1.5 rounded-lg font-bold text-xs border ${actionColors[signal.action]}`}
        >
          {actionIcons[signal.action]} {signal.action}
        </span>
      </div>

      {/* Confidence Meter */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-xs ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>{t.confidence}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            signal.confidence >= 80 ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') :
            signal.confidence >= 60 ? (darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700') :
            (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')
          }`}>
            {signal.confidence}%
          </span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${
          darkMode ? "bg-slate-700" : "bg-slate-200"
        }`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              signal.confidence >= 80 ? "bg-gradient-to-r from-green-600 to-green-400" :
              signal.confidence >= 60 ? "bg-gradient-to-r from-yellow-600 to-yellow-400" :
              "bg-gradient-to-r from-red-600 to-red-400"
            }`}
            style={{ width: `${signal.confidence}%` }}
          />
        </div>
      </div>

      {/* Price Levels */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className={`p-2.5 rounded-lg text-center border ${
          darkMode 
            ? "bg-slate-800/50 border-slate-700" 
            : "bg-slate-50 border-slate-200"
        }`}>
          <p className={`text-[9px] mb-0.5 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>{t.entry}</p>
          <p className={`font-semibold text-sm ${
            darkMode ? "text-white" : "text-slate-900"
          }`}>${signal.entry}</p>
        </div>
        <div className={`p-2.5 rounded-lg text-center border ${
          darkMode 
            ? "bg-green-900/20 border-green-500/30" 
            : "bg-green-50 border-green-200"
        }`}>
          <p className={`text-[9px] mb-0.5 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}>{t.target}</p>
          <p className={`font-semibold text-sm ${
            darkMode ? "text-green-300" : "text-green-700"
          }`}>${signal.target}</p>
        </div>
        <div className={`p-2.5 rounded-lg text-center border ${
          darkMode 
            ? "bg-red-900/20 border-red-500/30" 
            : "bg-red-50 border-red-200"
        }`}>
          <p className={`text-[9px] mb-0.5 ${
            darkMode ? "text-red-400" : "text-red-600"
          }`}>{t.stop}</p>
          <p className={`font-semibold text-sm ${
            darkMode ? "text-red-300" : "text-red-700"
          }`}>${signal.stopLoss}</p>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className={`p-3 rounded-lg border mb-3 ${
        darkMode 
          ? "bg-slate-800/50 border-slate-700" 
          : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-5 h-5 rounded flex items-center justify-center ${
            darkMode ? "bg-purple-500/20" : "bg-purple-100"
          }`}>
            <span className="text-xs">🧠</span>
          </div>
          <span className={`text-xs font-semibold ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>{t.aiAnalysisCard}</span>
        </div>
        <p className={`text-sm leading-relaxed line-clamp-3 ${
          darkMode ? "text-slate-300" : "text-slate-600"
        }`}>{signal.reasoning}</p>
      </div>

      {/* Footer */}
      <div className={`flex items-center justify-between pt-2.5 border-t ${
        darkMode ? "border-slate-700" : "border-slate-200"
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}>{t.riskReward}</span>
          <span className="text-purple-400 font-bold text-sm">{calculateRiskReward()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}>{t.signalId}</span>
          <span className={`font-mono text-xs ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>#{signal.id}</span>
        </div>
      </div>
    </div>
  );
}
