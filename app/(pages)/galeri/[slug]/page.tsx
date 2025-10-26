import React from 'react';
import { galleryBySlugQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import GaleriDetailClient from './galeri-detail-client';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GaleriDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const gallery = await sanityFetch({
    query: galleryBySlugQuery,
    params: { slug },
    revalidate: 60,
  });

  if (!gallery) {
    return null;
  }

  return <GaleriDetailClient gallery={gallery} />;
}
