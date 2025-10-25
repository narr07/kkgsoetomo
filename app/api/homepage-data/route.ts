import { client } from '@/sanity/lib/client';
import { homepageDataQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const homepageData = await client.fetch(homepageDataQuery);
    return NextResponse.json(homepageData || {});
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
