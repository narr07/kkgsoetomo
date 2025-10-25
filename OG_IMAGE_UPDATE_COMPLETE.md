# OG Image Update - Semua Halaman

## 📋 Summary

Semua OG image di website telah diupdate dengan tata letak baru yang konsisten:
- **Logo** di sebelah kiri (dinamis dari `app/logo.svg`)
- **Title & Description** di sebelah kanan
- **Warna** sesuai dengan brand palette (`#293466` → `#39488d`)

## 🎨 File yang Diupdate

### 1. Utility Function
- ✅ **`app/og-image-utils.tsx`** (NEW)
  - Helper function `createOGImage(title, subtitle, imageUrl?)`
  - Config konstanta untuk size dan contentType
  - Reusable untuk semua halaman

### 2. List Pages (Static)
- ✅ `app/opengraph-image.tsx` - Homepage
  - Title: "KKG dr. Soetomo"
  - Subtitle: "Kecamatan Rajagaluh - Majalengka"

- ✅ `app/(pages)/artikel/opengraph-image.tsx` - Artikel List
  - Title: "Artikel & Berita"
  - Subtitle: "Insights dan Informasi Terkini dari KKG dr. Soetomo"

- ✅ `app/(pages)/galeri/opengraph-image.tsx` - Galeri List
  - Title: "Galeri Kegiatan"
  - Subtitle: "Dokumentasi Momen Berharga KKG dr. Soetomo"

- ✅ `app/(pages)/anggota/opengraph-image.tsx` - Anggota List
  - Title: "Anggota KKG"
  - Subtitle: "Tim Profesional Pendidik Soetomo"

- ✅ `app/(pages)/produk/opengraph-image.tsx` - Produk List
  - Title: "Produk & Layanan"
  - Subtitle: "Solusi Pendidikan dari KKG dr. Soetomo"

### 3. Detail Pages (Dynamic)
- ✅ `app/(pages)/artikel/[slug]/opengraph-image.tsx`
  - Mengambil title dan description dari Sanity
  - Menggunakan article.image sebagai background
  - Fallback jika data tidak ada

- ✅ `app/(pages)/galeri/[slug]/opengraph-image.tsx`
  - Mengambil title dari Sanity
  - Menampilkan jumlah foto
  - Menggunakan gallery.thumbnail sebagai background
  - Fallback jika data tidak ada

## 🎯 Fitur

### Untuk List Pages
```tsx
createOGImage(
  'Judul Halaman',
  'Deskripsi/Subtitle'
)
```

### Untuk Detail Pages
```tsx
createOGImage(
  article.title,
  article.description,
  imageUrl // background image
)
```

## 🚀 Keunggulan

1. **DRY (Don't Repeat Yourself)** - Menggunakan utility function
2. **Konsisten** - Tata letak dan styling sama di semua halaman
3. **Responsif** - Logo & text menyesuaikan dengan proporsi
4. **Dinamis** - Mendukung background image untuk detail pages
5. **Maintainable** - Mudah diupdate di satu tempat

## 📐 Layout

```
┌─────────────────────────────────────────────┐
│ ┌─────────┐  ┌──────────────────────────┐  │
│ │         │  │ Judul Halaman            │  │
│ │  Logo   │  │ (64px, bold)             │  │
│ │         │  │                          │  │
│ │         │  │ Deskripsi/Subtitle       │  │
│ │         │  │ (28px, lighter)          │  │
│ │         │  │                          │  │
│ └─────────┘  └──────────────────────────┘  │
│ Background: linear-gradient(#293466→#39488d)│
└─────────────────────────────────────────────┘
  1200x630px
```

## 🎨 Warna

- **Primary Gradient**: `#293466` (dark blue)
- **Secondary**: `#39488d` (lighter blue)
- **Text**: `#ffffff` (white)
- **Subtitle**: `#f6f7de` (cream)

## ✅ Testing

Setiap halaman sekarang menggunakan OG image yang konsisten:
- Homepage: Logo + branding
- Artikel: Logo + judul + deskripsi
- Galeri: Logo + judul + jumlah foto
- Anggota: Logo + judul + subtitle
- Produk: Logo + judul + subtitle
- Detail Artikel: Logo + judul + deskripsi + background image
- Detail Galeri: Logo + judul + jumlah foto + background image

## 📝 Notes

- Untuk menambah halaman baru, cukup import `createOGImage` dari `og-image-utils`
- Untuk dynamic content, pastikan fetch data dari Sanity terlebih dahulu
- Background image optional - jika tidak ada, akan menggunakan gradient default
