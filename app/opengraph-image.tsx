import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const alt = 'KKG Soetomo'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          gap: '20px',
        }}
      >
        <div style={{ fontSize: '80px' }}>🎓</div>
        <div style={{ textAlign: 'center', fontSize: '64px' }}>
          KKG Soetomo
        </div>
        <div style={{ fontSize: '32px', opacity: 0.9 }}>
          Kelompok Kerja Guru - Wadah Kolaborasi Pendidik
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
