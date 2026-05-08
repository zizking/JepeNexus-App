"use client";

import { useState, useEffect } from "react";
import SignalCard from "@/components/SignalCard";
import StatsCard from "@/components/StatsCard";
import Header from "@/components/Header";

// Translations
const translations = {
  en: {
    title: "Nex",
    subtitle: "AI Trading Analyzer",
    latestSignals: "Latest Signals",
    realtime: "Real-time AI-powered trading signals",
    aiAnalysis: "AI-Powered Analysis",
    aiDescription: "Nex uses Multi-Agent AI Workflow:",
    dataAgent: "Data Agent",
    dataDesc: "Fetch real-time market data from multiple exchanges",
    analysisAgent: "Analysis Agent",
    analysisDesc: "Technical analysis & pattern recognition with MiMo API",
    signalAgent: "Signal Agent",
    signalDesc: "Generate trading signals with risk-reward calculation",
    powered: "Powered by:",
    footer: "© 2026 Nex. Built for MiMo 100T Program.",
    refresh: "Refresh",
    total: "Total",
    avgConf: "Avg Conf",
    buy: "Buy",
    sell: "Sell",
    entry: "Entry",
    target: "Target",
    stop: "Stop",
    confidence: "Confidence",
    aiAnalysisCard: "AI Analysis",
    riskReward: "R:R",
    signalId: "ID:",
    live: "Live",
  },
  id: {
    title: "Nex",
    subtitle: "AI Trading Analyzer",
    latestSignals: "Sinyal Terbaru",
    realtime: "Sinyal trading bertenaga AI real-time",
    aiAnalysis: "Analisis AI",
    aiDescription: "Nex menggunakan Multi-Agent AI Workflow:",
    dataAgent: "Data Agent",
    dataDesc: "Ambil data market real-time dari berbagai exchange",
    analysisAgent: "Analysis Agent",
    analysisDesc: "Analisis teknikal & pattern recognition dengan MiMo API",
    signalAgent: "Signal Agent",
    signalDesc: "Generate sinyal trading dengan kalkulasi risk-reward",
    powered: "Didukung oleh:",
    footer: "© 2026 Nex. Dibuat untuk MiMo 100T Program.",
    refresh: "Refresh",
    total: "Total",
    avgConf: "Rata-rata",
    buy: "Beli",
    sell: "Jual",
    entry: "Masuk",
    target: "Target",
    stop: "Stop",
    confidence: "Keyakinan",
    aiAnalysisCard: "Analisis AI",
    riskReward: "R:R",
    signalId: "ID:",
    live: "Live",
  },
};

// Mock data
const mockSignals: Array<{
  id: number;
  symbol: string;
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  entry: string;
  target: string;
  stopLoss: string;
  timestamp: string;
  reasoning: string;
}> = [
  {
    id: 1,
    symbol: "BTC/USDT",
    action: "BUY" as const,
    confidence: 87,
    entry: "98,450",
    target: "102,000",
    stopLoss: "96,200",
    timestamp: new Date().toISOString(),
    reasoning: "Strong bullish divergence on 4H chart, RSI oversold, volume increasing",
  },
  {
    id: 2,
    symbol: "ETH/USDT",
    action: "HOLD" as const,
    confidence: 72,
    entry: "3,420",
    target: "3,650",
    stopLoss: "3,280",
    timestamp: new Date().toISOString(),
    reasoning: "Consolidation phase, waiting for breakout confirmation above 3,500",
  },
  {
    id: 3,
    symbol: "SOL/USDT",
    action: "BUY" as const,
    confidence: 91,
    entry: "218.50",
    target: "235.00",
    stopLoss: "210.00",
    timestamp: new Date().toISOString(),
    reasoning: "Breaking out of ascending triangle, strong momentum, ecosystem growth",
  },
  {
    id: 4,
    symbol: "BNB/USDT",
    action: "SELL" as const,
    confidence: 78,
    entry: "612.00",
    target: "590.00",
    stopLoss: "625.00",
    timestamp: new Date().toISOString(),
    reasoning: "Resistance at 620, bearish divergence on MACD, profit-taking expected",
  },
];

