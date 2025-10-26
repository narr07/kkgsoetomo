import { client } from '@/sanity/lib/client';
import { schoolListQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const schoolList = await client.fetch(schoolListQuery);
    return NextResponse.json(schoolList || {});
  } catch (error) {
    console.error('Error fetching school list:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
