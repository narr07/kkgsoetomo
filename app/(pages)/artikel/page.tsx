'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AnimatedDiv from '@/components/AnimatedDiv';
import PageTransition from '@/components/PageTransition';
import { allArticlesQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SanityImage {
  _type?: string;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      blurHash?: string;
    };
  };
  hotspot?: Record<string, unknown>;
  crop?: Record<string, unknown>;
  alt?: string;
}

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  author?: { name: string };
  category?: { title: string; color?: string };
  publishedAt: string;
  image?: SanityImage;
  views?: number;
}

export default function ArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await client.fetch(allArticlesQuery);
        setArticles(data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Filter articles based on search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Artikel & Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Berbagi pengetahuan dan pengalaman dalam dunia pendidikan
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stats Bar */}
          {!loading && (
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredArticles.length}</span> dari <span className="font-semibold text-gray-900 dark:text-white">{articles.length}</span> artikel
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="h-full overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-pulse">
                  <div className="w-full h-56 bg-gray-300 dark:bg-gray-700" />
                  <CardHeader>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-3 w-1/3" />
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Articles Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Link key={article._id} href={`/artikel/${article.slug.current}`}>
                    <Card className="h-full overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
                      {/* Image */}
                      <div className="relative w-full flex-1 min-h-56 overflow-hidden bg-gray-200 dark:bg-gray-800">
                        {article.image ? (
                          <Image
                            src={urlFor(article.image).width(400).height(224).auto('format').url()}
                            alt={article.image.alt || article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                            loading="lazy"
                            placeholder={
                              article.image.asset?.metadata?.lqip
                                ? 'blur'
                                : 'empty'
                            }
                            blurDataURL={article.image.asset?.metadata?.lqip}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600">
                            <span className="text-white text-sm font-medium">Gambar Artikel</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <CardHeader className="py-3 px-4">
                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="text-xs px-3 py-1 rounded-full font-medium text-white"
                            style={{
                              backgroundColor: article.category?.color || '#3b82f6',
                            }}
                          >
                            {article.category?.title || 'Uncategorized'}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg text-gray-900 dark:text-white">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>

                      {/* Footer */}
                      <CardContent className="py-3 px-4">
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <p>
                            Oleh: <span className="font-medium text-gray-900 dark:text-white">
                              {article.author?.name || 'Penulis Tidak Diketahui'}
                            </span>
                          </p>
                          <p>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</p>
                          {article.views && (
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              👁️ {article.views.toLocaleString('id-ID')} tampilan
                            </p>
                          )}
                        </div>
                        <div className="mt-4 text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                          Baca <span>→</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {searchQuery
                      ? `Tidak ada artikel yang cocok dengan "${searchQuery}"`
                      : 'Belum ada artikel yang dipublikasikan'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
