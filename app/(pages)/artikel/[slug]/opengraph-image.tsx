import { createOGImage, OG_IMAGE_CONFIG } from '@/app/og-image-utils'
import { articleBySlugQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const runtime = 'nodejs'

export const alt = 'Artikel - KKG dr. Soetomo'
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
        'Artikel',
        'KKG dr. Soetomo'
      )
    }

    let article = null
    try {
      article = await client.fetch(articleBySlugQuery, { slug })
    } catch (fetchError) {
      console.error('Sanity fetch error:', fetchError)
    }
    
    if (!article) {
      return await createOGImage(
        'Artikel Tidak Ditemukan',
        'KKG dr. Soetomo'
      )
    }

    let imageUrl: string | undefined = undefined
    try {
      if (article.image) {
        imageUrl = urlFor(article.image).width(1200).height(630).url()
      }
    } catch (imageError) {
      console.error('Image URL generation error:', imageError)
    }

    return await createOGImage(
      article.title || 'Artikel',
      article.excerpt || 'Insights dan Informasi Terkini dari KKG dr. Soetomo',
      imageUrl
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return await createOGImage(
      'KKG dr. Soetomo',
      'Artikel'
    )
  }
}
