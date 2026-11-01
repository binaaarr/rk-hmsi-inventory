import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  User, 
  AlertCircle, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import PhotoCapture from './PhotoCapture';
import { EXACT_DEPARTMENTS, DEPARTMENT_DETAILS } from '../data/departmentsData';
import { formatDateOnly } from '../utils/storage';

export default function ActionDrawer({ 
  item, 
  isOpen, 
  onClose, 
  onSubmitAction 
}) {
  if (!isOpen || !item) return null;

  const isAvailable = item.status === 'Tersedia';
  const todayStr = new Date().toISOString().split('T')[0];

  // Form State
  const [borrowerDept, setBorrowerDept] = useState(
    isAvailable ? EXACT_DEPARTMENTS[0] : (item.borrowerDept || EXACT_DEPARTMENTS[0])
  );
  const [picName, setPicName] = useState('');
  const [borrowDate, setBorrowDate] = useState(todayStr);
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state when item changes
  useEffect(() => {
    if (item) {
      setBorrowerDept(isAvailable ? EXACT_DEPARTMENTS[0] : (item.borrowerDept || EXACT_DEPARTMENTS[0]));
      setPicName(isAvailable ? '' : (item.borrowerName || ''));
      setBorrowDate(todayStr);
      setNotes('');
      setPhoto(null);
      setErrorMessage('');
    }
  }, [item, isAvailable]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // PIC Name is strictly mandatory
    if (!picName.trim()) {
      setErrorMessage('Wajib mengisi Nama Penanggung Jawab (PIC)!');
      return;
    }

    // Date is mandatory
    if (!borrowDate) {
      setErrorMessage('Wajib memilih Tanggal Peminjaman / Pengembalian!');
      return;
    }

    // Photo is strictly mandatory
    if (!photo) {
      setErrorMessage('Wajib melampirkan foto bukti fisik barang!');
      return;
    }

    if (isAvailable && !borrowerDept) {
      setErrorMessage('Pilih Departemen Peminjam!');
      return;
    }

    setIsSubmitting(true);

    const actionType = isAvailable ? 'PINJAM' : 'KEMBALI';
    const payload = {
      itemId: item.id,
      action: actionType,
      borrowerDept: isAvailable ? borrowerDept : (item.borrowerDept || borrowerDept),
      borrowerName: picName.trim(),
      borrowDate: borrowDate,
      notes: notes.trim(),
      photoProof: photo,
      timestamp: new Date().toISOString()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitAction(payload);
    }, 200);
  };

  const ownerDetail = DEPARTMENT_DETAILS[item.ownerDept] || {
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Drawer / Modal Container */}
      <div 
        className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-up sm:animate-scale-up"
      >
        {/* Mobile Pull Indicator */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="px-5 sm:px-6 pt-3 pb-4 border-b border-slate-100 flex items-start justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                isAvailable 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {item.status}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${ownerDetail.badgeColor}`}>
                🏢 Pemilik: {item.ownerDept}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight line-clamp-1">
              {item.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors tap-bounce"
            title="Tutup Form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content (No horizontal scroll, pure mousewheel/touch flow) */}
        <div className="px-5 sm:px-6 py-4 overflow-y-auto space-y-4 text-slate-800">
          {/* Quick Context Details Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Lokasi: <strong className="text-slate-800">{item.location}</strong></span>
            </div>
            <div className="text-slate-500">
              Jumlah: <strong className="text-slate-800">{item.quantity || '1 unit'}</strong>
            </div>
          </div>

          {/* Current Borrower Info if returning */}
          {!isAvailable && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-bold text-rose-900">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-rose-600" />
                  Sedang Dipinjam Oleh:
                </span>
                {item.borrowDate && (
                  <span className="text-slate-500 font-normal">
                    {formatDateOnly(item.borrowDate)}
                  </span>
                )}
              </div>
              <p className="text-sm font-extrabold text-slate-900">
                {item.borrowerDept || '-'}
                {item.borrowerName ? ` - PIC: ${item.borrowerName}` : ''}
              </p>
              {item.notes && (
                <p className="text-xs text-slate-600 italic">
                  "{item.notes}"
                </p>
              )}
            </div>
          )}

          {/* FORM FIELDS */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. BORROWER DEPARTMENT (EXACT 9 LIST ONLY - NO PROKER, NO CHIPS) */}
            {isAvailable ? (
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    Departemen Peminjam
                  </span>
                  <span className="text-rose-600 text-xs font-extrabold">*Wajib</span>
                </label>

                {/* Dropdown with EXACT 9 Departments ONLY */}
                <div className="relative">
                  <select
                    value={borrowerDept}
                    onChange={(e) => setBorrowerDept(e.target.value)}
                    className="w-full h-12 px-3.5 pr-10 rounded-2xl bg-white border-2 border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-sm appearance-none cursor-pointer"
                  >
                    {EXACT_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 font-bold">
                    ▼
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-500">
                  Konfirmasi Pengembalian Untuk:
                </span>
                <p className="text-sm font-bold text-slate-800">
                  {item.borrowerDept || 'Departemen Peminjam'}
                </p>
              </div>
            )}

            {/* 2. PENANGGUNG JAWAB (PIC) - MANDATORY TEXT INPUT */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-700" />
                  {isAvailable ? 'Penanggung Jawab (Nama PIC Peminjam)' : 'Penanggung Jawab (Nama PIC Pengembalian)'}
                </span>
                <span className="text-rose-600 text-xs font-extrabold">*Wajib</span>
              </label>

              <input
                type="text"
                required
                value={picName}
                onChange={(e) => setPicName(e.target.value)}
                placeholder="Contoh: Budi Santoso / Muhammad Aris"
                className="w-full h-12 px-3.5 rounded-2xl bg-white border-2 border-slate-300 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
              />
            </div>

            {/* 3. TANGGAL PEMINJAMAN - MANDATORY DATE PICKER */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-700" />
                  {isAvailable ? 'Tanggal Peminjaman' : 'Tanggal Pengembalian'}
                </span>
                <span className="text-rose-600 text-xs font-extrabold">*Wajib</span>
              </label>

              <input
                type="date"
                required
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
                className="w-full h-12 px-3.5 rounded-2xl bg-white border-2 border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-sm cursor-pointer"
              />
            </div>

            {/* 4. MANDATORY PHOTO UPLOAD / CAPTURE */}
            <PhotoCapture 
              photo={photo} 
              setPhoto={setPhoto} 
              required={true}
              isReturning={!isAvailable}
            />

            {/* 5. KETERANGAN / KEPERLUAN */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>Keterangan Tambahan / Catatan Kondisi</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isAvailable ? "Contoh: Untuk gladi bersih / rapat pleno" : "Contoh: Dikembalikan lengkap & bersih"}
                className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-bold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* MASSIVE ACTION BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-14 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-150 select-none tap-bounce ${
                  isAvailable
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/25 active:bg-emerald-800'
                    : 'bg-blue-800 hover:bg-blue-900 text-white shadow-blue-900/25 active:bg-blue-950'
                } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </span>
                ) : isAvailable ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>PINJAM BARANG SEKARANG</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>KEMBALIKAN BARANG SEKARANG</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">
                Setelah ini Anda dapat langsung mengirim konfirmasi WhatsApp ke Departemen Pemilik
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
