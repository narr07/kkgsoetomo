"use client"
import React, { useMemo, useState, useEffect } from 'react'
import useSWR from 'swr'
import DotGrid from '../DotGrid';
import LogoLoop from '../LogoLoop';

interface SchoolItem {
  logo: {
    asset: {
      url: string
    }
    alt?: string
  }
  name: string
  link: string
}

interface SchoolList {
  schools: SchoolItem[]
}

interface HeroData {
  title: string
  subtitle: string
  showCTA: boolean
  ctaText?: string
  ctaLink?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Hero() {
  const [isDark, setIsDark] = useState(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  
  const { data: schoolList, isLoading: schoolLoading } = useSWR<SchoolList>('/api/school-list', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: heroData, isLoading: heroLoading } = useSWR<HeroData>('/api/hero', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  })

  // Track window width for responsive logo size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(
        window.matchMedia('(prefers-color-scheme: dark)').matches ||
        document.documentElement.classList.contains('dark')
      );
    };

    checkDarkMode();

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches || document.documentElement.classList.contains('dark'));
    };

    const handleClassChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    const observer = new MutationObserver(handleClassChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  // Calculate responsive logo height
  const responsiveLogoHeight = useMemo(() => {
    if (windowWidth < 640) return 50  // Mobile
    if (windowWidth < 1024) return 70  // Tablet
    return 100  // Desktop
  }, [windowWidth])

  const schoolLogos = useMemo(() => {
    if (!schoolList?.schools) return []
    
    return schoolList.schools.map((school: SchoolItem) => ({
      src: school.logo.asset.url,
      alt: school.logo.alt || school.name,
      title: school.name,
      href: school.link,
    }))
  }, [schoolList])

  return (
    <section className="relative h-screen overflow-hidden bg-primary-800 px-4 transition-colors flex flex-col items-center justify-center dark:bg-primary-900">
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor={isDark ? "#000305" : "#141b38"}
          activeColor={isDark ? "#141b38" : "#000305"}
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-secondary-50 md:text-5xl">
          {heroData?.title || 'KKG dr. Soertomo'}
        </h1>

        <p className="mb-8 text-lg text-secondary-400">
          {heroData?.subtitle || 'Gugus 5 - Kecamatan Rajagaluh Kabupaten Majalengka'}
        </p>

        {heroData?.showCTA && heroData?.ctaLink && (
          <a
            href={heroData.ctaLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-3 bg-secondary-400 text-primary-900 font-semibold rounded-lg hover:bg-secondary-300 transition-colors"
          >
            {heroData.ctaText || 'Explore More'}
          </a>
        )}
      </div>

      <div className="mt-12 w-3xl text-secondary-400">
        {!schoolLoading && schoolLogos.length > 0 && (
       
          <LogoLoop
           
            logos={schoolLogos}
            speed={50}
            direction="left"
            logoHeight={responsiveLogoHeight}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor={isDark ? "#141b38" : "#1f274c"}
            showLabel={true}
            ariaLabel="Daftar Sekolah KKG"
          />
          
        )}
      </div>
    </section>
  )
}
