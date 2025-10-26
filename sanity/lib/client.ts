import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

/**
 * Helper function to fetch data from Sanity with Next.js caching
 * Uses Sanity CDN for fast responses with configurable revalidation
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param revalidate - Revalidation time in seconds (default: 60)
 * @param tags - Tags for tag-based revalidation
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}
