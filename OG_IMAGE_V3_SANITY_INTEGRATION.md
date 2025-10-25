# OG Image Implementation - Sanity Integration (v3)

## ✅ Major Update - Following Sanity Best Practices

### What Changed

#### 1. **API Route Complete Rewrite** (`/app/api/og/route.tsx`)
**Status**: ✅ UPDATED - Now follows Sanity official best practices

**Key Changes**:
- ✅ Implemented `edge` runtime for better performance
- ✅ Added Sanity data fetching using document ID
- ✅ Extracts dominant colors from images (vibrant palette)
- ✅ Supports both Sanity fetch AND fallback to query params
- ✅ Fetches image metadata and displays it
- ✅ Professional gradient background using image colors
- ✅ Two-column layout: Text on left, Image on right
- ✅ Proper TypeScript interfaces

#### 2. **Added OG Query** (`/sanity/lib/queries.ts`)
**New Query**: `ogImageQuery`
- Fetches document by ID
- Extracts: title, description, image, vibrant colors
- Supports all document types (article, product, gallery, member, etc.)

### Layout Comparison

#### Before
```
┌─────────────────────────────────────────┐
│          [Logo - Center]                │
│          (Logo takes up space)          │
│                                         │
│   Title (56px, Bold, White)             │
│   Description (28px, Light Gray)        │
│                                         │
│   Background: Static Blue #293466       │
└─────────────────────────────────────────┘
```

#### After (Sanity Best Practice)
```
┌──────────────────────────┬───────────────────┐
│  Text on Left            │  Image on Right   │
│  ┌────────────────────┐  │  ┌─────────────┐  │
│  │ Title (56px Bold)  │  │  │             │  │
│  │                    │  │  │   Actual    │  │
│  │ Description        │  │  │   Image     │  │
│  │ (24px Regular)     │  │  │   from      │  │
│  │                    │  │  │   Sanity    │  │
│  └────────────────────┘  │  │             │  │
│                          │  └─────────────┘  │
│ Gradient: Dynamic from   │   500x630px       │
│ Image Palette (vibrant)  │                   │
└──────────────────────────┴───────────────────┘

Width: 1200px
Height: 630px
```

### 🧪 Usage Examples

#### 1. **Fallback Mode** (Query Parameters - Still Works!)
```bash
# Old way - still works!
/api/og?title=Hello&description=World
```

#### 2. **Sanity Mode** (Dynamic from Sanity - Recommended!)
```bash
# New way - fetch data from Sanity
/api/og?id=<sanity-document-id>

# Example:
/api/og?id=grrA8DkaSy9Kd4l9n2k3x5
```

### 📊 How It Works

```
Request to /api/og?id=document-id
    ↓
Fetch document from Sanity using ogImageQuery
    ↓
Extract:
  - title/name
  - description/excerpt
  - image URL
  - vibrant color palette
    ↓
Generate ImageResponse with:
  - Dynamic gradient background (from image colors)
  - Text on left (title + description)
  - Actual image on right (500x630px)
    ↓
Return 1200x630px PNG image
```

### 🎨 Design Features

**Layout**:
- Left side (60%): Text content
- Right side (40%): Featured image
- Full height: 630px
- Both sides perfectly aligned

**Colors**:
- Background gradient uses vibrant colors from the featured image
- Falls back to blue (#3B82F6) and dark gray (#1F2937) if no colors available

**Typography**:
- Title: 56px, bold, white
- Description: 24px, regular, off-white (#f0f0f0)
- Font: Inter (loaded from Google Fonts)

**Image**:
- Only shows if available from Sanity
- 500x630px (perfect fit)
- Object-fit: cover (maintains aspect ratio)
- Falls back to watermark logo if no image

### 🔄 Implementation for Dynamic Pages

#### For Articles
```tsx
// /app/(pages)/artikel/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);

  return {
    title: article.title,
    openGraph: {
      images: [
        {
          url: `/api/og?id=${article._id}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

#### For Products
```tsx
// /app/(pages)/produk/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  return {
    title: product.name,
    openGraph: {
      images: [
        {
          url: `/api/og?id=${product._id}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

#### For Gallery
```tsx
// /app/(pages)/galeri/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const gallery = await getGallery(params.slug);

  return {
    title: gallery.title,
    openGraph: {
      images: [
        {
          url: `/api/og?id=${gallery._id}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

### ✨ Current Implementation Status

```
✅ Static Pages (Fallback Mode):
  - Home: /api/og?title=...&description=...
  - Artikel: /api/og?title=...&description=...
  - Anggota: /api/og?title=...&description=...
  - Galeri: /api/og?title=...&description=...
  - Produk: /api/og?title=...&description=...

🔄 Ready for Dynamic Pages (Sanity Mode):
  - Artikel Detail: /api/og?id=<article-id>
  - Product Detail: /api/og?id=<product-id>
  - Gallery Detail: /api/og?id=<gallery-id>
  - Member Detail: /api/og?id=<member-id>
```

### 🚀 Edge Runtime Benefits

Using `edge` runtime:
- ⚡ Faster execution (closer to user)
- 💰 Lower cost than Node.js runtime
- 🌍 Works globally with Vercel Edge Functions
- 📊 Better performance metrics

### 🧪 Testing

#### Test Direct API
```bash
# Using fallback (query params)
http://localhost:3000/api/og?title=Test&description=Testing

# Using Sanity (get document ID from Sanity Studio)
http://localhost:3000/api/og?id=your-document-id
```

#### Test Social Preview
1. Open: https://www.opengraph.xyz/
2. Enter: `http://localhost:3000/api/og?title=KKG&description=Test`
3. See preview update in real-time

#### Test Facebook Debugger
1. Deploy or use ngrok for local testing
2. https://developers.facebook.com/tools/debug/
3. Enter your URL
4. See OG image preview

### 📚 Files Modified

```
✅ /app/api/og/route.tsx (Complete rewrite)
✅ /sanity/lib/queries.ts (Added ogImageQuery)
```

### 🔄 Next Steps to Complete Integration

1. **Update Dynamic Page Metadata**:
   - Article detail page → use `generateMetadata` with article._id
   - Product detail page → use `generateMetadata` with product._id
   - Gallery detail page → use `generateMetadata` with gallery._id
   - Member detail page → use `generateMetadata` with member._id

2. **Example for Article Detail** (`/app/(pages)/artikel/[slug]/page.tsx`):
```tsx
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      images: [
        {
          url: `/api/og?id=${article._id}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

### 🎓 What You're Learning

✅ Edge Runtime for OG images
✅ Dynamic image generation from Sanity CMS
✅ Color extraction from image metadata
✅ Professional gradient backgrounds
✅ Image-responsive OG design
✅ Fallback systems and error handling

### 📊 Benefits

**Before**: Simple text + hardcoded background
**After**: 
- Dynamic content from Sanity
- Real images in preview
- Colors extracted from images
- Professional two-column layout
- Better social media appearance
- Higher click-through rates

---

**Status**: ✅ **COMPLETE - Sanity Best Practice Implementation**
**Version**: 3.0 - Sanity Integration
**Runtime**: Edge (Fast & Efficient)
**Date**: October 25, 2025
