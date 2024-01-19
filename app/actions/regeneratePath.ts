'use server'

import { getURL } from '@/lib/utils'

/**
 * Calls revalidate API to regenerate a page
 * Use this server action when you need to regenerate a page from client
 * If already on server (api route), call 'api/revalidate' directly from there
 * Basically, you should only call this from an environment where you don't have access to REVALIDATE_SECRET_TOKEN
 * @param path - page to regenerate
 */
export async function regeneratePath(path: string) {
  const url = getURL()

  const response = await fetch(url + '/api/revalidate', {
    method: 'POST',
    body: JSON.stringify({
      token: process.env.REVALIDATE_SECRET_TOKEN,
      path: path,
      regenerate: true
    }),
    cache: 'no-cache' // so that we can revalidate the same page multiple times
  })
  const json = (await response.json()) as { message: string }

  return { ...json, status: response.status }
}
