import React from 'react';
import { Sparkles, Eye, ClipboardList } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, borrowedCount, onOpenLogs }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 h-16 max-w-lg mx-auto px-2">
        {/* Action Tab */}
        <button
          onClick={() => setActiveTab('action')}
          className={`flex flex-col items-center justify-center gap-1 relative py-1 transition-all tap-bounce ${
            activeTab === 'action'
              ? 'text-blue-800 font-bold'
              : 'text-slate-500 font-medium hover:text-slate-700'
          }`}
        >
          {activeTab === 'action' && (
            <span className="absolute top-0 w-12 h-1 bg-blue-800 rounded-b-full"></span>
          )}
          <div className={`p-1 rounded-xl transition-all ${activeTab === 'action' ? 'bg-blue-100 text-blue-900 scale-105' : ''}`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] tracking-tight">Update Status</span>
        </button>

        {/* Monitoring Tab */}
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`flex flex-col items-center justify-center gap-1 relative py-1 transition-all tap-bounce ${
            activeTab === 'monitoring'
              ? 'text-blue-800 font-bold'
              : 'text-slate-500 font-medium hover:text-slate-700'
          }`}
        >
          {activeTab === 'monitoring' && (
            <span className="absolute top-0 w-12 h-1 bg-blue-800 rounded-b-full"></span>
          )}
          <div className={`p-1 rounded-xl relative transition-all ${activeTab === 'monitoring' ? 'bg-blue-100 text-blue-900 scale-105' : ''}`}>
            <Eye className="w-5 h-5" />
            {borrowedCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px] font-bold shadow-sm">
                {borrowedCount}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight">Monitoring</span>
        </button>

        {/* Riwayat / Log Tab */}
        <button
          onClick={onOpenLogs}
          className="flex flex-col items-center justify-center gap-1 relative py-1 transition-all tap-bounce text-slate-500 font-medium hover:text-slate-700"
        >
          <div className="p-1 rounded-xl transition-all">
            <ClipboardList className="w-5 h-5" />
          </div>
          <span className="text-[11px] tracking-tight">Riwayat RK</span>
        </button>
      </div>
    </nav>
  );
}
