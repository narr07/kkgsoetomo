import type { Metadata } from 'next'
import { articleBySlugQuery } from '@/sanity/lib/queries'
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
    const article = await client.fetch(articleBySlugQuery, { slug })

    if (!article) {
      return {
        title: 'Artikel tidak ditemukan',
        description: 'Artikel yang Anda cari tidak ditemukan',
      }
    }

    const imageUrl = article.image
      ? urlFor(article.image).width(1200).height(630).url()
      : null

    return {
      title: article.title,
      description: article.excerpt || article.description || 'Baca artikel terbaru dari KKG Soetomo',
      keywords: article.tags || [],
      authors: article.author ? [{ name: article.author.name }] : [],
      openGraph: {
        type: 'article',
        locale: 'id_ID',
        url: `/artikel/${article.slug.current}`,
        title: article.title,
        description: article.excerpt || 'Baca artikel dari KKG Soetomo',
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: article.title,
              },
            ]
          : [],
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        authors: article.author ? [article.author.name] : [],
        tags: article.tags || [],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt || 'Baca artikel dari KKG Soetomo',
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Artikel',
      description: 'Baca artikel dari KKG Soetomo',
    }
  }
}
