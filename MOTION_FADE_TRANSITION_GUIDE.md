# Motion Library - Fade Transition Animation

## Overview
Animasi fade transition telah diterapkan pada seluruh halaman menggunakan **Motion library** (bukan Framer Motion).

## Setup & Configuration

### Library
- **motion** - v12.23.24 (sudah terinstall)
- Impor dari: `motion/react`

## Implementasi

### 1. **PageTransition Component** (`components/PageTransition.tsx`)
```tsx
'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
```

**Penjelasan:**
- `initial={{ opacity: 0 }}` - Mulai dengan opacity 0 (transparan)
- `animate={{ opacity: 1 }}` - Fade in ke opacity 1 (fully visible)
- `exit={{ opacity: 0 }}` - Fade out saat halaman berganti
- `duration: 0.8` - Animasi berlangsung 0.8 detik (800ms)
- `ease: 'easeInOut'` - Smooth easing untuk transisi yang halus

### 2. **MotionProvider Component** (`components/motion-provider.tsx`)
```tsx
'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key="page-wrapper">
        {children}
      </div>
    </AnimatePresence>
  );
}
```

**Penjelasan:**
- `AnimatePresence` - Menangani exit animations saat halaman berganti
- `mode="wait"` - Menunggu exit animation sebelum entry animation dimulai
- `initial={false}` - Tidak menjalankan animasi pada initial page load
- `key="page-wrapper"` - **PENTING**: Setiap direct child dari AnimatePresence harus memiliki unique key

**PENTING - Cara Kerja AnimatePresence:**
- AnimatePresence mendeteksi ketika children dihapus dari React tree
- Ketika children berubah (navigasi halaman), exit animation akan dijalankan
- Setiap direct child HARUS memiliki unique `key` prop yang konsisten

### 3. **Integration di Root Layout** (`app/layout.tsx`)
```tsx
<ThemeProvider>
  <SWRProvider>
    <MotionProvider>
      <Navbar />
      {children}
      <Footer />
    </MotionProvider>
  </SWRProvider>
</ThemeProvider>
```

### 4. **Integration di Pages** (`app/(pages)/layout.tsx`)
```tsx
import PageTransition from '@/components/PageTransition';

export default function PagesLayout({ children }) {
  return (
    <main>
      <PageTransition>
        {children}
      </PageTransition>
    </main>
  );
}
```

### 5. **Integration di Homepage** (`app/page.tsx`)
```tsx
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        {/* Your content */}
      </main>
    </PageTransition>
  );
}
```

## Animasi Timeline

### Saat User Navigate ke Halaman Baru:
1. **Fade Out** (800ms) - Halaman lama fade out dengan opacity 0
2. **Simultaneous Entry** - Halaman baru mulai fade in
3. **Fade In** (800ms) - Halaman baru fade in dengan opacity 1
4. **Total Time** - ~800ms untuk smooth transition

### Easing Breakdown:
- `easeInOut` = Dimulai lambat → Cepat di tengah → Melambat di akhir
- Memberikan feel yang natural dan smooth

## Troubleshooting

### Error: "Encountered two children with the same key"
**Solusi:** Pastikan setiap direct child dari `AnimatePresence` memiliki unique `key` prop
```tsx
❌ SALAH - Tidak ada key
<AnimatePresence>
  {children}
</AnimatePresence>

✅ BENAR - Ada key yang unik
<AnimatePresence>
  <div key="page-wrapper">
    {children}
  </div>
</AnimatePresence>
```

### Exit Animations Tidak Bekerja
**Solusi:**
1. Pastikan `AnimatePresence` membungkus komponen yang akan di-exit
2. Pastikan `AnimatePresence` TIDAK unmount saat children berubah
3. Gunakan `initial={false}` untuk menghindari animasi pada initial load

### Animasi Terputus Saat Navigasi
**Solusi:**
1. Gunakan `mode="wait"` untuk sequential animations
2. Pastikan exit animation selesai sebelum entry animation dimulai
3. Check console untuk error atau warning

## Motion Library Advantages

### vs Framer Motion:
| Fitur | Motion | Framer Motion |
|-------|--------|---------------|
| Bundle Size | ~12kb | Larger |
| Layout Animations | ✅ Optimal | ✅ Good |
| Learning Curve | ✅ Simpler | Complex |
| Performance | ✅ Excellent | Good |
| Motion Primitives | ✅ Yes | No |

## Advanced Customization

### 1. Ubah Duration Animasi
```tsx
transition={{
  duration: 1.2,  // 1.2 detik untuk lebih lambat
  ease: 'easeInOut',
}}
```

### 2. Ubah Easing
```tsx
// Opsi easing:
// - 'linear'
// - 'easeIn', 'easeOut', 'easeInOut'
// - 'circIn', 'circOut', 'circInOut'
// - 'backIn', 'backOut', 'backInOut'
// - 'anticipate'
transition={{
  duration: 0.8,
  ease: 'circInOut',  // Coba berbagai easing
}}
```

### 3. Tambah Delay
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{
    duration: 0.8,
    ease: 'easeInOut',
    delay: 0.2,  // Delay 0.2 detik sebelum animasi mulai
  }}
>
  {children}
</motion.div>
```

### 4. Stagger Children
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    staggerChildren: 0.1,  // Setiap child delay 0.1 detik
  }}
>
  {/* Children akan animate dengan delay 0.1s sekali */}
</motion.div>
```

## Motion Layout Animations (Optional)

Jika ingin lebih advanced, Motion juga support layout animations:

```tsx
import { motion } from 'motion/react';

<motion.div
  layout  // Enable layout animation
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
/>
```

Lihat: https://motion.dev/docs/react-layout-animations

## Testing Animation

1. **Navigasi antar halaman:**
   - Home → Artikel → Anggota → Produk
   - Amati smooth fade in/out setiap transisi

2. **Check DevTools:**
   - Buka Console (F12)
   - Tidak boleh ada error related to keys
   - Tidak boleh ada warning dari Motion library

3. **Performance:**
   - Buka Performance tab di DevTools
   - Amati animasi harus smooth tanpa jank
   - Ideal FPS: 60 FPS

## File yang Dimodifikasi

1. ✅ `components/PageTransition.tsx` - Updated dengan motion.div dari motion/react
2. ✅ `components/motion-provider.tsx` - Updated dengan AnimatePresence dari motion/react + unique key
3. ✅ `app/layout.tsx` - Added MotionProvider wrapper
4. ✅ `app/(pages)/layout.tsx` - Added PageTransition wrapper
5. ✅ `app/page.tsx` - Added PageTransition wrapper

## Next Steps (Optional)

Jika ingin menambah kompleksitas animasi:
- Add stagger animations untuk children elements
- Add blur effect saat fade out
- Add scale transform untuk depth effect
- Add color transition untuk theme changes

Referensi: https://motion.dev/docs/react
