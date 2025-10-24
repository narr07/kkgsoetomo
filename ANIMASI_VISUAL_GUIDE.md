# 🎬 Motion Animations - Visual Guide

Panduan visual untuk animasi yang telah ditambahkan ke website KKG Soetomo.

## 📍 Lokasi Setiap Animasi

### Home Page (/)

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                     │  <- Slide down from top
│  (Logo rotate, links fade + slide up)       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│         HERO SECTION                        │
│  ╭─────────────────────────────────────╮   │
│  │ Judul        ← Fade + Slide Up      │   │
│  │ Subtitle     ← Fade + Slide Up      │   │
│  │              (delay 0.1s)           │   │
│  │ [Button] [Button]                   │   │
│  │          ← Scale In                 │   │
│  │          (delay 0.3s)               │   │
│  │                                     │   │
│  │ ○ Floating circles ↺                │   │
│  │    (continuous animation)           │   │
│  ╰─────────────────────────────────────╯   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      FEATURES SECTION                       │
│  Heading: Slide Up                          │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │Feature 1 │  │Feature 2 │  │Feature 3 │  │
│  │ Scale In │  │ Scale In │  │ Scale In │  │
│  │ (0s)     │  │ (0.15s)  │  │ (0.3s)   │  │
│  │↑ Hover   │  │↑ Hover   │  │↑ Hover   │  │
│  │ Lift     │  │ Lift     │  │ Lift     │  │
│  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│      CTA SECTION                            │
│  Heading: Slide Up                          │
│  [Button]                                   │
│    ↑ Hover: Scale 1.05                      │
│    ↓ Click: Scale 0.95                      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  FOOTER                                     │
│  (Fade in dengan staggered sections)        │
└─────────────────────────────────────────────┘
```

### Anggota Page (/anggota)

```
┌─────────────────────────────────────────────┐
│  Header: Slide Down                         │
│  Daftar Anggota                             │
│                                             │
│  Search Box: Fade In + Focus Scale          │
│  [Search field with animation]              │
│                                             │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐  │
│  │Member1│ │Member2│ │Member3│ │Member4│  │
│  │Scale  │ │Scale  │ │Scale  │ │Scale  │  │
│  │In 0s  │ │In 0.1s│ │In 0.2s│ │In 0.3s│  │
│  │       │ │       │ │       │ │       │  │
│  │✨ A   │ │✨ B   │ │✨ C   │ │✨ D   │  │
│  │hover  │ │hover  │ │hover  │ │hover  │  │
│  │lift   │ │lift   │ │lift   │ │lift   │  │
│  └───────┘ └───────┘ └───────┘ └───────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

### Artikel Page (/artikel)

```
┌─────────────────────────────────────────────┐
│  Header: Slide Down                         │
│  Artikel & Blog                             │
│                                             │
│  [Search]  Fade In + Focus Scale            │
│                                             │
│  ┌────────────────────────────────┐  0s    │
│  │ [Img] Article Title            │  Slide │
│  │Excerpt...                      │  Up    │
│  │By: Author  [Read More →]       │        │
│  │          ↑ Slide on hover      │        │
│  └────────────────────────────────┘        │
│                                             │
│  ┌────────────────────────────────┐  0.1s  │
│  │ [Img] Article Title 2          │  Slide │
│  │Excerpt...                      │  Up    │
│  │By: Author  [Read More →]       │        │
│  │          ↑ Slide on hover      │        │
│  └────────────────────────────────┘        │
│                                             │
└─────────────────────────────────────────────┘
```

### Produk Page (/produk)

```
┌─────────────────────────────────────────────┐
│  Header: Slide Down                         │
│  Produk & Layanan                           │
│                                             │
│  Filter Buttons:                            │
│  [Semua] [Buku] [Video] [Template]          │
│    ↑      ↑      ↑        ↑                 │
│   Scale  Scale  Scale    Scale             │
│  Hover  Hover  Hover    Hover              │
│                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│  │Product 1│ │Product 2│ │Product 3│      │
│  │ Scale   │ │ Scale   │ │ Scale   │      │
│  │ In 0s   │ │ In 0.1s │ │ In 0.2s │      │
│  │         │ │         │ │         │      │
│  │[Img]    │ │[Img]    │ │[Img]    │      │
│  │ Scale   │ │ Scale   │ │ Scale   │      │
│  │ hover   │ │ hover   │ │ hover   │      │
│  │Title    │ │Title    │ │Title    │      │
│  │ Color   │ │ Color   │ │ Color   │      │
│  │ on      │ │ on      │ │ on      │      │
│  │ hover   │ │ hover   │ │ hover   │      │
│  │[Button] │ │[Button] │ │[Button] │      │
│  │ Scale   │ │ Scale   │ │ Scale   │      │
│  │ on tap  │ │ on tap  │ │ on tap  │      │
│  └─────────┘ └─────────┘ └─────────┘      │
│                                             │
└─────────────────────────────────────────────┘
```

## 🎨 Animation Timing Chart

