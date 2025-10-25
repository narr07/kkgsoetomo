import { client } from '@/sanity/lib/client';
import { allGalleriesQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const galleries = await client.fetch(allGalleriesQuery);
    return NextResponse.json(galleries || []);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json([], { status: 500 });
  }
}
