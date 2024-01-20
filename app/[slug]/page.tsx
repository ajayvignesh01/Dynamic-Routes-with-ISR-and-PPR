import { DynamicContent } from '@/app/[slug]/dynamic-content'
import { RegenerateButton } from '@/app/[slug]/regenerate-button'
import Link from 'next/link'
import { Suspense } from 'react'

// uncomment this to make the page generate on every visit
// export const dynamic = 'force-dynamic'

export default function SharePage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  return (
    <div className='flex h-screen flex-col items-center justify-center space-y-8 text-center font-mono'>
      <p>/{slug}</p>
      <Suspense fallback={<p>Generating...</p>}>
        <DynamicContent slug={slug} />
      </Suspense>
      <RegenerateButton path={`/${slug}`} />
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
