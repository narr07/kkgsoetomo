import type { Metadata } from 'next'
import { galleryBySlugQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params

  try {
    const gallery = await client.fetch(galleryBySlugQuery, { slug })

    if (!gallery) {
      return {
        title: 'Galeri tidak ditemukan',
        description: 'Galeri yang Anda cari tidak ditemukan',
      }
    }

    const imageCount = gallery.images?.length || 0

    return {
      title: `${gallery.title} - Galeri KKG dr. Soetomo`,
      description: `Lihat ${imageCount} foto dari kegiatan ${gallery.title}`,
      metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
      openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: `/galeri/${gallery.slug.current}`,
        title: `${gallery.title} - Galeri KKG dr. Soetomo`,
        description: `Lihat ${imageCount} foto dari kegiatan ${gallery.title}`,
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(gallery.title)}&description=${encodeURIComponent(`Lihat ${imageCount} foto dari kegiatan ${gallery.title}`)}`,
            width: 1200,
            height: 630,
            alt: gallery.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${gallery.title} - Galeri KKG dr. Soetomo`,
        description: `Lihat ${imageCount} foto dari kegiatan ${gallery.title}`,
        images: [`/api/og?title=${encodeURIComponent(gallery.title)}&description=${encodeURIComponent(`Lihat ${imageCount} foto dari kegiatan ${gallery.title}`)}`],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Galeri Kegiatan',
      description: 'Galeri kegiatan KKG dr. Soetomo',
    }
  }
}
