# 📖 Dokumentasi KKG Soetomo - Motion Animations

Panduan lengkap implementasi Motion Animations di website KKG Soetomo.

## 🎯 Daftar Isi

### 📚 Dokumentasi Animasi

1. **[MOTION_QUICK_REFERENCE.md](./MOTION_QUICK_REFERENCE.md)** ⭐ **MULAI DI SINI**
   - Quick reference untuk semua animasi
   - Copy-paste ready examples
   - Common patterns
   - Tips & tricks

2. **[MOTION_README.md](./MOTION_README.md)**
   - Complete README
   - Installation & setup
   - Component documentation
   - Advanced usage
   - Troubleshooting

3. **[ANIMASI_IMPLEMENTATION.md](./ANIMASI_IMPLEMENTATION.md)**
   - Ringkasan implementasi lengkap
   - Apa yang ditambahkan
   - File structure
   - Checklist completion

4. **[ANIMASI_GUIDE.md](./ANIMASI_GUIDE.md)**
   - Panduan detail setiap animasi
   - Component props reference
   - Animation types explanation
   - Best practices
   - Resource links

5. **[ANIMASI_SUMMARY.md](./ANIMASI_SUMMARY.md)**
   - Ringkasan struktur
   - Daftar halaman
   - Komponen baru
   - Next steps

6. **[ANIMASI_VISUAL_GUIDE.md](./ANIMASI_VISUAL_GUIDE.md)**
   - Panduan visual dengan ASCII art
   - Animation timing charts
   - Interactive effect maps
   - Mobile behavior
   - Special effects guide

### 📄 Dokumentasi Struktur

7. **[FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md)**
   - Struktur folder frontend
   - Route structure
   - Komponen overview

## 🚀 Quick Start

### 1. Untuk Pemula
```
👉 Mulai dengan: MOTION_QUICK_REFERENCE.md
   ↓
Lihat contoh-contoh praktis
   ↓
Coba di project Anda
```

### 2. Untuk Development
```
👉 Gunakan: MOTION_QUICK_REFERENCE.md (reference cepat)
   ↓
Jika perlu detail: MOTION_README.md
   ↓
Untuk troubleshooting: MOTION_README.md (bagian Troubleshooting)
```

### 3. Untuk Maintenance
```
👉 Check: ANIMASI_IMPLEMENTATION.md (apa saja yang ada)
   ↓
Edit component: MOTION_QUICK_REFERENCE.md (patterns)
   ↓
Test & verify: MOTION_README.md (best practices)
```

## 📦 Komponen Animasi

### AnimatedDiv (`components/AnimatedDiv.tsx`)

**Reusable component untuk scroll-triggered animations**

```tsx
<AnimatedDiv animation="slideUp" delay={0.2} duration={0.6}>
  <h1>Hello</h1>
</AnimatedDiv>
```

**Props:**
- `animation`: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounce'
- `delay`: number (detik, default: 0)
- `duration`: number (detik, default: 0.5)
- `children`: ReactNode
- `className`: string (optional)

