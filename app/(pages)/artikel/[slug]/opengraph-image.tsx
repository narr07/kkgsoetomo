import { ImageResponse } from 'next/og'
import { articleBySlugQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const runtime = 'nodejs'

export const alt = 'Artikel - KKG dr. Soetomo'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: Props) {
  const { slug } = await params
  
  try {
    const article = await client.fetch(articleBySlugQuery, { slug })
    
    if (!article) {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '32px',
            }}
          >
            Artikel tidak ditemukan
          </div>
        ),
        {
          ...size,
        }
      )
    }

    const imageUrl = article.image 
      ? urlFor(article.image).width(1200).height(630).url()
      : null

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
            background: '#000',
          }}
        >
          {/* Background Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt=""
            />
          )}
          
          {/* Dark Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '60px',
              width: '100%',
              height: '100%',
              color: 'white',
            }}
          >
            {/* Category */}
            {article.category && (
              <div
                style={{
                  fontSize: '24px',
                  marginBottom: '16px',
                  color: '#667eea',
                  fontWeight: '600',
                }}
              >
                {article.category.name}
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                marginBottom: '16px',
                lineHeight: 1.2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.title}
            </div>

            {/* Description */}
            {article.description && (
              <div
                style={{
                  fontSize: '24px',
                  opacity: 0.9,
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {article.description}
              </div>
            )}

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '2px solid rgba(255, 255, 255, 0.2)',
                fontSize: '18px',
              }}
            >
              <div style={{ opacity: 0.9 }}>KKG dr. Soetomo</div>
              {article._createdAt && (
                <div style={{ opacity: 0.9 }}>
                  {new Date(article._createdAt).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
          }}
        >
          KKG dr. Soetomo - Artikel
        </div>
      ),
      {
        ...size,
      }
    )
  }
}
