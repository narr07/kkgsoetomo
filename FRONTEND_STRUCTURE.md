# 📋 Struktur Frontend KKG Soetomo

Berikut penjelasan struktur folder dan halaman yang telah dibuat untuk website KKG dengan Next.js dan Sanity.

## 📁 Struktur Folder

```
app/
├── (pages)/                          # Route group untuk halaman utama
│   ├── layout.tsx                    # Layout yang membungkus Navbar dan Footer
│   ├── anggota/
│   │   └── page.tsx                  # Halaman Daftar Anggota
│   ├── artikel/
│   │   └── page.tsx                  # Halaman Artikel/Blog
│   └── produk/
│       └── page.tsx                  # Halaman Produk & Layanan
├── studio/
│   └── [[...tool]]/
│       └── page.tsx                  # Sanity Studio
├── layout.tsx                        # Root Layout
├── page.tsx                          # Home/Beranda
└── globals.css                       # Global Styles

components/
├── Navbar.tsx                        # Komponen Navigasi
└── Footer.tsx                        # Komponen Footer
```

## 🎯 Daftar Halaman

### 1. **Home (Beranda)** - `/home`
- Hero section dengan call-to-action
- Fitur/tentang KKG
- CTA untuk bergabung
- Responsif dan modern

### 2. **Anggota** - `/anggota`
- Daftar anggota KKG dalam grid
- Search/filter anggota
- Card untuk setiap anggota dengan:
  - Nama
  - Jabatan
  - Sekolah asal
  - Avatar placeholder
- Siap terhubung dengan Sanity CMS

### 3. **Artikel** - `/artikel`
- Daftar artikel/blog dalam list view
- Search artikel
- Kategori/tag
- Info penulis dan tanggal publikasi
- Excerpt artikel
- Tombol "Baca Selengkapnya"
- Siap terhubung dengan Sanity CMS

### 4. **Produk** - `/produk`
- Grid produk/layanan
- Filter berdasarkan kategori
- Card produk dengan:
  - Nama produk
  - Deskripsi
  - Kategori
  - Harga (opsional)
  - Gambar placeholder
- Tombol "Lihat Detail"
- Siap terhubung dengan Sanity CMS

## 🎨 Komponen

### Navbar
- Logo KKG
- Menu navigasi responsive
- Mobile hamburger menu
- Sticky navigation
- Dark mode support

### Footer
- Logo dan deskripsi
- Quick links
- Informasi kontak
- Social media links
- Copyright

## 🔄 Navigasi

Route Structure dengan Route Groups:
- `/` → Beranda (Home)
- `/anggota` → Daftar Anggota
- `/artikel` → Artikel & Blog
- `/produk` → Produk & Layanan
- `/studio` → Sanity Studio (existing)

## 🎨 Styling

- **Tailwind CSS v4** untuk styling
- **Dark mode support** di semua halaman
- **Responsive design** untuk mobile, tablet, dan desktop
- Warna tema: Blue (#0066CC) sebagai warna utama
- Konsistensi spacing dan typography

## 📝 Mock Data

Semua halaman sudah memiliki mock data untuk development. Siap diganti dengan data dari Sanity CMS:

```typescript
// Contoh: mockMembers, mockArticles, mockProducts
// Dapat langsung diganti dengan fetch dari Sanity
```

## ✅ Next Steps

1. **Integrasikan dengan Sanity CMS**:
   - Update query untuk fetch data dari Sanity
   - Buat schema types untuk Post, Author, Category, dll

2. **Tambahkan Detail Pages**:
   - `/artikel/[slug]` untuk detail artikel
   - `/anggota/[slug]` untuk detail anggota
   - `/produk/[slug]` untuk detail produk

3. **Buat Components Library**:
   - Card components
   - Button components
   - Form components
   - dll

4. **Setup Environment Variables**:
   - Sanity API URLs
   - API Keys
   - dll

5. **Optimization**:
   - Image optimization
   - SEO optimization
   - Performance optimization

## 🚀 Cara Menjalankan

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

Akses di: `http://localhost:3000`

---

**Created**: 22 Oktober 2025
**Framework**: Next.js 16.0.0
**Styling**: Tailwind CSS v4
**CMS**: Sanity v4.11.0
