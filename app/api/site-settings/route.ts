import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 1 hour

export async function GET() {
  try {
    const siteSettings = await client.fetch(siteSettingsQuery);
    return NextResponse.json(siteSettings || {});
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
