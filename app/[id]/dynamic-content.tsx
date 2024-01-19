import { getURL } from '@/lib/utils'

export async function DynamicContent({ id }: { id: string }) {
  const url = getURL()
  const res = await fetch(`${url}/api/date?id=${id}`) // auto-cache by id
  const json = (await res.json()) as { date: number; id: string }
  const dateString = new Date(json.date).toString()
  return <p>{`Generated @ ${dateString}`}</p>
}
