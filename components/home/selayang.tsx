'use client';
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetch } from '@/sanity/lib/client'
import { selayangPandangQuery } from '@/sanity/lib/queries'
import {
  Card,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
interface SanityImage {
  _type?: string;
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
    };
  };
  hotspot?: Record<string, unknown>;
  crop?: Record<string, unknown>;
  alt?: string;
}
interface Leader {
  name: string;
  message: string;
  photo: SanityImage;
}
interface SelayangPandang {
  title: string;
  ketua_kkg: Leader;
  ketua_gugus: Leader;
}

export default function Selayang() {
  const [data, setData] = useState<SelayangPandang | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSelayang = async () => {
      try {
        setIsLoading(true);
        const selayangData = await sanityFetch({
          query: selayangPandangQuery,
          revalidate: 60,
        });
        setData(selayangData);
      } catch (error) {
        console.error('Error fetching selayang pandang data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelayang();
  }, []);
  if (isLoading) {
    return (
      <section className="bg-secondary-50 py-16 px-4 transition-colors dark:bg-primary-900">
        <div className="mx-auto flex max-w-5xl flex-col gap-12">
          <div className="h-40 animate-pulse" />
        </div>
      </section>
    );
  }
  if (!data) {
    return null;
  }
  const leaders = [
    {
      name: data.ketua_gugus.name,
      role: 'Ketua Gugus',
      message: data.ketua_gugus.message,
      photo: data.ketua_gugus.photo,
    },
    {
      name: data.ketua_kkg.name,
      role: 'Ketua KKG',
      message: data.ketua_kkg.message,
      photo: data.ketua_kkg.photo,
    },

  ];
  return (
    <section className=" py-16 px-4 transition-colors   ">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-900 dark:text-secondary-400">
            Selayang Pandang
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-900 dark:text-secondary-50">
            Sambutan Pimpinan
          </h2>
          <p className="mt-4 text-primary-900 dark:text-secondary-50">
            Pesan hangat dari para pemimpin kami untuk seluruh anggota komunitas.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {leaders.map((leader) => (
            <Card
              key={leader.role}
              className="flex flex-col overflow-hidden"
            >
              <div className="flex gap-6 px-6">
                <div className="relative h-44 w-32 shrink-0 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={urlFor(leader.photo).width(128).height(168).url()}
                    alt={leader.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                    placeholder={leader.photo.asset?.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={leader.photo.asset?.metadata?.lqip}
                  />
                </div>
                <div className="flex flex-col justify-start flex-1">
                  <CardTitle className="text-xl font-black text-inherit">
                    {leader.name}
                  </CardTitle>
                  <CardDescription className="mt-2 uppercase tracking-wide text-[#293466] dark:text-secondary-400">
                    {leader.role}
                  </CardDescription>
                  <p className="mt-8 text-[#293466] dark:text-secondary-50">
                    &quot;{leader.message}&quot;
                  </p>
                </div>
              </div>

            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}