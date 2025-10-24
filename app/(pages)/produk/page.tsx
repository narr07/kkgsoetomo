'use client';

import React from 'react';
import PageTransition from '@/components/PageTransition';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price?: number;
  image?: string;
}

// Mock data - akan diganti dengan data dari Sanity
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Buku Panduan Mengajar Efektif',
    description: 'Panduan komprehensif untuk meningkatkan kualitas mengajar...',
    category: 'Buku',
    price: 150000,
  },
  {
    id: 2,
    name: 'Video Tutorial Metode Pembelajaran',
    description: 'Koleksi video tutorial tentang metode pembelajaran terkini...',
    category: 'Video',
    price: 200000,
  },
  {
    id: 3,
    name: 'Template Rencana Pembelajaran',
    description: 'Template siap pakai untuk menyusun rencana pembelajaran...',
    category: 'Template',
    price: 50000,
  },
  {
    id: 4,
    name: 'Webinar Pendidikan Berkelanjutan',
    description: 'Sertifikat webinar pendidikan profesional untuk guru...',
    category: 'Sertifikat',
    price: 300000,
  },
  {
    id: 5,
    name: 'Toolkit Penilaian Pembelajaran',
    description: 'Alat lengkap untuk menilai hasil belajar siswa...',
    category: 'Toolkit',
    price: 100000,
  },
  {
    id: 6,
    name: 'Forum Diskusi Eksklusif',
    description: 'Akses ke forum diskusi eksklusif untuk member premium...',
    category: 'Membership',
    price: 250000,
  },
];

export default function ProdukPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Produk & Layanan
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Produk dan layanan unggulan untuk pengembangan profesional guru
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white transition hover:bg-blue-700">
                Semua
              </button>
              {['Buku', 'Video', 'Template'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-2 transition-all"
              >
                {/* Product Image Placeholder */}
                <div className="bg-linear-to-br from-purple-400 to-blue-600 h-40 flex items-center justify-center hover:shadow-inner transition-shadow">
                  <span className="text-white text-sm font-medium">Gambar Produk</span>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {product.description}
                  </p>

                  {product.price && (
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  )}

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium transition hover:bg-blue-700 active:scale-95">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {mockProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Belum ada produk yang tersedia
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
