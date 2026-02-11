'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import { urlFor } from '@/sanity/lib/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface TeamCardProps {
  member: MemberData;
  onSelect: (member: MemberData) => void;
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
      return urlFor(image).width(400).height(400).url();
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
                placeholder="Cari anggota... (Nama, Sekolah, Jabatan)"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <TeamCard
                key={member._id}
                member={member}
                onSelect={setSelectedMember}
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

      {/* Modal Detail Anggota using shadcn/ui Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none shadow-2xl flex flex-col max-h-[90vh]">
          {selectedMember && (
            <>
              {/* Sticky Header with Name */}
              <DialogHeader className="sticky top-0 z-20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4 shrink-0">
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedMember.name}
                </DialogTitle>
                <DialogDescription className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  {selectedMember.role}
                </DialogDescription>
              </DialogHeader>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto">
                {/* Photo Area - Small Portrait Centered */}
                <div className="flex items-center justify-center py-6 bg-gray-50 dark:bg-gray-800/50">
                  <div className="relative w-32 h-40 rounded-lg overflow-hidden shadow-xl bg-linear-to-br from-blue-400 to-blue-600">
                    {getImageUrl(selectedMember.image) ? (
                      <Image
                        src={getImageUrl(selectedMember.image)!}
                        alt={selectedMember.name}
                        fill
                        sizes="128px"
                        className="object-cover object-top"
                        placeholder={getBlurPlaceholder(selectedMember.image) ? 'blur' : 'empty'}
                        blurDataURL={getBlurPlaceholder(selectedMember.image)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl text-white font-bold opacity-70">
                          {selectedMember.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 pb-20">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Sekolah
                      </p>
                      <p className="text-base text-gray-900 dark:text-gray-100 mt-1">
                        {selectedMember.school}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <DialogFooter className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 shrink-0">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/30"
                >
                  Tutup
                </button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageTransition>
  );
}

// Team Card Component - Redesigned to match horizontal layout without photos
function TeamCard({
  member,
  onSelect,
}: TeamCardProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <div
      onClick={() => onSelect(member)}
      className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 transition-all duration-300 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900/40 cursor-pointer overflow-hidden flex items-center gap-2"
    >
      {/* Decorative Background for Group Effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 dark:bg-blue-900/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />

      {/* Avatar Placeholder (Circular) */}
      <div className="relative z-10 w-8 h-8  rounded-full bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center shrink-0">
        <span className="text-base  font-bold text-gray-400 dark:text-gray-300">
          {initials}
        </span>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="text-sm  tracking-wide font-black text-gray-900 dark:text-white truncate group-hover:text-secondary-500 dark:group-hover:text-secondary-500 transition-colors">
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
          {member.school}
        </p>
      </div>
    </div>
  );
}

