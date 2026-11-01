import React from 'react';
import { 
  Boxes, 
  Plus, 
  ClipboardList
} from 'lucide-react';

export default function Header({ 
  items, 
  onOpenAddItem, 
  onOpenLogs 
}) {
  const totalItems = items.length;
  const availableItems = items.filter(i => i.status === 'Tersedia').length;
  const borrowedItems = totalItems - availableItems;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand & actions row */}
        <div className="flex items-center justify-between py-3.5 sm:py-4">
          <div className="flex items-center gap-3">
            {/* Logo Avatar */}
            <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white shadow-md shadow-blue-950/20">
              <Boxes className="w-6 h-6 text-blue-200" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  RK HMSI <span className="text-blue-700">Inventory</span>
                </h1>
                <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                  ITS Surabaya
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Sistem Peminjaman & Monitoring Terpadu
              </p>
            </div>
          </div>

          {/* Right actions: Tambah Barang & Riwayat Log */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Riwayat Log Button */}
            <button
              onClick={onOpenLogs}
              title="Lihat Log Riwayat RK"
              className="inline-flex items-center justify-center p-2.5 sm:px-3 sm:py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors text-xs font-bold gap-1.5 tap-bounce"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="hidden sm:inline">Riwayat Log</span>
            </button>

            {/* TAMBAH BARANG Primary Button */}
            <button
              onClick={onOpenAddItem}
              className="inline-flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 text-xs sm:text-sm font-extrabold gap-1.5 transition-all tap-bounce"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              <span>Tambah Barang</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-3 gap-2 pb-3 pt-1 border-t border-slate-100/90 text-center">
          <div className="bg-slate-50/80 rounded-xl py-1.5 px-2 border border-slate-200/60 flex items-center justify-center gap-1.5">
            <span className="text-[11px] font-medium text-slate-500">Total Barang:</span>
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">{totalItems}</span>
          </div>

          <div className="bg-emerald-50/80 rounded-xl py-1.5 px-2 border border-emerald-200/60 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[11px] font-medium text-emerald-800">Tersedia:</span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-700">{availableItems}</span>
          </div>

          <div className="bg-rose-50/80 rounded-xl py-1.5 px-2 border border-rose-200/60 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-[11px] font-medium text-rose-800">Dipinjam:</span>
            <span className="text-xs sm:text-sm font-extrabold text-rose-700">{borrowedItems}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
