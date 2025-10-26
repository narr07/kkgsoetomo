import { sanityFetch } from '@/sanity/lib/client';
import { aboutUsQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const aboutUs = await sanityFetch({
      query: aboutUsQuery,
      revalidate: 3600,
    });
    return NextResponse.json(aboutUs || {});
  } catch (error) {
    console.error('Error fetching about us:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
