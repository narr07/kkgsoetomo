# 🔄 Sanity Frontend Integration Checklist

## 📋 Overview

Panduan lengkap untuk mengintegrasikan data Sanity ke halaman frontend React.

---

## ✅ Phase 1: Schema Setup (COMPLETE)

- [x] Create memberType.ts
- [x] Create articleType.ts
- [x] Create articleCategoryType.ts
- [x] Create productType.ts
- [x] Create productCategoryType.ts
- [x] Update schemaTypes/index.ts
- [x] Update sanity/structure.ts

---

## ⏳ Phase 2: Add Sample Data to Sanity Studio

### 2.1 Member Data
- [ ] Login ke Sanity Studio: `http://localhost:3000/studio`
- [ ] Navigate to: 👥 Anggota KKG
- [ ] Create at least 5 member entries dengan:
  - [ ] Name
  - [ ] Role (dari dropdown)
  - [ ] School
  - [ ] Photo/Image
  - [ ] Email
  - [ ] Phone
  - [ ] Bio
  - [ ] Expertise (tags)
  - [ ] Join Date

**Sample Data:**
```
1. Budi Santoso - Kepala KKG - SD Negeri 1
2. Siti Nurhaliza - Wakil Kepala - SD Negeri 2
3. Ahmad Wijaya - Sekretaris - SD Negeri 3
4. Rini Kartika - Bendahara - SD Negeri 4
5. Doni Pratama - Anggota - SD Negeri 5
```

