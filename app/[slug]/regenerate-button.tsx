'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function RegenerateButton({ path }: { path: string }) {
  const [response, setResponse] = useState<{}>()
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div>
      <Button
        onClick={async () => {
          setIsLoading(true)
          const response = await fetch('/api/revalidate', {
            method: 'POST',
            body: JSON.stringify({
              // token: process.env.REVALIDATE_SECRET_TOKEN, // this env is not accessible client-side
              path: path,
              regenerate: true // set to false if you want to only purge the cache and not regenerate it (next user to visit page will trigger generating the page and caching it)
            }),
            cache: 'no-cache' // so that we can revalidate the same page multiple times
          })
          const json = (await response.json()) as { message: string }

          setResponse({ ...json, status: response.status })
          setIsLoading(false)
        }}
        loading={isLoading}
      >
        Regenerate
      </Button>
      <p>{JSON.stringify(response)}</p>
    </div>
  )
}
