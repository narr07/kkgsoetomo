import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Produk - KKG dr. Soetomo',
  description: 'Produk dan hasil karya KKG dr. Soetomo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/produk',
    title: 'Produk - KKG dr. Soetomo',
    description: 'Produk dan hasil karya KKG dr. Soetomo',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Produk KKG')}&description=${encodeURIComponent('Produk dan hasil karya inovatif')}`,
        width: 1200,
        height: 630,
        alt: 'Produk KKG dr. Soetomo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Produk - KKG dr. Soetomo',
    description: 'Produk dan hasil karya KKG dr. Soetomo',
    images: [`/api/og?title=${encodeURIComponent('Produk KKG')}&description=${encodeURIComponent('Produk dan hasil karya inovatif')}`],
  },
};

export default function ProdukLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
