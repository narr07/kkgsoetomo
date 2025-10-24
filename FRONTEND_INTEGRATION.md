# 🔌 Frontend Integration Guide

## Overview

Panduan lengkap untuk mengintegrasikan Sanity queries ke halaman frontend.

---

## ✅ Halaman yang Sudah Diupdate

### 1. ✅ Anggota Page (`/app/(pages)/anggota/page.tsx`)

**Status**: COMPLETE ✅

**Changes**:
- [x] Import Sanity client & queries
- [x] Remove mock data
- [x] Fetch from Sanity with loading state
- [x] Implement search functionality
- [x] Show image dengan fallback avatar
- [x] Display contact info & expertise
- [x] Statistics display
- [x] Keep all animations

**Features**:
- Search by name, school, or role
- Display member expertise tags
- Contact information (email, phone)
- Loading spinner
- Empty state with custom message
- Statistics bar

**Code Pattern**:
```tsx
'use client';
import { allMembersQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'

const [members, setMembers] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  const data = await client.fetch(allMembersQuery)
  setMembers(data)
}, [])
```

---

## ⏳ Halaman yang Perlu Diupdate

### 2. ⏳ Artikel Page (`/app/(pages)/artikel/page.tsx`)

**Next Step**: Follow this template

**Query to Use**: `allArticlesQuery`

**Steps**:
1. Import queries and client
2. Setup state for articles, loading, search
3. Fetch on component mount
4. Implement filtering logic
5. Display articles with author & category
6. Add loading & empty states

**Template**:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { allArticlesQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  image?: any;
  author?: { name: string };
  category?: { title: string; color: string };
  publishedAt: string;
  views?: number;
}

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await client.fetch(allArticlesQuery);
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const filtered = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      {/* Header */}
      {/* Search Input */}
      {/* Loading State */}
      {/* Articles List */}
      {/* Empty State */}
    </PageTransition>
  );
}
```

**Display Info**:
- Title dengan link ke detail page
- Thumbnail image
- Excerpt (ringkasan)
- Author name & image
- Category dengan color badge
- Publish date
- View count

---

### 3. ⏳ Produk Page (`/app/(pages)/produk/page.tsx`)

**Query to Use**: `allProductsQuery`

**Key Differences from Anggota**:
- Display price & discount
- Show stock availability
- Product category with icon
- More complex card layout

**Template**:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { allProductsQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  image?: any;
  price?: number;
  discount?: number;
  stock?: number;
  category?: { title: string; icon: string };
  featured?: boolean;
}

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products
  }, []);

  const filtered = products.filter((product) => {
    if (selectedCategory && product.category?.title !== selectedCategory) return false;
    return true;
  });

  const sorted = filtered.sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  return (
    <PageTransition>
      {/* Header */}
      {/* Category Filter */}
      {/* Sort Options */}
      {/* Products Grid */}
      {/* Empty State */}
    </PageTransition>
  );
}
```

**Display Info**:
- Product name & image
- Description
- Price (with rupiah format)
- Discount % (if any)
- Stock status (Available/Out of Stock)
- Category with icon badge
- Featured badge (if featured)

---

## 🎨 Common UI Patterns

### Loading Spinner
```tsx
{loading && (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity }}
    className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full"
  />
)}
```

### Empty State
```tsx
{!loading && filtered.length === 0 && (
  <div className="text-center py-12">
    <p className="text-gray-500 dark:text-gray-400 text-lg">
      No results found
    </p>
  </div>
)}
```

### Search Input
```tsx
<motion.input
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  whileFocus={{ scale: 1.02 }}
  className="w-full px-4 py-2 rounded-lg border..."
/>
```

### Price Format
```tsx
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price)
}
```

### Image Handling
```tsx
const getImageUrl = (image: any) => {
  if (!image) return null
  try {
    return urlFor(image).width(400).height(400).url()
  } catch {
    return null
  }
}
```

---

## 🔄 Fetch Pattern (Reusable)

```tsx
'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { someQuery } from '@/sanity/lib/queries';

export default function MyPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await client.fetch(someQuery);
        setData(result || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data');
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (data.length === 0) return <EmptyState />;

  return <div>{/* Render data */}</div>;
}
```

---

## 📝 Step-by-Step Integration

### Step 1: Update Artikel Page

1. Copy template above
2. Replace query with `allArticlesQuery`
3. Update interface to match Article type
4. Add image display logic
5. Add author & category display
6. Keep all Motion animations
7. Test in browser

### Step 2: Update Produk Page

1. Copy template above
2. Replace query with `allProductsQuery`
3. Update interface to match Product type
4. Add price formatting
5. Add stock status display
6. Add category filter & sort options
7. Keep all Motion animations
8. Test in browser

### Step 3: Add Detail Pages (Optional)

Create:
- `/app/(pages)/artikel/[slug]/page.tsx`
- `/app/(pages)/produk/[slug]/page.tsx`

Use queries:
- `articleBySlugQuery`
- `productBySlugQuery`

---

## 🧪 Testing

### Test Each Query

In Sanity Studio → Vision tab:

```groq
*[_type == "member"] {
  _id,
  name,
  slug,
  role,
  school,
  image,
  email,
  phone,
  bio,
  expertise,
  joinDate
}
```

Test all queries before integrating.

### Test Frontend

```bash
npm run dev
```

Visit:
- http://localhost:3000/anggota ✅ (Done)
- http://localhost:3000/artikel (Update this)
- http://localhost:3000/produk (Update this)

Check:
- [ ] Data loads correctly
- [ ] Search works
- [ ] Animations work
- [ ] Images display
- [ ] No console errors
- [ ] Loading state shows
- [ ] Empty state shows when needed

---

## 📊 Database Migration Checklist

Before going live:

- [ ] Add sample members (5+)
- [ ] Add sample articles (4+)
- [ ] Add sample products (5+)
- [ ] Verify all data appears correctly
- [ ] Test search functionality
- [ ] Test filtering
- [ ] Check image display
- [ ] Verify animations work
- [ ] Test on mobile
- [ ] Check dark mode

---

## 🚀 Performance Optimization

### 1. Image Optimization
```tsx
import Image from 'next/image'

<Image
  src={imageUrl}
  alt="desc"
  width={400}
  height={400}
  placeholder="blur"
  blurDataURL="..." // Optional
/>
```

### 2. Lazy Loading
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <LoadingSpinner />
})
```

### 3. Cache Revalidation
```tsx
// In app route with revalidate
export const revalidate = 60 // seconds
```

---

## 🔗 Resources

- QUERIES_GUIDE.md - All available queries
- SANITY_SCHEMA_GUIDE.md - Data structure
- Motion docs - Animation reference

---

**Status**: Anggota Page ✅ Complete, Others ⏳ Todo
**Last Updated**: 22 Oktober 2025

Start with **Step 1: Update Artikel Page** next!
