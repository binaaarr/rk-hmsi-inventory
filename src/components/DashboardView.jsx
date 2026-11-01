import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Building2, 
  Filter, 
  Layers, 
  LayoutGrid, 
  Plus, 
  CheckCircle2, 
  Clock,
  Sparkles
} from 'lucide-react';
import ItemCard from './ItemCard';
import { EXACT_DEPARTMENTS, DEPARTMENT_DETAILS } from '../data/departmentsData';

export default function DashboardView({ 
  items, 
  onSelectItem, 
  onViewPhoto, 
  onOpenAddItem 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOwnerDept, setSelectedOwnerDept] = useState('ALL'); // 'ALL' or specific dept
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Tersedia' | 'Dipinjam'
  const [groupByOwner, setGroupByOwner] = useState(false); // Toggle grouping view

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.ownerDept && item.ownerDept.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.borrowerDept && item.borrowerDept.toLowerCase().includes(q)) ||
        (item.borrowerName && item.borrowerName.toLowerCase().includes(q));

      const matchDept =
        selectedOwnerDept === 'ALL' || item.ownerDept === selectedOwnerDept;

      const matchStatus =
        statusFilter === 'ALL' || item.status === statusFilter;

      return matchSearch && matchDept && matchStatus;
    });
  }, [items, searchQuery, selectedOwnerDept, statusFilter]);

  // Group items by Owner Department if toggle is active
  const groupedItems = useMemo(() => {
    if (!groupByOwner) return null;
    const groups = {};
    EXACT_DEPARTMENTS.forEach((dept) => {
      groups[dept] = [];
    });
    filteredItems.forEach((item) => {
      if (!groups[item.ownerDept]) {
        groups[item.ownerDept] = [];
      }
      groups[item.ownerDept].push(item);
    });
    return groups;
  }, [filteredItems, groupByOwner]);

  return (
    <div className="space-y-5 pb-24 md:pb-12">
      {/* Sticky Top Filter & Search Bar */}
      <div className="sticky top-[102px] sm:top-[116px] z-20 bg-slate-50/95 backdrop-blur-md pt-2 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-slate-200/70 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Search Row */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-blue-800" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari barang, departemen pemilik, peminjam, atau lokasi..."
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

            {/* Toggle Grouping View Button */}
            <button
              onClick={() => setGroupByOwner(!groupByOwner)}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-3 rounded-2xl border text-xs font-bold transition-all tap-bounce ${
                groupByOwner
                  ? 'bg-blue-800 text-white border-blue-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
              title="Kelompokkan berdasarkan Departemen Pemilik"
            >
              <Layers className="w-4 h-4" />
              <span>{groupByOwner ? 'Kelompok: Aktif' : 'Kelompokkan'}</span>
            </button>
          </div>

          {/* Quick Filter Chips (Horizontal swipe-friendly) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {/* Status Chips */}
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua Status
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
              Tersedia
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
              Sedang Dipinjam
            </button>

            <span className="text-slate-300 font-light px-0.5">|</span>

            {/* Department Filter Chips (EXACT 9 LIST) */}
            <button
              onClick={() => setSelectedOwnerDept('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce flex items-center gap-1 ${
                selectedOwnerDept === 'ALL'
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Semua Departemen Pemilik</span>
            </button>

            {EXACT_DEPARTMENTS.map((dept) => {
              const detail = DEPARTMENT_DETAILS[dept] || { short: dept };
              const count = items.filter(i => i.ownerDept === dept).length;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedOwnerDept(selectedOwnerDept === dept ? 'ALL' : dept)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all tap-bounce flex items-center gap-1.5 ${
                    selectedOwnerDept === dept
                      ? 'bg-blue-800 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{detail.short}</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                    selectedOwnerDept === dept ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
        <span>Menampilkan {filteredItems.length} barang inventaris</span>
        {(searchQuery || selectedOwnerDept !== 'ALL' || statusFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedOwnerDept('ALL');
              setStatusFilter('ALL');
            }}
            className="text-blue-800 hover:underline"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Main Grid View */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border-2 border-dashed border-slate-300">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            Tidak ada barang inventaris yang cocok
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau ganti filter Departemen Pemilik di atas.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedOwnerDept('ALL');
              setStatusFilter('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-800 text-white text-xs font-bold hover:bg-blue-900 transition-colors"
          >
            Tampilkan Semua Barang
          </button>
        </div>
      ) : groupByOwner ? (
        /* GROUPED BY OWNER DEPARTMENT VIEW */
        <div className="space-y-8">
          {EXACT_DEPARTMENTS.map((dept) => {
            const deptItems = groupedItems[dept] || [];
            if (deptItems.length === 0) return null;
            const detail = DEPARTMENT_DETAILS[dept] || { badgeColor: 'bg-blue-100 text-blue-800' };

            return (
              <section key={dept} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${detail.badgeColor}`}>
                      {dept}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      ({deptItems.length} barang)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {deptItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onSelect={onSelectItem}
                      onViewPhoto={onViewPhoto}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* UNIFIED CARD GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={onSelectItem}
              onViewPhoto={onViewPhoto}
            />
          ))}
        </div>
      )}

      {/* Floating Action Button (FAB) for "+ Tambah Barang" on Mobile */}
      <div className="fixed bottom-6 right-6 z-40 sm:hidden">
        <button
          onClick={onOpenAddItem}
          className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-900/30 tap-bounce"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Tambah Barang</span>
        </button>
      </div>
    </div>
  );
}
