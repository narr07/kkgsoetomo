'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/anggota', label: 'Anggota' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/produk', label: 'Produk' },
  ];

  return (
    <motion.nav
      className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-lg">KKG</span>
            </motion.div>
            <span className="font-bold text-gray-900 dark:text-white hidden sm:inline">
              KKG Soetomo
            </span>
          </Link>

          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {navLinks.map((link, index) => (
              <motion.div key={link.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
                <Link href={link.href} className="text-gray-700 dark:text-gray-300 font-medium transition">
                  <motion.span
                    whileHover={{ color: '#2563eb', y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="w-6 h-0.5 bg-gray-900 dark:bg-white"
              animate={isOpen ? { rotate: 45, translateY: 8 } : { rotate: 0, translateY: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-gray-900 dark:bg-white"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-gray-900 dark:bg-white"
              animate={isOpen ? { rotate: -45, translateY: -8 } : { rotate: 0, translateY: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pb-4 space-y-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ x: -20, opacity: 0 }}
                animate={isOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
