export const OG_IMAGE_CONFIG = {
  width: 1200,
  height: 630,
  contentType: 'image/png',
}

export const OG_COLORS = {
  gradientStart: '#293466',
  gradientEnd: '#090f29',
  primaryColor: '#ffffff',
  secondaryColor: '#f6f7de',
  headerColor: '#f6f7de',
}

// Font loader for Bricolage Grotesque from Google Fonts
export async function getFonts() {
  try {
    const fontData = await fetch(
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700&display=swap'
    ).then((res) => res.arrayBuffer())

    return [
      {
        name: 'Bricolage Grotesque',
        data: fontData,
        style: 'normal' as const,
        weight: 400 as const,
      },
    ]
  } catch (error) {
    console.error('Error loading font:', error)
    return []
  }
}

// Simplified logo SVG as string
export const LOGO_SVG = `<svg width="80" height="80" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path d="M379.82 155.52L241.05 54.7C230.76 47.23 216.93 47.23 206.64 54.7L67.87 155.52C57.58 162.99 53.3 176.15 57.23 188.25L110.24 351.38C114.17 363.48 125.36 371.61 138.08 371.61H309.61C322.33 371.61 333.52 363.48 337.45 351.38L390.46 188.25C394.39 176.15 390.12 163 379.82 155.52Z" fill="#F5F5DD"/>
    <path d="M309.61 371.61H138.08C127.7 371.61 118.35 366.2 113.12 357.63C186.62 367.33 261.08 367.33 334.57 357.63C329.34 366.19 319.99 371.61 309.61 371.61Z" fill="#39488D"/>
  </g>
</svg>`
