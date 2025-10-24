'use client';

import React, { useState, useEffect } from 'react';
import AnimatedDiv from '@/components/AnimatedDiv';
import PageTransition from '@/components/PageTransition';
import { allArticlesQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

interface SanityImage {
  _type?: string;
  asset?: {
    _id: string;
    url: string;
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
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Articles List */}
          {!loading && (
            <div className="space-y-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Link key={article._id} href={`/artikel/${article.slug.current}`}>
                    <article className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        {/* Image */}
                        <div className="w-full md:w-48 h-40 md:h-auto flex items-center justify-center shrink-0 bg-linear-to-br from-blue-400 to-blue-600 overflow-hidden">
                          {article.image ? (
                            <img
                              src={urlFor(article.image).width(200).height(160).url()}
                              alt={article.image.alt || article.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-sm font-medium">Gambar Artikel</span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1">
                          {/* Category Badge */}
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className="text-xs px-3 py-1 rounded-full font-medium"
                              style={{
                                backgroundColor: article.category?.color || '#3b82f6',
                                color: 'white',
                                opacity: 0.2,
                              }}
                            >
                              {article.category?.title || 'Uncategorized'}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition">
                            {article.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                            <div className="space-y-1">
                              <p>
                                Oleh: <span className="font-medium text-gray-700 dark:text-gray-300">
                                  {article.author?.name || 'Penulis Tidak Diketahui'}
                                </span>
                              </p>
                              <p>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</p>
                              {article.views && (
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  👁️ {article.views.toLocaleString('id-ID')} tampilan
                                </p>
                              )}
                            </div>
                            <div className="text-blue-600 dark:text-blue-400 font-semibold hover:translate-x-1 transition-transform">
                              Baca →
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
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
