import { client } from '@/sanity/lib/client';
import { heroQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const hero = await client.fetch(heroQuery);
    return NextResponse.json(hero || {});
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
