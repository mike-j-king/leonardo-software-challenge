import { VStack } from '@chakra-ui/react'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
        <VStack minH="100vh">
          <Header />
          {children}
          <Footer />
        </VStack>
  )
}
