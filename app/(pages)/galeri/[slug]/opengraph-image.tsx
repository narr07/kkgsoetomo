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
  try {
    const { slug } = await params
    
    if (!slug) {
      return await createOGImage(
        'Galeri Kegiatan',
        'KKG dr. Soetomo'
      )
    }

    let gallery = null
    try {
      gallery = await client.fetch(galleryBySlugQuery, { slug })
    } catch (fetchError) {
      console.error('Sanity fetch error:', fetchError)
    }
    
    if (!gallery) {
      return await createOGImage(
        'Galeri Tidak Ditemukan',
        'KKG dr. Soetomo'
      )
    }

    let imageUrl: string | undefined = undefined
    try {
      if (gallery.thumbnail) {
        imageUrl = urlFor(gallery.thumbnail).width(1200).height(630).url()
      }
    } catch (imageError) {
      console.error('Image URL generation error:', imageError)
    }

    const subtitle = gallery.images 
      ? `📷 ${gallery.images.length} foto - Dokumentasi Kegiatan KKG`
      : 'Dokumentasi Momen Berharga KKG dr. Soetomo'

    return await createOGImage(
      gallery.title || 'Galeri Kegiatan',
      subtitle,
      imageUrl
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return await createOGImage(
      'KKG dr. Soetomo',
      'Galeri'
    )
  }
}
