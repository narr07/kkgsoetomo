# 📊 Schema Comparison: Before vs After

## Overview

Kami telah meningkatkan Sanity schema dari 4 tipe dasar menjadi 9 tipe yang komprehensif.

---

## ❌ SEBELUMNYA (4 Schema Dasar)

```
schemaTypes/
├── blockContentType.ts
├── categoryType.ts
├── postType.ts
└── authorType.ts

Hanya untuk Blog, tidak sesuai dengan website KKG yang memiliki:
- Anggota (Member)
- Artikel (Article) 
- Produk (Product)
```

### Struktur Sanity Studio (Lama):
```
Blog
├── Posts
├── Categories
└── Authors
```

---

## ✅ SESUDAH (9 Schema Lengkap)

```
schemaTypes/
├── blockContentType.ts      (existing)
├── categoryType.ts          (existing - legacy)
├── postType.ts              (existing - legacy)
├── authorType.ts            (existing - legacy)
├── memberType.ts            (NEW - Anggota KKG)
├── articleType.ts           (NEW - Artikel Blog)
├── articleCategoryType.ts   (NEW - Kategori Artikel)
├── productType.ts           (NEW - Produk/Layanan)
└── productCategoryType.ts   (NEW - Kategori Produk)
```

### Struktur Sanity Studio (Baru):
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
└── [Other Types]
```

---

## 📋 Schema Details Comparison

### 1. Member vs Author

| Aspek | Author (Legacy) | Member (NEW) |
|-------|-----------------|-------------|
| **Fields** | name, slug, image, bio | name, slug, role, school, image, email, phone, bio, expertise, joinDate |
| **Purpose** | Blog post author only | KKG member profile - comprehensive |
| **Role** | Hanya sebagai penulis | Role specific (Kepala, Wakil, Sekretaris, dll) |
| **School Info** | ❌ Tidak ada | ✅ Ada (school) |
| **Contact** | ❌ Hanya bio | ✅ Email, phone |
| **Expertise** | ❌ Tidak ada | ✅ Array of tags |
| **Join Date** | ❌ Tidak ada | ✅ DateTime |

### 2. Article vs Post

| Aspek | Post (Legacy) | Article (NEW) |
|-------|---------------|---------------|
| **Structure** | title, slug, author, image, categories, body | title, slug, excerpt, image, author, category, tags, content, metadata |
| **Categories** | Array of references | Single reference + tags |
| **Analytics** | ❌ Tidak ada | ✅ views, featured |
| **Timestamps** | publishedAt only | publishedAt + updatedAt |
| **Excerpt** | ❌ Tidak ada | ✅ Text field (untuk preview) |
| **Featured** | ❌ Tidak ada | ✅ Boolean flag |

### 3. Category Type

| Aspek | Category (Legacy) | ArticleCategory (NEW) | ProductCategory (NEW) |
|-------|-------------------|-----------------------|----------------------|
| **Fields** | title, slug, description | title, slug, description, color | title, slug, description, icon |
| **For** | Blog categories | Article categories | Product categories |
| **Styling** | ❌ Tidak ada | ✅ Color badge | ✅ Icon support |
| **Purpose** | General | Specific untuk artikel | Specific untuk produk |

### 4. New: Product Schema

| Field | Type | Notes |
|-------|------|-------|
| **Basic** | name, slug, description | Mirip dengan article |
| **E-Commerce** | price, discount, stock | Untuk tracking inventory & sales |
| **Details** | features[], specifications[] | Detailed product info |
| **Analytics** | featured, sales | Track bestsellers |

---

## 🔄 Migration Path

```
LEGACY Blog System          →    NEW KKG System
├── Post ────────────────────┐
├── Author ──────────────────┼──→ Tetap ada untuk backward compatibility
├── Category ────────────────┘

