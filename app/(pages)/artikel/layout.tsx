import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artikel & Blog - KKG dr. Soetomo',
  description: 'Berbagi pengetahuan dan pengalaman dalam dunia pendidikan',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/artikel',
    title: 'Artikel & Blog - KKG dr. Soetomo',
    description: 'Berbagi pengetahuan dan pengalaman dalam dunia pendidikan',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Artikel & Blog')}&description=${encodeURIComponent('Berbagi pengetahuan dan pengalaman pendidikan')}`,
        width: 1200,
        height: 630,
        alt: 'Artikel & Blog KKG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel & Blog - KKG dr. Soetomo',
    description: 'Berbagi pengetahuan dan pengalaman dalam dunia pendidikan',
    images: [`/api/og?title=${encodeURIComponent('Artikel & Blog')}&description=${encodeURIComponent('Berbagi pengetahuan dan pengalaman pendidikan')}`],
  },
};

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
