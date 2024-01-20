import { delay } from '@/lib/utils'
import { NextRequest } from 'next/server'

/**
 * Fake API route
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const date = Date.now()
  await delay(2000)
  return Response.json({ date: date, slug: slug })
}
