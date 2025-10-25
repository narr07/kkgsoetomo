import { groq } from 'next-sanity'

/**
 * ================================================
 * SANITY GROQ QUERIES FOR KKG WEBSITE
 * ================================================
 * 
 * Organized query file untuk semua document types
 * Mudah untuk di-maintain dan di-reuse
 */

// ================================================
// SINGLETON QUERIES
// ================================================

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    email,
    phone,
    address
  }
`

export const selayangPandangQuery = groq`
  *[_type == "selayangPandang"][0] {
    title,
    ketua_kkg {
      name,
      message,
      photo
    },
    ketua_gugus {
      name,
      message,
      photo
    }
  }
`

export const aboutUsQuery = groq`
  *[_type == "aboutUs"][0] {
    title,
    subtitle,
    description,
    items
  }
`

// ================================================
// MEMBER (ANGGOTA KKG) QUERIES
// ================================================

const memberFields = groq`
  _id,
  name,
  slug,
  role,
  school,
  image {
    asset -> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    },
    alt,
    crop,
    hotspot
  }
`

export const allMembersQuery = groq`
  *[_type == "member"] | order(name asc) {
    ${memberFields}
  }
`

export const memberBySlugQuery = groq`
  *[_type == "member" && slug.current == $slug][0] {
    ${memberFields}
  }
`

export const membersByRoleQuery = groq`
  *[_type == "member" && role == $role] | order(name asc) {
    ${memberFields}
  }
`

export const membersBySchoolQuery = groq`
  *[_type == "member" && school == $school] | order(name asc) {
    ${memberFields}
  }
`

export const memberCountQuery = groq`
  count(*[_type == "member"])
`

// ================================================
// ARTICLE CATEGORY QUERIES
// ================================================

const articleCategoryFields = groq`
  _id,
  title,
  slug,
  description,
  color
`

export const allArticleCategoriesQuery = groq`
  *[_type == "articleCategory"] | order(title asc) {
    ${articleCategoryFields}
  }
`

export const articleCategoryBySlugQuery = groq`
  *[_type == "articleCategory" && slug.current == $slug][0] {
    ${articleCategoryFields}
  }
`

// ================================================
// ARTICLE QUERIES
// ================================================

const articleFields = groq`
  _id,
  title,
  slug,
  excerpt,
  image,
  author-> {
    _id,
    name,
    slug,
    image,
    role
  },
  category-> {
    _id,
    title,
    slug,
    color
  },
  tags,
  content,
  publishedAt,
  updatedAt,
  featured,
  views
`

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const featuredArticlesQuery = groq`
  *[_type == "article" && featured == true] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFields}
  }
`

export const articlesByCategoryQuery = groq`
  *[_type == "article" && category._ref == $categoryId] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const articlesByCategorySlugQuery = groq`
  *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const articlesByAuthorQuery = groq`
  *[_type == "article" && author._ref == $authorId] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const articlesByAuthorSlugQuery = groq`
  *[_type == "article" && author->slug.current == $slug] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const articlesByTagQuery = groq`
  *[_type == "article" && $tag in tags[]] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const recentArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[0..5] {
    ${articleFields}
  }
`

export const articleCountQuery = groq`
  count(*[_type == "article"])
`

export const articleViewsQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    views
  }
`

// ================================================
// PRODUCT CATEGORY QUERIES
// ================================================

const productCategoryFields = groq`
  _id,
  title,
  slug,
  description,
  icon
`

export const allProductCategoriesQuery = groq`
  *[_type == "productCategory"] | order(title asc) {
    ${productCategoryFields}
  }
`

export const productCategoryBySlugQuery = groq`
  *[_type == "productCategory" && slug.current == $slug][0] {
    ${productCategoryFields}
  }
`

// ================================================
// GALLERY QUERIES
// ================================================

const galleryFields = groq`
  _id,
  title,
  slug,
  description,
  date,
  thumbnail,
  images
`

export const allGalleriesQuery = groq`
  *[_type == "gallery"] | order(date desc) {
    ${galleryFields}
  }
`

export const galleryBySlugQuery = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    ${galleryFields}
  }
`

export const recentGalleriesQuery = groq`
  *[_type == "gallery"] | order(date desc)[0..5] {
    ${galleryFields}
  }
`

export const galleryCountQuery = groq`
  count(*[_type == "gallery"])
`

// ================================================
// PRODUCT CATEGORY QUERIES
// ================================================

// ================================================
// PRODUCT QUERIES
// ================================================

const productFields = groq`
  _id,
  name,
  slug,
  description,
  image,
  price,
  discount,
  stock,
  features,
  specifications,
  content,
  category-> {
    _id,
    title,
    slug,
    icon
  },
  tags,
  publishedAt,
  featured,
  sales
`

export const allProductsQuery = groq`
  *[_type == "product"] | order(publishedAt desc) {
    ${productFields}
  }
