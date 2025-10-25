import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import Hero from '@/components/home/hero';
import Selayang from '@/components/home/selayang';
import AboutUs from '@/components/home/aboutUs';

export const metadata: Metadata = {
  title: 'KKG dr. Soetomo - Kecamatan Rajagaluh',
  description: 'Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'KKG dr. Soetomo - Kecamatan Rajagaluh-Majalengka',
    description: 'Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('KKG dr. Soetomo')}&description=${encodeURIComponent('Kelompok Kerja Guru untuk kolaborasi dan inovasi')}`,
        width: 1200,
        height: 630,
        alt: 'KKG dr. Soetomo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KKG dr Soetomo - Kec. Rajagaluh',
    description: 'Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan',
    images: [`/api/og?title=${encodeURIComponent('KKG dr. Soetomo')}&description=${encodeURIComponent('Kelompok Kerja Guru untuk kolaborasi dan inovasi')}`],
  },
};

export default function HomePage() {
  return (
    <PageTransition>
      <main>
        <div className="min-h-screen bg-white dark:bg-slate-950">
          {/* Hero Section */}
          <Hero />
          <Selayang />
          
          {/* About Us Section - From Sanity */}
          <AboutUs />

          {/* CTA Section */}
          <section className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-secondary-50">
                Bergabunglah Dengan Kami
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Mari bersama-sama memajukan dunia pendidikan Indonesia
              </p>
              <button className="bg-blue-600 text-secondary-50 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                Daftar Sekarang
              </button>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
