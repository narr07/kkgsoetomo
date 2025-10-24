'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import AnimatedDiv from '@/components/AnimatedDiv';
import PageTransition from '@/components/PageTransition';
import { client } from '@/sanity/lib/client';
import { allMembersQuery } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';

interface SanityImage {
  asset?: {
    _ref?: string;
    url?: string;
  };
}

interface Member {
  _id: string;
  name: string;
  role: string;
  school: string;
  image?: SanityImage;
  slug: { current: string };
}

export default function AnggotaPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchMembers() {
      try {
        const data = await client.fetch(allMembersQuery);
        setMembers(data || []);
      } catch (error) {
        console.error('Error fetching members:', error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getImageUrl = (image: SanityImage | undefined) => {
    if (!image) return null;
    try {
      return urlFor(image).width(400).height(400).url();
    } catch {
      return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <AnimatedDiv animation="slideDown" duration={0.6}>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Daftar Anggota
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Anggota-anggota aktif Kelompok Kerja Guru
              </p>
            </AnimatedDiv>
          </div>

          {/* Filter/Search Section */}
          <AnimatedDiv animation="fadeIn" delay={0.2} duration={0.6}>
            <motion.div className="mb-8">
              <motion.input
                type="text"
                placeholder="Cari anggota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>
          </AnimatedDiv>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full"></div>
              </motion.div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Memuat data anggota...
              </p>
            </div>
          )}

          {/* Members Grid */}
          {!loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member, index) => (
                <AnimatedDiv
                  key={member._id}
                  animation="scaleIn"
                  delay={index * 0.1}
                  duration={0.6}
                >
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
                    whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Avatar/Image */}
                    <div className="relative h-40 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                      {member.image && getImageUrl(member.image) ? (
                        <Image
                          src={getImageUrl(member.image)!}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <motion.span
                          className="text-6xl text-white font-bold"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, type: 'spring' }}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </motion.span>
                      )}
                    </div>

                    {/* Member Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                        {member.name}
                      </h3>
                      <motion.p
                        className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                      >
                        {member.role}
                      </motion.p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {member.school}
                      </p>
                    </div>
                  </motion.div>
                </AnimatedDiv>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <AnimatedDiv animation="fadeIn">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {searchQuery
                    ? `Tidak ada anggota yang cocok dengan "${searchQuery}"`
                    : 'Belum ada anggota yang terdaftar'}
                </p>
              </AnimatedDiv>
            </div>
          )}

          {/* Statistics */}
          {!loading && filteredMembers.length > 0 && (
            <AnimatedDiv animation="fadeIn" delay={0.5} className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Menampilkan {filteredMembers.length} dari {members.length} anggota
              </p>
            </AnimatedDiv>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
