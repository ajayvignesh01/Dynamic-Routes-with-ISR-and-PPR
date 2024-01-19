import { DynamicContent } from '@/app/[id]/dynamic-content'
import { RegenerateButton } from '@/app/[id]/regenerate-button'
import Link from 'next/link'
import { Suspense } from 'react'

export default function SharePage({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <div className='flex h-screen flex-col items-center justify-center space-y-8 text-center font-mono'>
      <p>/{id}</p>
      <Suspense fallback={<p>Generating...</p>}>
        <DynamicContent id={id} />
      </Suspense>
      <RegenerateButton path={`/${id}`} />
      <Link
        href={'https://github.com/0x-Legend/On-Demand-ISR-with-PPR'}
        target='_blank'
        rel='noopener noreferrer'
        className='underline'
      >
        More Info
      </Link>
    </div>
  )
}
