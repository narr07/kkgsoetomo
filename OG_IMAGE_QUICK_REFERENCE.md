# OG Image - Quick Reference

## 🚀 Quick Start

### Test OG Image
```bash
http://localhost:3000/api/og?title=Your%20Title
```

### Deploy Metadata
All pages automatically have OG images through:
- `/app/page.tsx` (Homepage)
- `/app/(pages)/artikel/layout.tsx` (Artikel)
- `/app/(pages)/anggota/layout.tsx` (Anggota)
- `/app/(pages)/galeri/layout.tsx` (Galeri)

---

## 📋 API Reference

### Endpoint
```
GET /api/og
```

### Query Parameters
| Parameter | Type | Required | Default | Max Length |
|-----------|------|----------|---------|-----------|
| title | string | No | "My default title" | 100 chars |

### Response
- **Status**: 200 (success), 500 (error)
- **Content-Type**: image/png
- **Size**: 1200x630px
- **Format**: PNG

### Examples
```bash
# Basic
/api/og

# With title
/api/og?title=Hello%20World

# Special characters
/api/og?title=Hello%20%26%20Goodbye

# Long title (auto-truncated)
/api/og?title=This%20is%20a%20very%20long%20title%20that%20will%20be%20automatically%20truncated%20to%20100%20characters
```

---

## 📝 Metadata Structure

### In Metadata Object
```tsx
openGraph: {
  images: [
    {
      url: `/api/og?title=${encodeURIComponent('Your Title')}`,
      width: 1200,
      height: 630,
      alt: 'Your Alt Text',
    },
  ],
}
```

### In HTML
```html
<meta property="og:image" content="http://domain.com/api/og?title=Your%20Title" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="twitter:image" content="http://domain.com/api/og?title=Your%20Title" />
```

---

## 🎨 Design Details

### Current Template
- **Background**: Black (#000000)
- **Logo**: KKG Logo (SVG, 200x200px)
- **Title**: Dynamic text, 60px, white, center-aligned
- **Font**: Inter (Google Fonts)
- **Layout**: Logo on top, title below
- **Padding**: 60px margins

### Size
- **Width**: 1200px
- **Height**: 630px
- **Aspect Ratio**: 1.9:1

---

## 🔄 Implementation Pattern

### For Static Pages
```tsx
// /app/(pages)/[page]/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Page Title')}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
```

### For Dynamic Pages
```tsx
// /app/(pages)/[resource]/[slug]/page.tsx

export async function generateMetadata({ params }) {
  const resource = await fetchResource(params.slug);
  
  return {
    title: resource.title,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(resource.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
```

---

## 🧪 Quick Tests

### 1. Visual Test
Open in browser: `http://localhost:3000/api/og?title=Test`

### 2. Check Metadata
```bash
curl http://localhost:3000/ | grep "og:image"
```

### 3. Facebook Debugger
Visit: https://developers.facebook.com/tools/debug/

### 4. OG Checker
Visit: https://www.opengraph.xyz/

---

## ⚙️ Environment

### Required
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### For Production
```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

---

## 🔧 URL Encoding

### Common Encodings
| Character | Encoded |
|-----------|---------|
| Space | %20 |
| & | %26 |
| < | %3C |
| > | %3E |
| " | %22 |
| ' | %27 |
| # | %23 |

### Quick Helper
```tsx
encodeURIComponent('Your Title & More')
// Result: Your%20Title%20%26%20More
```

---

## 📱 Testing on Social Media

### Facebook
1. https://developers.facebook.com/tools/debug/
2. Enter page URL
3. Click "Scrape Again"
4. Check preview

### LinkedIn
1. https://www.linkedin.com/post-inspector/
2. Enter page URL
3. View preview

### Twitter/X
1. https://cards-dev.twitter.com/validator
2. Enter page URL
3. Check preview

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
git push origin main
# Automatic deployment
```

### Self-Hosted
```bash
npm run build
npm run start
```

### Environment
Set `NEXT_PUBLIC_BASE_URL` to your production domain

---

## 📊 Current Pages

| Page | URL | OG Title |
|------|-----|----------|
| Home | `/` | KKG dr. Soetomo |
| Articles | `/artikel` | Artikel & Blog |
| Members | `/anggota` | Anggota KKG |
| Gallery | `/galeri` | Galeri KKG |

---

## 🆘 Common Issues

### OG image not showing
- [ ] Check `NEXT_PUBLIC_BASE_URL` env var
- [ ] Verify absolute URLs
- [ ] Clear social media cache
- [ ] Use Facebook Debugger

### Font not loading
- [ ] Check internet connection
- [ ] Verify Google Fonts access
- [ ] Check browser console

### Title not displaying
- [ ] URL encode special chars
- [ ] Keep title < 100 chars
- [ ] Check query parameter spelling

### Slow generation
- First request: normal (200-500ms)
- Cached requests: fast (<50ms)
- Check network conditions

---

## 💡 Tips

✅ Always URL encode titles
✅ Keep titles under 100 characters
✅ Test on actual social media
✅ Monitor generation performance
✅ Use cache headers for optimization
✅ Log errors for debugging

---

## 🔗 Links

- **API Route**: `/app/api/og/route.tsx`
- **Full Guide**: `/OG_IMAGE_INTEGRATION.md`
- **Complete Summary**: `/OG_IMAGE_COMPLETE_SUMMARY.md`
- **Visual Guide**: `/OG_IMAGE_VISUAL_GUIDE_FINAL.md`
- **Test Cases**: `/OG_IMAGE_TEST_CASES.md`

---

**Version**: 1.0  
**Status**: ✅ Production Ready  
**Last Updated**: October 25, 2025
