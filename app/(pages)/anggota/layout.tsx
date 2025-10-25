import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anggota - KKG dr. Soetomo',
  description: 'Daftar anggota-anggota aktif Kelompok Kerja Guru dr. Soetomo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/anggota',
    title: 'Anggota - KKG dr. Soetomo',
    description: 'Daftar anggota-anggota aktif Kelompok Kerja Guru dr. Soetomo',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Anggota KKG')}&description=${encodeURIComponent('Daftar anggota aktif Kelompok Kerja Guru')}`,
        width: 1200,
        height: 630,
        alt: 'Anggota KKG dr. Soetomo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anggota - KKG dr. Soetomo',
    description: 'Daftar anggota-anggota aktif Kelompok Kerja Guru dr. Soetomo',
    images: [`/api/og?title=${encodeURIComponent('Anggota KKG')}&description=${encodeURIComponent('Daftar anggota aktif Kelompok Kerja Guru')}`],
  },
};

export default function AnggotaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
