'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import { galleryBySlugQuery } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

export default function GaleriDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await client.fetch(galleryBySlugQuery, { slug });
        if (!data) {
          setError('Galeri tidak ditemukan');
          setGallery(null);
        } else {
          setGallery(data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Gagal memuat galeri');
      }
    }

    fetchGallery();
  }, [slug]);

  const handlePrevious = useCallback(() => {
    if (gallery) {
      setSelectedIndex((prev) => (prev === 0 ? gallery.images.length - 1 : prev - 1));
    }
  }, [gallery]);

  const handleNext = useCallback(() => {
    if (gallery) {
      setSelectedIndex((prev) => (prev === gallery.images.length - 1 ? 0 : prev + 1));
    }
  }, [gallery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          setIsLightboxOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrevious]);

  if (error || !gallery) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {error || 'Galeri tidak ditemukan'}
            </h1>
            <Link href="/galeri">
              <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                ← Kembali ke Galeri
              </button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currentImage = gallery.images[selectedIndex];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/galeri">
            <button className="text-blue-600 dark:text-blue-400 font-semibold mb-8 flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              ← Kembali ke Galeri
            </button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {gallery.title}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 dark:text-gray-400">
              <p className="text-lg">{gallery.description}</p>
              <div className="md:border-l md:border-gray-300 md:dark:border-gray-700 md:pl-4">
                <p className="text-sm">
                  📅 {new Date(gallery.date).toLocaleDateString('id-ID')}
                </p>
              </div>
              <div className="md:border-l md:border-gray-300 md:dark:border-gray-700 md:pl-4">
                <p className="text-sm">
                  📷 {gallery.images.length} foto
                </p>
              </div>
            </div>
          </div>

          {/* Lightbox */}
          {isLightboxOpen && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Main Image */}
              <div className="relative w-full h-full max-w-4xl max-h-96 md:max-h-screen">
                <Image
                  src={urlFor(currentImage).width(1200).height(800).auto('format').url()}
                  alt={currentImage.alt || 'Gallery image'}
                  fill
                  className={`object-contain ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                  sizes="(max-width: 768px) 100vw, 90vw"
                  onClick={() => setIsZoomed(!isZoomed)}
                  priority
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-colors"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                {selectedIndex + 1} / {gallery.images.length}
              </div>

              {/* Caption */}
              {currentImage.caption && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-lg max-w-xs text-center text-sm">
                  {currentImage.caption}
                </div>
              )}
            </div>
          )}

          {/* Main Gallery View */}
          <div className="mb-12">
            <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 hover:shadow-lg transition-shadow cursor-pointer group">
              <Image
                src={urlFor(gallery.images[selectedIndex]).width(1200).height(800).auto('format').url()}
                alt={gallery.images[selectedIndex].alt || 'Gallery image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
                placeholder={
                  gallery.images[selectedIndex].asset?.metadata?.lqip
                    ? 'blur'
                    : 'empty'
                }
                blurDataURL={gallery.images[selectedIndex].asset?.metadata?.lqip}
              />

              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium">
                {selectedIndex + 1} / {gallery.images.length}
              </div>

              {/* Navigation Buttons */}
              {gallery.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Previous"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 md:p-3 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Next"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/90 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                ⛶ Fullscreen
              </button>

              {/* Caption */}
              {gallery.images[selectedIndex].caption && (
                <div className="absolute bottom-4 left-4 right-12 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                  {gallery.images[selectedIndex].caption}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Semua Foto
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {gallery.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all hover:border-blue-500 ${
                    selectedIndex === index
                      ? 'border-blue-600 dark:border-blue-400 ring-2 ring-blue-500'
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <Image
                    src={urlFor(image).width(120).height(96).auto('format').url()}
                    alt={image.alt || 'Thumbnail'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                  />
                  {selectedIndex === index && (
                    <div className="absolute inset-0 bg-blue-500/20" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
