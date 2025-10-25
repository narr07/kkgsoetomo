import { createOGImage, OG_IMAGE_CONFIG } from '@/app/og-image-utils'
import { galleryBySlugQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const runtime = 'nodejs'

export const alt = 'Galeri - KKG dr. Soetomo'
export const size = {
  width: OG_IMAGE_CONFIG.width,
  height: OG_IMAGE_CONFIG.height,
}

export const contentType = OG_IMAGE_CONFIG.contentType

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  
  try {
    const gallery = await client.fetch(galleryBySlugQuery, { slug })
    
    if (!gallery) {
      return createOGImage(
        'Galeri Tidak Ditemukan',
        'KKG dr. Soetomo'
      )
    }

    const imageUrl = gallery.thumbnail 
      ? urlFor(gallery.thumbnail).width(1200).height(630).url()
      : undefined

    const subtitle = gallery.images 
      ? `📷 ${gallery.images.length} foto - Dokumentasi Kegiatan KKG`
      : 'Dokumentasi Momen Berharga KKG dr. Soetomo'

    return createOGImage(
      gallery.title || 'Galeri Kegiatan',
      subtitle,
      imageUrl
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return createOGImage(
      'KKG dr. Soetomo',
      'Galeri'
    )
  }
}
