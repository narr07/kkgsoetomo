import { sanityFetch } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/lib/queries'
import LastArticleClient from './LastArticle-client'

export default async function LastArticle() {
  const articles = await sanityFetch({
    query: allArticlesQuery,
    revalidate: 60,
  });

  return <LastArticleClient articles={articles} />
}
