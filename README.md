# COMS Web Dashboard

Antarmuka web untuk sistem **C.O.M.S (Canteen Occupancy Monitoring System)**. Memungkinkan mahasiswa dan staf memantau kepadatan kantin kampus secara real-time, melihat analitik, peta kampus, serta mengatur preferensi dan notifikasi.

## Cara Kerja

Dashboard ini terhubung ke backend COMS melalui REST API. Data kepadatan diperbarui secara berkala menggunakan polling. Pengguna dapat memilih kantin favorit, melihat rekomendasi kantin terbaik, dan mengeksplorasi analitik jam sibuk.

## Stack

- **React 19 + Vite**
- **React Router** untuk navigasi
- **Tailwind CSS** + komponen UI kustom (`src/components/ui`)
- **Recharts** untuk grafik analitik
- **Axios** untuk komunikasi API
- **Lucide React** untuk ikon

## Requirements

- Node.js 18+
- npm

## Instalasi & Menjalankan Lokal

```bash
npm install
cp .env.example .env.local
# Isi VITE_API_URL di .env.local
npm run dev
```

`VITE_API_URL` harus mengarah ke backend yang berjalan, contoh: `http://localhost:3000/api`.

## Build untuk Produksi

```bash
npm run build
```

Output tersimpan di folder `dist/`.

## Environment Variables

| Variable | Keterangan |
|----------|------------|
| `VITE_API_URL` | URL base API backend |

## Struktur Project

```
src/
├── components/   Komponen UI (ui/, layout/, dashboard/, analytics/, maps/, settings/, notifications/, menu/)
├── contexts/     Provider Auth dan Preferences
├── hooks/        useAuth, useFetch, usePolling, useNotificationPermission
├── lib/          Instance axios, utility functions
├── pages/        Dashboard, Analytics, CampusMap, CanteenDetail, Settings, Login, Register
└── services/     Helper API per resource
```

## Deploy

Web dashboard di-deploy ke **Vercel**.

### Langkah Deploy ke Vercel

**URL Produksi:** https://coms-ten-zeta.vercel.app/
