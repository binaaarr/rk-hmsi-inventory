import React from 'react';
import { X, Calendar, User, Clock, Building2 } from 'lucide-react';
import { formatFullDateTime } from '../utils/storage';

export default function PhotoModal({ item, onClose }) {
  if (!item || (!item.photoProof && !item.photo)) return null;

  const displayPhoto = item.photoProof || item.photo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 z-10 animate-scale-up text-white flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                Foto Barang Fisik
              </span>
              {item.ownerDept && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {item.ownerDept}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white line-clamp-1 mt-0.5">
              {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview */}
        <div className="relative bg-black flex items-center justify-center min-h-[260px] max-h-[60vh] overflow-hidden">
          <img
            src={displayPhoto}
            alt={`Foto ${item.name}`}
            className="w-full h-auto max-h-[60vh] object-contain"
          />
        </div>

        {/* Metadata Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs space-y-2">
          {item.borrowerDept && (
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Building2 className="w-4 h-4 text-rose-400" />
                Peminjam: {item.borrowerDept}
              </span>
              {item.borrowedAt && (
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {formatFullDateTime(item.borrowedAt)}
                </span>
              )}
            </div>
          )}

          {item.borrowerName && (
            <div className="flex items-center gap-1.5 text-slate-300">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>PIC Peminjam: <strong className="text-white">{item.borrowerName}</strong></span>
            </div>
          )}

          {item.notes && (
            <p className="text-[11px] text-slate-400 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
              📝 Keterangan: {item.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
