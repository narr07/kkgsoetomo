'use client';

import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface GalleryImage {
  _key: string
  asset: { _id: string; url: string; metadata?: { lqip?: string } }
  alt?: string
  caption?: string
}

interface Gallery {
  _id: string
  title: string
  slug: { current: string }
  date: string
  thumbnail: {
    asset: { _id: string; url: string; metadata?: { lqip?: string } }
    alt?: string
  }
  images: GalleryImage[]
}

interface LastGaleriClientProps {
  galleries: Gallery[]
}

export default function LastGaleriClient({ galleries }: LastGaleriClientProps) {
  if (!galleries || galleries.length === 0) {
    return null;
  }

  // Get latest 10 gallery images sorted by date
  const latestGalleries = galleries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  // Flatten all images from galleries
  const allImages = latestGalleries.flatMap((gallery) =>
    gallery.images.map((img) => ({
      ...img,
      galleryTitle: gallery.title,
      galleryDate: gallery.date,
      gallerySlug: gallery.slug.current,
    }))
  ).slice(0, 10);

  if (allImages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
           
          <h2 className="mt-3 text-3xl font-bold text-primary-900 dark:text-secondary-50">
            Kegiatan KKG Terbaru
          </h2>
          <p className="mt-4 text-primary-900 dark:text-secondary-50">
            Koleksi foto terbaru dari kegiatan dan acara kami
          </p>
        </div>

        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {allImages.map((image, idx) => (
              <CarouselItem key={`${image._key}-${idx}`} className="md:basis-1/2 lg:basis-1/2">
                <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src={urlFor(image).width(800).height(450).url()}
                    alt={image.alt || image.caption || 'Gallery image'}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    placeholder={image.asset?.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={image.asset?.metadata?.lqip}
                  />
                  {image.caption && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm line-clamp-2">{image.caption}</p>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation buttons at bottom - INSIDE Carousel */}
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious className="relative inset-auto h-10 w-10" />
            <CarouselNext className="relative inset-auto h-10 w-10" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
