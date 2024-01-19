import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

/**
 * Call this endpoint with REVALIDATE_SECRET_TOKEN & path to regenerate
 */
export async function POST(request: NextRequest) {
  const { token, path } = await request.json()

  // Check for secret to confirm this is a valid request
  if (token !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 })
  }

  try {
    revalidatePath(path)
    await fetch(`${request.nextUrl.origin}${path}`)
    return Response.json({ message: `Regenerated ${path}` })
  } catch (err) {
    return new Response(JSON.stringify({ message: `Error revalidating ${path}` }), { status: 500 })
  }
}
