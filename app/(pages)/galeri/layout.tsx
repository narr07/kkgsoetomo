import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri - KKG dr. Soetomo',
  description: 'Galeri dan dokumentasi kegiatan KKG dr. Soetomo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/galeri',
    title: 'Galeri - KKG dr. Soetomo',
    description: 'Galeri dan dokumentasi kegiatan KKG dr. Soetomo',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Galeri KKG')}&description=${encodeURIComponent('Dokumentasi kegiatan dan momen berharga')}`,
        width: 1200,
        height: 630,
        alt: 'Galeri KKG dr. Soetomo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galeri - KKG dr. Soetomo',
    description: 'Galeri dan dokumentasi kegiatan KKG dr. Soetomo',
    images: [`/api/og?title=${encodeURIComponent('Galeri KKG')}&description=${encodeURIComponent('Dokumentasi kegiatan dan momen berharga')}`],
  },
};

export default function GaleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
