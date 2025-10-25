"use client";

import React from 'react';
import PageTransition from '@/components/PageTransition';
import Hero from '@/components/home/hero';
import Selayang from '@/components/home/selayang';
import AboutUs from '@/components/home/aboutUs';

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        <div className="min-h-screen bg-white dark:bg-black">
          {/* Hero Section */}
          <Hero />
          <Selayang />
          
          {/* About Us Section - From Sanity */}
          <AboutUs />

          {/* CTA Section */}
          <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Bergabunglah Dengan Kami
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Mari bersama-sama memajukan dunia pendidikan Indonesia
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                Daftar Sekarang
              </button>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
