import { sanityFetch } from '@/sanity/lib/client'
import { schoolListQuery, heroQuery } from '@/sanity/lib/queries'
import { HeroClient } from './hero-client'

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

// Server Component for data fetching
export default async function Hero() {
  let heroData: HeroData | null = null
  let schoolList: SchoolList | null = null

  try {
    [schoolList, heroData] = await Promise.all([
      sanityFetch({
        query: schoolListQuery,
        revalidate: 60,
      }),
      sanityFetch({
        query: heroQuery,
        revalidate: 60,
      })
    ]);
  } catch (error) {
    console.error('Error fetching hero data:', error);
  }

  return <HeroClient heroData={heroData} schoolList={schoolList} />
}
