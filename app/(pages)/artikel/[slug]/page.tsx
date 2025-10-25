'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import { articleBySlugQuery, relatedArticlesQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PortableText, PortableTextBlock } from 'next-sanity';

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

interface Author {
  _id: string;
  name: string;
  image?: SanityImage;
}

interface Category {
  _id: string;
  title: string;
  color?: string;
}

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  author: Author;
  category: Category;
  publishedAt: string;
  updatedAt?: string;
  image: SanityImage;
  content: PortableTextBlock[];
  tags?: string[];
  views?: number;
}

interface RelatedArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  image?: SanityImage;
  publishedAt: string;
  author?: { name: string };
  category?: { title: string };
}

export default function ArtikelDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await client.fetch(articleBySlugQuery, { slug });
        if (!data) {
          setError('Artikel tidak ditemukan');
          setArticle(null);
        } else {
          setArticle(data);

          // Fetch related articles
          if (data.category?._id) {
            const related = await client.fetch(relatedArticlesQuery, {
              categoryId: data.category._id,
              articleId: data._id,
            });
            setRelatedArticles(related || []);
          }
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Gagal memuat artikel');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white dark:bg-black py-12 px-4 flex items-center justify-center">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-spin" />
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !article) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Artikel tidak ditemukan'}
            </h1>
            <Link href="/artikel">
              <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                ← Kembali ke Artikel
              </button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/artikel">
            <button className="text-blue-600 dark:text-blue-400 font-semibold mb-8 flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              ← Kembali ke Artikel
            </button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium text-white"
                style={{
                  backgroundColor: article.category?.color || '#3b82f6',
                }}
              >
                {article.category?.title || 'Uncategorized'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                {article.author?.image && (
                  <Image
                    src={urlFor(article.author.image).width(40).height(40).url()}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {article.author?.name || 'Penulis Tidak Diketahui'}
                  </p>
                </div>
              </div>
              <div className="md:border-l md:border-gray-300 md:dark:border-gray-700 md:pl-4 text-sm">
                <p>
                  Dipublikasikan: {new Date(article.publishedAt).toLocaleDateString('id-ID')}
                </p>
                {article.updatedAt && (
                  <p className="text-gray-500 dark:text-gray-500">
                    Update: {new Date(article.updatedAt).toLocaleDateString('id-ID')}
                  </p>
                )}
              </div>
              {article.views && (
                <div className="md:border-l md:border-gray-300 md:dark:border-gray-700 md:pl-4 text-sm">
                  <p>👁️ {article.views.toLocaleString('id-ID')} tampilan</p>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden h-96 md:h-[500px] hover:shadow-lg transition-shadow relative w-full">
            <Image
              src={urlFor(article.image).width(800).height(500).url()}
              alt={article.image.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Excerpt */}
          <div className="mb-8 text-xl text-gray-700 dark:text-gray-300 italic border-l-4 border-blue-500 pl-4">
            {article.excerpt}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full hover:scale-110 transition-transform cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose dark:prose-invert max-w-none mb-12">
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
              {article.content && (
                <PortableText
                  value={article.content}
                  components={{
                    types: {
                      image: ({ value }) => {
                        const imageUrl = urlFor(value).width(800).url();
                        return (
                          <div className="relative w-full h-96 rounded-lg my-6 overflow-hidden hover:shadow-lg transition-shadow">
                            <Image
                              src={imageUrl}
                              alt={value.alt || 'Article image'}
                              fill
                              className="object-cover"
                            />
                          </div>
                        );
                      },
                    },
                    block: {
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">
                          {children}
                        </h3>
                      ),
                      normal: ({ children }) => (
                        <p className="mb-4">{children}</p>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400">
                          {children}
                        </blockquote>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
                      ),
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-800 my-12" />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Artikel Terkait
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related._id} href={`/artikel/${related.slug.current}`}>
                    <div
                      className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 h-full cursor-pointer hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600 transition-all"
                    >
                      {related.image && (
                        <div className="h-40 overflow-hidden bg-gray-200 dark:bg-gray-800 relative w-full">
                          <Image
                            src={urlFor(related.image).width(300).height(160).url()}
                            alt={related.image.alt || related.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {related.excerpt}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(related.publishedAt).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
