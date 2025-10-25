# Motion Fade Transition - Fix Guide

## 🔧 Masalah & Solusi

### Masalah Awal
Animasi fade transition tidak berjalan saat berpindah halaman karena:
- `key="page-wrapper"` bersifat **statis** (tidak berubah)
- AnimatePresence hanya trigger exit animation saat key berubah
- Tanpa key yang berubah, React tidak tahu ada halaman baru

### ✅ Solusi
Gunakan `usePathname()` hook untuk membuat key yang **dinamis berdasarkan URL**

```tsx
// ❌ SEBELUMNYA - Key statis, tidak bisa trigger exit animation
<div key="page-wrapper">
  {children}
</div>

// ✅ SESUDAH - Key berubah setiap navigasi, trigger exit animation
<div key={pathname}>  {/* pathname berubah setiap navigasi */}
  {children}
</div>
```

## 📝 Implementasi Final

### `components/motion-provider.tsx`
```tsx
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'motion/react';

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const pathname = usePathname();  // ✅ Get current page path

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={pathname}>  {/* ✅ Key berubah saat navigasi */}
        {children}
      </div>
    </AnimatePresence>
  );
}
```

**Cara Kerjanya:**
1. `usePathname()` mendapatkan URL path saat ini (e.g. "/", "/artikel", "/anggota")
2. Setiap kali user navigasi, `pathname` berubah
3. Ketika `pathname` berubah, React membuat element baru dengan key yang berbeda
4. AnimatePresence mendeteksi element lama di-remove (trigger exit animation)
5. Element baru di-add (trigger initial + animate animation)
6. `mode="wait"` memastikan exit selesai sebelum entry dimulai

## 🎬 Timeline Animasi

```
User klik Link Artikel
        ↓
pathname berubah dari "/" → "/artikel"
        ↓
React membuat div baru dengan key="/artikel"
        ↓
AnimatePresence mendeteksi perubahan key
        ↓
┌─────────────────────────────────────────┐
│ OLD ELEMENT (key="/")                   │
│ exit={{ opacity: 0 }}                   │
│ Animasi: opacity 1 → 0 (800ms)          │
└─────────────────────────────────────────┘
        ↓ (setelah exit selesai, mode="wait")
┌─────────────────────────────────────────┐
│ NEW ELEMENT (key="/artikel")            │
│ initial={{ opacity: 0 }}                │
│ animate={{ opacity: 1 }}                │
│ Animasi: opacity 0 → 1 (800ms)          │
└─────────────────────────────────────────┘
```

## 🔍 Debugging

### Test Animasi:
1. Buka aplikasi di browser
2. Buka DevTools Console (F12)
3. Navigasi antar halaman
4. Amati smooth fade in/out setiap transisi

### Console Tidak Ada Error?
✅ Sempurna! Animasi seharusnya berjalan

### Masih Tidak Ada Animasi?
1. Check di browser console apakah ada error
2. Pastikan motion library terinstall: `npm list motion`
3. Hard refresh browser (Ctrl+Shift+R atau Cmd+Shift+R)
4. Check Navbar jangan ada `href` yang navigasi ke halaman yang sama

## 📊 File Structure

```
app/
├── layout.tsx                    ✅ MotionProvider di root
├── page.tsx                      ✅ Homepage
└── (pages)/
    ├── layout.tsx               ✅ PageTransition wrapper
    ├── artikel/page.tsx         → Navigasi dengan fade transition
    ├── anggota/page.tsx         → Navigasi dengan fade transition
    ├── galeri/page.tsx          → Navigasi dengan fade transition
    └── produk/page.tsx          → Navigasi dengan fade transition

components/
├── motion-provider.tsx           ✅ AnimatePresence dengan usePathname
├── PageTransition.tsx            ✅ motion.div dengan fade in/out
└── Navbar.tsx                    ✅ Navigation links
```

## 🚀 Advanced Configuration

### Ubah Duration Animasi
Edit `PageTransition.tsx`:
```tsx
transition={{
  duration: 0.5,    // Lebih cepat
  ease: 'easeInOut',
}}
```

### Ubah Easing Effect
```tsx
transition={{
  duration: 0.8,
  ease: 'circInOut',  // Smooth circular
}}
```

### Tambah Blur Effect (Optional)
Edit `PageTransition.tsx`:
```tsx
<motion.div
  initial={{ opacity: 0, filter: 'blur(10px)' }}
  animate={{ opacity: 1, filter: 'blur(0px)' }}
  exit={{ opacity: 0, filter: 'blur(10px)' }}
  transition={{
    duration: 0.8,
    ease: 'easeInOut',
  }}
>
  {children}
</motion.div>
```

### Tambah Scale Effect (Optional)
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{
    duration: 0.8,
    ease: 'easeInOut',
  }}
>
  {children}
</motion.div>
```

## 🔑 Key Learning Points

### ✅ Penting tentang AnimatePresence:
1. **Key Harus Berubah** - Jika key tidak berubah, exit animation tidak trigger
2. **Key Harus Unique** - Setiap unique state harus punya unique key
3. **Mode Wait** - Tunggu exit selesai sebelum entry (smoother UX)
4. **Initial False** - Jangan animate saat first page load

### ✅ Penting tentang usePathname:
1. Must be used in Client Component (`'use client'`)
2. Returns current URL path (e.g., "/", "/artikel/123")
3. Berubah setiap kali navigasi terjadi
4. Perfekt untuk trigger re-render saat page berubah

## 📚 Resources

- Motion Docs: https://motion.dev/docs/react-animate-presence
- Next.js usePathname: https://nextjs.org/docs/app/api-reference/functions/use-pathname
- AnimatePresence Troubleshooting: https://motion.dev/docs/react-animate-presence#troubleshooting

## ✨ Expected Result

Saat user berpindah halaman:
1. ✅ Konten lama fade out (smooth opacity transition)
2. ✅ Konten baru fade in (smooth opacity transition)
3. ✅ Total duration ~800ms
4. ✅ Terasa smooth dan professional
5. ✅ Tidak ada flash/blink

**Selesai! 🎉 Animasi fade transition sekarang harus berjalan sempurna!**
