# Implementasi Animasi Framer Motion - COMPLETE ✅

## Ringkasan
Animasi halaman telah berhasil diimplementasikan menggunakan **Framer Motion**. Setiap halaman akan memiliki animasi transisi yang smooth ketika pengguna navigasi.

## Arsitektur Animasi

### 1. **MotionProvider** (Global Wrapper)
**File:** `components/motion-provider.tsx`

```tsx
'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={pathname}>
        {children}
      </div>
    </AnimatePresence>
  );
}
```

**Penjelasan:**
- `AnimatePresence`: Menangani animasi keluar ketika komponen tidak lagi di-render
- `mode="wait"`: Menunggu animasi keluar selesai sebelum animasi masuk dimulai
- `key={pathname}`: React me-unmount & me-remount komponen setiap kali route berubah
- Ini membungkus seluruh aplikasi di `layout.tsx`

### 2. **PageTransition** (Layout Component)
**File:** `components/PageTransition.tsx`

```tsx
'use client';

import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}      // State awal (halaman keluar)
      animate={{ opacity: 1, x: 0 }}         // State animasi masuk
      exit={{ opacity: 0, x: 100 }}          // State keluar
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
```

**Penjelasan Props:**
- `initial`: Halaman muncul dari kiri dengan opacity 0 (fade in)
- `animate`: Halaman bergerak ke posisi normal dengan opacity penuh
- `exit`: Halaman hilang ke kanan saat keluar
- `transition`: Durasi 0.5 detik dengan easing yang smooth

## Flow Animasi

```
Pengguna Klik Link
        ↓
[Exit Animation] ← PageTransition exit={{ opacity: 0, x: 100 }}
        ↓
[Route Change] ← Next.js router dengan AnimatePresence
        ↓
[Enter Animation] ← PageTransition initial → animate
        ↓
Halaman Baru Ditampilkan
```

## Struktur Layout

### Root Layout (`app/layout.tsx`)
```
<MotionProvider>  ← Global AnimatePresence wrapper
  <Navbar />
  {children}       ← Halaman dinamis
  <Footer />
</MotionProvider>
```

### Pages Layout (`app/(pages)/layout.tsx`)
```
<PageTransition>  ← Per-halaman animation wrapper
  {children}
</PageTransition>
```

## Halaman yang Sudah Menggunakan Animasi

✅ **Halaman Utama:**
- `/` (Home) - Sudah menggunakan `<PageTransition>`
- `/artikel` - Sudah menggunakan `<PageTransition>` via `(pages)/layout.tsx`
- `/artikel/[slug]` - Sudah menggunakan `<PageTransition>` via `(pages)/layout.tsx`
- `/anggota` - Sudah menggunakan `<PageTransition>` via `(pages)/layout.tsx`
- `/galeri` - Sudah menggunakan `<PageTransition>` via `(pages)/layout.tsx`
- `/produk` - Sudah menggunakan `<PageTransition>` via `(pages)/layout.tsx`

## Variasi Animasi yang Tersedia

### Animasi Fade In/Out (Saat Ini)
```tsx
initial={{ opacity: 0, x: -100 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: 100 }}
transition={{ duration: 0.5 }}
```

### Alternatif 1: Slide Up/Down
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
```

### Alternatif 2: Scale & Fade
```tsx
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
```

### Alternatif 3: Blur & Fade
```tsx
initial={{ opacity: 0, filter: 'blur(10px)' }}
animate={{ opacity: 1, filter: 'blur(0px)' }}
exit={{ opacity: 0, filter: 'blur(10px)' }}
```

## Testing

### Di Local:
```bash
npm run dev
```

1. Buka browser di `http://localhost:3000`
2. Perhatikan animasi halaman:
   - Halaman fade in dari kiri
   - Klik link untuk navigasi
   - Halaman lama fade out ke kanan
   - Halaman baru fade in dari kiri

### Performance:
- Duration: 0.5s (cukup cepat, tidak mengganggu UX)
- Ease: easeInOut (smooth curve)
- Mode: "wait" (tidak overlap, UX lebih baik)

## Troubleshooting

### Animasi tidak berjalan?
1. Pastikan Framer Motion sudah terinstall: `npm ls framer-motion`
2. Restart dev server: `npm run dev`
3. Clear `.next` folder dan rebuild

### Animasi terlalu cepat/lambat?
Edit `transition={{ duration: 0.5 }}` di `PageTransition.tsx`:
- Lebih lambat: `duration: 0.8`
- Lebih cepat: `duration: 0.3`

### Animasi kurang smooth?
Ubah easing di `transition`:
```tsx
// Lebih smooth untuk fade
ease: 'easeInOut'

// Lebih cepat keluar
ease: 'easeOut'

// Linear (normal)
ease: 'linear'
```

## Best Practices

1. ✅ **Gunakan `AnimatePresence`** untuk animasi exit
2. ✅ **Set `key={pathname}`** untuk trigger animasi saat route berubah
3. ✅ **Mode "wait"** untuk UX yang lebih baik (tidak overlap)
4. ✅ **Duration moderate** (0.3-0.8s) untuk tidak mengganggu navigasi
5. ✅ **Wrap halaman dengan `PageTransition`** di level layout

## Deployment

Animasi sudah optimized untuk production:
- ✅ Client component only (`'use client'`)
- ✅ No server-side rendering needed
- ✅ Performance-friendly
- ✅ Works on mobile & desktop

---

**Status:** ✅ IMPLEMENTASI COMPLETE
**Date:** October 2025
**Framework:** Next.js 15 + Framer Motion
