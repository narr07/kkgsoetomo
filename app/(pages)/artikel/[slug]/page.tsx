import React from 'react';
import { articleBySlugQuery, relatedArticlesQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import ArtikelDetailClient from './artikel-detail-client';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArtikelDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const article = await sanityFetch({
    query: articleBySlugQuery,
    params: { slug },
    revalidate: 60,
  });

  let relatedArticles = [];

  if (article?.category?._id) {
    relatedArticles = await sanityFetch({
      query: relatedArticlesQuery,
      params: {
        categoryId: article.category._id,
        articleId: article._id,
      },
      revalidate: 60,
    }) || [];
  }

  return <ArtikelDetailClient article={article} relatedArticles={relatedArticles} />;
}
