import type { Metadata } from "next";
import { Boldonse, Bricolage_Grotesque, Ubuntu } from "next/font/google";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - allow importing global css without type declarations
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import GoogleTagManager from "@/components/GoogleTagManager"
import GoogleAnalytics from "@/components/GoogleAnalytics"

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
  title: "KKG dr. Soetomo - Kecamatan Rajagaluh",
  description: "Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: "KKG dr. Soetomo - Kecamatan Rajagaluh-Majalengka",
    description: "Platform Kelompok Kerja Guru untuk kolaborasi, edukasi, dan inovasi dalam pendidikan",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'KKG dr. Soetomo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "KKG dr Soetomo - Kec. Rajagaluh",
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
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${bricolageGrotesque.variable} ${ubuntu.variable} ${boldOnse.variable} antialiased`}
      >
        <GoogleTagManager />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
