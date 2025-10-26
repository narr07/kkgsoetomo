import { sanityFetch } from '@/sanity/lib/client';
import { selayangPandangQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const selayangPandang = await sanityFetch({
      query: selayangPandangQuery,
      revalidate: 3600,
    });
    return NextResponse.json(selayangPandang || {});
  } catch (error) {
    console.error('Error fetching selayang pandang:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
