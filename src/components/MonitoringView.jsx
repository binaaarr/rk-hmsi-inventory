import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Boxes, 
  CheckCircle2, 
  Clock, 
  User, 
  MapPin, 
  Camera, 
  Share2, 
  Filter, 
  LayoutGrid, 
  List,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import ItemIcon from './ItemIcon';
import { CATEGORIES } from '../data/inventoryData';
import { formatRelativeTime, formatFullDateTime, generateWhatsAppReport } from '../utils/storage';

export default function MonitoringView({ items, onViewPhoto, onGoToAction }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | Tersedia | Dipinjam
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const totalCount = items.length;
  const availableCount = items.filter(i => i.status === 'Tersedia').length;
  const borrowedCount = totalCount - availableCount;
  const availabilityRate = Math.round((availableCount / (totalCount || 1)) * 100);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        (item.borrowerDept && item.borrowerDept.toLowerCase().includes(q)) ||
        (item.borrowerName && item.borrowerName.toLowerCase().includes(q));

      const matchCategory =
        selectedCategory === 'Semua' || item.category === selectedCategory;

      const matchStatus =
        statusFilter === 'ALL' || item.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [items, searchQuery, selectedCategory, statusFilter]);

  const handleShareWhatsApp = () => {
    const encoded = generateWhatsAppReport(items);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-4 pb-20 md:pb-8">
      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Item RK</span>
            <Boxes className="w-4 h-4 text-blue-800" />
          </div>
          <p className="text-2xl font-black text-slate-900">{totalCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Inventaris terdaftar</p>
        </div>

        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 shadow-xs">
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="text-xs font-semibold">Tersedia di RK</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">{availableCount}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">{availabilityRate}% siap dipinjam</p>
        </div>

        <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-200/80 shadow-xs">
          <div className="flex items-center justify-between text-rose-800 mb-1">
            <span className="text-xs font-semibold">Sedang Dipinjam</span>
            <Clock className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-rose-700">{borrowedCount}</p>
          <p className="text-[11px] text-rose-600 mt-0.5">Luar Kesekretariatan</p>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-4 text-white shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-xs font-bold">Laporan Gensec</span>
            <Share2 className="w-4 h-4 text-emerald-400" />
          </div>
          <button
            onClick={handleShareWhatsApp}
            className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors tap-bounce shadow-sm"
          >
            <span>Kirim Rekap WA</span>
          </button>
        </div>
      </div>

      {/* Sticky Filter & Search Control */}
      <div className="sticky top-[102px] sm:top-[116px] z-20 bg-slate-50/95 backdrop-blur-md pt-1 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-blue-800" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari barang atau peminjam (cth: proyektor, IA, ISE, meja)..."
                className="w-full h-12 pl-11 pr-10 rounded-2xl bg-white border-2 border-slate-200/90 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-600/10 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-blue-800 text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Tampilan Grid Card"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-blue-800 text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Tampilan List Kompak"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Filter Chips (Horizontal swipe-friendly) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce ${
                statusFilter === 'ALL'
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua Status ({items.length})
            </button>
            <button
              onClick={() => setStatusFilter('Tersedia')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce flex items-center gap-1.5 ${
                statusFilter === 'Tersedia'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Tersedia ({availableCount})
            </button>
            <button
              onClick={() => setStatusFilter('Dipinjam')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce flex items-center gap-1.5 ${
                statusFilter === 'Dipinjam'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-rose-800 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Sedang Dipinjam ({borrowedCount})
            </button>

            <span className="text-slate-300 font-light">|</span>

            {/* Category Chips */}
            {CATEGORIES.filter(c => c !== 'Semua').map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? 'Semua' : cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results summary & Public notice */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
        <span>Menampilkan {filteredItems.length} barang (Realtime)</span>
        <div className="flex items-center gap-1.5 text-blue-800">
          <Info className="w-3.5 h-3.5" />
          <span>Halaman Publik (Read-Only)</span>
        </div>
      </div>

      {/* Zero State */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-slate-300">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Tidak ada barang yang cocok
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Silakan coba kata kunci lain atau ubah filter status di atas.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
              setStatusFilter('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-800 text-white text-xs font-bold hover:bg-blue-900"
          >
            Tampilkan Semua Barang
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW (Modern Card Layout) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4">
          {filteredItems.map((item) => {
            const isAvailable = item.status === 'Tersedia';
            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-4 sm:p-5 border-2 transition-all duration-200 flex flex-col justify-between ${
                  isAvailable
                    ? 'border-slate-200/80 shadow-xs'
                    : 'border-rose-200/80 bg-rose-50/15 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <ItemIcon 
                      name={item.iconName} 
                      category={item.category} 
                      className="w-6 h-6" 
                    />

                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                          isAvailable
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isAvailable ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                          }`}
                        />
                        {item.status}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                        {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug mt-0.5">
                      {item.name}
                    </h3>
                  </div>

                  {/* Location & Condition */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span>•</span>
                    <span>{item.condition}</span>
                  </div>

                  {/* Dipinjam Details: Proker, Time, Photo Thumbnail */}
                  {!isAvailable && (
                    <div className="mt-2.5 p-3.5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                            Peminjam:
                          </span>
                          <p className="font-extrabold text-slate-900 text-xs">
                            {item.borrowerDept || 'Departemen / Proker'}
                          </p>
                          {item.borrowerName && (
                            <p className="text-[11px] text-slate-600">
                              PIC: {item.borrowerName}
                            </p>
                          )}
                        </div>

                        {/* Photo proof clickable thumbnail */}
                        {item.photoProof && (
                          <button
                            type="button"
                            onClick={() => onViewPhoto(item)}
                            className="group relative w-14 h-14 rounded-xl overflow-hidden border-2 border-rose-300 hover:border-blue-500 transition-all shrink-0 bg-slate-100 shadow-xs tap-bounce"
                            title="Klik untuk melihat bukti foto fisik"
                          >
                            <img
                              src={item.photoProof}
                              alt="Bukti foto"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Camera className="w-4 h-4 text-white" />
                            </div>
                            <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] font-bold text-center py-0.5">
                              Foto
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>Sejak {formatRelativeTime(item.borrowedAt)}</span>
                      </div>

                      {item.notes && (
                        <p className="text-[11px] text-slate-600 bg-rose-50/50 p-2 rounded-xl italic">
                          "{item.notes}"
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer action shortcut */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {isAvailable ? 'Siap digunakan' : 'Sedang terpakai'}
                  </span>
                  <button
                    onClick={() => onGoToAction(item)}
                    className="font-bold text-blue-800 hover:text-blue-900 flex items-center gap-1"
                  >
                    <span>{isAvailable ? 'Pinjam Ini' : 'Kembalikan'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* COMPACT LIST VIEW */
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-sm">
          {filteredItems.map((item) => {
            const isAvailable = item.status === 'Tersedia';
            return (
              <div 
                key={item.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors ${
                  !isAvailable ? 'bg-rose-50/15' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <ItemIcon 
                    name={item.iconName} 
                    category={item.category} 
                    className="w-5 h-5" 
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">
                        ({item.quantity})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pl-11 sm:pl-0">
                  {!isAvailable ? (
                    <div className="text-left sm:text-right text-xs">
                      <p className="font-bold text-rose-800">
                        {item.borrowerDept || 'Dipinjam'}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {formatRelativeTime(item.borrowedAt)}
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      Tersedia
                    </span>
                  )}

                  {item.photoProof && (
                    <button
                      type="button"
                      onClick={() => onViewPhoto(item)}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1 hover:bg-blue-100"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Bukti</span>
                    </button>
                  )}

                  <button
                    onClick={() => onGoToAction(item)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-800 transition-colors tap-bounce"
                  >
                    {isAvailable ? 'Pinjam' : 'Kembali'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