**Dokumentasi**: Lihat [MOTION_QUICK_REFERENCE.md](./MOTION_QUICK_REFERENCE.md#basic-usage)

### PageTransition (`components/PageTransition.tsx`)

**Wrapper untuk smooth page transitions**

```tsx
<PageTransition>
  <div>{/* Page content */}</div>
</PageTransition>
```

**Dokumentasi**: Lihat [MOTION_README.md](./MOTION_README.md#pagetransition---page-transition-component)

## 🎨 Halaman dengan Animasi

| Halaman | Status | Detail |
|---------|--------|--------|
| / (Beranda) | ✅ | Hero, features, CTA dengan animasi |
| /anggota | ✅ | Member cards dengan scale & hover |
| /artikel | ✅ | Article cards dengan slide & hover |
| /produk | ✅ | Product grid dengan scale & hover |
| Navbar | ✅ | Menu items, hamburger, logo |
| Footer | ✅ | Staggered sections, social icons |

**Detail**: Lihat [ANIMASI_IMPLEMENTATION.md](./ANIMASI_IMPLEMENTATION.md#-animasi-di-halaman)

## 🎬 Animation Library

**Library**: Motion v12.23.24
**React**: 19.2.0
**Next.js**: 16.0.0

**Import**:
```tsx
import { motion } from 'motion/react';
```

**Docs**: https://motion.dev/docs/react

## 📊 Statistik

```
Total Animations: 100+
├─ Scroll-triggered: 40+
├─ Hover Effects: 30+
├─ Staggered: 20+
├─ Interactive: 10+
└─ Continuous: 2

Animated Elements: 150+
├─ Pages: 5
├─ Components: 2
├─ Navbar: 1
└─ Footer: 1
```

## 🛠️ Common Tasks

### Tambah Animasi ke Element Baru

**Opsi 1: Gunakan AnimatedDiv**
```tsx
import AnimatedDiv from '@/components/AnimatedDiv';

<AnimatedDiv animation="slideUp">
  <div>Content</div>
</AnimatedDiv>
```
[Lihat contoh lengkap →](./MOTION_QUICK_REFERENCE.md#animateddiv-reusable-component)

**Opsi 2: Gunakan motion component**
```tsx
import { motion } from 'motion/react';

<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Content
</motion.div>
```
[Lihat contoh lengkap →](./MOTION_QUICK_REFERENCE.md#custom-motion-animation)

**Opsi 3: Scroll-triggered**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Content
</motion.div>
```
[Lihat contoh lengkap →](./MOTION_QUICK_REFERENCE.md#-scroll-animations)

### Customize Animation Timing

Edit delay atau duration:
```tsx
<AnimatedDiv
  animation="slideUp"
  delay={0.3}      // Ubah delay
  duration={0.8}   // Ubah duration
/>
```
[Lihat timing guide →](./MOTION_QUICK_REFERENCE.md#-timing)

### Debug Animation

Jika animasi tidak berjalan:

1. ✅ Pastikan ada `'use client'` di atas file
2. ✅ Check `whileInView` punya `viewport` prop
3. ✅ Verify `once: true` jika hanya 1x

[Lihat troubleshooting →](./MOTION_README.md#-troubleshooting)

## 💡 Best Practices

✅ **DO**
- Gunakan `once: true` untuk scroll animations
- Keep animations short (0.3-0.6s)
- Gunakan staggered delays untuk lists
- Use `easeOut` untuk enter animations
- Test di mobile devices

❌ **DON'T**
- Animate layout properties
- Animate terlalu banyak elements bersamaan
- Use durasi terlalu lama (>1s)
- Lupa `'use client'` directive
- Skip viewport optimization

[Lihat best practices lengkap →](./MOTION_QUICK_REFERENCE.md#-tips--tricks)

## 🔗 Resources

### Official Docs
- [Motion Documentation](https://motion.dev/docs/react)
- [Framer Motion](https://www.framer.com/motion/)
- [Easing Functions](https://easings.net/)

### Design Resources
- [Animation Principles](https://www.interaction-design.org/literature/article/animation)
- [Design System Animations](https://www.justinmind.com/blog/animation-design-principles/)

## 📞 Documentation Map

```
Dokumentasi Animasi
├─ 🌟 MOTION_QUICK_REFERENCE.md ........... Mulai di sini!
│  ├─ Import statements
│  ├─ Basic usage
│  ├─ Animation types
│  ├─ Interactive effects
│  └─ Common patterns
│
├─ 📖 MOTION_README.md ................... Panduan lengkap
│  ├─ Installation
│  ├─ Components
│  ├─ Examples
│  ├─ Advanced usage
│  └─ Troubleshooting
│
├─ 📋 ANIMASI_IMPLEMENTATION.md .......... Status implementasi
│  ├─ Apa yang ditambahkan
│  ├─ File structure
│  ├─ Statistics
│  └─ Next steps
│
├─ 📚 ANIMASI_GUIDE.md ................... Detail setiap animasi
│  ├─ Component docs
│  ├─ Per-page animations
│  ├─ API reference
│  └─ Best practices
│
├─ 📊 ANIMASI_SUMMARY.md ................ Ringkasan singkat
│  ├─ Overview
│  ├─ Statistics
│  └─ Future enhancements
│
├─ 🎨 ANIMASI_VISUAL_GUIDE.md ........... Panduan visual
│  ├─ ASCII diagrams
│  ├─ Timing charts
│  ├─ Effect maps
│  └─ Mobile behavior
│
└─ 📄 FRONTEND_STRUCTURE.md ............ Struktur project
   ├─ Folder layout
   ├─ Route structure
   └─ Components overview
```

## ✅ Implementasi Checklist

- ✅ Motion library installed
- ✅ AnimatedDiv component created
- ✅ PageTransition component created
- ✅ Home page animations (5 sections)
- ✅ Anggota page animations (4 elements)
- ✅ Artikel page animations (5 elements)
- ✅ Produk page animations (6 elements)
- ✅ Navbar animations (4 effects)
- ✅ Footer animations (4 sections)
- ✅ Hover effects (10+ elements)
- ✅ Tap effects (15+ elements)
- ✅ Staggered animations (20+ lists)
- ✅ Scroll triggers (40+ elements)
- ✅ Documentation complete (6 files)

## 🎯 Next Steps

**Untuk Development:**

1. 👉 Baca [MOTION_QUICK_REFERENCE.md](./MOTION_QUICK_REFERENCE.md)
2. 👉 Copy examples yang Anda butuhkan
3. 👉 Adjust timing sesuai kebutuhan
4. 👉 Test di berbagai devices
5. 👉 Push ke production

**Untuk Enhancement:**

1. Add loading skeletons dengan shimmer animation
2. Add form animations (focus, error, success)
3. Add scroll parallax effects
4. Add gesture animations (swipe, drag)
5. Add SVG path animations

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🎉 Selesai!

Website KKG Soetomo sekarang memiliki animasi modern yang membuat user experience lebih menyenangkan!

---

**Quick Links:**
- 🌟 [Quick Reference](./MOTION_QUICK_REFERENCE.md) - Mulai di sini!
- 📖 [Full README](./MOTION_README.md) - Panduan lengkap
- 💻 [Component AnimatedDiv](./components/AnimatedDiv.tsx) - Source code
- 🎨 [Component PageTransition](./components/PageTransition.tsx) - Source code

**Version**: 1.0
**Last Updated**: 22 Oktober 2025
**Status**: ✅ Production Ready
