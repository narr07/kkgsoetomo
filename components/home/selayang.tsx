'use client';

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { selayangPandangQuery } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(selayangPandangQuery);
        setData(result);
      } catch (error) {
        console.error('Error fetching selayang pandang:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f6f7de] py-16 px-4 transition-colors dark:bg-[#181f25]">
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
      name: data.ketua_kkg.name,
      role: 'Ketua KKG',
      message: data.ketua_kkg.message,
      photo: data.ketua_kkg.photo,
    },
    {
      name: data.ketua_gugus.name,
      role: 'Ketua Gugus',
      message: data.ketua_gugus.message,
      photo: data.ketua_gugus.photo,
    },
  ];

  return (
    <section className="bg-[#f6f7de] py-16 px-4 transition-colors dark:bg-[#181f25]">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#293466] dark:text-[#f8ef25]">
            Selayang Pandang
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#181f25] dark:text-[#f6f7de]">
            Sambutan Pimpinan
          </h2>
          <p className="mt-4 text-[#293466] dark:text-[#f6f7de]">
            Pesan hangat dari para pemimpin kami untuk seluruh anggota komunitas.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {leaders.map((leader) => (
            <Card
              key={leader.role}
              className="border-[#d9dec2] bg-card text-card-foreground transition-colors dark:border-[#232a36]"
            >
              <CardHeader className="items-center gap-3 text-center">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#f8ef25] shadow-lg">
                  <Image
                    src={urlFor(leader.photo).width(112).height(112).url()}
                    alt={leader.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl text-inherit">
                    {leader.name}
                  </CardTitle>
                  <CardDescription className="mt-1 uppercase tracking-wide text-[#293466] dark:text-[#f8ef25]">
                    {leader.role}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center text-[#293466] dark:text-[#f6f7de]">
                  &quot;{leader.message}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}