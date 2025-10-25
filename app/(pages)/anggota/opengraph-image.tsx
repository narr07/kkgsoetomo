import { ImageResponse } from '@vercel/og'
import { OG_IMAGE_CONFIG, OG_COLORS, getFonts } from '@/app/og-image-utils'

export const runtime = 'nodejs'

export const alt = 'Anggota - KKG dr. Soetomo'
export const size = {
  width: OG_IMAGE_CONFIG.width,
  height: OG_IMAGE_CONFIG.height,
}

export const contentType = OG_IMAGE_CONFIG.contentType

export default async function Image() {
  const fonts = await getFonts()

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
            width: '120px',
            height: '120px',
            flexShrink: 0,
          }}
        >
          <svg
            width="100"
            height="100"
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
          {/* Header */}
          <p
            style={{
              fontSize: '16px',
              margin: '0 0 15px 0',
              lineHeight: '1.3',
              color: OG_COLORS.headerColor,
              opacity: 0.9,
              fontWeight: 400,
            }}
          >
            KKG dr. Soetomo
          </p>

          {/* Title */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              margin: '0 0 30px 0',
              lineHeight: '1.2',
              color: OG_COLORS.primaryColor,
            }}
          >
            Anggota KKG
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '28px',
              margin: '0',
              lineHeight: '1.4',
              color: OG_COLORS.secondaryColor,
              opacity: 0.95,
              maxWidth: '600px',
              fontWeight: 400,
            }}
          >
            Tim Profesional Pendidik
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
