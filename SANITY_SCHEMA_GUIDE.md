# 📋 Sanity CMS Schema Documentation

## 📌 Overview

Kami telah membuat 5 schema Sanity baru yang sesuai dengan struktur frontend website KKG dr. Soetomo:

```
✅ Member (Anggota KKG)
✅ Article (Artikel Blog)
✅ ArticleCategory (Kategori Artikel)
✅ Product (Produk/Layanan)
✅ ProductCategory (Kategori Produk)
```

---

## 🧑‍💼 1. Member Type (Anggota KKG)

### File: `memberType.ts`

Schema untuk data anggota Kelompok Kerja Guru.

### Fields:

| Field | Type | Required | Deskripsi |
|-------|------|----------|-----------|
| `name` | String | ✅ | Nama lengkap anggota |
| `slug` | Slug | ✅ | URL slug (auto-generated dari name) |
| `role` | String | ✅ | Jabatan (Kepala KKG, Wakil Kepala, Sekretaris, Bendahara, Anggota) |
| `school` | String | ✅ | Nama sekolah |
| `image` | Image | ❌ | Foto profil dengan hotspot |
| `email` | String | ❌ | Email anggota |
| `phone` | String | ❌ | Nomor telepon |
| `bio` | Text | ❌ | Biografi singkat |
| `expertise` | Array | ❌ | Keahlian (tags) |
| `joinDate` | DateTime | ❌ | Tanggal bergabung |

### Preview:
```
Name: Budi Santoso
Subtitle: Kepala KKG
Image: Foto profil
```

### Contoh Data:
```json
{
  "_type": "member",
  "name": "Budi Santoso",
  "slug": { "current": "budi-santoso" },
  "role": "Kepala KKG",
  "school": "SD Negeri 1",
  "email": "budi@example.com",
  "phone": "+6281234567890",
  "bio": "Kepala KKG dengan pengalaman 15 tahun di bidang pendidikan...",
  "expertise": ["Kurikulum", "Manajemen Sekolah", "Inovasi Pendidikan"],
  "joinDate": "2020-01-15T00:00:00Z"
}
```

---

## 📝 2. Article Type (Artikel Blog)

### File: `articleType.ts`

Schema untuk artikel blog/artikel pembelajaran.

### Fields:

| Field | Type | Required | Deskripsi |
|-------|------|----------|-----------|
| `title` | String | ✅ | Judul artikel |
| `slug` | Slug | ✅ | URL slug (auto-generated) |
| `excerpt` | Text | ✅ | Ringkasan singkat (max 200 karakter) |
| `image` | Image | ✅ | Gambar sampul dengan hotspot |
| `author` | Reference | ✅ | Referensi ke Member (penulis) |
| `category` | Reference | ✅ | Referensi ke ArticleCategory |
| `tags` | Array | ❌ | Tag-tag artikel |
| `content` | BlockContent | ✅ | Konten artikel (rich text) |
| `publishedAt` | DateTime | ✅ | Tanggal publikasi |
| `updatedAt` | DateTime | ❌ | Tanggal update terakhir |
| `featured` | Boolean | ❌ | Tandai sebagai artikel unggulan |
| `views` | Number | ❌ | Jumlah tampilan (counter) |

### Preview:
```
Title: Strategi Pembelajaran Efektif
Subtitle: Pendidikan Digital • oleh Budi Santoso
Image: Gambar sampul
```

### Contoh Data:
```json
{
  "_type": "article",
  "title": "Strategi Pembelajaran Efektif di Era Digital",
  "slug": { "current": "strategi-pembelajaran-efektif" },
  "excerpt": "Pelajari cara mengintegrasikan teknologi dalam proses pembelajaran...",
  "author": { "_type": "reference", "_ref": "member-id" },
  "category": { "_type": "reference", "_ref": "articleCategory-id" },
  "tags": ["pembelajaran", "digital", "inovasi"],
  "content": { "_type": "blockContent", /* ... */ },
  "publishedAt": "2025-01-15T10:30:00Z",
  "featured": true,
  "views": 150
}
```

---

## 🏷️ 3. Article Category Type

### File: `articleCategoryType.ts`

Schema untuk kategori artikel.

### Fields:

| Field | Type | Required | Deskripsi |
|-------|------|----------|-----------|
| `title` | String | ✅ | Nama kategori |
| `slug` | Slug | ✅ | URL slug (auto-generated) |
| `description` | Text | ❌ | Deskripsi kategori |
| `color` | String | ❌ | Warna badge (Biru, Hijau, Merah, Oranye, Ungu, Pink) |

### Predefined Colors:
```
#2563eb - Biru
#10b981 - Hijau
#ef4444 - Merah
#f97316 - Oranye
#a855f7 - Ungu
#ec4899 - Pink
```

### Contoh Data:
```json
{
  "_type": "articleCategory",
  "title": "Pendidikan Digital",
  "slug": { "current": "pendidikan-digital" },
  "description": "Artikel tentang integrasi teknologi dalam pendidikan",
  "color": "#2563eb"
}
```

---

## 🛍️ 4. Product Type (Produk/Layanan)

### File: `productType.ts`

Schema untuk produk atau layanan yang ditawarkan KKG.

### Fields:

