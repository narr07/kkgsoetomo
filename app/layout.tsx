import type { Metadata } from "next";
import { Boldonse, Bricolage_Grotesque, Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider"
import { SWRProvider } from "@/components/swr-provider"

const boldOnse = Boldonse({
  weight: "400",
  variable: "--font-boldonse",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "KKG Soetomo - Kelompok Kerja Guru",
  description: "Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: "KKG Soetomo - Kelompok Kerja Guru",
    description: "Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'KKG Soetomo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "KKG Soetomo - Kelompok Kerja Guru",
    description: "Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan",
    images: ['/opengraph-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${bricolageGrotesque.variable} ${ubuntu.variable} ${boldOnse.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SWRProvider>
            <Navbar />
            {children}
            <Footer />
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
