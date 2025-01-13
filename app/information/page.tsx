import { AppShell } from '@/components/shared/AppShell'
import { Suspense } from 'react'
import { CharacterGrid } from '@/components/CharacterGrid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Character Information | Rick and Morty'
}

export default function InformationPage() {
  return (
    <AppShell>
      <Suspense fallback={<div>Loading...</div>}>
        <CharacterGrid />
      </Suspense>
    </AppShell>
  )
}
