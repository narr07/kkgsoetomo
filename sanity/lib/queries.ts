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

export const heroQuery = groq`
  *[_type == "hero"][0] {
    title,
    subtitle,
    showCTA,
    ctaText,
    ctaLink
  }
`

export const schoolListQuery = groq`
  *[_type == "schoolList"][0] {
    title,
    description,
    schools[] | order(order asc) {
      name,
      link,
      logo {
        asset -> {
          _id,
          url
        },
        alt
      },
      logos[] {
        asset -> {
          _id,
          url
        },
        alt
      }
    }
  }
`

export const selayangPandangQuery = groq`
  *[_type == "selayangPandang"][0] {
    title,
    ketua_kkg {
      name,
      message,
      photo {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      }
    },
    ketua_gugus {
      name,
      message,
      photo {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      }
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

export const allMembersQuery = groq`
  *[_type == "member"] | order(name asc) {
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
`

export const memberBySlugQuery = groq`
  *[_type == "member" && slug.current == $slug][0] {
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
`

export const membersByRoleQuery = groq`
  *[_type == "member" && role == $role] | order(name asc) {
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
`

export const membersBySchoolQuery = groq`
  *[_type == "member" && school == $school] | order(name asc) {
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
`

export const memberCountQuery = groq`
  count(*[_type == "member"])
`

// ================================================
// ARTICLE CATEGORY QUERIES
// ================================================

export const allArticleCategoriesQuery = groq`
  *[_type == "articleCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

export const articleCategoryBySlugQuery = groq`
  *[_type == "articleCategory" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color
  }
`

// ================================================
// ARTICLE QUERIES
// ================================================

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const featuredArticlesQuery = groq`
  *[_type == "article" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const articlesByCategoryQuery = groq`
  *[_type == "article" && category._ref == $categoryId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const articlesByCategorySlugQuery = groq`
  *[_type == "article" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const articlesByAuthorQuery = groq`
  *[_type == "article" && author._ref == $authorId] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const articlesByAuthorSlugQuery = groq`
  *[_type == "article" && author->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const articlesByTagQuery = groq`
  *[_type == "article" && $tag in tags[]] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const recentArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[0..5] {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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

export const allProductCategoriesQuery = groq`
  *[_type == "productCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    icon
  }
`

export const productCategoryBySlugQuery = groq`
  *[_type == "productCategory" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    icon
  }
`

// ================================================
// GALLERY QUERIES
// ================================================

export const allGalleriesQuery = groq`
  *[_type == "gallery"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    thumbnail {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    images[] {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot,
      caption
    }
  }
`

export const galleryBySlugQuery = groq`
  *[_type == "gallery" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    date,
    thumbnail {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    images[] {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot,
      caption
    }
  }
`

export const recentGalleriesQuery = groq`
  *[_type == "gallery"] | order(date desc)[0..5] {
    _id,
    title,
    slug,
    description,
    date,
    thumbnail {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    images[] {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot,
      caption
    }
  }
`

export const galleryCountQuery = groq`
  count(*[_type == "gallery"])
`

// ================================================
// PRODUCT QUERIES
// ================================================

export const allProductsQuery = groq`
  *[_type == "product"] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const availableProductsQuery = groq`
  *[_type == "product" && stock > 0] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const bestsellingProductsQuery = groq`
  *[_type == "product"] | order(sales desc)[0..9] {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const productsByCategoryQuery = groq`
  *[_type == "product" && category._ref == $categoryId] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const productsByCategorySlugQuery = groq`
  *[_type == "product" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const productsByTagQuery = groq`
  *[_type == "product" && $tag in tags[]] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const discountedProductsQuery = groq`
  *[_type == "product" && discount > 0] | order(discount desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
`

export const searchArticlesQuery = groq`
  *[_type == "article" && (title match $query || excerpt match $query || tags[] match $query)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const searchProductsQuery = groq`
  *[_type == "product" && (name match $query || description match $query || tags[] match $query)] | order(publishedAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

// ================================================
// STATISTICS & ANALYTICS QUERIES
// ================================================

export const totalMembersQuery = groq`
  count(*[_type == "member"])
`

export const totalArticlesQuery = groq`
  count(*[_type == "article"])
`

export const totalProductsQuery = groq`
  count(*[_type == "product"])
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
    featuredArticles: count(*[_type == "article" && featured]),
    featuredProducts: count(*[_type == "product" && featured]),
    discountedProducts: count(*[_type == "product" && discount > 0]),
    outOfStockProducts: count(*[_type == "product" && stock == 0])
  }
`

// ================================================
// PAGINATION HELPERS (with limit & offset)
// ================================================

export const articlesPaginatedQuery = groq`
  *[_type == "article"] | order(publishedAt desc)[0..19] {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const productsPaginatedQuery = groq`
  *[_type == "product"] | order(publishedAt desc)[0..19] {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

export const membersPaginatedQuery = groq`
  *[_type == "member"] | order(name asc)[0..19] {
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
`

// ================================================
// RELATED CONTENT QUERIES
// ================================================

export const relatedArticlesQuery = groq`
  *[_type == "article" && category._ref == $categoryId && _id != $articleId] | order(publishedAt desc)[0..3] {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
    author-> {
      _id,
      name,
      slug,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
  }
`

export const relatedProductsQuery = groq`
  *[_type == "product" && category._ref == $categoryId && slug.current != $slug] | order(publishedAt desc)[0..3] {
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt,
      crop,
      hotspot
    },
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
  }
`

// ================================================
// COMBINED / COMPLEX QUERIES
// ================================================

export const homepageDataQuery = groq`
  {
    featuredArticles: *[_type == "article" && featured] | order(publishedAt desc)[0..2] {
      _id,
      title,
      slug,
      excerpt,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
      author-> {
        _id,
        name,
        slug,
        image {
          asset -> {
            _id,
            url,
            metadata {
              lqip
            }
          },
          alt,
          crop,
          hotspot
        },
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
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
      author-> {
        _id,
        name,
        slug,
        image {
          asset -> {
            _id,
            url,
            metadata {
              lqip
            }
          },
          alt,
          crop,
          hotspot
        },
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
    featuredProducts: *[_type == "product" && featured] | order(publishedAt desc)[0..3] {
      _id,
      name,
      slug,
      description,
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
      image {
        asset -> {
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt,
        crop,
        hotspot
      },
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
    excerpt,
    description,
    "image": select(
      _type == "article" => mainImage.asset-> {
        url,
        metadata {
          palette {
            vibrant {
              background
            },
            darkVibrant {
              background
            }
          }
        }
      },
      _type == "product" => mainImage.asset-> {
        url,
        metadata {
          palette {
            vibrant {
              background
            },
            darkVibrant {
              background
            }
          }
        }
      },
      _type == "gallery" => thumbnail.asset-> {
        url,
        metadata {
          palette {
            vibrant {
              background
            },
            darkVibrant {
              background
            }
          }
        }
      }
    ),
    publishedAt
  }
`

export const membersWithArticlesQuery = groq`
  *[_type == "member"] | order(name asc) {
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
    },
    "articlesCount": count(*[_type == "article" && author._ref == ^._id]),
    "articles": *[_type == "article" && author._ref == ^._id] | order(publishedAt desc)[0..2] {
      title,
      slug,
      publishedAt
    }
  }
`
