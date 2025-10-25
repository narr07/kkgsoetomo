import { generateMetadata } from './metadata'

export { generateMetadata }

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