`

export const availableProductsQuery = groq`
  *[_type == "product" && stock > 0] | order(publishedAt desc) {
    ${productFields}
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(publishedAt desc) {
    ${productFields}
  }
`

export const bestsellingProductsQuery = groq`
  *[_type == "product"] | order(sales desc)[0..9] {
    ${productFields}
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`

export const productsByCategoryQuery = groq`
  *[_type == "product" && category._ref == $categoryId] | order(publishedAt desc) {
    ${productFields}
  }
`

export const productsByCategorySlugQuery = groq`
  *[_type == "product" && category->slug.current == $slug] | order(publishedAt desc) {
    ${productFields}
  }
`

export const productsByTagQuery = groq`
  *[_type == "product" && $tag in tags[]] | order(publishedAt desc) {
    ${productFields}
  }
`

export const discountedProductsQuery = groq`
  *[_type == "product" && discount > 0] | order(discount desc) {
    ${productFields}
  }
`

export const productCountQuery = groq`
  count(*[_type == "product"])
`

export const productStockQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    stock,
    name
  }
`

// ================================================

export const searchMembersQuery = groq`
  *[_type == "member" && (name match $query || school match $query)] | order(name asc) {
    ${memberFields}
  }
`

export const searchArticlesQuery = groq`
  *[_type == "article" && (title match $query || excerpt match $query || tags[] match $query)] | order(publishedAt desc) {
    ${articleFields}
  }
`

export const searchProductsQuery = groq`
  *[_type == "product" && (name match $query || description match $query || tags[] match $query)] | order(publishedAt desc) {
    ${productFields}
  }
`

// ================================================
// STATISTICS & ANALYTICS QUERIES
// ================================================

export const totalMembersQuery = groq`
  { count: count(*[_type == "member"]) }
`

export const totalArticlesQuery = groq`
  { count: count(*[_type == "article"]) }
`

export const totalProductsQuery = groq`
  { count: count(*[_type == "product"]) }
`

export const topViewedArticlesQuery = groq`
  *[_type == "article"] | order(views desc)[0..4] {
    title,
    slug,
    views,
    publishedAt
  }
`

export const topSoldProductsQuery = groq`
  *[_type == "product"] | order(sales desc)[0..4] {
    name,
    slug,
    sales,
    price
  }
`

export const statsQuery = groq`
  {
    members: count(*[_type == "member"]),
    articles: count(*[_type == "article"]),
    products: count(*[_type == "product"]),
    featuredArticles: count(*[_type == "article" && featured == true]),
    featuredProducts: count(*[_type == "product" && featured == true]),
    discountedProducts: count(*[_type == "product" && discount > 0]),
    outOfStockProducts: count(*[_type == "product" && stock == 0])
  }
`

// ================================================
// PAGINATION HELPERS (with limit & offset)
// ================================================

export const articlesPaginatedQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[$offset...$offset + $limit] {
    ${articleFields}
  }
`

export const productsPaginatedQuery = groq`
  *[_type == "product"] | order(publishedAt desc)[$offset...$offset + $limit] {
    ${productFields}
  }
`

export const membersPaginatedQuery = groq`
  *[_type == "member"] | order(name asc)[$offset...$offset + $limit] {
    ${memberFields}
  }
`

// ================================================
// RELATED CONTENT QUERIES
// ================================================

export const relatedArticlesQuery = groq`
  *[_type == "article" && category._ref == $categoryId && _id != $articleId] | order(publishedAt desc)[0..3] {
    ${articleFields}
  }
`

export const relatedProductsQuery = groq`
  *[_type == "product" && category._ref == $categoryId && slug.current != $slug] | order(publishedAt desc)[0..3] {
    ${productFields}
  }
`

// ================================================
// COMBINED / COMPLEX QUERIES
// ================================================

export const homepageDataQuery = groq`
  {
    featuredArticles: *[_type == "article" && featured == true] | order(publishedAt desc)[0..2] {
      _id,
      title,
      slug,
      excerpt,
      image,
      author-> {
        _id,
        name,
        slug,
        image,
        role
      },
      category-> {
        _id,
        title,
        slug,
        color
      },
      tags,
      content,
      publishedAt,
      updatedAt,
      featured,
      views
    },
    recentArticles: *[_type == "article"] | order(publishedAt desc)[0..5] {
      _id,
      title,
      slug,
      excerpt,
      image,
      author-> {
        _id,
        name,
        slug,
        image,
        role
      },
      category-> {
        _id,
        title,
        slug,
        color
      },
      tags,
      content,
      publishedAt,
      updatedAt,
      featured,
      views
    },
    featuredProducts: *[_type == "product" && featured == true] | order(publishedAt desc)[0..3] {
      _id,
      name,
      slug,
      description,
      image,
      price,
      discount,
      stock,
      features,
      specifications,
      content,
      category-> {
        _id,
        title,
        slug,
        icon
      },
      tags,
      publishedAt,
      featured,
      sales
    },
    bestsellingProducts: *[_type == "product"] | order(sales desc)[0..3] {
      _id,
      name,
      slug,
      description,
      image,
      price,
      discount,
      stock,
      features,
      specifications,
      content,
      category-> {
        _id,
        title,
        slug,
        icon
      },
      tags,
      publishedAt,
      featured,
      sales
    },
    topMembers: *[_type == "member" && role in ["Kepala KKG", "Wakil Kepala"]] | order(name asc) {
      _id,
      name,
      slug,
      role,
      school,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip,
            dimensions
          }
        },
        alt,
        crop,
        hotspot
      }
    }
  }
`

// ================================================
// OG IMAGE QUERIES (untuk dynamic social preview)
// ================================================

export const ogImageQuery = groq`
  *[_id == $id][0] {
    _id,
    _type,
    title,
    name,
    "image": mainImage.asset-> {
      url,
      metadata {
        palette {
          vibrant {
            background
          }
          darkVibrant {
            background
          }
        }
      }
    } | select(_type == "article" || _type == "product"),
    excerpt,
    description,
    "imageUrl": image.asset->url | select(_type == "gallery"),
    publishedAt,
    date
  }
`

export const membersWithArticlesQuery = groq`
  *[_type == "member"] | order(name asc) {
    ${memberFields},
    "articlesCount": count(*[_type == "article" && author._ref == ^._id]),
    "articles": *[_type == "article" && author._ref == ^._id] | order(publishedAt desc)[0..2] {
      title,
      slug,
      publishedAt
    }
  }
`
