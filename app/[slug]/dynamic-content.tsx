import { delay } from '@/lib/utils'
import { unstable_cache } from 'next/cache'

export async function DynamicContent({ slug }: { slug: string }) {
  // simulate api request
  const cache = unstable_cache(
    async (slug: string) => {
      await delay(2000)
      return { date: Date.now(), slug: slug }
    }, // auto-cache by slug
    ['date']
    // { revalidate: 10 } // purge cache every 10 seconds
  )

  const response = await cache(slug)
  const dateString = new Date(response.date).toString()
  return <p>{`Generated @ ${dateString}`}</p>
}
