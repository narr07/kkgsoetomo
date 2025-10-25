import { createOGImage, OG_IMAGE_CONFIG } from '@/app/og-image-utils'

export const runtime = 'nodejs'

export const alt = 'Anggota - KKG dr. Soetomo'
export const size = {
  width: OG_IMAGE_CONFIG.width,
  height: OG_IMAGE_CONFIG.height,
}

export const contentType = OG_IMAGE_CONFIG.contentType

export default async function Image() {
  return createOGImage(
    'Anggota KKG',
    'Tim Profesional Pendidik Soetomo'
  )
}
