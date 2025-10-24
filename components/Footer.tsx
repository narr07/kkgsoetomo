"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function Footer() {
  const footerSections = [
    {
      title: "KKG Soetomo",
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
      items: ["📧 info@kkg.id", "📞 (021) 1234-5678", "📍 Jakarta, Indonesia"],
      type: "contact",
    },
  ];

  return (
    <motion.footer
      className="bg-gray-900 dark:bg-black text-white mt-16 py-12 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <h3 className="font-bold text-lg mb-4">KKG Soetomo</h3>
            <p className="text-gray-400">
              Kelompok Kerja Guru berdedikasi untuk meningkatkan kualitas pendidikan Indonesia.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { href: "/", label: "Beranda" },
                { href: "/anggota", label: "Anggota" },
                { href: "/artikel", label: "Artikel" },
                { href: "/produk", label: "Produk" },
              ].map((link) => (
                <motion.li key={link.href} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href={link.href} className="hover:text-white transition">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@kkg.id</li>
              <li>📞 (021) 1234-5678</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              {["f", "𝕏", "📷", "▶️"].map((icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-sm"
                  whileHover={{ scale: 1.1, backgroundColor: "#2563eb" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800 pt-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-center text-gray-400">
            © 2025 KKG Soetomo. Semua hak dilindungi.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
