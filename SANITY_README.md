# 📚 KKG Website - Sanity Schema Documentation

## 🎯 Quick Navigation

Selamat! Schema Sanity untuk website KKG dr. Soetomo telah selesai dibuat! 

Berikut dokumentasi lengkapnya:

### 🟢 START HERE (Pilih salah satu sesuai kebutuhan)

#### Untuk Pemula / Overview
1. **[SANITY_COMPLETE.txt](./SANITY_COMPLETE.txt)** ⭐ 
   - Ringkasan lengkap setup
   - Status checklist
   - Quick reference

#### Untuk Developers / Technical Details
2. **[SANITY_SCHEMA_GUIDE.md](./SANITY_SCHEMA_GUIDE.md)**
   - Dokumentasi schema lengkap
   - Semua fields dijelaskan
   - Contoh data untuk setiap type
   - GROQ query examples

#### Untuk Migration / Understanding Changes
3. **[SCHEMA_COMPARISON.md](./SCHEMA_COMPARISON.md)**
   - Perbandingan Before vs After
   - Apa yang berubah
   - Alasan perubahan
   - Data growth potential

#### Untuk Implementation / Next Steps
4. **[SANITY_INTEGRATION_CHECKLIST.md](./SANITY_INTEGRATION_CHECKLIST.md)**
   - Phase-by-phase checklist
   - Sample data yang perlu ditambah
   - Panduan update frontend
   - Testing checklist

---

## 📋 Dokumentasi Lengkap (Urutan Baca)

### Phase 1: Understanding the Schema
```
1. SANITY_COMPLETE.txt          ← Mulai dari sini
2. SANITY_SCHEMA_GUIDE.md       ← Detail lengkap setiap schema
3. SCHEMA_COMPARISON.md          ← Pahami perubahan
```

### Phase 2: Implementation
```
4. SANITY_INTEGRATION_CHECKLIST.md  ← Step-by-step guide
   - Phase 1: Setup (DONE ✅)
   - Phase 2: Add Sample Data
   - Phase 3: Setup Client
   - Phase 4: Update Frontend
   - Phase 5: Create Detail Pages
   - Phase 6: Image Optimization
   - Phase 7: Add Features
   - Phase 8: Testing
```

---

## 📊 Schema Types Created

### 5 New Schema Types ✨

```
┌──────────────────────────────────────────────────────────────┐
│ memberType.ts                                                 │
│ 👥 Anggota KKG - Member profiles with role & expertise      │
├──────────────────────────────────────────────────────────────┤
│ Fields: name, slug, role, school, image, email, phone,      │
│         bio, expertise[], joinDate                           │
│ Used in: /anggota page                                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ articleType.ts                                                │
│ 📝 Artikel - Blog articles with rich text & metadata         │
├──────────────────────────────────────────────────────────────┤
│ Fields: title, slug, excerpt, image, author (ref),          │
│         category (ref), tags[], content, publishedAt,        │
│         updatedAt, featured, views                           │
│ Used in: /artikel page, /artikel/[slug] detail              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ articleCategoryType.ts                                        │
│ 🏷️ Kategori Artikel - Categories with color coding          │
├──────────────────────────────────────────────────────────────┤
│ Fields: title, slug, description, color                     │
│ Referenced by: Article                                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ productType.ts                                                │
│ 🛍️ Produk - Products with pricing & inventory               │
├──────────────────────────────────────────────────────────────┤
│ Fields: name, slug, description, image, category (ref),     │
│         price, discount, stock, content, features[],        │
│         specifications[], tags, publishedAt,                │
│         featured, sales                                     │
│ Used in: /produk page, /produk/[slug] detail               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ productCategoryType.ts                                        │
│ 🏷️ Kategori Produk - Categories with icons                 │
├──────────────────────────────────────────────────────────────┤
│ Fields: title, slug, description, icon                      │
│ Referenced by: Product                                       │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Sanity Studio Navigation

```
KKG dr. Soetomo (Main)
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

## 🔍 Key Features

### Member Schema
- ✅ Role-based system (Kepala, Wakil, Sekretaris, Bendahara, Anggota)
- ✅ School affiliation tracking
- ✅ Contact management (email, phone)
- ✅ Expertise tags
- ✅ Join date tracking

### Article Schema
- ✅ Rich text content editor
- ✅ Author attribution (referenced from Member)
- ✅ Category system with color coding
- ✅ Featured articles highlighting
- ✅ View counter for analytics
- ✅ Update date tracking
- ✅ Tag-based tagging

### Product Schema
- ✅ Pricing with discount support
- ✅ Inventory management
- ✅ Detailed features (array of objects)
- ✅ Technical specifications
- ✅ Category system with icons
- ✅ Sales tracking

---

## 📈 Statistics

| Metric | Count |
|--------|-------|
| Total Schema Types | 9 |
| New Schema Types | 5 |
| Total Fields | 65+ |
| Reference Relationships | 5+ |
| Predefined Values | 30+ |

---

## 🚀 Implementation Phases

### ✅ Phase 1: Schema Setup (DONE)
- [x] Create memberType.ts
- [x] Create articleType.ts
- [x] Create articleCategoryType.ts
- [x] Create productType.ts
- [x] Create productCategoryType.ts
- [x] Update schemaTypes/index.ts
- [x] Update sanity/structure.ts

