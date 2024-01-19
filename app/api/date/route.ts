import { delay } from '@/lib/utils'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  const date = Date.now()
  await delay(2000)
  return Response.json({ date: date, id: id })
}
