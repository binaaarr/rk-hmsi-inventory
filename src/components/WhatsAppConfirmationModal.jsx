import React from 'react';
import { CheckCircle2, MessageCircle, X, ArrowRight, Building2, User, Calendar, MapPin } from 'lucide-react';
import { generateWhatsAppTransactionLink, formatDateOnly } from '../utils/storage';

export default function WhatsAppConfirmationModal({
  transaction,
  isOpen,
  onClose
}) {
  if (!isOpen || !transaction) return null;

  const { item, action, borrowerDept, borrowerName, borrowDate, notes } = transaction;
  const isPinjam = action === 'PINJAM';
  const waUrl = generateWhatsAppTransactionLink({
    item,
    action,
    borrowerDept,
    borrowerName,
    borrowDate,
    notes
  });

  const handleSendWA = () => {
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 z-10 animate-scale-up text-slate-900 flex flex-col">
        {/* Header with success check */}
        <div className="p-5 text-center bg-gradient-to-b from-emerald-50 to-white border-b border-slate-100 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3 animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800">
            {isPinjam ? 'Peminjaman Berhasil' : 'Pengembalian Berhasil'}
          </span>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
            Status Inventaris Terupdate!
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Kirim pemberitahuan otomatis ke Departemen Pemilik
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="p-5 space-y-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="text-slate-500 font-semibold">Barang:</span>
              <strong className="text-slate-900 font-extrabold text-right">{item.name}</strong>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-700" />
                Departemen Pemilik:
              </span>
              <strong className="text-blue-900 font-bold">{item.ownerDept}</strong>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="text-slate-500 font-semibold">Peminjam:</span>
              <span className="font-semibold text-slate-800">{borrowerDept}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
              <span className="text-slate-500 font-semibold">Penanggung Jawab:</span>
              <span className="font-bold text-slate-900">{borrowerName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Tanggal:</span>
              <span className="text-slate-700">{formatDateOnly(borrowDate)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
            💡 <strong>Penting:</strong> Kirimkan konfirmasi WhatsApp kepada koordinator <strong>{item.ownerDept}</strong> agar kedua pihak memiliki bukti pencatatan resmi.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 pt-0 space-y-2">
          {/* WhatsApp Primary Action Button */}
          <button
            type="button"
            onClick={handleSendWA}
            className="w-full h-13 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all tap-bounce"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Kirim Konfirmasi WA ke {item.ownerDept.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Close/Skip button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors"
          >
            Selesai / Lewati
          </button>
        </div>
      </div>
    </div>
  );
}
