import type { Metadata } from "next";
import { Boldonse, Bricolage_Grotesque, Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bold } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider"

const boldOnse = Boldonse({
  weight: "400",
  variable: "--font-boldonse",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
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
        <Navbar />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
