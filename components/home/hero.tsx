"use client"
import React from 'react'
import DotGrid from '../DotGrid';
import LogoLoop from '../LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];
export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-primary-800 px-4 transition-colors flex flex-col items-center justify-center dark:bg-primary-900">
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#273362"
          activeColor="#141b38"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-secondary-50 md:text-5xl">
          KKG dr. Soertomo
        </h1>

        <p className="mb-8 text-lg text-secondary-400">
          Gugus 5 - Kecamatan Rajagaluh Kabupaten Majalengka
        </p>
      </div>

      <div className="mt-12 w-3xl text-secondary-400">
        <LogoLoop
          logos={techLogos}
          speed={50}
          direction="left"
          logoHeight={100}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  )
}
