'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import { urlFor } from '@/sanity/lib/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TeamCardProps {
  member: MemberData;
  onSelect: (member: MemberData) => void;
  getImageUrl: (image: SanityImage | undefined) => string | null;
  getBlurPlaceholder: (image: SanityImage | undefined) => string | undefined;
}

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

interface MemberData {
  _id: string;
  name: string;
  role: string;
  school: string;
  image?: SanityImage;
  slug: { current: string };
}

interface AnggotaClientProps {
  members: MemberData[];
}

export default function AnggotaClient({ members }: AnggotaClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

  // Disable scroll when modal is open
  React.useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMember]);

  // Get unique schools for filter
  const uniqueSchools = useMemo(() => {
    const schools = new Set((members || []).map((m) => m.school));
    return Array.from(schools).sort();
  }, [members]);

  const filteredMembers = useMemo(
    () =>
      (members || []).filter(
        (member) => {
          const matchesSearch =
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.role.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesSchool =
            selectedSchool === 'all' || member.school === selectedSchool;

          return matchesSearch && matchesSchool;
        }
      ),
    [members, searchQuery, selectedSchool]
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
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block mb-2 px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full">
              Tim Kami
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-secondary-50 mb-4">
              Tim Anggota Kami
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Anggota-anggota profesional dan berdedikasi dari Kelompok Kerja Guru yang siap membantu pendidikan berkualitas.
            </p>
          </div>

          {/* Filter/Search Section */}
          <div className="mb-12 space-y-4">
            {/* Search Input with Clear Button */}
            <div className="relative max-w-2xl  mx-auto">
              <input
                type="text"
                placeholder="Cari anggota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" px-4 w-full py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-secondary-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* School Filter Select */}
            <div className="max-w-xl mx-auto justify-center">
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Sekolah" />
              </SelectTrigger>
              <SelectContent
                position="popper"
              >
              
            
                <SelectItem value="all">Semua Sekolah</SelectItem>
                {uniqueSchools.map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </div>

          {/* Members Grid */}
          <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
            {filteredMembers.map((member) => (
              <TeamCard
                key={member._id}
                member={member}
                onSelect={setSelectedMember}
                getImageUrl={getImageUrl}
                getBlurPlaceholder={getBlurPlaceholder}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchQuery
                  ? `Tidak ada anggota yang cocok dengan "${searchQuery}"`
                  : 'Belum ada anggota yang terdaftar'}
              </p>
            </div>
          )}

          {/* Statistics */}
          {filteredMembers.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Menampilkan {filteredMembers.length} dari {(members || []).length} anggota
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Detail Anggota */}
      <AnimatePresence mode="wait">
        {selectedMember && (
          <MemberModal
            key={selectedMember._id}
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            getImageUrl={getImageUrl}
            getBlurPlaceholder={getBlurPlaceholder}
          />
        )}
      </AnimatePresence>
    </PageTransition>
  );
}

