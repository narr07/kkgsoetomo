# 📘 Sanity GROQ Queries Guide

## Overview

File `sanity/lib/queries.ts` berisi semua GROQ queries yang diperlukan untuk aplikasi KKG Website. Queries sudah terorganisir berdasarkan document type dengan field fragments yang reusable.

---

## 📚 Table of Contents

1. [Member Queries](#member-queries)
2. [Article Category Queries](#article-category-queries)
3. [Article Queries](#article-queries)
4. [Product Category Queries](#product-category-queries)
5. [Product Queries](#product-queries)
6. [Search Queries](#search-queries)
7. [Statistics Queries](#statistics-queries)
8. [Pagination Queries](#pagination-queries)
9. [Related Content Queries](#related-content-queries)
10. [Combined Queries](#combined-queries)

---

## 🧑‍💼 Member Queries

### Get All Members
```tsx
import { allMembersQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'

const members = await client.fetch(allMembersQuery)
```

**Returns:**
```json
[
  {
    "_id": "...",
    "name": "Budi Santoso",
    "slug": { "current": "budi-santoso" },
    "role": "Kepala KKG",
    "school": "SD Negeri 1",
    "image": { ... },
    "email": "budi@example.com",
    "phone": "+628...",
    "bio": "...",
    "expertise": ["..."],
    "joinDate": "2020-01-15T00:00:00Z"
  }
]
```

### Get Member by Slug
```tsx
const member = await client.fetch(memberBySlugQuery, { 
  slug: 'budi-santoso' 
})
```

### Get Members by Role
```tsx
const membersByRole = await client.fetch(membersByRoleQuery, { 
  role: 'Kepala KKG' 
})
```

### Get Members by School
```tsx
const membersBySchool = await client.fetch(membersBySchoolQuery, { 
  school: 'SD Negeri 1' 
})
```

### Count All Members
```tsx
const count = await client.fetch(memberCountQuery)
// Returns: number
```

---

## 🏷️ Article Category Queries

### Get All Article Categories
```tsx
import { allArticleCategoriesQuery } from '@/sanity/lib/queries'

const categories = await client.fetch(allArticleCategoriesQuery)
```

### Get Article Category by Slug
```tsx
const category = await client.fetch(articleCategoryBySlugQuery, { 
  slug: 'pendidikan-digital' 
})
```

---

## 📝 Article Queries

### Get All Articles
```tsx
import { allArticlesQuery } from '@/sanity/lib/queries'

const articles = await client.fetch(allArticlesQuery)
```

**Returns articles with author and category information.**

### Get Featured Articles
```tsx
const featured = await client.fetch(featuredArticlesQuery)
```

### Get Article by Slug
```tsx
const article = await client.fetch(articleBySlugQuery, { 
  slug: 'strategi-pembelajaran-efektif' 
})
```

### Get Articles by Category ID
```tsx
const articlesInCategory = await client.fetch(articlesByCategoryQuery, { 
  categoryId: 'category-id' 
})
```

### Get Articles by Category Slug
```tsx
const articlesInCategory = await client.fetch(articlesByCategorySlugQuery, { 
  slug: 'pendidikan-digital' 
})
```

### Get Articles by Author
```tsx
const articlesByAuthor = await client.fetch(articlesByAuthorSlugQuery, { 
  slug: 'budi-santoso' 
})
```

### Get Articles by Tag
```tsx
const articlesByTag = await client.fetch(articlesByTagQuery, { 
  tag: 'inovasi' 
})
```

### Get Recent Articles (Last 5)
```tsx
const recent = await client.fetch(recentArticlesQuery)
```

### Get Article Views
```tsx
const { views } = await client.fetch(articleViewsQuery, { 
  slug: 'strategi-pembelajaran-efektif' 
})
```

### Count All Articles
```tsx
const count = await client.fetch(articleCountQuery)
```

---

## 🏷️ Product Category Queries

### Get All Product Categories
```tsx
import { allProductCategoriesQuery } from '@/sanity/lib/queries'

const categories = await client.fetch(allProductCategoriesQuery)
```

### Get Product Category by Slug
```tsx
const category = await client.fetch(productCategoryBySlugQuery, { 
  slug: 'buku' 
})
```

---

## 🛍️ Product Queries

### Get All Products
```tsx
import { allProductsQuery } from '@/sanity/lib/queries'

const products = await client.fetch(allProductsQuery)
```

### Get Available Products (Stock > 0)
```tsx
const available = await client.fetch(availableProductsQuery)
```

### Get Featured Products
```tsx
const featured = await client.fetch(featuredProductsQuery)
```

### Get Bestselling Products
```tsx
const bestsellers = await client.fetch(bestsellingProductsQuery)
```

### Get Product by Slug
```tsx
const product = await client.fetch(productBySlugQuery, { 
  slug: 'buku-panduan-mengajar' 
})
```

### Get Products by Category
```tsx
const productsByCategory = await client.fetch(productsByCategorySlugQuery, { 
  slug: 'buku' 
})
```

### Get Products by Tag
```tsx
const productsByTag = await client.fetch(productsByTagQuery, { 
  tag: 'panduan' 
})
```

### Get Discounted Products
```tsx
const discounted = await client.fetch(discountedProductsQuery)
```

### Get Product Stock
```tsx
const { stock, name } = await client.fetch(productStockQuery, { 
  slug: 'buku-panduan-mengajar' 
})
```

### Count All Products
```tsx
const count = await client.fetch(productCountQuery)
```

---

## 🔍 Search Queries

### Search Members
```tsx
import { searchMembersQuery } from '@/sanity/lib/queries'

const results = await client.fetch(searchMembersQuery, { 
  query: 'budi*' 
})
```

### Search Articles
```tsx
const results = await client.fetch(searchArticlesQuery, { 
  query: 'pembelajaran*' 
})
```

### Search Products
```tsx
const results = await client.fetch(searchProductsQuery, { 
  query: 'buku*' 
})
```

**Note:** GROQ match uses simple wildcard matching. For more advanced search, consider Algolia or Meilisearch integration.

---

## 📊 Statistics Queries

### Get All Statistics
```tsx
import { statsQuery } from '@/sanity/lib/queries'

const stats = await client.fetch(statsQuery)
// Returns:
// {
//   members: number,
//   articles: number,
//   products: number,
//   featuredArticles: number,
//   featuredProducts: number,
//   discountedProducts: number,
//   outOfStockProducts: number
// }
```

### Get Top Viewed Articles
```tsx
const topArticles = await client.fetch(topViewedArticlesQuery)
```

### Get Top Sold Products
```tsx
const topProducts = await client.fetch(topSoldProductsQuery)
```

---

## 📖 Pagination Queries

### Paginate Articles
```tsx
import { articlesPaginatedQuery } from '@/sanity/lib/queries'

const page1 = await client.fetch(articlesPaginatedQuery, { 
  offset: 0, 
  limit: 10 
})

const page2 = await client.fetch(articlesPaginatedQuery, { 
  offset: 10, 
  limit: 10 
})
```

### Paginate Products
```tsx
const products = await client.fetch(productsPaginatedQuery, { 
  offset: 0, 
  limit: 12 
})
```

### Paginate Members
```tsx
const members = await client.fetch(membersPaginatedQuery, { 
  offset: 0, 
  limit: 20 
})
```

---

## 🔗 Related Content Queries

### Get Related Articles
```tsx
import { relatedArticlesQuery } from '@/sanity/lib/queries'

const related = await client.fetch(relatedArticlesQuery, { 
  categoryId: 'category-id',
  slug: 'current-article-slug'
})
```

### Get Related Products
```tsx
const related = await client.fetch(relatedProductsQuery, { 
  categoryId: 'category-id',
  slug: 'current-product-slug'
})
```

---

## 🎯 Combined Queries

### Homepage Data (Single Query)
```tsx
import { homepageDataQuery } from '@/sanity/lib/queries'

const data = await client.fetch(homepageDataQuery)
// Returns:
// {
//   featuredArticles: Article[],
//   recentArticles: Article[],
//   featuredProducts: Product[],
//   bestsellingProducts: Product[],
//   topMembers: Member[]
// }
```

**Efficient for loading homepage - single request instead of multiple!**

### Members with Articles Count
```tsx
const membersWithStats = await client.fetch(membersWithArticlesQuery)
// Returns members with articlesCount and recent articles
```

---

## 💡 Best Practices

### 1. Use Field Fragments
Queries use reusable field fragments to avoid duplication:

```tsx
const memberFields = groq`
  _id,
  name,
  slug,
  role,
  ...
`

export const allMembersQuery = groq`
  *[_type == "member"] {
    ${memberFields}
  }
`
```

### 2. Pass Variables Safely
Always use variables with `$` prefix:

```tsx
// ✅ GOOD
client.fetch(articleBySlugQuery, { slug: userInput })

// ❌ BAD
client.fetch(`*[_type == "article" && slug.current == "${userInput}"]`)
```

### 3. Order Results Consistently
```tsx
// Most recent first
*[_type == "article"] | order(publishedAt desc)

// Alphabetical
*[_type == "member"] | order(name asc)
```

### 4. Optimize with Projections
Only select fields you need:

```tsx
// Get only titles for list
*[_type == "article"] {
  title,
  slug,
  publishedAt
}
```

### 5. Cache Appropriately
```tsx
// Use revalidate for ISR
const articles = await client.fetch(allArticlesQuery)
revalidate = 60 // revalidate every 60 seconds
```

---

## 🔄 Common Use Cases

### Display Article List with Filter
```tsx
import { articlesByCategorySlugQuery } from '@/sanity/lib/queries'

export default async function ArticleList({ category }) {
  const articles = await client.fetch(articlesByCategorySlugQuery, { 
    slug: category 
  })
  
  return (
    <div>
      {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  )
}
```

### Display Product with Stock Check
```tsx
import { productBySlugQuery } from '@/sanity/lib/queries'

export default async function ProductPage({ slug }) {
  const product = await client.fetch(productBySlugQuery, { slug })
  
  const inStock = product.stock > 0
  const finalPrice = product.price - (product.discount || 0)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Stock: {product.stock}</p>
      <p>Price: Rp {finalPrice.toLocaleString()}</p>
      {inStock && <button>Beli Sekarang</button>}
    </div>
  )
}
```

### Display Homepage with Multiple Sections
```tsx
import { homepageDataQuery } from '@/sanity/lib/queries'

export default async function HomePage() {
  const data = await client.fetch(homepageDataQuery)
  
  return (
    <>
      <HeroSection />
      <FeaturedArticles articles={data.featuredArticles} />
      <FeaturedProducts products={data.featuredProducts} />
      <TopMembers members={data.topMembers} />
    </>
  )
}
```

---

## 🛠️ Adding New Queries

### Template untuk Query Baru:

```tsx
// 1. Define field fragment
const newDocumentFields = groq`
  _id,
  field1,
  field2,
  relatedDoc-> {
    _id,
    field
  }
`

// 2. Create query
export const newDocumentQuery = groq`
  *[_type == "newDocument"] {
    ${newDocumentFields}
  }
`

// 3. Test in Vision tab
// 4. Document in this guide
```

---

## 📋 Query Checklist

When creating new queries:

- [ ] Use field fragments for consistency
- [ ] Add variables with `$` prefix for dynamic values
- [ ] Include references (author, category, etc)
- [ ] Add ordering (order by most relevant field)
- [ ] Add pagination if needed
- [ ] Document with comments
- [ ] Test in Vision tab
- [ ] Add to this guide

---

## 🔗 Resources

- [GROQ Documentation](https://www.sanity.io/docs/groq)
- [Sanity Vision](https://www.sanity.io/docs/vision) - Test queries in Sanity Studio
- [Query Cheat Sheet](https://www.sanity.io/docs/groq-cheat-sheet)

---

## 🚀 Performance Tips

1. **Use Projections**: Don't fetch fields you don't need
2. **Limit Arrays**: Use `[0..5]` to limit results
3. **Use Offsets for Pagination**: `[$offset...$offset + $limit]`
4. **Cache Results**: Use ISR or revalidation
5. **Monitor Query Performance**: Use Sanity analytics

---

**Status**: ✅ Ready to Use
**Last Updated**: 22 Oktober 2025
**File**: sanity/lib/queries.ts
