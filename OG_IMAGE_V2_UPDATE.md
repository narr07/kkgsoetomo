# OG Image Update - Title + Description

## ✅ What's Changed

### 1. API Route Enhanced (`/app/api/og/route.tsx`)
**Status**: ✅ UPDATED

**New Features**:
- Now supports TWO parameters: `title` AND `description`
- Title: max 100 characters (fontSize: 56px, bold)
- Description: max 200 characters (fontSize: 28px, lighter)
- Default title: "KKG dr. Soetomo"
- Default description: "Kelompok Kerja Guru dr. Soetomo"

**New Layout**:
```
┌─────────────────────────────────────┐
│                                     │
│          [KKG Logo]                 │
│          (Smaller: 180x150)         │
│                                     │
│       Dynamic Title Text             │
│       (56px, Bold, White)            │
│                                     │
│    Dynamic Description Text          │
│    (28px, Light Gray, #d0d0d0)       │
│                                     │
└─────────────────────────────────────┘

Background: Blue gradient (#293466) with pattern
```

### 2. Query Parameters

#### Old Format
```
/api/og?title=Your%20Title
```

#### New Format
```
/api/og?title=Your%20Title&description=Your%20Description
```

### 3. All Pages Updated

| Page | Title | Description |
|------|-------|-------------|
| Home | KKG dr. Soetomo | Kelompok Kerja Guru untuk kolaborasi dan inovasi |
| Artikel | Artikel & Blog | Berbagi pengetahuan dan pengalaman pendidikan |
| Anggota | Anggota KKG | Daftar anggota aktif Kelompok Kerja Guru |
| Galeri | Galeri KKG | Dokumentasi kegiatan dan momen berharga |
| Produk | Produk KKG | Produk dan hasil karya inovatif |

### 4. Files Updated

```
✅ /app/api/og/route.tsx (ENHANCED)
✅ /app/page.tsx (Updated with description)
✅ /app/(pages)/artikel/layout.tsx (Updated)
✅ /app/(pages)/anggota/layout.tsx (Updated)
✅ /app/(pages)/galeri/layout.tsx (Updated)
✅ /app/(pages)/produk/layout.tsx (Updated)
```

---

## 🧪 Testing

### Direct API Test
```bash
# With title only
http://localhost:3000/api/og?title=Hello

# With title and description
http://localhost:3000/api/og?title=Hello&description=World

# With encoded special characters
http://localhost:3000/api/og?title=Hello%20%26%20Goodbye&description=This%20is%20amazing%20%21
```

### Visual Verification
1. Open any of these URLs in browser:
   - `http://localhost:3000/api/og?title=KKG%20dr.%20Soetomo&description=Kelompok%20Kerja%20Guru`
2. You should see:
   - KKG Logo at top
   - "KKG dr. Soetomo" as title
   - "Kelompok Kerja Guru" as description

### Social Media Preview
- Test on Facebook Debugger
- Test on LinkedIn Inspector
- Both title and description should appear

---

## 💻 Code Example

### Before (Old)
```tsx
openGraph: {
  images: [
    {
      url: `/api/og?title=${encodeURIComponent('My Title')}`,
      width: 1200,
      height: 630,
    },
  ],
}
```

### After (New)
```tsx
openGraph: {
  images: [
    {
      url: `/api/og?title=${encodeURIComponent('My Title')}&description=${encodeURIComponent('My Description')}`,
      width: 1200,
      height: 630,
    },
  ],
}
```

---

## 🎨 Design Changes

### Layout Changes
- Logo height: 200px → 150px (smaller to fit description)
- Logo margin-bottom: 0px → 20px (add space)
- Title font-size: 60px → 56px (slightly smaller)
- Title margin-bottom: 30px → 20px (adjusted spacing)
- Added description section below title

### Typography
- **Title**: 56px, bold (fontWeight: 700), white
- **Description**: 28px, regular (fontWeight: 400), light gray (#d0d0d0)

### Colors
- Background: Still #293466 (blue)
- Pattern: Still radial gradient
- Text: White for title, light gray for description

---

## 🔄 For Dynamic Pages

### Artikel Detail Example
```tsx
// /app/(pages)/artikel/[slug]/page.tsx

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);

  return {
    title: article.title,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.excerpt)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

---

## 📊 Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Dynamic Title | ✅ | Max 100 chars |
| Dynamic Description | ✅ | Max 200 chars |
| URL Query Params | ✅ | `?title=...&description=...` |
| Default Values | ✅ | Both title and description have defaults |
| All Pages Covered | ✅ | Home, Artikel, Anggota, Galeri, Produk |
| Responsive Layout | ✅ | Logo + Title + Description |
| Font Loading | ✅ | Loads for both title and description |
| Error Handling | ✅ | Same as before |
| TypeScript | ✅ | Fully typed |

---

## 🚀 Deployment

No special deployment steps needed. Just deploy as usual:

```bash
git add .
git commit -m "feat: add description support to OG images"
git push origin main
```

---

## 📝 Next Steps (Optional)

1. **Halaman Dinamis**: Implement for detail pages (artikel, member, gallery, product)
2. **Custom Styling**: Adjust colors/fonts per page type
3. **Image Examples**: Add small thumbnail images to OG
4. **Analytics**: Track OG image shares

---

**Status**: ✅ **COMPLETE & TESTED**
**Version**: 2.0 - With Description Support
**Date**: October 25, 2025
