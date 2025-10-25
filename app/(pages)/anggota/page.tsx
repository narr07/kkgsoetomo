'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import PageTransition from '@/components/PageTransition';
import { urlFor } from '@/sanity/lib/image';

interface SanityImage {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  crop?: Record<string, unknown>;
  hotspot?: Record<string, unknown>;
}

interface Member {
  _id: string;
  name: string;
  role: string;
  school: string;
  image?: SanityImage;
  slug: { current: string };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AnggotaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: members, isLoading, error } = useSWR<Member[]>(
    '/api/members',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      focusThrottleInterval: 300000, // 5 minutes
    }
  );

  const filteredMembers = useMemo(
    () =>
      (members || []).filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.role.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [members, searchQuery]
  );

  const getImageUrl = (image: SanityImage | undefined) => {
    if (!image) return null;
    try {
      return urlFor(image).width(300).height(400).url();
    } catch {
      return null;
    }
  };

  const getBlurPlaceholder = (image: SanityImage | undefined) => {
    if (!image?.asset?.metadata?.lqip) return undefined;
    return image.asset.metadata.lqip;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Daftar Anggota
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Anggota-anggota aktif Kelompok Kerja Guru
            </p>
          </div>

          {/* Filter/Search Section */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Cari anggota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-400"
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden animate-pulse"
                >
                  <div className="w-full aspect-3/4 bg-gray-200 dark:bg-gray-800" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
              <p className="font-semibold mb-1">Gagal memuat data anggota</p>
              <p className="text-sm">Silakan coba refresh halaman</p>
            </div>
          )}

          {/* Members Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  {/* Avatar/Image - Portrait */}
                  <div className="relative w-full aspect-3/4 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                    {member.image && getImageUrl(member.image) ? (
                      <Image
                        src={getImageUrl(member.image)!}
                        alt={member.name}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={getBlurPlaceholder(member.image)}
                      />
                    ) : (
                      <span className="text-5xl text-white font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                      {member.name}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1 line-clamp-1">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {member.school}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchQuery
                  ? `Tidak ada anggota yang cocok dengan "${searchQuery}"`
                  : 'Belum ada anggota yang terdaftar'}
              </p>
            </div>
          )}

          {/* Statistics */}
          {!isLoading && filteredMembers.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Menampilkan {filteredMembers.length} dari {(members || []).length} anggota
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
