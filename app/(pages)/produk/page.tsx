import PageTransition from '@/components/PageTransition';
import { sanityFetch } from '@/sanity/lib/client';
import { allProductsQuery } from '@/sanity/lib/queries';
import ProdukClient from './produk-client';

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

export default async function ProdukPage() {
  const products: Product[] = await sanityFetch({
    query: allProductsQuery,
    revalidate: 60,
  });

  return (
    <PageTransition>
      <div className="min-h-screen  py-12 px-4">
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

          {/* Content */}
          <ProdukClient products={products} />
        </div>
      </div>
    </PageTransition>
  );
}
