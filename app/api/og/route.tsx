/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
async function loadGoogleFont (font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)
 
  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }
 
  throw new Error('failed to load font data')
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>&description=<description>
    const hasTitle = searchParams.has('title');
    const hasDescription = searchParams.has('description');
    
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'KKG dr. Soetomo';
    
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 200)
      : 'Kelompok Kerja Guru dr. Soetomo';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            backgroundColor: '#293466',
            backgroundImage: 'radial-gradient(circle at 25px 25px, lightgray 2%, transparent 0%), radial-gradient(circle at 75px 75px, lightgray 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              marginBottom: '20px',
            }}
          >
            <img
              alt="Logo"
              height={150}
              src="data:image/svg+xml,%3Csvg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
              style={{ margin: '0 30px' }}
              width={180}
            />
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontStyle: 'normal',
              fontWeight: 700,
              fontFamily: 'Inter',
              letterSpacing: '-0.025em',
              color: 'white',
              padding: '0 80px',
              lineHeight: 1.3,
              whiteSpace: 'pre-wrap',
              marginBottom: '20px',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 28,
              fontStyle: 'normal',
              fontWeight: 400,
              fontFamily: 'Inter',
              color: '#d0d0d0',
              padding: '0 80px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              maxWidth: '1000px',
            }}
          >
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await loadGoogleFont('Inter', `${title} ${description}`),
            style: 'normal',
          },
        ],
      },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(errorMessage);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
