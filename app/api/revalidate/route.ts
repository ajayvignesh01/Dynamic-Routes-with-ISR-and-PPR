import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

/**
 * Call this endpoint with REVALIDATE_SECRET_TOKEN & path to revalidate / regenerate
 */
export async function POST(request: NextRequest) {
  const { token, path, regenerate } = await request.json()

  // Check for secret to confirm this is a valid request (enable in production - can't be called from client like in example)
  // if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
  //   return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 })
  // }

  try {
    revalidatePath(path) // invalidate the cache
    if (regenerate) {
      const response = await fetch(`${request.nextUrl.origin}${path}`)
      await response.text() // regenerate page
      return Response.json({ message: `Regenerated ${path}` })
    }
    return Response.json({ message: `Revalidated ${path}` })
  } catch (err) {
    return new Response(JSON.stringify({ message: `Error revalidating ${path}` }), { status: 500 })
  }
}
