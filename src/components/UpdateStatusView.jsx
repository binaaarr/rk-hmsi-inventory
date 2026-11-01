import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import ItemCard from './ItemCard';
import { CATEGORIES } from '../data/inventoryData';

export default function UpdateStatusView({ items, onSelectItem, onViewPhoto }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL | Tersedia | Dipinjam

  // Instant filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search query matches name, category, location, or borrower
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        (item.borrowerDept && item.borrowerDept.toLowerCase().includes(q));

      // Category filter
      const matchCategory =
        selectedCategory === 'Semua' || item.category === selectedCategory;

      // Status filter
      const matchStatus =
        statusFilter === 'ALL' || item.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [items, searchQuery, selectedCategory, statusFilter]);

  return (
    <div className="space-y-4">
      {/* Sticky Action Bar & Instant Search */}
      <div className="sticky top-[102px] sm:top-[116px] z-20 bg-slate-50/95 backdrop-blur-md pt-1 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-slate-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-2.5">
          {/* Search input with massive touch target */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-blue-800" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari barang (cth: proyektor, coolbox, meja, spidol...)"
              className="w-full h-12 sm:h-13 pl-11 pr-10 rounded-2xl bg-white border-2 border-slate-200/90 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-700 focus:ring-4 focus:ring-blue-600/10 shadow-sm transition-all"
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

          {/* Quick Filter Chips (Horizontal swipe-friendly, thumb target) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {/* Status Quick Chips */}
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce ${
                statusFilter === 'ALL'
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua ({items.length})
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
              Tersedia ({items.filter(i => i.status === 'Tersedia').length})
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
              Dipinjam ({items.filter(i => i.status === 'Dipinjam').length})
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

      {/* Helper Banner for Fast Mobile Experience */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-4 sm:p-5 text-white shadow-md flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-500/30 text-blue-200 rounded-md text-[10px] font-extrabold uppercase tracking-wide">
              Mode Cepat &lt; 10 Detik
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-extrabold tracking-tight mt-1">
            Ketuk Kartu Barang untuk Pinjam / Kembali
          </h2>
          <p className="text-xs text-blue-100/80 mt-0.5 leading-relaxed">
            Tidak perlu mengetik di tabel! Cukup pilih nama proker, lampirkan foto fisik barang, lalu tekan tombol raksasa.
          </p>
        </div>
      </div>

      {/* Zero State / Results count */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
        <span>Menampilkan {filteredItems.length} barang inventaris</span>
        {(searchQuery || selectedCategory !== 'Semua' || statusFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
              setStatusFilter('ALL');
            }}
            className="text-blue-800 hover:underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Main Item Grid (NO DATA TABLES - CARD-BASED LAYOUT) */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-slate-300">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Barang Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Tidak ada inventaris yang cocok dengan kata kunci "{searchQuery}". Coba kata kunci lain atau reset filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
              setStatusFilter('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-800 text-white text-xs font-bold hover:bg-blue-900 transition-colors"
          >
            Tampilkan Semua Barang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 pb-20 md:pb-8">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              mode="action"
              onViewPhoto={onViewPhoto}
            />
          ))}
        </div>
      )}
    </div>
  );
}
