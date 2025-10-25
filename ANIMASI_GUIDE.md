# 🎬 Panduan Animasi Website KKG dr. Soetomo

Dokumentasi lengkap tentang animasi yang telah ditambahkan ke website KKG menggunakan Motion dari Framer Motion.

## 📦 Dependensi

```json
{
  "motion": "^12.23.24"
}
```

Saat ini Motion sudah ter-install dalam project. Untuk menggunakan Motion, import dari `motion/react`:

```typescript
import { motion } from 'motion/react';
```

## 🎨 Komponen Animasi

### 1. **AnimatedDiv** - Komponen Wrapper Animasi

File: `components/AnimatedDiv.tsx`

Komponen utility untuk membuat animasi scroll-triggered yang reusable.

**Props:**
- `children`: ReactNode - Konten yang akan dianimasi
- `className`: string (opsional) - Class Tailwind CSS
- `delay`: number (default: 0) - Delay animasi dalam detik
- `duration`: number (default: 0.5) - Durasi animasi dalam detik
- `animation`: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounce' - Tipe animasi

**Contoh Penggunaan:**
```tsx
<AnimatedDiv animation="slideUp" delay={0.2} duration={0.6}>
  <h1>Heading dengan Animasi</h1>
</AnimatedDiv>
```

**Tipe Animasi Tersedia:**
- `fadeIn` - Fade in dari opacity 0 ke 1
- `slideUp` - Slide naik dari bawah
- `slideDown` - Slide turun dari atas
- `slideLeft` - Slide dari kanan ke kiri
- `slideRight` - Slide dari kiri ke kanan
- `scaleIn` - Scale dari kecil ke besar
- `bounce` - Bounce spring effect

### 2. **PageTransition** - Transisi Halaman

File: `components/PageTransition.tsx`

Komponen wrapper untuk page transitions yang smooth ketika berpindah halaman.

**Props:**
- `children`: ReactNode - Konten halaman

**Contoh Penggunaan:**
```tsx
export default function MyPage() {
  return (
    <PageTransition>
      <div>
        {/* Konten halaman */}
      </div>
    </PageTransition>
  );
}
```

## 🎯 Animasi yang Diterapkan di Setiap Halaman

### **Halaman Beranda (/)**

1. **Hero Section**
   - Judul: Fade + Slide Up dengan delay 0.1s
   - Subtitle: Fade + Slide Up dengan delay 0.2s
   - Buttons: Scale In dengan delay 0.3s
   - Background Circles: Continuous animated floating

2. **Features Section**
   - Heading: Slide Up
   - Feature Cards: Scale In dengan staggered delay (0, 0.15s, 0.3s)
   - Card Hover: Y-axis transform (-5px)

3. **CTA Section**
   - Heading & Text: Slide Up
   - Button: Scale on hover + Tap effect

### **Halaman Anggota (/anggota)**

1. **Header**
   - Title: Slide Down animation

2. **Search Input**
   - Fade In dengan delay 0.2s
   - Scale on focus

3. **Member Cards**
   - Grid: Scale In dengan staggered delay
   - Card Hover: Y-axis lift (-8px) + Shadow
   - Avatar Letter: Spring scale animation
   - Role Text: Fade In dengan delay

### **Halaman Artikel (/artikel)**

1. **Header**
   - Title: Slide Down

2. **Search Input**
   - Fade In dengan delay 0.2s
   - Scale on focus

3. **Article Cards**
   - Card: Slide Up dengan staggered delay
   - Card Hover: Y-axis lift + Shadow increase
   - Image: Scale on hover
   - Title: Color change on hover
   - "Baca Selengkapnya" Button: X-axis slide on hover

### **Halaman Produk (/produk)**

1. **Header**
   - Title: Slide Down

2. **Filter Buttons**
   - Main Button: Bounce in
   - Filter Options: Fade In + Slide dari kiri dengan staggered delay
   - Button Hover: Scale + Tap effect

3. **Product Cards**
   - Card: Scale In dengan staggered delay
   - Card Hover: Y-axis lift + Shadow
   - Image: Scale on hover
   - Title: Color change on hover
   - Button: Scale + Color change on hover + Tap effect

### **Navbar**

1. **Navigation Bar**
   - Slide down from top pada mount
   - Logo: Scale + Rotate on hover + Tap

2. **Desktop Menu**
   - Fade In dengan delay 0.2s
   - Menu Items: Fade In + Slide dari atas dengan staggered delay
   - Link Hover: Color change + Y-axis transform

