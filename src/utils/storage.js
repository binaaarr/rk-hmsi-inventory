import { INITIAL_INVENTORY_ITEMS, INITIAL_ACTIVITY_LOGS } from '../data/inventoryData';

const STORAGE_KEY_ITEMS = 'rk_hmsi_inventory_items_v2';
const STORAGE_KEY_LOGS = 'rk_hmsi_inventory_logs_v2';

export function getStoredItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ITEMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(INITIAL_INVENTORY_ITEMS));
      return INITIAL_INVENTORY_ITEMS;
    }
    const parsed = JSON.parse(raw);
    // Guarantee that items have ownerDept and photo
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].ownerDept) {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(INITIAL_INVENTORY_ITEMS));
      return INITIAL_INVENTORY_ITEMS;
    }
    return parsed;
  } catch (err) {
    console.error('Error loading inventory from storage', err);
    return INITIAL_INVENTORY_ITEMS;
  }
}

export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving inventory to storage', err);
  }
}

export function getStoredLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(INITIAL_ACTIVITY_LOGS));
      return INITIAL_ACTIVITY_LOGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading logs from storage', err);
    return INITIAL_ACTIVITY_LOGS;
  }
}

export function saveLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
  } catch (err) {
    console.error('Error saving logs to storage', err);
  }
}

export function formatRelativeTime(dateString) {
  if (!dateString) return '-';
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'Baru saja';
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Kemarin';
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`;

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatFullDateTime(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDateOnly(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Generate formatted WhatsApp message for post-transaction confirmation
 * Sent to notify the Departemen Pemilik (Owner Department)
 */
export function generateWhatsAppTransactionLink({
  item,
  action, // 'PINJAM' | 'KEMBALI'
  borrowerDept,
  borrowerName,
  borrowDate,
  notes
}) {
  const isPinjam = action === 'PINJAM';
  const titleStatus = isPinjam ? 'PEMINJAMAN BARANG' : 'PENGEMBALIAN BARANG';
  const iconStatus = isPinjam ? '📤' : '📥';

  let text = `*KONFIRMASI ${titleStatus} INVENTARIS RK HMSI* ${iconStatus}\n`;
  text += `──────────────\n`;
  text += `📦 *Nama Barang:* ${item.name} (${item.quantity || '1 unit'})\n`;
  text += `🏢 *Departemen Pemilik:* ${item.ownerDept}\n`;
  text += `📍 *Lokasi Penyimpanan:* ${item.location}\n`;
  text += `──────────────\n`;
  text += `👥 *Departemen Peminjam:* ${borrowerDept}\n`;
  text += `👤 *Penanggung Jawab (PIC):* ${borrowerName}\n`;
  text += `📅 *Tanggal Peminjaman:* ${borrowDate || '-'}\n`;
  if (notes) {
    text += `📝 *Keterangan:* ${notes}\n`;
  }
  text += `──────────────\n`;
  text += `_Pemberitahuan resmi otomatis kepada Departemen Pemilik (${item.ownerDept}) melalui RK HMSI Inventory Web Form._`;

  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
