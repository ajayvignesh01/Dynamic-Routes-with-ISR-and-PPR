'use client'

import { regeneratePath } from '@/app/actions/regeneratePath'
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
          const response = await regeneratePath(path)
          setIsLoading(false)
          setResponse(response)
        }}
        loading={isLoading}
      >
        Regenerate
      </Button>
      <p>{JSON.stringify(response)}</p>
    </div>
  )
}
