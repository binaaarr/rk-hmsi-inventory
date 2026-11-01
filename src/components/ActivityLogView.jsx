import React, { useState } from 'react';
import { 
  X, 
  ClipboardList, 
  Clock, 
  User, 
  Building2, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  PackagePlus
} from 'lucide-react';
import { formatFullDateTime, formatRelativeTime, formatDateOnly } from '../utils/storage';

export default function ActivityLogModal({ isOpen, onClose, logs, onViewPhoto }) {
  if (!isOpen) return null;

  const [filterAction, setFilterAction] = useState('ALL');

  const filteredLogs = logs.filter(log => {
    if (filterAction === 'PINJAM') return log.action === 'PINJAM';
    if (filterAction === 'KEMBALI') return log.action === 'KEMBALI';
    if (filterAction === 'TAMBAH') return log.action === 'TAMBAH_BARANG';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-800">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Log Riwayat Inventaris RK
              </h2>
              <p className="text-xs text-slate-500">
                Catatan mutasi & bukti fisik transaksi inventaris
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="px-5 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Filter:</span>
          {['ALL', 'PINJAM', 'KEMBALI', 'TAMBAH'].map((act) => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce ${
                filterAction === act
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {act === 'ALL' ? 'Semua' : act === 'PINJAM' ? 'Peminjaman' : act === 'KEMBALI' ? 'Pengembalian' : 'Tambah Baru'}
            </button>
          ))}
          <span className="ml-auto text-xs font-semibold text-slate-400 shrink-0">
            {filteredLogs.length} Catatan
          </span>
        </div>

        {/* List of logs */}
        <div className="p-5 sm:px-6 overflow-y-auto space-y-3 divide-y divide-slate-100">
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Belum ada riwayat aktivitas yang tercatat.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isPinjam = log.action === 'PINJAM';
              const isTambah = log.action === 'TAMBAH_BARANG';
              return (
                <div key={log.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3 text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        isTambah
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : isPinjam
                          ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {isTambah ? 'TAMBAH' : log.action}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {log.itemName}
                      </span>
                      {log.ownerDept && (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          Pemilik: {log.ownerDept}
                        </span>
                      )}
                    </div>

                    {!isTambah && (
                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="flex items-center gap-1 font-semibold text-slate-800">
                          <Building2 className="w-3.5 h-3.5 text-blue-700" />
                          Peminjam: {log.borrowerDept || '-'}
                        </span>
                        {log.borrowerName && (
                          <span>• PIC: {log.borrowerName}</span>
                        )}
                        {log.borrowDate && (
                          <span>• Tanggal: {formatDateOnly(log.borrowDate)}</span>
                        )}
                      </div>
                    )}

                    {log.notes && (
                      <p className="text-[11px] text-slate-500 italic">
                        "{log.notes}"
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-slate-400 pt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{formatFullDateTime(log.timestamp)} ({formatRelativeTime(log.timestamp)})</span>
                    </div>
                  </div>

                  {log.photoProof && (
                    <button
                      type="button"
                      onClick={() => onViewPhoto({
                        name: log.itemName,
                        ownerDept: log.ownerDept,
                        borrowerDept: log.borrowerDept,
                        borrowerName: log.borrowerName,
                        borrowedAt: log.timestamp,
                        photoProof: log.photoProof,
                        notes: log.notes
                      })}
                      className="shrink-0 group relative rounded-xl overflow-hidden border border-slate-200 hover:border-blue-400 transition-all w-14 h-14 bg-slate-100"
                      title="Lihat foto bukti"
                    >
                      <img
                        src={log.photoProof}
                        alt="Bukti foto"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
