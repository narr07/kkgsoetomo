'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { DarkMode } from './DarkMode';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/anggota', label: 'Anggota' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/produk', label: 'Produk' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#293466] text-[#f6f7de] shadow-md transition-colors dark:bg-[#181f25]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8ef25] transition-transform hover:scale-110">
              <span className="text-lg font-bold text-[#293466]">KKG</span>
            </div>
            <span className="hidden font-bold text-[#f6f7de] dark:text-[#f6f7de] sm:inline">
              KKG Soetomo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#f8ef25]'
                    : 'text-[#f6f7de] hover:text-[#f8ef25]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <DarkMode />
          </div>
          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <DarkMode />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-1.5 rounded p-2 transition hover:bg-[#1f2743] dark:hover:bg-[#232a36]"
            >
              <span className={`h-0.5 w-6 bg-[#f6f7de] transition-all dark:bg-[#f8ef25] ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 w-6 bg-[#f6f7de] transition-all dark:bg-[#f8ef25] ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`h-0.5 w-6 bg-[#f6f7de] transition-all dark:bg-[#f8ef25] ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen ? 'max-h-56' : 'max-h-0'}`}>
          <div className="space-y-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded px-4 py-2 transition-colors ${
                  pathname === link.href
                    ? 'bg-[#1f2743] text-[#f8ef25] dark:bg-[#232a36]'
                    : 'text-[#f6f7de] hover:bg-[#1f2743] dark:hover:bg-[#232a36]'
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
