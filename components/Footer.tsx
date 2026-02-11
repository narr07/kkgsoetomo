"use client";

import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "KKG dr. Soetomo",
      content: "Kelompok Kerja Guru berdedikasi untuk meningkatkan kualitas pendidikan Indonesia.",
      type: "about",
    },
    {
      title: "Menu",
      links: [
        { href: "/", label: "Beranda" },
        { href: "/anggota", label: "Anggota" },
        { href: "/artikel", label: "Artikel" },
        { href: "/produk", label: "Produk" },
      ],
      type: "links",
    },
    {
      title: "Kontak",
      items: ["drsooetome@gmail.com", "📍 Majalengka, Indonesia"],
      type: "contact",
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-secondary-50 mt-16 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">KKG dr. Soetomo</h3>
            <p className="text-gray-400">
              Kelompok Kerja Guru berdedikasi untuk meningkatkan kualitas pendidikan Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { href: "/", label: "Beranda" },
                { href: "/anggota", label: "Anggota" },
                { href: "/artikel", label: "Artikel" },
                { href: "/produk", label: "Produk" },
              ].map((link) => (
                <li key={link.href} className="hover:translate-x-1 transition-transform">
                  <Link href={link.href} className="hover:text-secondary-50 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@kkg.id</li>
              <li>📞 (021) 1234-5678</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              {["f", "𝕏", "📷", "▶️"].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-sm hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <p className="text-center text-gray-400">
            © 2025 KKG dr. Soetomo. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
