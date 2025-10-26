import React from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { allArticlesQuery } from '@/sanity/lib/queries';
import ArtikelClient from './artikel-client';

export default async function ArtikelPage() {
  const articles = await sanityFetch({
    query: allArticlesQuery,
    revalidate: 60,
  });

  return <ArtikelClient articles={articles} />;
}
