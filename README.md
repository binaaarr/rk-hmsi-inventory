# RK HMSI Inventory - One-Click Inventory Web Form ⚡📦

A high-speed, frictionless, mobile-first inventory form and unified real-time dashboard for **Ruang Kesekretariatan (RK) HMSI ITS (Himpunan Mahasiswa Sistem Informasi Institut Teknologi Sepuluh Nopember)**.

Built to eliminate the **"Google Sheets mobile hell"** (horizontal scrolling, fat-finger errors, broken formulas) and empower committee members carrying heavy boxes in RK to borrow or return inventory items with mandatory photo proof in **< 10 seconds**, automatically notifying the Owner Department via WhatsApp.

---

## 🚀 Key Improvements & Architecture

### 1. ⚡ Single Unified Dashboard (Zero Tab Hassle)
- **Merged Pages:** "Update Status" and "Monitoring Publik" are unified into a single, cohesive view. Everyone uses this same dashboard to check item availability and take action (Pinjam / Kembali).
- **Mouse Wheel Scrolling Fixed:** Smooth, unhindered mouse wheel and touch scrolling across the entire page with standard window overflow.
- **Clean Interface:** Removed obsolete banners, "Mode Cepat", and dangerous "Reset" buttons.

### 2. 🏢 Group by Owner (Departemen Pemilik)
Items are grouped and filtered by **Departemen Pemilik**, using strictly the 9 authorized HMSI departments:
1. `Executive Board (EB)`
2. `Human Resource Development (HRD)`
3. `Internal Affair (IA)`
4. `Student Welfare (SWF)`
5. `Research and Technology Application (RTA)`
6. `Information Media (IM)`
7. `External Affair (EA)`
8. `Entrepreneurship (ES)`
9. `Social Development (Socdev)`

### 3. 🖼️ Visual Item Cards (No Category Icons)
- **Always Visible Photo:** High-resolution item photos are displayed at the top of every card, even when the status is "Tersedia".
- **Owner Tag:** Clear badge showing the Owner Department.
- **Status & Details:** Tersedia / Dipinjam badges, location, condition, and quantity.
- **Borrower Info:** When borrowed, displays borrower department, PIC, borrow date, and photo proof zoom.

### 4. 📝 Action Modal (Pinjam / Kembalikan)
- **No Proker / No Chips:** Clean dropdown selecting only from the 9 exact departments.
- **Mandatory Penanggung Jawab (PIC):** Text input for the person accountable.
- **Mandatory Tanggal Peminjaman:** HTML5 Date picker.
- **Mandatory Foto Bukti:** Camera capture (`capture="environment"`), file upload, or quick demo presets.
- **Massive 56px CTA Button:** Thumb-friendly `PINJAM BARANG` or `KEMBALIKAN BARANG`.

### 5. 📱 Post-Action WhatsApp Notification Flow
- Immediately upon successful submission of Borrow or Return, automatically generates a preformatted confirmation message link to notify the **Departemen Pemilik**.
- 1-click **"Kirim Konfirmasi WA"** button redirects to WhatsApp (`https://wa.me/?text=...`) with transaction details.

### 6. ➕ "Tambah Barang" (Add Inventory Item)
- Prominent header button & mobile Floating Action Button (FAB).
- Modal form with:
  1. Nama Barang (Text)
  2. Departemen Pemilik (Dropdown from 9 exact departments)
  3. Kondisi (Dropdown/Text)
  4. Foto Barang (File Upload / Camera capture)
  5. Lokasi Peletakan di RK (Text)
  6. Jumlah / Satuan (e.g. 1 unit, 2 buah)

---

## 🛠️ Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (HMSI Deep Royal Navy & Emerald Green)
- **Icons:** Lucide React
- **Storage:** LocalStorage (auto-synced)
- **Deployment:** Vercel turnkey (`vercel.json`)

---

## 🚀 Running Locally
```bash
cd "C:\Users\ASUS\.gemini\antigravity\scratch\rk-hmsi-inventory"
npm run dev
```

---

## 🌐 Deploy to Vercel
```bash
npm run build
# Deploy via Vercel CLI or connect repository to vercel.com/new
```
`vercel.json` is preconfigured for single-page routing and static asset delivery.
