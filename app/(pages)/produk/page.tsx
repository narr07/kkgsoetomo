'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import { urlFor } from '@/sanity/lib/image';
import useSWR from 'swr';

interface SanityImage {
  asset?: {
    _ref?: string;
    url?: string;
    metadata?: {
      lqip?: string;
    };
  };
  alt?: string;
}

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  category?: { title: string };
  price?: number;
  discount?: number;
  stock: number;
  image?: SanityImage;
  featured?: boolean;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const handleOrderWhatsApp = (productName: string) => {
  const phoneNumber = '6285721340777';
  const message = `Halo  😊, Saya ingin membeli ${productName}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export default function ProdukPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: products, error } = useSWR<Product[]>(
    '/api/products',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
    }
  );

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(
      (products || [])
        .map((p) => p.category?.title)
        .filter((c): c is string => Boolean(c))
    );
    return Array.from(cats);
  }, [products]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(
    () =>
      (products || []).filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || product.category?.title === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, searchQuery, selectedCategory]
  );

  const getImageUrl = (image: SanityImage | undefined) => {
    if (!image) return null;
    try {
      return urlFor(image).width(400).height(300).url();
    } catch {
      return null;
    }
  };

  const getBlurPlaceholder = (image: SanityImage | undefined) => {
    if (!image?.asset?.metadata?.lqip) return undefined;
    return image.asset.metadata.lqip;
  };

  const calculateDiscount = (price: number, discount: number) => {
    return Math.round(price - (price * discount) / 100);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-secondary-50 mb-4">
              Produk & Layanan
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Produk dan layanan unggulan untuk pengembangan profesional guru
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-secondary-50'
                    : 'border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-secondary-50 hover:bg-gray-50 dark:hover:bg-gray-900'
                }`}
              >
                Semua
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-secondary-50'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-secondary-50 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-secondary-50 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400 mb-8">
              <p className="font-semibold mb-1">Gagal memuat data produk</p>
              <p className="text-sm">Silakan coba refresh halaman</p>
            </div>
          )}

          {/* Stats Bar */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            Menampilkan <span className="font-semibold text-gray-900 dark:text-secondary-50">{filteredProducts.length}</span> dari <span className="font-semibold text-gray-900 dark:text-secondary-50">{(products || []).length}</span> produk
          </div>

          {/* Products Grid */}
          {!error && filteredProducts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-2 transition-all"
                >
                  {/* Product Image */}
                  {product.image ? (
                    <div className="relative w-full h-40 bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={getImageUrl(product.image) || ''}
                        alt={product.image.alt || product.name}
                        fill
                        className="object-cover"
                        placeholder={getBlurPlaceholder(product.image) ? 'blur' : 'empty'}
                        blurDataURL={getBlurPlaceholder(product.image)}
                      />
                    </div>
                  ) : (
                    <div className="bg-linear-to-br from-purple-400 to-blue-600 h-40 flex items-center justify-center hover:shadow-inner transition-shadow">
                      <span className="text-secondary-50 text-sm font-medium">Gambar Produk</span>
                    </div>
                  )}

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                        {product.category?.title || 'Uncategorized'}
                      </span>
                      {product.featured && (
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                          ⭐ Unggulan
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-secondary-50 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {product.price && (
                      <div className="mb-4">
                        {product.discount ? (
                          <div className="flex gap-2 items-center">
                            <span className="text-sm line-through text-gray-500">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              Rp {calculateDiscount(product.price, product.discount).toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                              -{product.discount}%
                            </span>
                          </div>
                        ) : (
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            Rp {product.price.toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                      Stok: {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 bg-blue-600 text-secondary-50 py-2 rounded-lg font-medium transition hover:bg-blue-700 active:scale-95">
                        Lihat Detail
                      </button>
                      <button 
                        onClick={() => handleOrderWhatsApp(product.name)}
                        className="flex-1 bg-green-600 text-secondary-50 py-2 rounded-lg font-medium transition hover:bg-green-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        disabled={product.stock === 0}
                        title="Pesan melalui WhatsApp"
                      >
                        <span>💬</span>
                        <span>{product.stock > 0 ? 'Order' : 'Habis'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!error && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {products && products.length > 0
                  ? 'Tidak ada produk yang sesuai dengan pencarian Anda'
                  : 'Belum ada produk yang tersedia'}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
