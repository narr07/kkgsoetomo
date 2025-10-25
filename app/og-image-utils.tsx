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
  let logoDataUrl = ''
  try {
    logoDataUrl = getSvgAsDataUrl('app/logo.svg')
  } catch (error) {
    console.error('Error getting logo:', error)
  }

  try {
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
              : 'linear-gradient(135deg, #293466 0%, #090f29 100%)',
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
              width: '80px',
              height: '80px',
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
              marginLeft: '40px',
              color: 'white',
              zIndex: 2,
            }}
          >
            {/* Header text */}
            <p
              style={{
                fontSize: '16px',
                margin: '0 0 15px 0',
                lineHeight: '1.3',
                color: '#f6f7de',
                opacity: 0.9,
              }}
            >
              KKG dr. Soetomo - Kec. Rajagaluh Kab. Majalengka
            </p>

            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 700,
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
  } catch (error) {
    console.error('Error creating ImageResponse:', error)
    // Fallback: return simple gradient image
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #293466 0%, #39488d 100%)',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: 'white',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 700,  fontSize: '44px', margin: '0 0 20px 0' }}>
              {title}
            </h1>
            <p style={{ fontSize: '28px', margin: '0', color: '#f6f7de' }}>
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
}
