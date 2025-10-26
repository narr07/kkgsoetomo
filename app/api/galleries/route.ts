import { sanityFetch } from '@/sanity/lib/client';
import { allGalleriesQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const galleries = await sanityFetch({
      query: allGalleriesQuery,
      revalidate: 60,
    });
    return NextResponse.json(galleries || []);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json([], { status: 500 });
  }
}