### 2.2 Article Category Data
- [ ] Navigate to: 📝 Artikel → Kategori Artikel
- [ ] Create categories:
  - [ ] "Pendidikan Digital" (Biru: #2563eb)
  - [ ] "Kurikulum" (Hijau: #10b981)
  - [ ] "Psikologi Pendidikan" (Merah: #ef4444)
  - [ ] "Metodologi" (Oranye: #f97316)

### 2.3 Article Data
- [ ] Navigate to: 📝 Artikel → Daftar Artikel
- [ ] Create at least 4 articles dengan:
  - [ ] Title
  - [ ] Excerpt (ringkasan singkat)
  - [ ] Cover Image
  - [ ] Author (reference ke Member)
  - [ ] Category (reference ke ArticleCategory)
  - [ ] Tags
  - [ ] Content (rich text)
  - [ ] Published Date
  - [ ] Mark as Featured

**Sample Articles:**
```
1. "Strategi Pembelajaran Efektif di Era Digital"
   - Author: Budi Santoso
   - Category: Pendidikan Digital
   - Published: 2025-01-15

2. "Pengembangan Kurikulum Berbasis Kompetensi"
   - Author: Siti Nurhaliza
   - Category: Kurikulum
   - Published: 2025-01-10

3. "Membangun Kepercayaan Diri Siswa"
   - Author: Ahmad Wijaya
   - Category: Psikologi Pendidikan
   - Published: 2025-01-05

4. "Metode Pembelajaran Inovatif"
   - Author: Rini Kartika
   - Category: Metodologi
   - Published: 2024-12-28
```

### 2.4 Product Category Data
- [ ] Navigate to: 🛍️ Produk → Kategori Produk
- [ ] Create categories:
  - [ ] "Buku" (📚 emoji)
  - [ ] "Video" (🎥 emoji)
  - [ ] "Template" (📋 emoji)
  - [ ] "Sertifikat" (🏆 emoji)
  - [ ] "Toolkit" (🛠️ emoji)

### 2.5 Product Data
- [ ] Navigate to: 🛍️ Produk → Daftar Produk
- [ ] Create at least 5 products dengan:
  - [ ] Name
  - [ ] Description
  - [ ] Image
  - [ ] Category (reference ke ProductCategory)
  - [ ] Price
  - [ ] Discount (optional)
  - [ ] Stock
  - [ ] Features (array)
  - [ ] Specifications (array)
  - [ ] Tags
  - [ ] Published Date
  - [ ] Mark Featured ones

**Sample Products:**
```
1. Buku Panduan Mengajar Efektif - Rp 150.000 - Buku
2. Video Tutorial Metode Pembelajaran - Rp 200.000 - Video
3. Template Rencana Pembelajaran - Rp 50.000 - Template
4. Webinar Pendidikan Berkelanjutan - Rp 300.000 - Sertifikat
5. Toolkit Penilaian Pembelajaran - Gratis - Toolkit
```

---

## 🔌 Phase 3: Setup Sanity Client

### 3.1 Update `sanity/lib/client.ts`

Current structure:
```tsx
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

Need to verify env variables in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

- [ ] Check `.env.local` file exists
- [ ] Verify PROJECT_ID
- [ ] Verify DATASET name
- [ ] Test connection

### 3.2 Create Query Functions

File: `sanity/lib/queries.ts` (NEW)

```tsx
import { defineQuery } from 'next-sanity'

// Member Queries
export const ALL_MEMBERS_QUERY = defineQuery(`
  *[_type == "member"] | order(joinDate desc)
`)

export const MEMBER_BY_SLUG = defineQuery(`
  *[_type == "member" && slug.current == $slug][0]
`)

// Article Queries
export const ALL_ARTICLES_QUERY = defineQuery(`
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
    publishedAt,
    featured,
    views
  } | order(publishedAt desc)
`)

export const ARTICLE_BY_SLUG = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    slug,
    excerpt,
    image,
    author-> {
      name,
      image,
      bio,
      expertise
    },
    category-> {
      title,
      color
    },
    content,
    publishedAt,
    updatedAt,
    tags,
    views
  }
`)

// Product Queries
export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] {
    name,
    slug,
    description,
    image,
    price,
    discount,
    stock,
    featured,
    category-> {
      title,
      icon
    }
  }
`)

export const PRODUCT_BY_SLUG = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    name,
    slug,
    description,
    image,
    price,
    discount,
    stock,
    content,
    features,
    specifications,
    category-> {
      title,
      icon
    },
    tags
  }
`)

export const PRODUCTS_BY_CATEGORY = defineQuery(`
  *[_type == "product" && category._ref == $categoryId] {
    name,
    slug,
    price,
    discount,
    stock,
    image,
    featured
  }
`)
```

- [ ] Create `sanity/lib/queries.ts`
- [ ] Add all query functions
- [ ] Test queries in Sanity Vision

---

## 🎨 Phase 4: Update Frontend Pages

### 4.1 Anggota Page (`app/(pages)/anggota/page.tsx`)

**Changes:**
- [ ] Import Sanity client & query
- [ ] Remove mock data
- [ ] Fetch from Sanity
- [ ] Keep same UI/animations
- [ ] Update TypeScript interface to match Sanity schema

```tsx
'use client'

import { sanityClient } from '@/sanity/lib/client'
import { ALL_MEMBERS_QUERY } from '@/sanity/lib/queries'

interface Member {
  _id: string
  name: string
  role: string
  school: string
  image?: any
  expertise?: string[]
  joinDate?: string
}

export default function AnggotaPage() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    async function fetchMembers() {
      const data = await sanityClient.fetch(ALL_MEMBERS_QUERY)
      setMembers(data)
    }
    fetchMembers()
  }, [])

  // ... rest of component (animations stay same)
}
```

### 4.2 Artikel Page (`app/(pages)/artikel/page.tsx`)

**Changes:**
- [ ] Import Sanity client & query
- [ ] Remove mock data
- [ ] Fetch from Sanity
- [ ] Keep same UI/animations
- [ ] Display author & category from references
- [ ] Show views count

```tsx
'use client'

import { sanityClient } from '@/sanity/lib/client'
import { ALL_ARTICLES_QUERY } from '@/sanity/lib/queries'

export default function ArtikelPage() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    async function fetchArticles() {
      const data = await sanityClient.fetch(ALL_ARTICLES_QUERY)
      setArticles(data)
    }
    fetchArticles()
  }, [])

  // ... rest of component (animations stay same)
}
```

### 4.3 Produk Page (`app/(pages)/produk/page.tsx`)

**Changes:**
- [ ] Import Sanity client & query
- [ ] Remove mock data
- [ ] Fetch from Sanity
- [ ] Keep same UI/animations
- [ ] Display price with rupiah formatting
- [ ] Show discount if available
- [ ] Display category with icon

```tsx
'use client'

import { sanityClient } from '@/sanity/lib/client'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'

export default function ProdukPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const data = await sanityClient.fetch(ALL_PRODUCTS_QUERY)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  // ... rest of component (animations stay same)
}
```

---

## 🆕 Phase 5: Create Detail Pages

### 5.1 Article Detail Page

**Create:** `app/(pages)/artikel/[slug]/page.tsx`

```tsx
'use client'

import { sanityClient } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG } from '@/sanity/lib/queries'
import PageTransition from '@/components/PageTransition'
import { PortableText } from 'next-sanity'

export default function ArticleDetailPage({ params }) {
  const [article, setArticle] = useState(null)

  useEffect(() => {
    async function fetchArticle() {
      const data = await sanityClient.fetch(
        ARTICLE_BY_SLUG,
        { slug: params.slug }
      )
      setArticle(data)
    }
    fetchArticle()
  }, [params.slug])

  if (!article) return <div>Loading...</div>

  return (
    <PageTransition>
      <article className="max-w-4xl mx-auto py-12 px-4">
        <h1>{article.title}</h1>
        <img src={article.image.asset.url} alt={article.title} />
        <PortableText value={article.content} />
      </article>
    </PageTransition>
  )
}
```

- [ ] Create file
- [ ] Implement GROQ query
- [ ] Setup PortableText renderer
- [ ] Add animations
- [ ] Test routing

### 5.2 Product Detail Page

**Create:** `app/(pages)/produk/[slug]/page.tsx`

- [ ] Create file
- [ ] Fetch product by slug
- [ ] Display features & specifications
- [ ] Show pricing & stock
- [ ] Add to cart button (optional)

### 5.3 Member Detail Page (Optional)

**Create:** `app/(pages)/anggota/[slug]/page.tsx`

- [ ] Create file
- [ ] Display member profile
- [ ] Show articles by member
- [ ] Display expertise

---

## 🖼️ Phase 6: Image Optimization

### 6.1 Setup Image URL Helper

Create: `sanity/lib/image.ts`

```tsx
import { SanityImageSource } from 'next-sanity'

export function urlForImage(source: SanityImageSource) {
  const BASE_URL = 'https://cdn.sanity.io/images'
  const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET

  return `${BASE_URL}/${PROJECT_ID}/${DATASET}/${source.asset._ref}` +
    '?w=640&h=480&fit=crop'
}
```

- [ ] Create helper
- [ ] Import in components
- [ ] Replace image URLs

### 6.2 Use Next.js Image Component

```tsx
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

<Image
  src={urlForImage(article.image)}
  alt={article.title}
  width={600}
  height={400}
/>
```

- [ ] Update all image components
- [ ] Add loading states
- [ ] Add blur placeholders

---

## 📊 Phase 7: Add Features

### 7.1 Search Functionality
- [ ] Add search input
- [ ] Implement search query
- [ ] Filter results in real-time

### 7.2 Category Filtering
- [ ] Add filter buttons
- [ ] Query by category
- [ ] Show filtered results

### 7.3 Pagination
- [ ] Add pagination logic
- [ ] Limit results per page
- [ ] Navigate between pages

### 7.4 Analytics
- [ ] Increment view counter on detail page
- [ ] Track popular articles/products
- [ ] Add analytics dashboard

---

## 🧪 Phase 8: Testing

### Unit Tests
- [ ] Test data fetching
- [ ] Test filtering/sorting
- [ ] Test image rendering

### Integration Tests
- [ ] Test page loads
- [ ] Test animations
- [ ] Test detail pages

### E2E Tests
- [ ] Test navigation
- [ ] Test data display
- [ ] Test search/filter

---

## 📝 Notes

- **Error Handling**: Add try-catch untuk data fetching
- **Loading States**: Show skeleton atau spinner saat loading
- **Caching**: Gunakan Next.js revalidate untuk caching
- **Image Optimization**: Always optimize images dari Sanity

---

## 🚀 Quick Reference Commands

```bash
# Start Sanity Studio
npm run dev -- --scheme=cosmo

# Test queries di Vision
# Visit: localhost:3000/studio dan buka Vision tab

# Fetch data di frontend
const data = await sanityClient.fetch(query, params)

# Format data
<PortableText value={article.content} />
```

---

**Status**: 🟡 In Progress
**Last Updated**: 22 Oktober 2025
**Next Step**: Add sample data to Sanity Studio
