'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  image: {
    asset: { _id: string; url: string }
    alt?: string
  }
  author: { name: string }
  category: { title: string }
  publishedAt: string
}

interface LastArticleClientProps {
  articles: Article[]
}

export default function LastArticleClient({ articles }: LastArticleClientProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  // Get latest 5 articles sorted by publishedAt
  const latestArticles = articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-900 dark:text-secondary-400">
            Terbaru
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-900 dark:text-secondary-50">
            Artikel Terbaru
          </h2>
          <p className="mt-4 text-primary-900 dark:text-secondary-50">
            Baca artikel dan berita terkini dari komunitas kami
          </p>
        </div>

        {latestArticles.length <= 3 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <Link
                key={article._id}
                href={`/artikel/${article.slug.current}`}
                className="no-underline"
              >
                <Card className="overflow-hidden flex flex-col hover:shadow-lg   cursor-pointer h-full pt-0 group transition-all">
                  <div className="relative object-cover h-60 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={urlFor(article.image).width(400).height(250).url()}
                      alt={article.image.alt || article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <CardHeader className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-secondary-400 text-xs font-semibold px-2 py-1 rounded">
                        {article.category.title}
                      </span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                    <span>{article.author.name}</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {latestArticles.map((article) => (
                <CarouselItem key={article._id} className="md:basis-1/2 lg:basis-1/3">
                  <Link
                    href={`/artikel/${article.slug.current}`}
                    className="no-underline"
                  >
                    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg hover:scale-105 transition-all cursor-pointer group">
                      <div className="relative h-40 w-full overflow-hidden bg-gray-200">
                        <Image
                          src={urlFor(article.image).width(400).height(250).url()}
                          alt={article.image.alt || article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-secondary-400 text-xs font-semibold px-2 py-1 rounded">
                            {article.category.title}
                          </span>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                        <span>{article.author.name}</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  )
}
