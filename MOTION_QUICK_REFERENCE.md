# 🎬 Motion Animations - Quick Reference

Panduan cepat untuk menggunakan animasi di website KKG Soetomo.

## 📦 Import

```tsx
import { motion } from 'motion/react';
import AnimatedDiv from '@/components/AnimatedDiv';
import PageTransition from '@/components/PageTransition';
```

## 🎨 Basic Usage

### AnimatedDiv (Reusable Component)

```tsx
// Paling sederhana
<AnimatedDiv>
  <div>Content</div>
</AnimatedDiv>

// Dengan animation type
<AnimatedDiv animation="slideUp">
  <h1>Heading</h1>
</AnimatedDiv>

// Dengan delay
<AnimatedDiv animation="fadeIn" delay={0.3}>
  <p>Paragraph</p>
</AnimatedDiv>

// Dengan duration
<AnimatedDiv animation="scaleIn" duration={0.8}>
  <div>Box</div>
</AnimatedDiv>

// Semua props
<AnimatedDiv
  animation="slideUp"
  delay={0.2}
  duration={0.6}
  className="mt-4"
>
  <div>Content</div>
</AnimatedDiv>
```

### PageTransition (Page Wrapper)

```tsx
export default function Page() {
  return (
    <PageTransition>
      <div>
        {/* Page content */}
      </div>
    </PageTransition>
  );
}
```

### Custom Motion Animation

```tsx
// Scroll triggered
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Hover effect
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Button
</motion.button>

// Always animate
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Spinner
</motion.div>
```

## 🎯 Animation Types (untuk AnimatedDiv)

```tsx
animation="fadeIn"      // Fade in dari 0 ke 1 opacity
animation="slideUp"     // Slide naik dari bawah
animation="slideDown"   // Slide turun dari atas
animation="slideLeft"   // Slide dari kanan ke kiri
animation="slideRight"  // Slide dari kiri ke kanan
animation="scaleIn"     // Scale dari 0.8 ke 1
animation="bounce"      // Bounce spring effect
```

## ⏱️ Timing

```tsx
// Fast animations (interactive)
<AnimatedDiv duration={0.2}>...</AnimatedDiv>

// Normal animations (scroll/load)
<AnimatedDiv duration={0.5}>...</AnimatedDiv>

// Slow animations (dramatic)
<AnimatedDiv duration={0.8}>...</AnimatedDiv>

// With delay
<AnimatedDiv delay={0.1}>...</AnimatedDiv>
<AnimatedDiv delay={0.2}>...</AnimatedDiv>
<AnimatedDiv delay={0.3}>...</AnimatedDiv>
```

## 🔄 Staggered Animations

```tsx
{items.map((item, index) => (
  <AnimatedDiv
    key={item.id}
    animation="slideUp"
    delay={index * 0.1}  // 0s, 0.1s, 0.2s, ...
    duration={0.6}
  >
    <div>{item.content}</div>
  </AnimatedDiv>
))}
```

## 🖱️ Interactive Effects

### Hover

```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  transition={{ duration: 0.2 }}
>
  Hover me
</motion.div>
```

### Click/Tap

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={() => {}}
>
  Click me
</motion.button>
```

### Hover + Tap

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="cursor-pointer"
>
  Interactive
</motion.div>
```

## 🎬 Complex Animations

### Keyframes

```tsx
<motion.div
  animate={{
    x: [0, 100, -100, 0],
    rotate: [0, 90, 180, 0],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
>
  Looping animation
</motion.div>
```

### Multiple States

```tsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  Multi-state
</motion.div>
```

## 📱 Scroll Animations

```tsx
// Basic scroll trigger
<motion.div
  whileInView={{ opacity: 1 }}
>
  Triggers at default 50% visible
</motion.div>

// Custom viewport
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Triggers when 30% visible, only once
</motion.div>

// With initial state
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
>
  Slide up when visible
</motion.div>
```

## 🎨 Easing Functions

