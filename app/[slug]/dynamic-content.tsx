import { getURL } from '@/lib/utils'

export async function DynamicContent({ slug }: { slug: string }) {
  const url = getURL()
  const res = await fetch(`${url}/api/date?slug=${slug}`) // auto-cache by slug
  // const res = await fetch(`${url}/api/date?slug=${slug}`, { next: { revalidate: 10 } }) // purge cache every 10 seconds
  const json = (await res.json()) as { date: number; slug: string }
  const dateString = new Date(json.date).toString()
  return <p>{`Generated @ ${dateString}`}</p>
}