| Field | Type | Required | Deskripsi |
|-------|------|----------|-----------|
| `name` | String | ✅ | Nama produk |
| `slug` | Slug | ✅ | URL slug (auto-generated) |
| `description` | Text | ✅ | Deskripsi singkat |
| `image` | Image | ✅ | Gambar produk dengan hotspot |
| `category` | Reference | ✅ | Referensi ke ProductCategory |
| `price` | Number | ❌ | Harga dalam Rupiah |
| `discount` | Number | ❌ | Diskon dalam persen (%) |
| `stock` | Number | ❌ | Stok tersedia (default: 0) |
| `content` | BlockContent | ❌ | Konten detail produk |
| `features` | Array | ❌ | Fitur/keuntungan produk (objects) |
| `specifications` | Array | ❌ | Spesifikasi produk (objects) |
| `tags` | Array | ❌ | Tag produk |
| `publishedAt` | DateTime | ✅ | Tanggal publikasi |
| `featured` | Boolean | ❌ | Produk unggulan |
| `sales` | Number | ❌ | Jumlah terjual (counter) |

### Features Object:
```json
{
  "title": "string",
  "description": "text"
}
```

### Specifications Object:
```json
{
  "key": "string (e.g., 'Format')",
  "value": "string (e.g., 'PDF, Word')"
}
```

### Preview:
```
Title: Buku Panduan Mengajar Efektif
Subtitle: Buku • Rp 150.000
Image: Gambar produk
```

### Contoh Data:
```json
{
  "_type": "product",
  "name": "Buku Panduan Mengajar Efektif",
  "slug": { "current": "buku-panduan-mengajar" },
  "description": "Panduan komprehensif untuk meningkatkan kualitas mengajar...",
  "category": { "_type": "reference", "_ref": "productCategory-id" },
  "price": 150000,
  "discount": 10,
  "stock": 50,
  "features": [
    {
      "title": "Panduan Lengkap",
      "description": "Berisi strategi mengajar terbukti efektif"
    }
  ],
  "specifications": [
    {
      "key": "Format",
      "value": "PDF, Cetak"
    }
  ],
  "tags": ["buku", "panduan", "mengajar"],
  "publishedAt": "2025-01-10T00:00:00Z",
  "featured": true,
  "sales": 45
}
```

---

## 🏷️ 5. Product Category Type

### File: `productCategoryType.ts`

Schema untuk kategori produk.

### Fields:

| Field | Type | Required | Deskripsi |
|-------|------|----------|-----------|
| `title` | String | ✅ | Nama kategori |
| `slug` | Slug | ✅ | URL slug (auto-generated) |
| `description` | Text | ❌ | Deskripsi kategori |
| `icon` | String | ❌ | Ikon emoji atau URL |

### Contoh Data:
```json
{
  "_type": "productCategory",
  "title": "Buku",
  "slug": { "current": "buku" },
  "description": "Koleksi buku panduan dan referensi pendidikan",
  "icon": "📚"
}
```

---

## 🏗️ Struktur Sanity Studio

File `structure.ts` telah diperbarui dengan navigasi yang lebih baik:

```
KKG dr. Soetomo
├── 👥 Anggota KKG
├── 📝 Artikel
│   ├── Daftar Artikel
│   └── Kategori Artikel
├── 🛍️ Produk/Layanan
│   ├── Daftar Produk
│   └── Kategori Produk
├── 📰 Blog (Legacy)
│   ├── Posts
│   ├── Categories
│   └── Authors
└── [Other Document Types]
```

---

## 🔗 Relationships (Referensi)

```
Member
  ↓ authored by
  └── Article ──────→ ArticleCategory
                       (reference)

Product ──────→ ProductCategory
(reference)
```

---

## 📊 Querying Data dengan GROQ

Setelah data ada di Sanity, kita bisa query dengan GROQ:

### Get All Members:
```groq
*[_type == "member"] | order(joinDate desc)
```

### Get Article with Author:
```groq
*[_type == "article"] {
  title,
  slug,
  excerpt,
  image,
  author-> {
    name,
    image
  },
  category-> {
    title,
    color
  },
  publishedAt
}
```

### Get Products by Category:
```groq
*[_type == "product" && category._ref == $categoryId] {
  name,
  price,
  discount,
  image,
  featured
}
```

---

## 🛠️ Integrasi dengan Frontend

Halaman frontend akan menggunakan data dari Sanity:

### 1. Anggota Page (`/anggota`)
- Query: `*[_type == "member"]`
- Display: Member card grid dengan foto, nama, role

### 2. Artikel Page (`/artikel`)
- Query: `*[_type == "article"]`
- Display: Article list dengan thumbnail, title, excerpt, author

### 3. Produk Page (`/produk`)
- Query: `*[_type == "product"]`
- Display: Product grid dengan gambar, nama, harga, diskon

---

## ✅ Checklist Setup

- [x] Create memberType.ts
- [x] Create articleType.ts
- [x] Create articleCategoryType.ts
- [x] Create productType.ts
- [x] Create productCategoryType.ts
- [x] Update index.ts (schema export)
- [x] Update structure.ts (Sanity Studio navigation)
- [ ] Add sample data to Sanity
- [ ] Update frontend pages to use Sanity queries
- [ ] Test data fetching in frontend

---

## 🚀 Next Steps

1. **Add Sample Data**: Buka Sanity Studio dan tambahkan data sampel
2. **Setup Client**: Update `sanity/lib/client.ts` dengan groq queries
3. **Update Frontend**: Ganti mock data dengan live queries dari Sanity
4. **Create Detail Pages**: Buat `/artikel/[slug]` dan `/produk/[slug]`

---

## 📚 Resources

- [Sanity Schema Documentation](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Structure Builder](https://www.sanity.io/docs/structure-builder)

---

**Status**: ✅ Schema Created
**Date**: 22 Oktober 2025
**Version**: 1.0