export default function Home() {
  const [signals, setSignals] = useState(mockSignals);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [language, setLanguage] = useState<"en" | "id">("id");
  const [darkMode, setDarkMode] = useState(true);

  const t = translations[language];

  const refreshSignals = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(refreshSignals, 300000);
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalSignals: signals.length,
    avgConfidence: Math.round(signals.reduce((acc, s) => acc + s.confidence, 0) / signals.length),
    buySignals: signals.filter((s) => s.action === "BUY").length,
    sellSignals: signals.filter((s) => s.action === "SELL").length,
  };

  return (
    <main className={`min-h-screen pb-20 transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" 
        : "bg-gradient-to-br from-slate-100 via-white to-slate-100"
    }`}>
      <Header 
        onRefresh={refreshSignals} 
        isLoading={isLoading} 
        lastUpdate={lastUpdate}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        t={t}
      />
      
      <div className="container mx-auto px-3 py-3 sm:py-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3 sm:gap-3 sm:mb-4">
          <StatsCard label={t.total} value={stats.totalSignals.toString()} darkMode={darkMode} />
          <StatsCard label={t.avgConf} value={`${stats.avgConfidence}%`} darkMode={darkMode} />
          <StatsCard label={t.buy} value={stats.buySignals.toString()} darkMode={darkMode} />
          <StatsCard label={t.sell} value={stats.sellSignals.toString()} darkMode={darkMode} />
        </div>

        {/* Section Title */}
        <div className="mb-3">
          <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}>
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            {t.latestSignals}
          </h2>
          <p className={`text-xs mt-0.5 ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}>
            {t.realtime}
          </p>
        </div>

        {/* Signals Grid */}
        <div className="flex flex-col gap-3 mb-6">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} t={t} darkMode={darkMode} />
          ))}
        </div>

        {/* AI Info Section */}
        <div className={`p-4 rounded-xl border backdrop-blur-sm mb-4 ${
          darkMode 
            ? "bg-slate-900/50 border-slate-700" 
            : "bg-white/50 border-slate-200"
        }`}>
          <h2 className={`text-lg font-bold mb-3 ${
            darkMode ? "text-white" : "text-slate-900"
          }`}>
            {t.aiAnalysis}
          </h2>
          <p className={`text-sm mb-4 ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}>
            {t.aiDescription}
          </p>
          <div className="flex flex-col gap-3">
            <div className={`p-3 rounded-lg border flex items-start gap-3 ${
              darkMode 
                ? "bg-slate-800/50 border-slate-700" 
                : "bg-slate-50 border-slate-200"
            }`}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">📡</span>
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>{t.dataAgent}</h3>
                <p className={`text-xs leading-relaxed ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}>{t.dataDesc}</p>
              </div>
            </div>
            <div className={`p-3 rounded-lg border flex items-start gap-3 ${
              darkMode 
                ? "bg-slate-800/50 border-slate-700" 
                : "bg-slate-50 border-slate-200"
            }`}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🧠</span>
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>{t.analysisAgent}</h3>
                <p className={`text-xs leading-relaxed ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}>{t.analysisDesc}</p>
              </div>
            </div>
            <div className={`p-3 rounded-lg border flex items-start gap-3 ${
              darkMode 
                ? "bg-slate-800/50 border-slate-700" 
                : "bg-slate-50 border-slate-200"
            }`}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🎯</span>
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}>{t.signalAgent}</h3>
                <p className={`text-xs leading-relaxed ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}>{t.signalDesc}</p>
              </div>
            </div>
          </div>
          <div className={`mt-4 p-3 rounded-lg border ${
            darkMode 
              ? "bg-purple-900/20 border-purple-700/50" 
              : "bg-purple-50 border-purple-200"
          }`}>
            <p className={`text-xs ${
              darkMode ? "text-purple-300" : "text-purple-600"
            }`}>
              <strong>{t.powered}</strong> Xiaomi MiMo API • OpenClaw • Next.js
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className={`text-center text-xs pb-4 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}>
          <p>{t.footer}</p>
        </footer>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={refreshSignals}
        disabled={isLoading}
        className="fixed bottom-5 right-5 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 disabled:from-slate-700 disabled:to-slate-600 text-white rounded-full shadow-lg shadow-purple-500/30 transition-all duration-200 disabled:cursor-not-allowed z-50 active:scale-95"
        aria-label="Refresh signals"
      >
        <span className={`text-xl ${isLoading ? "animate-spin" : ""}`}>↻</span>
      </button>
    </main>
  );
}
