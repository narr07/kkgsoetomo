"use client";

import React from 'react';
import AnimatedDiv from '@/components/AnimatedDiv';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 py-20 px-4 overflow-hidden relative">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold  text-white mb-6">
              Kelompok Kerja Guru
            </h1>

            <p className="text-lg text-blue-100 mb-8">
              Bersama membangun pendidikan yang lebih baik untuk generasi masa depan
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl">
                Pelajari Lebih Lanjut
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition shadow-lg hover:shadow-xl">
                Hubungi Kami
              </button>
            </div>
          </div>
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
              ].map((feature) => (
                <Card
                  key={feature.title}
                  className="hover:shadow-lg transition-shadow border-blue-100/60 dark:border-blue-900/40"
                >
                  <CardHeader className="flex flex-col gap-3">
                    <span className="text-3xl" aria-hidden>
                      {feature.icon}
                    </span>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
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

            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
              Daftar Sekarang
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
