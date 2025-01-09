'use client'
import { CharacterGrid } from '@/components/character-grid/CharacterGrid'
import { AppShell } from '@/components/shared/AppShell'
import { Suspense } from 'react'

export default function InformationPage() {
  return (
    <AppShell>
      <Suspense fallback={<div>Loading...</div>}>
        <CharacterGrid />
      </Suspense>
    </AppShell>
  )
}