// Team Card Component
function TeamCard({
  member,
  onSelect,
  getImageUrl,
  getBlurPlaceholder,
}: TeamCardProps) {
  const imageUrl = getImageUrl(member.image);

  return (
    <div className="w-full">
      <div
        onClick={() => onSelect(member)}
        className="relative overflow-hidden rounded-lg cursor-pointer group"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-3/4 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              placeholder={getBlurPlaceholder(member.image) ? 'blur' : 'empty'}
              blurDataURL={getBlurPlaceholder(member.image)}
            />
          ) : (
            <span className="text-5xl text-white font-bold opacity-70">
              {member.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Info Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 w-full p-3 translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
          <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-3 py-3 shadow-lg">
            {/* Background Decorative Elements */}
            <div className="absolute bottom-0 left-0">
              <svg
                width="41"
                height="20"
                viewBox="0 0 61 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="45"
                  r="45"
                  fill="#13C296"
                  fillOpacity="0.11"
                />
              </svg>
            </div>
            <div className="absolute right-0 top-0">
              <svg
                width="14"
                height="18"
                viewBox="0 0 20 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="0.706257"
                  cy="24.3533"
                  r="0.646687"
                  transform="rotate(-90 0.706257 24.3533)"
                  fill="#3056D3"
                />
                <circle
                  cx="6.39669"
                  cy="24.3533"
                  r="0.646687"
                  transform="rotate(-90 6.39669 24.3533)"
                  fill="#3056D3"
                />
                <circle
                  cx="12.0881"
                  cy="24.3533"
                  r="0.646687"
                  transform="rotate(-90 12.0881 24.3533)"
                  fill="#3056D3"
                />
                <circle
                  cx="17.7785"
                  cy="24.3533"
                  r="0.646687"
                  transform="rotate(-90 17.7785 24.3533)"
                  fill="#3056D3"
                />
                <circle
                  cx="0.706257"
                  cy="18.6624"
                  r="0.646687"
                  transform="rotate(-90 0.706257 18.6624)"
                  fill="#3056D3"
                />
                <circle
                  cx="6.39669"
                  cy="18.6624"
                  r="0.646687"
                  transform="rotate(-90 6.39669 18.6624)"
                  fill="#3056D3"
                />
                <circle
                  cx="12.0881"
                  cy="18.6624"
                  r="0.646687"
                  transform="rotate(-90 12.0881 18.6624)"
                  fill="#3056D3"
                />
                <circle
                  cx="17.7785"
                  cy="18.6624"
                  r="0.646687"
                  transform="rotate(-90 17.7785 18.6624)"
                  fill="#3056D3"
                />
                <circle
                  cx="0.706257"
                  cy="12.9717"
                  r="0.646687"
                  transform="rotate(-90 0.706257 12.9717)"
                  fill="#3056D3"
                />
                <circle
                  cx="6.39669"
                  cy="12.9717"
                  r="0.646687"
                  transform="rotate(-90 6.39669 12.9717)"
                  fill="#3056D3"
                />
                <circle
                  cx="12.0881"
                  cy="12.9717"
                  r="0.646687"
                  transform="rotate(-90 12.0881 12.9717)"
                  fill="#3056D3"
                />
                <circle
                  cx="17.7785"
                  cy="12.9717"
                  r="0.646687"
                  transform="rotate(-90 17.7785 12.9717)"
                  fill="#3056D3"
                />
                <circle
                  cx="0.706257"
                  cy="7.28077"
                  r="0.646687"
                  transform="rotate(-90 0.706257 7.28077)"
                  fill="#3056D3"
                />
                <circle
                  cx="6.39669"
                  cy="7.28077"
                  r="0.646687"
                  transform="rotate(-90 6.39669 7.28077)"
                  fill="#3056D3"
                />
                <circle
                  cx="12.0881"
                  cy="7.28077"
                  r="0.646687"
                  transform="rotate(-90 12.0881 7.28077)"
                  fill="#3056D3"
                />
                <circle
                  cx="17.7785"
                  cy="7.28077"
                  r="0.646687"
                  transform="rotate(-90 17.7785 7.28077)"
                  fill="#3056D3"
                />
                <circle
                  cx="0.706257"
                  cy="1.58989"
                  r="0.646687"
                  transform="rotate(-90 0.706257 1.58989)"
                  fill="#3056D3"
                />
                <circle
                  cx="6.39669"
                  cy="1.58989"
                  r="0.646687"
                  transform="rotate(-90 6.39669 1.58989)"
                  fill="#3056D3"
                />
                <circle
                  cx="12.0881"
                  cy="1.58989"
                  r="0.646687"
                  transform="rotate(-90 12.0881 1.58989)"
                  fill="#3056D3"
                />
                <circle
                  cx="17.7785"
                  cy="1.58989"
                  r="0.646687"
                  transform="rotate(-90 17.7785 1.58989)"
                  fill="#3056D3"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="relative">
                <h3 className="text-[10px] sm:text-xs font-sans font-semibold text-gray-900 dark:text-white line-clamp-2 ">
                  {member.name}
                </h3>
              </div>
              <p className="text-[8px] sm:text-[10px]  text-blue-600 dark:text-blue-400 font-medium line-clamp-1 mt-1">
                {member.role}
              </p>
            </div>
          </div>
                {/* School Badge - Absolute */}
                <span className="absolute bottom-2 right-2 inline-block px-2 py-0.5 text-xs font-semibold text-[8px] sm:text-[10px]  text-white bg-blue-600 dark:bg-blue-500 rounded whitespace-nowrap">
                  {member.school}
                </span>
        </div>
      </div>
    </div>
  );
}

// Member Modal Component
function MemberModal({
  member,
  onClose,
  getImageUrl,
  getBlurPlaceholder,
}: {
  member: MemberData;
  onClose: () => void;
  getImageUrl: (image: SanityImage | undefined) => string | null;
  getBlurPlaceholder: (image: SanityImage | undefined) => string | undefined;
}) {
  const imageUrl = getImageUrl(member.image);

  return (
    <>
      {/* Backdrop - Full screen clickable area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-primary-900/80  z-1"
        onClick={onClose}
      />

      {/* Modal Wrapper - Centers the modal and handles clicks */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content - Prevent click propagation only for card */}
        <div
          className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[calc(100vh-32px)] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative w-full h-[400px] bg-linear-to-br from-blue-400 to-blue-600 flex items-start justify-center overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover object-top"
                placeholder={getBlurPlaceholder(member.image) ? 'blur' : 'empty'}
                blurDataURL={getBlurPlaceholder(member.image)}
              />
            ) : (
              <span className="text-9xl text-white font-bold opacity-70">
                {member.name.charAt(0).toUpperCase()}
              </span>
            )}
            
            {/* Close Button - Absolute on Image */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white dark:bg-gray-800/90  dark:hover:bg-gray-800 rounded-full transition-colors z-10 shadow-lg"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 text-gray-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {member.name}
            </h2>
            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
              {member.role}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Sekolah
                </p>
                <p className="text-gray-900 dark:text-gray-100 mt-1">
                  {member.school}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
