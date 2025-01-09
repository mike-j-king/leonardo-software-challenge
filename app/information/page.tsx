'use client'
import { AppShell } from '@/components/shared/AppShell'
import { Suspense } from 'react'
import { CharacterGrid } from '@/components/CharacterGrid'

export default function InformationPage() {
  return (
    <AppShell>
      <Suspense fallback={<div>Loading...</div>}>
        <CharacterGrid />
      </Suspense>
    </AppShell>
  )
}
