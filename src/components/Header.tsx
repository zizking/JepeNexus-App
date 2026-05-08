"use client";

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdate: Date;
  language: "en" | "id";
  setLanguage: (lang: "en" | "id") => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  t: Record<string, string>;
}

export default function Header({ 
  onRefresh, 
  isLoading, 
  lastUpdate,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  t 
}: HeaderProps) {
  return (
    <header className={`border-b sticky top-0 z-50 backdrop-blur-md ${
      darkMode 
        ? "border-slate-800 bg-slate-950/90" 
        : "border-slate-200 bg-white/90"
    }`}>
      <div className="container mx-auto px-3 py-3">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className={`text-lg font-bold truncate ${
                darkMode ? "text-white" : "text-slate-900"
              }`}>Nex</h1>
              <p className={`text-[10px] truncate ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}>{t.subtitle}</p>
            </div>
          </div>
          
          {/* Settings - Language & Theme */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                darkMode 
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-700" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                darkMode 
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row - Live Status & Refresh */}
        <div className={`mt-3 pt-3 border-t flex items-center justify-between gap-3 ${
          darkMode ? "border-slate-800" : "border-slate-200"
        }`}>
          {/* Live Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className={`text-[10px] ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}>{t.live}</span>
            <span className={`text-[10px] font-mono ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}>
              • {lastUpdate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 disabled:cursor-not-allowed ${
              darkMode 
                ? "bg-purple-600 hover:bg-purple-700 disabled:bg-slate-700 text-white" 
                : "bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white"
            }`}
          >
            <span className={`text-base ${isLoading ? "animate-spin" : ""}`}>↻</span>
            <span>{isLoading ? "..." : t.refresh}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
