import React, { useRef, useState } from 'react';
import { Camera, Upload, Check, RefreshCw, X, Sparkles, Image as ImageIcon } from 'lucide-react';

const SAMPLE_DEMO_PHOTOS = [
  {
    name: 'Foto Barang di RK',
    url: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Foto Meja / Fasilitas',
    url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Foto Logistik / Box',
    url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80'
  }
];

export default function PhotoCapture({ photo, setPhoto, required = true, isReturning = false }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (url) => {
    setPhoto(url);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-blue-700" />
          <span>
            {isReturning ? 'Foto Bukti Pengembalian Fisik' : 'Foto Bukti Fisik Barang'}
          </span>
          {required && (
            <span className="text-rose-600 font-extrabold text-xs bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              WAJIB
            </span>
          )}
        </label>
        <span className="text-[11px] text-slate-500 font-medium">
          {photo ? 'Foto Terverifikasi' : 'Harus jelas & terbaca'}
        </span>
      </div>

      {/* Hidden native input with environment camera capture for smartphones */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {photo ? (
        /* Preview with Retake / Remove buttons */
        <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 bg-slate-900 group shadow-md">
          <img
            src={photo}
            alt="Bukti Foto Barang"
            className="w-full h-44 sm:h-52 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                <Check className="w-3.5 h-3.5" /> Foto Berhasil Diambil
              </span>
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="w-8 h-8 rounded-full bg-black/60 text-white hover:bg-rose-600 flex items-center justify-center transition-colors backdrop-blur-sm"
                title="Hapus foto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-200">
                Bukti fisik siap dilampirkan
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 text-slate-900 text-xs font-bold hover:bg-white transition-all shadow-sm active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-700" />
                <span>Ganti Foto</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Upload / Capture Trigger Box */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 select-none tap-bounce ${
            isDragging
              ? 'border-blue-500 bg-blue-50/70 scale-[0.99]'
              : 'border-slate-300 bg-slate-50/80 hover:bg-slate-100/80 hover:border-blue-400'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-100/80 text-blue-800 flex items-center justify-center shadow-inner">
              <Camera className="w-7 h-7" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Ketuk untuk Buka Kamera / Upload Foto
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Ambil foto barang fisik saat ini di Ruang Kesekretariatan
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm mt-1">
              <Upload className="w-3.5 h-3.5 text-blue-600" />
              <span>Kamera Smartphone / Galeri File</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick 1-Click Sample Photos (For Instant Demo or Desktop Testing) */}
      {!photo && (
        <div className="pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
            <span className="font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Mode Cepat (1-Klik Tanpa Kamera):
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {SAMPLE_DEMO_PHOTOS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample.url)}
                className="py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-[11px] font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1 truncate"
              >
                <ImageIcon className="w-3 h-3 shrink-0" />
                <span className="truncate">Sampel {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
