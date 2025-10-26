import { sanityFetch } from '@/sanity/lib/client'
import { allGalleriesQuery } from '@/sanity/lib/queries'
import LastGaleriClient from './LastGaleri-client'

export default async function LastGaleri() {
  const galleries = await sanityFetch({
    query: allGalleriesQuery,
    revalidate: 60,
  });

  return <LastGaleriClient galleries={galleries} />
}
