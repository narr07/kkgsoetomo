'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { DarkMode } from './DarkMode';
import Logo from './Logo';

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
    <nav className="sticky top-0 z-50 bg-slate-900 text-secondary-50 shadow-md transition-colors dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className='flex flex-row items-center'>
          <Logo size="md"  className="md:hidden mr-2 lg:block" />
<span className='text-xl font-bold'>KKG dr. Soetomo</span>
          </Link>
          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-secondary-400'
                    : 'text-secondary-50 hover:text-secondary-400'
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
              <span className={`h-0.5 w-6 bg-secondary-50 transition-all dark:bg-secondary-400 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 w-6 bg-secondary-50 transition-all dark:bg-secondary-400 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`h-0.5 w-6 bg-secondary-50 transition-all dark:bg-secondary-400 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
          <div className="space-y-2 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded px-4 py-2 transition-colors ${
                  pathname === link.href
                    ? 'bg-[#1f2743] text-secondary-400 dark:bg-[#232a36]'
                    : 'text-secondary-50 hover:bg-[#1f2743] dark:hover:bg-[#232a36]'
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
