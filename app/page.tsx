"use client";

import React from 'react';
import { motion } from 'motion/react';
import AnimatedDiv from '@/components/AnimatedDiv';
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  return (
    <main>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 py-20 px-4 overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h1
              className="text-4xl md:text-5xl font-bold  text-white mb-6"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Kelompok Kerja Guru
            </motion.h1>

            <motion.p
              className="text-lg text-blue-100 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Bersama membangun pendidikan yang lebih baik untuk generasi masa depan
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl">
                Pelajari Lebih Lanjut
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition shadow-lg hover:shadow-xl">
                Hubungi Kami
              </button>
            </motion.div>
          </div>

          {/* Animated background circles */}
          <motion.div
            className="absolute top-10 -right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              x: [0, 15, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-10 -left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              x: [0, -15, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedDiv animation="slideUp" duration={0.6}>
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Tentang Kami
              </h2>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '📚',
                  title: 'Edukasi',
                  description: 'Menyediakan program edukasi dan pelatihan untuk para pendidik',
                },
                {
                  icon: '🤝',
                  title: 'Kolaborasi',
                  description: 'Memfasilitasi kolaborasi antar guru dan institusi pendidikan',
                },
                {
                  icon: '🎯',
                  title: 'Inovasi',
                  description: 'Mengembangkan solusi inovatif untuk tantangan pendidikan modern',
                },
              ].map((feature, index) => (
                <AnimatedDiv
                  key={index}
                  animation="scaleIn"
                  delay={index * 0.15}
                  duration={0.6}
                >
                  <motion.div
                    className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      {feature.icon} {feature.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </motion.div>
                </AnimatedDiv>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedDiv animation="slideUp" duration={0.6}>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Bergabunglah Dengan Kami
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Mari bersama-sama memajukan dunia pendidikan Indonesia
              </p>
            </AnimatedDiv>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Daftar Sekarang
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
