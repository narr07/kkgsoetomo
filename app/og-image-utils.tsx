import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const OG_IMAGE_CONFIG = {
  width: 1200,
  height: 630,
  contentType: 'image/png',
}

/**
 * Create OG image with logo on left and content on right
 */
export async function createOGImage(
  title: string,
  subtitle: string,
  imageUrl?: string
) {
  // Read the logo SVG file
  const logoPath = path.join(process.cwd(), 'app', 'logo.svg')
  let logoSvg = ''

  try {
    logoSvg = fs.readFileSync(logoPath, 'utf-8')
  } catch (error) {
    console.error('Error reading logo:', error)
  }

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
          }}
        >
          {logoSvg && (
            <svg
              viewBox="0 0 447.68 447.68"
              width="100%"
              height="100%"
              dangerouslySetInnerHTML={{ __html: logoSvg }}
            />
          )}
        </div>

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
