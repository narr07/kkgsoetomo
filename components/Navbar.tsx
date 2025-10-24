'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {DarkMode} from './DarkMode';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/anggota', label: 'Anggota' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/produk', label: 'Produk' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">KKG</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white hidden sm:inline">
              KKG Soetomo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link, index) => (
              <div key={link.href}>
                <Link href={link.href} className={`font-medium transition ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
<DarkMode />
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition"
          >
            <span className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-0.5 bg-gray-900 dark:bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-56' : 'max-h-0'}`}>
          <div className="pb-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded transition ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