```
Timeline: 0s ├──────┤ 0.5s ├──────┤ 1.0s ├──────┤ 1.5s ├──────┤ 2.0s

Page Load:
  Navbar         ██████████ (0s - 0.5s)
  
Hero Section:
  Title          ··|██████ (0.1s - 0.6s)
  Subtitle       ··|··|██ (0.2s - 0.7s)
  Buttons        ··|··|··|██ (0.3s - 0.8s)
  
Features:
  Heading        ····|██ (0.5s - 1.0s)
  Feature 1      ····|··|██ (0.5s - 1.1s)
  Feature 2      ····|··|··|██ (0.65s - 1.25s)
  Feature 3      ····|··|··|··|██ (0.8s - 1.4s)

Legend:
  ██ = Animation running
  ·· = Delay
  | = Start point
```

## 🖱️ Interactive Animation Map

### Hover Effects

```
┌──────────────────────────┐
│      Element Hover       │
├──────────────────────────┤
│ Logo: Scale(1.1)         │
│       Rotate(5deg)       │
│                          │
│ NavLink: Y(-2px)         │
│          Color(#2563eb)  │
│                          │
│ Button: Scale(1.05)      │
│         Shadow++         │
│                          │
│ Card: Y(-8px)            │
│       Shadow+++          │
│                          │
│ Image: Scale(1.05)       │
│                          │
│ Title: Color(#2563eb)    │
│                          │
│ Icon: Scale(1.1)         │
│       Color(#2563eb)     │
└──────────────────────────┘
```

### Tap/Click Effects

```
┌──────────────────────────┐
│      Element Tap         │
├──────────────────────────┤
│ Button: Scale(0.95)      │
│                          │
│ Icon: Scale(0.95)        │
│                          │
│ Link: Scale(0.98)        │
│                          │
│ Card: Scale(0.98)        │
└──────────────────────────┘
```

## 📱 Mobile Animation Behavior

```
Mobile Navbar:
┌────────────────┐
│ KKG [≡]        │  ← Hamburger button
│                │
│ [Active] (animate when clicked)
│                │
│ ├─ Beranda     │  ← Slide Left In
│ ├─ Anggota     │  ← Slide Left In (delay 0.05s)
│ ├─ Artikel     │  ← Slide Left In (delay 0.1s)
│ └─ Produk      │  ← Slide Left In (delay 0.15s)
│                │
└────────────────┘

Hamburger Lines Transform:
  Line 1: rotate(45deg)    ─────→ ╱
  Line 2: opacity(0)       ─────→ (invisible)
  Line 3: rotate(-45deg)   ─────→ ╲
```

## 🎯 Scroll Trigger Points

```
┌─────────────────────────────────────┐
│         Scroll Position             │
├─────────────────────────────────────┤
│ 0%   │ Hero Section                 │
│      │ (Always visible)             │
│      │                              │
│ 20%  │ Features (trigger when 30%)  │
│      │ visible in viewport          │
│      │                              │
│ 40%  │ CTA Section                  │
│      │                              │
│ 60%  │ Page Content Below           │
│      │ (different per page)         │
│      │                              │
│ 100% │ Footer                       │
│      │ (trigger when 30% visible)   │
└─────────────────────────────────────┘

Viewport Detection:
  once: true       → Animasi hanya 1x
  amount: 0.3      → Trigger saat 30% visible
```

## 🎬 Animation Type Reference

```
ENTRANCE ANIMATIONS:
  ├─ Fade In
  │   opacity: 0 → 1
  │
  ├─ Slide Up
  │   y: 50px → 0, opacity: 0 → 1
  │
  ├─ Slide Down
  │   y: -50px → 0, opacity: 0 → 1
  │
  ├─ Slide Left
  │   x: -50px → 0, opacity: 0 → 1
  │
  ├─ Slide Right
  │   x: 50px → 0, opacity: 0 → 1
  │
  └─ Scale In
      scale: 0.8 → 1, opacity: 0 → 1

INTERACTIVE ANIMATIONS:
  ├─ Hover Effects
  │   ├─ Scale Up
  │   ├─ Color Change
  │   ├─ Translate Y
  │   └─ Shadow Increase
  │
  └─ Tap Effects
      ├─ Scale Down
      └─ Feedback Response

CONTINUOUS ANIMATIONS:
  ├─ Floating
  │   x: [0, 30, 0], y: [0, 50, 0]
  │   duration: 8-10s, repeat: ∞
  │
  └─ Pulse
      scale: [1, 1.05, 1]
      duration: 2-3s, repeat: ∞
```

## ✨ Special Effects

### Background Floating Circles
```
┌─────────────────────────────────┐
│  ○ Floating Circles             │
│                                 │
│   Top Right: ◯ (moving)        │
│   x: sin() * 30                 │
│   y: cos() * 50                 │
│   duration: 8s                  │
│                                 │
│   Bottom Left: ◯ (moving)      │
│   x: sin() * -30                │
│   y: cos() * -50                │
│   duration: 10s                 │
│                                 │
│   Opacity: 0.2                  │
│   Blur: 3xl                     │
│   Mix-blend: multiply           │
│                                 │
└─────────────────────────────────┘
```

### Staggered Item Animation
```
Item 0: ║ ███████ (0s → 0.5s)
Item 1: ║ · ███████ (0.1s → 0.6s)
Item 2: ║ · · ███████ (0.2s → 0.7s)
Item 3: ║ · · · ███████ (0.3s → 0.8s)
Item 4: ║ · · · · ███████ (0.4s → 0.9s)
```

---

**Visual Guide untuk Motion Animations**
**Last Updated**: 22 Oktober 2025
