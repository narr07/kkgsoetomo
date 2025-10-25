# Fade Transition Animation Implementation

## Overview
Animasi fade transition halus telah diterapkan pada seluruh halaman menggunakan **Framer Motion**.

## Implementasi

### 1. **PageTransition Component** (`components/PageTransition.tsx`)
```tsx
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

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

**Fitur:**
- `initial={{ opacity: 0 }}` - Elemen dimulai dengan opacity 0 (transparan)
- `animate={{ opacity: 1 }}` - Fade in ke opacity 1 (fully visible)
- `exit={{ opacity: 0 }}` - Fade out saat halaman berganti
- `duration: 0.8` - Animasi berlangsung 0.8 detik (800ms)
- `ease: 'easeInOut'` - Smooth easing untuk transisi halus

### 2. **MotionProvider** (`components/motion-provider.tsx`)
```tsx
'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {children}
    </AnimatePresence>
  );
}
```

**Fitur:**
- `AnimatePresence` - Menangani exit animations saat halaman berganti
- `mode="wait"` - Menunggu animasi exit sebelum animasi entry dimulai
- `initial={false}` - Tidak menjalankan animasi pada initial load

### 3. **Integration**

#### Di `app/layout.tsx`
```tsx
<MotionProvider>
  <Navbar />
  {children}
  <Footer />
</MotionProvider>
```

#### Di `app/(pages)/layout.tsx`
```tsx
<PageTransition>
  {children}
</PageTransition>
```

#### Di `app/page.tsx`
```tsx
<PageTransition>
  <main>
    {/* Content */}
  </main>
</PageTransition>
```

## Konfigurasi Animasi

### Timeline
- **Durasi:** 0.8 detik (800ms)
- **Easing:** easeInOut (smooth dari awal sampai akhir)
- **Mode:** Fade (opacity transition)

### Behavior
- **Fade In:** Saat halaman dimuat, konten fade in dari transparan menjadi fully visible
- **Fade Out:** Saat navigasi ke halaman lain, konten fade out sebelum halaman baru dimuat
- **Seamless:** Dengan `AnimatePresence mode="wait"`, transisi antar halaman sangat halus

## Dependencies
- **framer-motion** - Library untuk animasi React yang powerful dan smooth

## File yang Dimodifikasi
1. `components/PageTransition.tsx` - Updated dengan motion.div
2. `components/motion-provider.tsx` - File baru (AnimatePresence wrapper)
3. `app/layout.tsx` - Added MotionProvider
4. `app/(pages)/layout.tsx` - Added PageTransition wrapper
5. `app/page.tsx` - Added PageTransition wrapper

## Cara Menggunakan pada Halaman Baru

Untuk menambahkan fade transition pada halaman baru, cukup wrap konten dengan `PageTransition`:

```tsx
import PageTransition from '@/components/PageTransition';

export default function NewPage() {
  return (
    <PageTransition>
      <main>
        {/* Your content here */}
      </main>
    </PageTransition>
  );
}
```

## Testing
Coba navigasi antar halaman (Home → Artikel → Anggota → Produk, dll) dan amati animasi fade yang halus di setiap transisi.

## Customization
Jika ingin mengubah durasi atau easing, edit di `PageTransition.tsx`:

```tsx
transition={{
  duration: 0.8,        // Ubah ke 0.5 untuk lebih cepat, atau 1.2 untuk lebih lambat
  ease: 'easeInOut',    // Opsi: 'linear', 'easeIn', 'easeOut', 'easeInOut', 'circIn', 'circOut', 'circInOut', dll
}}
```