```tsx
transition={{ ease: 'linear' }}      // Linear
transition={{ ease: 'easeIn' }}      // Slow start
transition={{ ease: 'easeOut' }}     // Slow end
transition={{ ease: 'easeInOut' }}   // Slow both
transition={{ ease: 'circIn' }}      // Circular in
transition={{ ease: 'circOut' }}     // Circular out
```

## 🎯 Common Patterns

### Hero Section

```tsx
<section className="py-20">
  <motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    Title
  </motion.h1>
  
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
  >
    Subtitle
  </motion.p>
</section>
```

### Grid of Items

```tsx
<div className="grid gap-4">
  {items.map((item, i) => (
    <AnimatedDiv
      key={item.id}
      animation="scaleIn"
      delay={i * 0.1}
    >
      <Card>{item}</Card>
    </AnimatedDiv>
  ))}
</div>
```

### Button with Hover

```tsx
<motion.button
  className="bg-blue-600 text-white px-8 py-3 rounded-lg"
  whileHover={{ scale: 1.05, backgroundColor: '#1d4ed8' }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click Me
</motion.button>
```

### Card with Hover

```tsx
<motion.div
  className="p-6 rounded-lg border border-gray-200"
  whileHover={{ y: -8, boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}
  transition={{ duration: 0.3 }}
>
  Card Content
</motion.div>
```

### Floating Element

```tsx
<motion.div
  className="w-96 h-96 rounded-full"
  animate={{
    x: [0, 30, 0],
    y: [0, 50, 0],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

## ⚙️ Transition Options

```tsx
transition={{
  duration: 0.5,              // Durasi animasi
  delay: 0.1,                 // Delay sebelum mulai
  ease: 'easeOut',            // Easing function
  repeat: Infinity,           // Repeat animation
  repeatType: 'loop',         // 'loop', 'reverse', 'mirror'
  repeatDelay: 0.5,           // Delay antar repeat
}}
```

## 🐛 Tips & Tricks

### ✅ DO

```tsx
// ✅ Gunakan once: true untuk scroll animations
<motion.div whileInView={{ opacity: 1 }} viewport={{ once: true }} />

// ✅ Gunakan delay untuk staggered effects
{items.map((item, i) => (
  <AnimatedDiv delay={i * 0.1} />
))}

// ✅ Keep animations short (0.3-0.6s)
<AnimatedDiv duration={0.5} />

// ✅ Use easeOut untuk enter animations
<motion.div transition={{ ease: 'easeOut' }} />
```

### ❌ DON'T

```tsx
// ❌ Animate layout properties (trigger reflow)
animate={{ width: 100 }}

// ❌ Animate too many elements at once
{bigArray.map(item => <motion.div />)}

// ❌ Use very long durations
<AnimatedDiv duration={3} />

// ❌ Forget to add once: true on scroll
<motion.div whileInView={{ opacity: 1 }} />
```

## 📚 Quick Links

- [Motion Docs](https://motion.dev/docs/react)
- [Full ANIMASI_GUIDE.md](./ANIMASI_GUIDE.md)
- [Full MOTION_README.md](./MOTION_README.md)
- [Visual Guide](./ANIMASI_VISUAL_GUIDE.md)

## 🆘 Common Issues

**Animasi tidak berjalan?**
```tsx
// Pastikan ada 'use client'
'use client';

// Pastikan viewport prop lengkap
viewport={{ once: true, amount: 0.3 }}
```

**Performance issue?**
```tsx
// Gunakan once: true
<motion.div whileInView={{}} viewport={{ once: true }} />

// Reduce jumlah animated elements
// Avoid layout animations
```

**Animasi terlalu cepat/lambat?**
```tsx
// Adjust duration
<AnimatedDiv duration={0.6} /> // default 0.5s

// Adjust delay
<AnimatedDiv delay={0.2} /> // default 0
```

---

**Quick Reference v1.0**
**Last Updated**: 22 Oktober 2025

💡 **Tip**: Bookmark page ini untuk referensi cepat!
