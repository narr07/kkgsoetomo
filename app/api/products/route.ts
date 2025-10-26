import { sanityFetch } from '@/sanity/lib/client';
import { allProductsQuery } from '@/sanity/lib/queries';
import { NextResponse } from 'next/server';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const products = await sanityFetch({
      query: allProductsQuery,
      revalidate: 60,
    });
    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([], { status: 500 });
  }
}