### ⏳ Phase 2: Add Sample Data (TODO)
- [ ] Add members to Sanity
- [ ] Add article categories
- [ ] Add articles with authors
- [ ] Add product categories
- [ ] Add products with details

### ⏳ Phase 3: Frontend Integration (TODO)
- [ ] Create sanity/lib/queries.ts
- [ ] Update /anggota page
- [ ] Update /artikel page
- [ ] Update /produk page

### ⏳ Phase 4: Detail Pages (TODO)
- [ ] Create /artikel/[slug]/page.tsx
- [ ] Create /produk/[slug]/page.tsx
- [ ] Create /anggota/[slug]/page.tsx (optional)

### ⏳ Phase 5: Enhancement (TODO)
- [ ] Image optimization
- [ ] Search functionality
- [ ] Category filtering
- [ ] Pagination
- [ ] Analytics

---

## 📝 How to Use This Documentation

### If you want to...

**Understand what schemas were created**
→ Read: [SANITY_COMPLETE.txt](./SANITY_COMPLETE.txt)

**Get technical details about each schema**
→ Read: [SANITY_SCHEMA_GUIDE.md](./SANITY_SCHEMA_GUIDE.md)

**Understand the changes from legacy blog system**
→ Read: [SCHEMA_COMPARISON.md](./SCHEMA_COMPARISON.md)

**Follow step-by-step integration guide**
→ Read: [SANITY_INTEGRATION_CHECKLIST.md](./SANITY_INTEGRATION_CHECKLIST.md)

**Add sample data to Sanity**
→ See Phase 2 in: [SANITY_INTEGRATION_CHECKLIST.md](./SANITY_INTEGRATION_CHECKLIST.md#-phase-2-add-sample-data-to-sanity-studio)

**Update frontend pages to use Sanity**
→ See Phase 4 in: [SANITY_INTEGRATION_CHECKLIST.md](./SANITY_INTEGRATION_CHECKLIST.md#-phase-4-update-frontend-pages)

---

## 🛠️ Quick Commands

```bash
# Start Sanity Studio
npm run dev -- --scheme=cosmo

# Open Sanity Studio
http://localhost:3000/studio

# Test queries
Use Vision tab in Sanity Studio
```

---

## 🔗 Relationships

```
Member (Anggota)
  ↓ authored by
Article (Artikel)
  ↓ references
ArticleCategory (Kategori Artikel)

Product (Produk)
  ↓ references
ProductCategory (Kategori Produk)
```

---

## ✨ What's Next?

1. **Add Sample Data** (Follow Phase 2 in checklist)
   - Login to Sanity Studio
   - Create members, articles, products
   - Test data visibility

2. **Create Query Functions** (Follow Phase 3)
   - Create sanity/lib/queries.ts
   - Write GROQ queries
   - Test in Vision

3. **Update Frontend** (Follow Phase 4)
   - Replace mock data with live queries
   - Keep animations intact
   - Test all pages

4. **Create Detail Pages** (Follow Phase 5)
   - /artikel/[slug]
   - /produk/[slug]
   - /anggota/[slug]

---

## 📚 File Reference

| File | Purpose | Read Time |
|------|---------|-----------|
| SANITY_COMPLETE.txt | Summary & overview | 5 min |
| SANITY_SCHEMA_GUIDE.md | Detailed documentation | 15 min |
| SCHEMA_COMPARISON.md | Before/After analysis | 10 min |
| SANITY_INTEGRATION_CHECKLIST.md | Step-by-step guide | 20 min |

---

## 🎯 Success Criteria

- [x] All 5 schema types created
- [x] TypeScript errors resolved
- [x] Sanity Studio structure updated
- [x] Documentation complete
- [ ] Sample data added
- [ ] Frontend queries created
- [ ] Detail pages implemented
- [ ] Testing completed

---

## 💡 Tips & Best Practices

1. **Start with sample data** - Add at least 5 items of each type
2. **Test queries in Vision** - Use Sanity's Vision tab to test GROQ
3. **Use slugs for URLs** - All types have auto-generated slugs from titles
4. **Optimize images** - Use Next.js Image component with Sanity image optimization
5. **Keep animations** - Frontend animations stay the same, data sources change

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Schema not showing in Studio | Update schemaTypes/index.ts and restart |
| References not working | Ensure referenced type exists in index.ts |
| Images not displaying | Check image field configuration & URLs |
| Queries failing | Verify query syntax in Vision tab first |

---

## 📞 Support

For detailed information about:
- **Schema structure** → See SANITY_SCHEMA_GUIDE.md
- **Implementation steps** → See SANITY_INTEGRATION_CHECKLIST.md
- **Query examples** → See SANITY_SCHEMA_GUIDE.md (Querying Data section)
- **References** → See official docs links in guides

---

**Status**: ✅ Schema Setup Complete
**Last Updated**: 22 Oktober 2025
**Next Step**: Start Phase 2 - Add Sample Data

---

Created for: KKG dr. Soetomo Website
Framework: Next.js 16 + Sanity 4.11 + React 19
