import React from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { allGalleriesQuery } from '@/sanity/lib/queries';
import GaleriClient from './galeri-client';

export default async function GaleriPage() {
  const galleries = await sanityFetch({
    query: allGalleriesQuery,
    revalidate: 60,
  });

  return <GaleriClient galleries={galleries} />;
}
