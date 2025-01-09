'use client'
import { VStack } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/utils/apollo-client'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApolloProvider client={client}>
        <VStack minH="100vh">
          <Header />
          {children}
          <Footer />
        </VStack>
      </ApolloProvider>
    </>
  )
}
