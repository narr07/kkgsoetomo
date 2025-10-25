/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { ogImageQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

interface SanityOGData {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
  image?: {
    url: string;
    metadata?: {
      palette?: {
        vibrant?: {
          background?: string;
        };
        darkVibrant?: {
          background?: string;
        };
      };
    };
  };
  excerpt?: string;
  description?: string;
  imageUrl?: string;
  publishedAt?: string;
  date?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get id or use fallback to query params (title, description)
    const id = searchParams.get('id');
    const titleParam = searchParams.get('title');
    const descriptionParam = searchParams.get('description');

    let title = titleParam || 'KKG dr. Soetomo';
    let description = descriptionParam || 'Kelompok Kerja Guru dr. Soetomo';
    let imageUrl: string | null = null;
    let vibrantBackground = '#3B82F6';
    let darkVibrantBackground = '#1F2937';

    // If ID is provided, fetch from Sanity
    if (id) {
      const data: SanityOGData | null = await client.fetch(ogImageQuery, { id });

      if (!data) {
        notFound();
      }

      // Extract data based on document type
      title = data.title || data.name || 'KKG dr. Soetomo';
      description = data.excerpt || data.description || 'Kelompok Kerja Guru dr. Soetomo';

      // Get image and colors
      if (data.image) {
        imageUrl = data.image.url ? urlFor(data.image).width(500).height(630).url() : null;

        // Extract vibrant colors from image metadata
        vibrantBackground =
          data.image.metadata?.palette?.vibrant?.background ?? '#3B82F6';
        darkVibrantBackground =
          data.image.metadata?.palette?.darkVibrant?.background ?? '#1F2937';
      }
    }

    // Truncate text
    const truncatedTitle = title.slice(0, 100);
    const truncatedDescription = description.slice(0, 150);

    return new ImageResponse(
      (
        <div
          tw="flex w-full h-full relative"
          style={{
            background: `linear-gradient(135deg, ${vibrantBackground} 0%, ${darkVibrantBackground} 100%)`,
          }}
        >
          {/* Content container */}
          <div tw="flex flex-row w-full h-full relative">
            {/* Text content */}
            <div tw="flex-1 flex flex-col items-start justify-center px-16 py-16">
              <h1 tw="text-7xl tracking-tight leading-none text-white font-bold mb-6 max-w-2xl break-words">
                {truncatedTitle}
              </h1>
              <p tw="text-3xl tracking-tight leading-tight text-gray-100 max-w-2xl break-words">
                {truncatedDescription}
              </p>
            </div>

            {/* Image container */}
            {imageUrl && (
              <div tw="flex w-[500px] h-[630px] overflow-hidden flex-shrink-0">
                <img
                  src={imageUrl}
                  alt=""
                  tw="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Fallback Logo (if no image) */}
            {!imageUrl && (
              <div tw="flex w-[500px] h-[630px] overflow-hidden flex-shrink-0 items-center justify-center opacity-10">
                <img
                  alt="Logo"
                  height={300}
                  src="data:image/svg+xml,%3Csvg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M57.5 0L115 100H0L57.5 0z' /%3E%3C/svg%3E"
                  width={360}
                  tw="object-contain"
                />
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: await loadGoogleFont('Inter', `${truncatedTitle} ${truncatedDescription}`),
            style: 'normal',
          },
        ],
      },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.log(`OG Image Generation Error: ${errorMessage}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
