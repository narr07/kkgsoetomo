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
  const { slug } = await params
  
  try {
    const article = await client.fetch(articleBySlugQuery, { slug })
    
    if (!article) {
      return createOGImage(
        'Artikel Tidak Ditemukan',
        'KKG dr. Soetomo'
      )
    }

    const imageUrl = article.image 
      ? urlFor(article.image).width(1200).height(630).url()
      : undefined

    return createOGImage(
      article.title || 'Artikel',
      article.description || 'Insights dan Informasi Terkini dari KKG dr. Soetomo',
      imageUrl
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return createOGImage(
      'KKG dr. Soetomo',
      'Artikel'
    )
  }
}
