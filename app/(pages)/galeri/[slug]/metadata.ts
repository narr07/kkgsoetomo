import type { Metadata } from 'next'
import { galleryBySlugQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

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

    const imageUrl = gallery.thumbnail
      ? urlFor(gallery.thumbnail).width(1200).height(630).url()
      : null

    const imageCount = gallery.images?.length || 0

    return {
      title: `${gallery.title} - Galeri KKG Soetomo`,
      description: `Lihat ${imageCount} foto dari kegiatan ${gallery.title}`,
      openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: `/galeri/${gallery.slug.current}`,
        title: `${gallery.title} - Galeri KKG Soetomo`,
        description: `Lihat ${imageCount} foto dari kegiatan ${gallery.title}`,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: gallery.title,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${gallery.title} - Galeri KKG Soetomo`,
        description: `Lihat ${imageCount} foto dari kegiatan ${gallery.title}`,
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Galeri Kegiatan',
      description: 'Galeri kegiatan KKG Soetomo',
    }
  }
}
