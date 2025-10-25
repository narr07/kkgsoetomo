# OG Image Integration Guide

## Endpoint yang Tersedia
- **Route**: `/api/og`
- **Parameter**: `?title=Your%20Title`
- **Ukuran**: 1200x630px
- **Format**: Dynamic SVG dengan title

## Cara Mengintegrasikan ke Setiap Halaman

### 1. Home Page (`/app/page.tsx`)

Ubah halaman menjadi server component agar bisa export metadata:

```tsx
// /app/page.tsx - Hapus "use client" dan buat sebagai server component

import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import Hero from '@/components/home/hero';
import Selayang from '@/components/home/selayang';
import AboutUs from '@/components/home/aboutUs';

export const metadata: Metadata = {
  title: 'KKG dr. Soetomo - Kecamatan Rajagaluh',
  description: 'Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'KKG dr. Soetomo - Kecamatan Rajagaluh-Majalengka',
    description: 'Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('KKG dr. Soetomo')}`,
        width: 1200,
        height: 630,
        alt: 'KKG dr. Soetomo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KKG dr Soetomo - Kec. Rajagaluh',
    description: 'Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan',
    images: [`/api/og?title=${encodeURIComponent('KKG dr. Soetomo')}`],
  },
};

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        <div className="min-h-screen bg-white dark:bg-slate-950">
          {/* Hero Section */}
          <Hero />
          <Selayang />
          <AboutUs />
          {/* CTA Section */}
          <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-secondary-50">
                Bergabunglah Dengan Kami
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Mari bersama-sama memajukan dunia pendidikan Indonesia
              </p>
              <button className="bg-blue-600 text-secondary-50 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                Daftar Sekarang
              </button>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
```

### 2. Artikel Page (`/app/(pages)/artikel/page.tsx`)

```tsx
// /app/(pages)/artikel/page.tsx
import type { Metadata } from 'next';
import React, { useState, useMemo } from 'react';
// ... import lainnya

export const metadata: Metadata = {
  title: 'Artikel & Blog - KKG dr. Soetomo',
  description: 'Berbagi pengetahuan dan pengalaman dalam dunia pendidikan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/artikel',
    title: 'Artikel & Blog - KKG dr. Soetomo',
    description: 'Berbagi pengetahuan dan pengalaman dalam dunia pendidikan',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Artikel & Blog')}`,
        width: 1200,
        height: 630,
        alt: 'Artikel & Blog KKG',
      },
    ],
  },
};

export default function ArtikelPage() {
  // ... komponen client component bisa tetap di sini
}
```

### 3. Artikel Detail Page (`/app/(pages)/artikel/[slug]/page.tsx`)

Untuk halaman dinamis, gunakan `generateMetadata`:

```tsx
import type { Metadata } from 'next';

// Fetch artikel berdasarkan slug
async function getArticle(slug: string) {
  // Fetch dari Sanity CMS
  // ...
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = await getArticle(params.slug);

  return {
    title: `${article.title} - KKG dr. Soetomo`,
    description: article.excerpt,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/artikel/${params.slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(article.title)}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  // ... component
}
```

### 4. Anggota Page (`/app/(pages)/anggota/page.tsx`)

```tsx
export const metadata: Metadata = {
  title: 'Anggota - KKG dr. Soetomo',
  description: 'Daftar anggota Kelompok Kerja Guru dr. Soetomo',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Anggota KKG')}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### 5. Galeri Page (`/app/(pages)/galeri/page.tsx`)

```tsx
export const metadata: Metadata = {
  title: 'Galeri - KKG dr. Soetomo',
  description: 'Galeri kegiatan Kelompok Kerja Guru dr. Soetomo',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Galeri KKG')}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

## Testing

Untuk test OG image secara manual:
1. Buka di browser: `http://localhost:3000/api/og?title=Test%20Title`
2. Gunakan OG Image Preview tools:
   - https://www.opengraph.xyz/
   - https://www.linkedin.com/post-inspector/
   - https://developers.facebook.com/tools/debug/

## Notes

- Pastikan `NEXT_PUBLIC_BASE_URL` env var sudah di-set di `.env.local`
- URL di OG image harus absolute URL (dengan domain)
- Title dibatasi 100 karakter otomatis oleh API
- Image akan di-cache sesuai Next.js cache strategy
