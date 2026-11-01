import React, { useEffect } from 'react';
import { CheckCircle2, X, Sparkles, Plus } from 'lucide-react';

export default function Toast({ toast, onDismiss }) {
  if (!toast) return null;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const isPinjam = toast.type === 'PINJAM';
  const isTambah = toast.type === 'TAMBAH';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none animate-slide-up">
      <div className={`pointer-events-auto rounded-2xl p-4 shadow-2xl border-2 flex items-center justify-between gap-3 text-white backdrop-blur-md ${
        isTambah
          ? 'bg-slate-900/95 border-emerald-500 shadow-emerald-950/20'
          : isPinjam 
          ? 'bg-slate-900/95 border-emerald-500 shadow-emerald-950/20' 
          : 'bg-slate-900/95 border-blue-500 shadow-blue-950/20'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isTambah || isPinjam ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
          }`}>
            {isTambah ? <Plus className="w-6 h-6 stroke-[2.5]" /> : <CheckCircle2 className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isTambah 
                  ? 'bg-emerald-500 text-slate-950'
                  : isPinjam 
                  ? 'bg-emerald-500 text-slate-950' 
                  : 'bg-blue-500 text-slate-950'
              }`}>
                {isTambah ? 'Barang Ditambahkan' : isPinjam ? 'Berhasil Dipinjam' : 'Berhasil Dikembalikan'}
              </span>
            </div>
            <p className="text-sm font-bold text-white mt-0.5 line-clamp-1">
              {toast.itemName}
            </p>
            <p className="text-xs text-slate-300">
              {toast.message}
            </p>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
