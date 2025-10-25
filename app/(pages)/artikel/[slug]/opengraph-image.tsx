import { ImageResponse } from '@vercel/og'
import { OG_IMAGE_CONFIG, OG_COLORS, getFonts } from '@/app/og-image-utils'
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
  const fonts = await getFonts()

  try {
    // Fetch article dari Sanity
    const article = await client.fetch(articleBySlugQuery, { slug })

    if (!article) {
      // Jika artikel tidak ditemukan, tampilkan OG image default
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${OG_COLORS.gradientStart} 0%, ${OG_COLORS.gradientEnd} 100%)`,
              padding: '60px',
              fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif',
            }}
          >
            <div style={{ textAlign: 'center', color: 'white' }}>
              <h1 style={{ fontSize: '48px', fontWeight: 700, margin: '0 0 20px 0' }}>
                Artikel Tidak Ditemukan
              </h1>
              <p style={{ fontSize: '24px', color: OG_COLORS.secondaryColor }}>
                KKG dr. Soetomo
              </p>
            </div>
          </div>
        ),
        {
          width: OG_IMAGE_CONFIG.width,
          height: OG_IMAGE_CONFIG.height,
          fonts,
        }
      )
    }

    // Ambil URL gambar dari artikel jika ada
    let imageUrl: string | null = null
    try {
      if (article.image) {
        imageUrl = urlFor(article.image).width(1200).height(630).url()
      }
    } catch (error) {
      console.error('Error generating image URL:', error)
    }

    // Jika ada gambar dari artikel, gunakan itu
    if (imageUrl) {
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '40px',
              fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif',
              position: 'relative',
            }}
          >
            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
              }}
            />

            {/* Content */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '90%',
              }}
            >
              {/* Category */}
              {article.category && (
                <p
                  style={{
                    fontSize: '14px',
                    margin: '0 0 16px 0',
                    color: '#f6f7de',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    opacity: 0.95,
                  }}
                >
                  {article.category.title}
                </p>
              )}

              {/* Title */}
              <h1
                style={{
                  fontSize: '56px',
                  fontWeight: 700,
                  margin: '0',
                  lineHeight: '1.2',
                  color: '#ffffff',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {article.title}
              </h1>
            </div>
          </div>
        ),
        {
          width: OG_IMAGE_CONFIG.width,
          height: OG_IMAGE_CONFIG.height,
          fonts,
        }
      )
    }

    // Fallback: jika tidak ada gambar, tampilkan dengan gradient
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `linear-gradient(135deg, ${OG_COLORS.gradientStart} 0%, ${OG_COLORS.gradientEnd} 100%)`,
            padding: '60px',
            fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100px',
              height: '100px',
              flexShrink: 0,
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 448 448"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <path
                d="M379.82 155.52L241.05 54.7C230.76 47.23 216.93 47.23 206.64 54.7L67.87 155.52C57.58 162.99 53.3 176.15 57.23 188.25L110.24 351.38C114.17 363.48 125.36 371.61 138.08 371.61H309.61C322.33 371.61 333.52 363.48 337.45 351.38L390.46 188.25C394.39 176.15 390.12 163 379.82 155.52Z"
                fill="#F5F5DD"
              />
              <path
                d="M309.61 371.61H138.08C127.7 371.61 118.35 366.2 113.12 357.63C186.62 367.33 261.08 367.33 334.57 357.63C329.34 366.19 319.99 371.61 309.61 371.61Z"
                fill="#39488D"
              />
            </svg>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              marginLeft: '40px',
              color: 'white',
            }}
          >
            {/* Category */}
            {article.category && (
              <p
                style={{
                  fontSize: '14px',
                  margin: '0 0 16px 0',
                  color: OG_COLORS.headerColor,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  opacity: 0.9,
                }}
              >
                {article.category.title}
              </p>
            )}

            {/* Title */}
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 700,
                margin: '0 0 20px 0',
                lineHeight: '1.2',
                color: OG_COLORS.primaryColor,
              }}
            >
              {article.title}
            </h1>

            {/* Excerpt */}
            <p
              style={{
                fontSize: '20px',
                margin: '0',
                lineHeight: '1.4',
                color: OG_COLORS.secondaryColor,
                opacity: 0.9,
                maxWidth: '600px',
              }}
            >
              {article.excerpt || 'Baca artikel terbaru dari KKG dr. Soetomo'}
            </p>
          </div>
        </div>
      ),
      {
        width: OG_IMAGE_CONFIG.width,
        height: OG_IMAGE_CONFIG.height,
        fonts,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)

    // Error fallback
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${OG_COLORS.gradientStart} 0%, ${OG_COLORS.gradientEnd} 100%)`,
            padding: '60px',
            fontFamily: 'Bricolage Grotesque, system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 700, margin: '0 0 20px 0' }}>
              KKG dr. Soetomo
            </h1>
            <p style={{ fontSize: '24px', color: OG_COLORS.secondaryColor }}>
              Artikel
            </p>
          </div>
        </div>
      ),
      {
        width: OG_IMAGE_CONFIG.width,
        height: OG_IMAGE_CONFIG.height,
        fonts,
      }
    )
  }
}
