'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import { allGalleriesQuery } from '@/sanity/lib/queries';
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
  caption?: string;
}

interface Gallery {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  date: string;
  thumbnail: SanityImage;
  images: SanityImage[];
}

export default function GaleriPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchGalleries() {
      try {
        const data = await client.fetch(allGalleriesQuery);
        setGalleries(data || []);
      } catch (error) {
        console.error('Error fetching galleries:', error);
        setGalleries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleries();
  }, []);

  const filteredGalleries = galleries.filter((gallery) =>
    gallery.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gallery.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Galeri Kegiatan
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Dokumentasi kegiatan dan momen berharga KKG
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Cari galeri..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stats Bar */}
          {!loading && (
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Menampilkan <span className="font-semibold text-gray-900 dark:text-white">{filteredGalleries.length}</span> dari <span className="font-semibold text-gray-900 dark:text-white">{galleries.length}</span> galeri
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-full overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-pulse">
                  <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />
                  <CardHeader>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGalleries.length > 0 ? (
                filteredGalleries.map((gallery) => (
                  <Link key={gallery._id} href={`/galeri/${gallery.slug.current}`}>
                    <Card className="h-full overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                        <Image
                          src={urlFor(gallery.thumbnail).width(300).height(192).auto('format').url()}
                          alt={gallery.thumbnail.alt || gallery.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={false}
                          loading="lazy"
                          placeholder={
                            gallery.thumbnail.asset?.metadata?.lqip
                              ? 'blur'
                              : 'empty'
                          }
                          blurDataURL={gallery.thumbnail.asset?.metadata?.lqip}
                        />
                        {/* Image Count Badge */}
                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium">
                          📷 {gallery.images.length}
                        </div>
                      </div>

                      {/* Content */}
                      <CardHeader className="py-3 px-4">
                        <CardTitle className="line-clamp-2 text-lg text-gray-900 dark:text-white">
                          {gallery.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400">
                          {gallery.description}
                        </CardDescription>
                      </CardHeader>

                      {/* Footer */}
                      <CardContent className="py-3 px-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            {new Date(gallery.date).toLocaleDateString('id-ID')}
                          </p>
                          <div className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                            Lihat <span>→</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {searchQuery
                      ? `Tidak ada galeri yang cocok dengan "${searchQuery}"`
                      : 'Belum ada galeri yang dipublikasikan'}
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
