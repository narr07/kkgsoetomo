# 🎬 Motion Animation Implementation

Website KKG dr. Soetomo sekarang dilengkapi dengan animasi modern menggunakan **Motion** dari Framer Motion.

## 🚀 Fitur Animasi

### ✨ Animasi Utama

- **Page Transitions** - Smooth fade + slide ketika perpindahan halaman
- **Scroll Animations** - Element muncul dengan animasi saat scroll
- **Hover Effects** - Interactive feedback pada hover elements
- **Tap Effects** - Mobile-friendly click animations
- **Staggered Animations** - Sequential animations untuk lists
- **Floating Backgrounds** - Continuous animated background elements
- **Mobile Menu** - Animated hamburger menu dengan smooth transitions

### 📄 Halaman dengan Animasi

1. **Beranda (/)** - Hero dengan floating circles, features scale-in, CTA buttons
2. **Anggota (/anggota)** - Member cards dengan scale-in dan hover lift
3. **Artikel (/artikel)** - Article cards dengan slide-up dan hover effects
4. **Produk (/produk)** - Product cards dengan scale-in dan interactive buttons
5. **Navbar** - Logo animation, menu items fade-in, mobile menu
6. **Footer** - Staggered sections, social icons with hover effects

## 📦 Instalasi

Motion sudah ter-install dalam project:

```bash
npm install motion
```

Import di komponen:

```tsx
import { motion } from 'motion/react';
```

## 🛠️ Komponen Animasi

### AnimatedDiv - Reusable Animation Component

**File**: `components/AnimatedDiv.tsx`

Component wrapper untuk scroll-triggered animations.

```tsx
<AnimatedDiv 
  animation="slideUp" 
  delay={0.2} 
  duration={0.6}
>
  <h1>Hello World</h1>
</AnimatedDiv>
```

**Props:**
- `children: ReactNode` - Konten yang dianimasi
- `className?: string` - Tailwind classes
- `animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounce'`
- `delay?: number` - Delay dalam detik (default: 0)
- `duration?: number` - Durasi dalam detik (default: 0.5)

**Animasi Tersedia:**
- `fadeIn` - Fade from 0 to 1 opacity
- `slideUp` - Slide dari bawah ke atas
- `slideDown` - Slide dari atas ke bawah
- `slideLeft` - Slide dari kanan ke kiri
- `slideRight` - Slide dari kiri ke kanan
- `scaleIn` - Scale dari 0.8 ke 1
- `bounce` - Bounce spring effect

### PageTransition - Page Transition Component

**File**: `components/PageTransition.tsx`

Wrapper untuk smooth page transitions.

```tsx
export default function MyPage() {
  return (
    <PageTransition>
      <div>{/* Page content */}</div>
    </PageTransition>
  );
}
```

## 💻 Contoh Penggunaan

### Contoh 1: Menggunakan AnimatedDiv

```tsx
import AnimatedDiv from '@/components/AnimatedDiv';

export default function MyComponent() {
  return (
    <div>
      <AnimatedDiv animation="slideUp" delay={0.2}>
        <h1>Heading</h1>
      </AnimatedDiv>
      
      <div className="grid gap-4">
        {items.map((item, index) => (
          <AnimatedDiv
            key={item.id}
            animation="scaleIn"
            delay={index * 0.1}
          >
            {/* Item content */}
          </AnimatedDiv>
        ))}
      </div>
    </div>
  );
}
```

### Contoh 2: Custom Motion Animation

```tsx
import { motion } from 'motion/react';

export default function CustomAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      Content
    </motion.div>
  );
}
```

### Contoh 3: Interactive Animations

```tsx
import { motion } from 'motion/react';

export default function InteractiveButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-blue-600 text-white px-8 py-3 rounded-lg"
    >
      Click Me
    </motion.button>
  );
}
```

### Contoh 4: Continuous Animation

```tsx
import { motion } from 'motion/react';

export default function ContinuousAnimation() {
  return (
    <motion.div
      animate={{
        x: [0, 30, 0],
        y: [0, 50, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="w-10 h-10 bg-blue-500 rounded-full"
    />
  );
}
```

## 🎯 Animation Timeline

### Page Load
```
0.0s ├─ Navbar slide down
0.1s ├─ Hero title fade + slide up
0.2s ├─ Hero subtitle fade + slide up
0.3s ├─ Hero buttons scale in
0.5s ├─ Features heading slide up
0.5s ├─ Feature 1 scale in
0.65s ├─ Feature 2 scale in
0.8s ├─ Feature 3 scale in
```

