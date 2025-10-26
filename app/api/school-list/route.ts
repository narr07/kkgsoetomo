import { sanityFetch } from '@/sanity/lib/client';
import { schoolListQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 1 hour

export async function GET() {
  try {
    const schoolList = await sanityFetch({
      query: schoolListQuery,
      revalidate: 60,
    });
    return NextResponse.json(schoolList || {});
  } catch (error) {
    console.error('Error fetching school list:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
