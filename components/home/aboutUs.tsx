'use server';

import { sanityFetch } from '@/sanity/lib/client';
import { aboutUsQuery } from '@/sanity/lib/queries';
import AboutUsClient from './AboutUs-client';

interface Item {
  icon: string;
  title: string;
  subtitle: string;
}

interface AboutUsData {
  title: string;
  subtitle?: string;
  description: string;
  items: Item[];
}

export default async function AboutUs() {
  const data: AboutUsData = await sanityFetch({
    query: aboutUsQuery,
    revalidate: 60,
  });

  return <AboutUsClient data={data} />
}
