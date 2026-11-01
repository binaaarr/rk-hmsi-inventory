import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import ActionDrawer from './components/ActionDrawer';
import AddItemModal from './components/AddItemModal';
import WhatsAppConfirmationModal from './components/WhatsAppConfirmationModal';
import PhotoModal from './components/PhotoModal';
import ActivityLogModal from './components/ActivityLogView';
import Toast from './components/Toast';
import { 
  getStoredItems, 
  saveItems, 
  getStoredLogs, 
  saveLogs 
} from './utils/storage';

export default function App() {
  const [items, setItems] = useState(() => getStoredItems());
  const [logs, setLogs] = useState(() => getStoredLogs());

  // Modals & Drawers States
  const [actionItem, setActionItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [photoItem, setPhotoItem] = useState(null);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Post-Action WhatsApp Confirmation Modal State
  const [waTransaction, setWaTransaction] = useState(null);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    saveItems(items);
  }, [items]);

  useEffect(() => {
    saveLogs(logs);
  }, [logs]);

  // Handle Card Tap: open Pinjam / Kembali Drawer
  const handleSelectItemForAction = (item) => {
    setActionItem(item);
    setIsDrawerOpen(true);
  };

  // Handle Action Submit (Pinjam or Kembali)
  const handleSubmitAction = (payload) => {
    const { itemId, action, borrowerDept, borrowerName, borrowDate, notes, photoProof, timestamp } = payload;

    const targetItem = items.find(i => i.id === itemId);

    // Update item in list
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        if (action === 'PINJAM') {
          return {
            ...item,
            status: 'Dipinjam',
            borrowerDept,
            borrowerName,
            borrowDate,
            borrowedAt: timestamp,
            photoProof,
            notes: notes || item.notes
          };
        } else {
          // KEMBALI
          return {
            ...item,
            status: 'Tersedia',
            borrowerDept: '',
            borrowerName: '',
            borrowDate: '',
            borrowedAt: null,
            photoProof: null,
            notes: notes ? `Pengembalian: ${notes}` : item.notes
          };
        }
      }
      return item;
    });

    setItems(updatedItems);
    setIsDrawerOpen(false);

    // Append to Activity Logs
    const newLog = {
      id: `log-${Date.now()}`,
      itemId,
      itemName: targetItem?.name || 'Barang RK',
      ownerDept: targetItem?.ownerDept || 'RK HMSI',
      action,
      borrowerDept: action === 'PINJAM' ? borrowerDept : (targetItem?.borrowerDept || '-'),
      borrowerName: action === 'PINJAM' ? borrowerName : (targetItem?.borrowerName || '-'),
      borrowDate: action === 'PINJAM' ? borrowDate : '',
      timestamp,
      photoProof,
      notes
    };
    setLogs([newLog, ...logs]);

    // Show Toast
    setToast({
      type: action,
      itemName: targetItem?.name,
      message: action === 'PINJAM' 
        ? `Tercatat dipinjam oleh ${borrowerDept} (PIC: ${borrowerName}).`
        : `Barang berhasil dikembalikan ke Ruang Kesekretariatan.`
    });

    // OPEN POST-ACTION WHATSAPP CONFIRMATION MODAL AUTOMATICALLY
    if (targetItem) {
      setWaTransaction({
        item: targetItem,
        action,
        borrowerDept,
        borrowerName,
        borrowDate,
        notes
      });
      setIsWaModalOpen(true);
    }
  };

  // Handle New Item Added
  const handleAddNewItem = (newItem) => {
    const nextItems = [newItem, ...items];
    setItems(nextItems);

    // Add log
    const newLog = {
      id: `log-${Date.now()}`,
      itemId: newItem.id,
      itemName: newItem.name,
      ownerDept: newItem.ownerDept,
      action: 'TAMBAH_BARANG',
      borrowerDept: '-',
      borrowerName: 'Admin RK',
      borrowDate: '',
      timestamp: new Date().toISOString(),
      photoProof: newItem.photo,
      notes: `Barang baru didaftarkan ke RK oleh ${newItem.ownerDept}`
    };
    setLogs([newLog, ...logs]);

    setToast({
      type: 'TAMBAH',
      itemName: newItem.name,
      message: `Barang berhasil ditambahkan sebagai milik ${newItem.ownerDept}.`
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Main Top Header */}
      <Header
        items={items}
        onOpenAddItem={() => setIsAddItemOpen(true)}
        onOpenLogs={() => setIsLogOpen(true)}
      />

      {/* Main Unified Dashboard Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <DashboardView
          items={items}
          onSelectItem={handleSelectItemForAction}
          onViewPhoto={(item) => setPhotoItem(item)}
          onOpenAddItem={() => setIsAddItemOpen(true)}
        />
      </main>

      {/* The One-Click Bottom Drawer / Centered Modal (PINJAM / KEMBALIKAN) */}
      <ActionDrawer
        item={actionItem}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmitAction={handleSubmitAction}
      />

      {/* Tambah Barang Modal */}
      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddNewItem}
      />

      {/* WhatsApp Post-Action Confirmation Trigger Modal */}
      <WhatsAppConfirmationModal
        transaction={waTransaction}
        isOpen={isWaModalOpen}
        onClose={() => {
          setIsWaModalOpen(false);
          setWaTransaction(null);
        }}
      />

      {/* Full Photo Proof Modal Lightbox */}
      <PhotoModal
        item={photoItem}
        onClose={() => setPhotoItem(null)}
      />

      {/* Audit Log / History Modal */}
      <ActivityLogModal
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        logs={logs}
        onViewPhoto={(item) => setPhotoItem(item)}
      />
    </div>
  );
}
