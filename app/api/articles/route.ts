import { sanityFetch } from '@/sanity/lib/client';
import { allArticlesQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const articles = await sanityFetch({
      query: allArticlesQuery,
      revalidate: 60,
    });
    return NextResponse.json(articles || []);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json([], { status: 500 });
  }
}
