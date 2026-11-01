import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  User, 
  Calendar, 
  Camera, 
  Sparkles,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { DEPARTMENT_DETAILS } from '../data/departmentsData';
import { formatDateOnly, formatRelativeTime } from '../utils/storage';

export default function ItemCard({ item, onSelect, onViewPhoto }) {
  const isAvailable = item.status === 'Tersedia';
  const deptDetail = DEPARTMENT_DETAILS[item.ownerDept] || {
    short: 'RK',
    name: item.ownerDept,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  return (
    <div
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className={`group relative bg-white rounded-3xl p-4 sm:p-5 border-2 transition-all duration-200 text-left cursor-pointer tap-bounce select-none flex flex-col justify-between ${
        isAvailable 
          ? 'border-slate-200/90 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5' 
          : 'border-rose-200/90 bg-rose-50/15 hover:border-rose-400 hover:shadow-xl hover:shadow-rose-900/5'
      }`}
    >
      <div>
        {/* Item Photo (ALWAYS DISPLAYED EVEN WHEN TERSEDIA) */}
        <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 mb-3.5 border border-slate-200/80 shadow-inner group-hover:shadow-md transition-shadow">
          <img
            src={item.photo || item.photoProof || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80'}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          {/* Floating Status Badge over Photo */}
          <div className="absolute top-2.5 right-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md backdrop-blur-md transition-colors ${
                isAvailable
                  ? 'bg-emerald-600/95 text-white border border-emerald-400'
                  : 'bg-rose-600/95 text-white border border-rose-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isAvailable ? 'bg-white' : 'bg-white animate-pulse'
                }`}
              />
              {item.status}
            </span>
          </div>

          {/* Floating Quantity Badge over Photo */}
          <div className="absolute bottom-2.5 left-2.5">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20 shadow-sm">
              {item.quantity || '1 unit'}
            </span>
          </div>
        </div>

        {/* OWNER DEPARTMENT TAG (Replaces category tag) */}
        <div className="mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold border ${deptDetail.badgeColor}`}>
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span>{item.ownerDept}</span>
            </span>
          </div>

          {/* Item Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-900 transition-colors line-clamp-2 mt-1.5">
            {item.name}
          </h3>
        </div>

        {/* Location & Condition */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[170px]">{item.location}</span>
          </span>
          <span className="inline-block w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Kondisi: <strong className="text-slate-700">{item.condition}</strong></span>
        </div>

        {/* Borrowed Details (If Status is Dipinjam) */}
        {!isAvailable && (
          <div className="mt-2.5 p-3.5 rounded-2xl bg-white border border-rose-200/90 shadow-xs text-xs space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                  Departemen Peminjam:
                </span>
                <p className="font-extrabold text-slate-900 text-xs flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{item.borrowerDept || '-'}</span>
                </p>
                {item.borrowerName && (
                  <p className="text-[11px] text-slate-600">
                    PIC: <strong className="text-slate-800">{item.borrowerName}</strong>
                  </p>
                )}
              </div>

              {/* Photo Proof Lightbox Trigger */}
              {item.photoProof && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onViewPhoto) onViewPhoto(item);
                  }}
                  className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
                  title="Lihat foto bukti fisik peminjaman"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-600" />
                  <span>Bukti Foto</span>
                </button>
              )}
            </div>

            {item.borrowDate && (
              <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Dipinjam: {formatDateOnly(item.borrowDate)}</span>
              </div>
            )}

            {item.notes && (
              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                "{item.notes}"
              </p>
            )}
          </div>
        )}
      </div>

      {/* Massive Tap CTA Button (Thumb Friendly min 48px height) */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div
          className={`w-full h-12 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-150 ${
            isAvailable
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-900/10 group-hover:from-emerald-700 group-hover:to-teal-700'
              : 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-blue-900/10 group-hover:from-blue-800 group-hover:to-indigo-900'
          }`}
        >
          {isAvailable ? (
            <>
              <Sparkles className="w-4 h-4" />
              <span>PINJAM BARANG</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>KEMBALIKAN BARANG</span>
            </>
          )}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}
