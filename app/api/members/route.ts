import { client } from '@/sanity/lib/client';
import { allMembersQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const members = await client.fetch(allMembersQuery);
    return NextResponse.json(members || []);
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json([], { status: 500 });
  }
}
