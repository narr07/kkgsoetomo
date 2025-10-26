# API Routes Removal Summary

## Perubahan yang Dilakukan

Semua API routes yang memanggil data dari Sanity telah dihapus. Data sekarang diambil langsung dari komponen dan halaman menggunakan `sanityFetch()` client Sanity.

### Komponen yang Diupdate

#### 1. `components/home/aboutUs.tsx`
- **Before**: `fetch('/api/about-us')`
- **After**: `sanityFetch({ query: aboutUsQuery, revalidate: 60 })`
- **Query**: `aboutUsQuery`

#### 2. `components/home/LastArticle.tsx`
- **Before**: `fetch('/api/articles')`
- **After**: `sanityFetch({ query: allArticlesQuery, revalidate: 60 })`
- **Query**: `allArticlesQuery`

#### 3. `components/home/LastGaleri.tsx`
- **Before**: `fetch('/api/galleries')`
- **After**: `sanityFetch({ query: allGalleriesQuery, revalidate: 60 })`
- **Query**: `allGalleriesQuery`

#### 4. `components/home/selayang.tsx`
- **Before**: `fetch('/api/selayang-pandang')`
- **After**: `sanityFetch({ query: selayangPandangQuery, revalidate: 60 })`
- **Query**: `selayangPandangQuery`

#### 5. `components/home/hero.tsx`
- **Before**: `fetch('/api/school-list')` dan `fetch('/api/hero')`
- **After**: `sanityFetch()` untuk kedua query secara parallel
- **Query**: `schoolListQuery` dan `heroQuery`

### Halaman yang Diupdate

#### 1. `app/(pages)/anggota/page.tsx`
- **Before**: `fetch('/api/members')`
- **After**: `sanityFetch({ query: allMembersQuery, revalidate: 60 })`
- **Query**: `allMembersQuery`

#### 2. `app/(pages)/artikel/page.tsx`
- **Before**: `fetch('/api/articles')`
- **After**: `sanityFetch({ query: allArticlesQuery, revalidate: 60 })`
- **Query**: `allArticlesQuery`

#### 3. `app/(pages)/galeri/page.tsx`
- **Before**: `fetch('/api/galleries')`
- **After**: `sanityFetch({ query: allGalleriesQuery, revalidate: 60 })`
- **Query**: `allGalleriesQuery`

#### 4. `app/(pages)/produk/page.tsx`
- **Before**: `fetch('/api/products')`
- **After**: `sanityFetch({ query: allProductsQuery, revalidate: 60 })`
- **Query**: `allProductsQuery`

### API Routes yang Dihapus

Folder-folder berikut telah dihapus dari `app/api/`:

- ❌ `about-us/` - Diganti dengan direct Sanity fetch di `aboutUs.tsx`
- ❌ `articles/` - Diganti dengan direct Sanity fetch di `LastArticle.tsx` dan `artikel/page.tsx`
- ❌ `galleries/` - Diganti dengan direct Sanity fetch di `LastGaleri.tsx` dan `galeri/page.tsx`
- ❌ `hero/` - Diganti dengan direct Sanity fetch di `hero.tsx`
- ❌ `members/` - Diganti dengan direct Sanity fetch di `anggota/page.tsx`
- ❌ `products/` - Diganti dengan direct Sanity fetch di `produk/page.tsx`
- ❌ `school-list/` - Diganti dengan direct Sanity fetch di `hero.tsx`
- ❌ `selayang-pandang/` - Diganti dengan direct Sanity fetch di `selayang.tsx`
- ❌ `homepage-data/` - Tidak digunakan, dihapus
- ❌ `site-settings/` - Tidak digunakan, dihapus

### API Routes yang Tetap Ada

Folder-folder berikut masih ada dan tetap digunakan:

- ✅ `og/` - Untuk generate OG images
- ✅ `revalidate/` - Untuk on-demand revalidation

## Keuntungan

1. **Lebih Cepat**: Data diambil langsung dari Sanity CDN tanpa perlu melalui API route
2. **Caching Lebih Baik**: Menggunakan Next.js native caching mechanism dengan `sanityFetch()`
3. **Lebih Sederhana**: Mengurangi kompleksitas dengan mengeliminasi API layer yang tidak perlu
4. **Maintenance Lebih Mudah**: Satu sumber kebenaran untuk data fetching

## Catatan Deployment

Setelah deployment, pastikan:

1. Data terbaru muncul di website tanpa perlu menunggu revalidation
2. Semua halaman memuat data dengan benar
3. Tidak ada error 404 untuk API routes yang telah dihapus
4. ISR (Incremental Static Regeneration) bekerja dengan baik

## Revalidation Setting

Semua data diatur dengan revalidation 60 detik:
```typescript
sanityFetch({
  query: queryName,
  revalidate: 60, // Revalidate setiap 60 detik
})
```

Ini memastikan data selalu fresh tanpa mengorbankan performance.