3. **Mobile Menu Button**
   - Animated hamburger lines dengan rotation effect
   - Smooth transition antara open/close state

4. **Mobile Menu**
   - Height animation untuk open/close
   - Menu items: Slide dari kiri dengan staggered delay

### **Footer**

1. **Footer Sections**
   - Setiap section: Slide Up dengan staggered delay (0, 0.1s, 0.2s, 0.3s)

2. **Social Media Icons**
   - Icon Hover: Scale 1.1 + Color change (blue)
   - Icon Tap: Scale 0.95

3. **Footer Divider**
   - Fade In dengan delay 0.4s

## 🎬 Motion API yang Digunakan

### **motion.div, motion.button, motion.a, dll**
Komponen Motion untuk setiap elemen HTML.

```tsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

### **Properti Animasi Utama**

- `initial` - State awal elemen
- `animate` - State akhir elemen
- `whileHover` - State saat hover
- `whileTap` - State saat di-tap/di-click
- `whileInView` - State saat elemen terlihat di viewport
- `exit` - State saat elemen unmount

### **Transition Options**

```tsx
<motion.div
  transition={{
    delay: 0.2,           // Delay sebelum animasi dimulai
    duration: 0.5,        // Durasi animasi
    ease: 'easeOut',      // Easing function
    type: 'spring',       // Tipe animasi (spring, tween, inertia)
    stiffness: 300,       // Spring stiffness
    damping: 20,          // Spring damping
  }}
/>
```

### **Viewport**

```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

- `once: true` - Animasi hanya terjadi sekali saat elemen pertama kali visible
- `amount` - Berapa persen elemen harus visible sebelum animasi trigger (0-1)

## 🔧 Cara Menambah Animasi Baru

### Contoh 1: Menggunakan AnimatedDiv Component

```tsx
<AnimatedDiv animation="slideUp" delay={0.2} duration={0.8}>
  <div className="my-content">
    {/* Konten */}
  </div>
</AnimatedDiv>
```

### Contoh 2: Custom Animation dengan motion component

```tsx
<motion.div
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  {/* Konten */}
</motion.div>
```

### Contoh 3: Interactive Animation

```tsx
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click Me
</motion.button>
```

### Contoh 4: Staggered Animation untuk List

```tsx
{items.map((item, index) => (
  <AnimatedDiv
    key={item.id}
    animation="slideUp"
    delay={index * 0.1}
    duration={0.6}
  >
    {/* Item content */}
  </AnimatedDiv>
))}
```

### Contoh 5: Continuous Animation

```tsx
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
>
  {/* Animated content */}
</motion.div>
```

## 📊 Best Practices

1. **Performance**
   - Gunakan `once: true` di viewport untuk mencegah re-render berulang
   - Hindari animasi pada elemen dalam loop tanpa optimization
   - Gunakan `will-change` CSS untuk heavy animations

2. **User Experience**
   - Durasi animasi: 0.3-0.6s untuk interactive, 0.5-0.8s untuk scroll
   - Delay untuk staggered effects: 0.05-0.15s
   - Gunakan `easeOut` untuk enter animations, `easeInOut` untuk loops

3. **Accessibility**
   - Pertimbangkan `prefers-reduced-motion` untuk users dengan motion sensitivity
   - Jangan gunakan animasi yang terlalu cepat atau berkedip
   - Pastikan animasi tidak mengganggu readability

4. **Consistency**
   - Gunakan duration yang konsisten untuk animasi serupa
   - Gunakan easing yang sama untuk animasi yang related
   - Maintain visual hierarchy dengan timing

## 🚀 Resources

- Motion Docs: https://motion.dev/docs/react
- Framer Motion: https://www.framer.com/motion/
- Easing Functions: https://easings.net/

## ✅ Checklist Animasi

- ✅ Page transitions (halaman berubah smooth)
- ✅ Scroll-triggered animations (elemen animasi saat scroll)
- ✅ Hover effects (interactive feedback)
- ✅ Tap/click effects (mobile-friendly)
- ✅ Staggered animations (sequential effects)
- ✅ Floating backgrounds (modern aesthetic)
- ✅ Mobile hamburger menu animation
- ✅ Footer animations
- ✅ Loading/empty states (ready untuk dikembangkan)

---

**Last Updated**: 22 Oktober 2025
**Library**: Motion v12.23.24
**Framework**: Next.js 16.0.0 + React 19.2.0
