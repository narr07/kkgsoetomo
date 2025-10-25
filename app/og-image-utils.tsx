import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const OG_IMAGE_CONFIG = {
  width: 1200,
  height: 630,
  contentType: 'image/png',
}

/**
 * Convert SVG to base64 data URL
 */
function getSvgAsDataUrl(svgPath: string): string {
  try {
    const fullPath = path.join(process.cwd(), svgPath)
    const svgContent = fs.readFileSync(fullPath, 'utf-8')
    const base64 = Buffer.from(svgContent).toString('base64')
    return `data:image/svg+xml;base64,${base64}`
  } catch (error) {
    console.error('Error reading SVG:', error)
    return ''
  }
}

/**
 * Create OG image with logo on left and content on right
 */
export async function createOGImage(
  title: string,
  subtitle: string,
  imageUrl?: string
) {
  const logoDataUrl = getSvgAsDataUrl('app/logo.svg')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: imageUrl
            ? `url('${imageUrl}') center/cover`
            : 'linear-gradient(135deg, #293466 0%, #39488d 100%)',
          padding: '60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Dark overlay if image is used */}
        {imageUrl && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}
          />
        )}

        {/* Left side - Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '280px',
            height: '280px',
            flexShrink: 0,
            zIndex: 2,
            backgroundImage: logoDataUrl ? `url('${logoDataUrl}')` : 'none',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />

        {/* Right side - Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            marginLeft: '80px',
            color: 'white',
            zIndex: 2,
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              margin: '0 0 30px 0',
              lineHeight: '1.2',
              color: '#ffffff',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '28px',
              margin: '0',
              lineHeight: '1.4',
              color: '#f6f7de',
              opacity: 0.95,
              maxWidth: '600px',
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    ),
    {
      width: OG_IMAGE_CONFIG.width,
      height: OG_IMAGE_CONFIG.height,
    }
  )
}