### Scroll
```
User scrolls ┼─ AnimatedDiv triggers
             ├─ Element appears with animation
             ├─ Once: true (not repeat)
             └─ Amount: 0.3 (30% visible)
```

### Interaction
```
Hover ┼─ whileHover animation
      ├─ Scale, color, position changes
      └─ Smooth transition (0.2-0.3s)

Click ┼─ whileTap animation
      ├─ Scale down feedback
      └─ Fast response (0.1s)
```

## 📊 Performance Tips

1. **Use once: true** untuk viewport animations
   ```tsx
   viewport={{ once: true, amount: 0.3 }}
   ```

2. **Optimize staggered animations**
   ```tsx
   {items.map((item, index) => (
     <AnimatedDiv delay={index * 0.1}>
       {/* Reduce delay untuk performance */}
     </AnimatedDiv>
   ))}
   ```

3. **Avoid animating too many elements**
   - Limit concurrent animations
   - Use CSS transitions untuk simple effects

4. **Use appropriate duration**
   - Quick: 0.2-0.3s
   - Normal: 0.4-0.6s
   - Slow: 0.7-1.0s

## 🎨 Customization

### Mengubah Animation Timing

Edit `components/AnimatedDiv.tsx`:

```tsx
const animationVariants = {
  slideUp: {
    initial: { opacity: 0, y: 50 }, // Ubah nilai
    animate: { opacity: 1, y: 0 },
  },
  // ...
};
```

### Mengubah Easing

Edit transition property:

```tsx
transition={{ 
  duration: 0.6, 
  ease: 'easeInOut' // Pilih: linear, easeIn, easeOut, easeInOut
}}
```

### Menambah Animasi Baru

1. Tambahkan variant di `animationVariants`:
```tsx
fadeInLeft: {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
},
```

2. Update `animation` prop type:
```tsx
animation?: 'fadeIn' | 'slideUp' | 'fadeInLeft' // ...
```

3. Gunakan di komponen:
```tsx
<AnimatedDiv animation="fadeInLeft">...</AnimatedDiv>
```

## 🚀 Advanced Usage

### Keyframe Animations

```tsx
<motion.div
  animate={{
    rotate: [0, 10, -10, 0],
    x: [0, 100, -100, 0],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
/>
```

### Gesture Animations

```tsx
<motion.div
  drag
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
/>
```

### SVG Path Animation

```tsx
<motion.svg viewBox="0 0 100 100">
  <motion.path
    d="M 10,10 L 90,90"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 2 }}
  />
</motion.svg>
```

## 📚 Dokumentasi

Dokumentasi lengkap tersedia di:

- `ANIMASI_GUIDE.md` - Panduan detail semua animasi
- `ANIMASI_SUMMARY.md` - Ringkasan implementasi
- `ANIMASI_VISUAL_GUIDE.md` - Panduan visual animasi

## 🔗 Resources

- **Motion Docs**: https://motion.dev/docs/react
- **Framer Motion**: https://www.framer.com/motion/
- **Easing Functions**: https://easings.net/
- **Animation Principles**: https://www.interaction-design.org/

## ✅ Checklist

- ✅ Motion library installed
- ✅ AnimatedDiv component created
- ✅ PageTransition component created
- ✅ All pages have animations
- ✅ Navbar animations added
- ✅ Footer animations added
- ✅ Responsive mobile animations
- ✅ Documentation complete

## 🐛 Troubleshooting

### Animasi tidak berjalan

**Solusi:**
1. Pastikan `'use client'` di atas komponen
2. Cek apakah `whileInView` memiliki `viewport` prop
3. Pastikan `once: true` jika hanya ingin 1x

### Performance issue

**Solusi:**
1. Reduce jumlah animated elements
2. Use `once: true` untuk viewport animations
3. Avoid animating layout properties
4. Use `will-change` CSS sparingly

### Animasi tidak smooth

**Solusi:**
1. Gunakan `easeOut` untuk enter animations
2. Reduce duration (0.3-0.6s optimal)
3. Check browser performance (DevTools)

---

**Version**: 1.0
**Last Updated**: 22 Oktober 2025
**Framework**: Next.js 16.0.0 + React 19.2.0
**Animation Library**: Motion v12.23.24

Selamat! Website KKG dr. Soetomo sekarang memiliki animasi modern! 🎉
