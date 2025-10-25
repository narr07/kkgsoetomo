# OG Image - Sanity Integration Quick Start

## 🚀 Two Modes of Operation

### Mode 1: Fallback (Still Works)
```bash
/api/og?title=Hello&description=World
```
✅ Static pages use this
✅ Simple, no Sanity needed
✅ Good for collection pages

### Mode 2: Sanity (Recommended for Dynamic Content)
```bash
/api/og?id=<sanity-document-id>
```
✅ Fetch title from Sanity
✅ Fetch description from Sanity
✅ Fetch image from Sanity
✅ Extract colors from image
✅ Professional gradient background
✅ Display actual featured image

---

## 📋 How to Get Document ID

### From Sanity Studio
1. Open your content in Sanity Studio
2. Look at the URL bar: `https://sanity.io/studio/.../?path=...&id=grrA8DkaSy9Kd4...`
3. The `id` parameter is your document ID
4. Example: `grrA8DkaSy9Kd4l9n2k3x5`

### From GROQ Query
```typescript
// Query all articles with their IDs
*[_type == "article"] {
  _id,  // ← This is the document ID
  title,
  slug
}
```

---

## 💻 Implementation Examples

### Static Page (Already Done)
```tsx
// /app/page.tsx
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('KKG dr. Soetomo')}&description=${encodeURIComponent('Kelompok Kerja Guru')}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### Dynamic Article Page (To Do)
```tsx
// /app/(pages)/artikel/[slug]/page.tsx

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
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    openGraph: {
      images: [
        {
          url: `/api/og?id=${article._id}`,  // ← Use Sanity document ID!
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}
```

---

## 🧪 Test Examples

### Test 1: Fallback Mode
```bash
http://localhost:3000/api/og?title=Hello%20World&description=This%20is%20a%20test
```

### Test 2: With Sanity (Replace with real ID)
```bash
http://localhost:3000/api/og?id=grrA8DkaSy9Kd4l9n2k3x5
```

### Test 3: Invalid ID
```bash
http://localhost:3000/api/og?id=invalid-id
# Returns: 404 Not Found
```

---

## 🎨 What You Get

### Without Image (Fallback)
```
┌──────────────────────────────┐
│  Title                       │
│  Description                 │
│                              │
│  Blue gradient background    │
│  (Fallback colors)           │
└──────────────────────────────┘
```

### With Image (From Sanity)
```
┌──────────────────────┬──────────────┐
│ Title                │              │
│ Description          │   Real       │
│                      │   Image      │
│ Background gradient  │   from       │
│ extracted from image │   Sanity     │
└──────────────────────┴──────────────┘
```

---

## 📝 Implementation Checklist

### For Each Dynamic Route

- [ ] Import `Metadata` and `generateMetadata`
- [ ] Fetch content using Sanity query
- [ ] Extract `_id` from fetched content
- [ ] Set `openGraph.images.url` to `/api/og?id=${content._id}`
- [ ] Test in browser
- [ ] Test in Facebook Debugger

### Routes to Update

- [ ] `/app/(pages)/artikel/[slug]/page.tsx`
- [ ] `/app/(pages)/produk/[slug]/page.tsx`
- [ ] `/app/(pages)/galeri/[slug]/page.tsx`
- [ ] `/app/(pages)/anggota/[slug]/page.tsx` (if exists)

---

## 🔍 Supported Document Fields

The OG image extracts:

| Field | Source | Usage |
|-------|--------|-------|
| `title` | `title` or `name` | Main heading |
| `description` | `excerpt` or `description` | Subtitle |
| `image` | `mainImage` (articles/products) | Featured image |
| `colors` | `image.metadata.palette` | Gradient background |

---

## ⚡ Performance

| Mode | Speed | Notes |
|------|-------|-------|
| Fallback | ~200ms | First time, cached after |
| Sanity | ~300-500ms | First time (Sanity fetch) |
| Cached | ~50ms | Subsequent requests |

All requests are cached by Next.js!

---

## 🆘 Troubleshooting

### OG image shows default (no Sanity data)
- Check document ID is correct
- Verify document exists in Sanity
- Check internet connection

### Image doesn't appear
- Verify document has `mainImage` field
- Check image is published in Sanity
- Try fallback mode to verify setup

### Colors look wrong
- Image must have metadata
- Republish image in Sanity
- Wait for cache to clear

### 404 Not Found
- Document ID is wrong or doesn't exist
- Check Sanity for document ID
- Verify document is published

---

## 🚀 Next Steps

### Priority 1: Articles
```tsx
// /app/(pages)/artikel/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  return {
    openGraph: {
      images: [{ url: `/api/og?id=${article._id}` }]
    }
  };
}
```

### Priority 2: Products
```tsx
// /app/(pages)/produk/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  return {
    openGraph: {
      images: [{ url: `/api/og?id=${product._id}` }]
    }
  };
}
```

### Priority 3: Gallery
```tsx
// /app/(pages)/galeri/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const gallery = await getGallery(params.slug);
  return {
    openGraph: {
      images: [{ url: `/api/og?id=${gallery._id}` }]
    }
  };
}
```

---

## 📚 Documentation Files

- `/OG_IMAGE_V3_SANITY_INTEGRATION.md` - Full details
- `/OG_IMAGE_QUICK_REFERENCE.md` - Quick ref
- `/sanity/lib/queries.ts` - `ogImageQuery` definition

---

**Version**: 3.0 - Sanity Integration
**Status**: ✅ Ready for use
**Last Updated**: October 25, 2025