+ NEW:
├── Member (Anggota)
├── Article (Artikel Blog)
├── ArticleCategory (Kategori Artikel)
├── Product (Produk/Layanan)
└── ProductCategory (Kategori Produk)
```

---

## 📈 Data Growth Potential

### Capacity Comparison

| Tipe | Schema Lama | Schema Baru | Growth |
|-----|-------------|------------|---------|
| Content Types | 4 | 9 | +125% |
| Fields per Doc | 4-7 | 9-15 | +214% |
| Reference Types | 1 | 5 | +400% |
| Metadata Support | Basic | Advanced | ✅ |

---

## 🎯 Frontend Impact

### Pages yang akan berubah:

#### 1. Anggota Page (`/anggota`)
```tsx
// SEBELUM: Mock data
const mockMembers = [...]

// SESUDAH: Live from Sanity
const members = await sanityClient.fetch(
  `*[_type == "member"] | order(joinDate desc)`
)
```

#### 2. Artikel Page (`/artikel`)
```tsx
// SEBELUM: Mock data
const mockArticles = [...]

// SESUDAH: Live from Sanity dengan author & category
const articles = await sanityClient.fetch(`
  *[_type == "article"] {
    title, slug, excerpt, image,
    author-> { name },
    category-> { title, color },
    publishedAt
  } | order(publishedAt desc)
`)
```

#### 3. Produk Page (`/produk`)
```tsx
// SEBELUM: Mock data
const mockProducts = [...]

// SESUDAH: Live from Sanity dengan pricing & stock
const products = await sanityClient.fetch(`
  *[_type == "product"] {
    name, slug, price, discount,
    stock, image, featured,
    category-> { title, icon }
  }
`)
```

---

## ✨ New Features Enabled

Dengan schema baru, kita sekarang bisa:

### For Members:
- ✅ Track expertise dan skills
- ✅ Multiple roles dan departments
- ✅ Contact information management
- ✅ Membership timeline

### For Articles:
- ✅ Content versioning (updatedAt)
- ✅ Featured articles showcase
- ✅ View counter / analytics
- ✅ Better categorization with tags

### For Products:
- ✅ Pricing & discount management
- ✅ Inventory tracking
- ✅ Detailed specifications
- ✅ Sales tracking
- ✅ Multi-part features

---

## 🔐 Backward Compatibility

Legacy schemas tetap intact untuk:
- ✅ Existing blog posts
- ✅ Previous authors
- ✅ Historical data

Kita bisa menjalankan keduanya side-by-side atau migrate data secara bertahap.

---

## 📊 Reference Relationships

### Schema Baru: Reference Map

```
┌─────────────────────────────────────┐
│         Member (Anggota)            │
│  (profile, role, expertise, school) │
└──────────────┬──────────────────────┘
               │ authored by
               ↓
        ┌──────────────┐
        │   Article    │
        │  (dengan tag)│
        └──────┬───────┘
               │ references
               ↓
      ┌────────────────────┐
      │ ArticleCategory    │
      │ (color-coded)      │
      └────────────────────┘


┌─────────────────────────────────────┐
│    Product (Produk/Layanan)         │
│  (price, stock, features, specs)    │
└──────────────┬──────────────────────┘
               │ belongs to
               ↓
      ┌────────────────────┐
      │ ProductCategory    │
      │ (icon-based)       │
      └────────────────────┘
```

---

## 🚀 Implementation Timeline

### Phase 1: Setup (DONE ✅)
- [x] Create all schema types
- [x] Update structure.ts
- [x] Update index.ts

### Phase 2: Data Entry
- [ ] Add sample member data
- [ ] Add sample article data
- [ ] Add sample product data

### Phase 3: Frontend Integration
- [ ] Update anggota page to use live data
- [ ] Update artikel page to use live data
- [ ] Update produk page to use live data
- [ ] Create detail pages ([slug])

### Phase 4: Enhancement
- [ ] Add search functionality
- [ ] Add filtering by category
- [ ] Add sorting options
- [ ] Add analytics dashboard

---

## 📝 Notes

- **Consistency**: Semua schema menggunakan format `title`, `slug`, `description` yang consistent
- **Flexibility**: Object arrays (features, specifications) memungkinkan expand di masa depan
- **Extensibility**: Mudah menambah field baru tanpa breaking changes
- **SEO**: Slug auto-generated memudahkan routing di frontend

---

**Status**: ✅ Schema Complete
**Date**: 22 Oktober 2025
**Next**: Add sample data to Sanity Studio
