import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  PackagePlus,
  Tag
} from 'lucide-react';
import PhotoCapture from './PhotoCapture';
import { EXACT_DEPARTMENTS } from '../data/departmentsData';

export default function AddItemModal({ isOpen, onClose, onAddItem }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [ownerDept, setOwnerDept] = useState(EXACT_DEPARTMENTS[0]);
  const [quantity, setQuantity] = useState('1 unit');
  const [condition, setCondition] = useState('Baik');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Nama Barang wajib diisi!');
      return;
    }

    if (!location.trim()) {
      setErrorMessage('Lokasi Peletakan barang di RK wajib diisi!');
      return;
    }

    if (!photo) {
      setErrorMessage('Foto fisik barang wajib dilampirkan!');
      return;
    }

    setIsSubmitting(true);

    const newItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      ownerDept,
      quantity: quantity.trim() || '1 unit',
      condition,
      location: location.trim(),
      photo,
      status: 'Tersedia',
      borrowerDept: '',
      borrowerName: '',
      borrowDate: '',
      photoProof: null,
      notes: notes.trim()
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onAddItem(newItem);
      onClose();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative w-full sm:max-w-xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-up sm:animate-scale-up">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Tambah Barang Baru
              </h2>
              <p className="text-xs text-slate-500">
                Daftarkan aset inventaris ke Ruang Kesekretariatan
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

        {/* Scrollable Form Body */}
        <div className="px-5 sm:px-6 py-4 overflow-y-auto space-y-4 text-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. NAMA BARANG */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                <span>Nama Barang</span>
                <span className="text-rose-600 text-xs font-extrabold">*Wajib</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Soundcard Focusrite, Kabel HDMI 10m, dll."
                className="w-full h-12 px-3.5 rounded-2xl bg-white border-2 border-slate-300 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
              />
            </div>

            {/* 2. DEPARTEMEN PEMILIK (DROPDOWN FROM EXACT LIST) */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-emerald-700" />
                  Departemen Pemilik (Owner)
                </span>
                <span className="text-rose-600 text-xs font-extrabold">*Wajib</span>
              </label>
              <div className="relative">
                <select
                  value={ownerDept}
                  onChange={(e) => setOwnerDept(e.target.value)}
                  className="w-full h-12 px-3.5 pr-10 rounded-2xl bg-white border-2 border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-sm appearance-none cursor-pointer"
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

            {/* 3. JUMLAH & KONDISI BARANG */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Jumlah / Satuan
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Contoh: 1 unit / 3 dus"
                  className="w-full h-11 px-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-medium text-slate-900 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Kondisi Barang
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 focus:border-emerald-500"
                >
                  <option value="Baik">Baik (Normal)</option>
                  <option value="Cukup Baik">Cukup Baik</option>
                  <option value="Perlu Servis">Perlu Servis / Perbaikan</option>
                  <option value="Baru">Baru (Segel)</option>
                </select>
              </div>
            </div>

            {/* 4. LOKASI PELETAKAN */}
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  Lokasi Peletakan di RK
                </span>
                <span className="text-rose-600 text-xs font-extrabold">*Wajib</span>
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Lemari Kaca Kestari / Rak Bawah Dapur / Sudut Depan"
                className="w-full h-12 px-3.5 rounded-2xl bg-white border-2 border-slate-300 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-sm"
              />
            </div>

            {/* 5. FOTO BARANG (MANDATORY FILE UPLOAD / CAPTURE) */}
            <PhotoCapture
              photo={photo}
              setPhoto={setPhoto}
              required={true}
              isReturning={false}
            />

            {/* 6. KETERANGAN TAMBAHAN */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>Keterangan Tambahan / Spesifikasi</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Lengkap dengan adaptor & kabel power"
                className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all tap-bounce"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                <span>SIMPAN BARANG KE INVENTARIS</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
