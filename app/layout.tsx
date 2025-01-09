'use client'
import { ChakraProvider, VStack } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from 'utils/context/auth-context'
import { UserDetailsModal } from 'components/shared/UserDetailsModal'
import { client } from 'utils/apollo-client'
import { Header } from 'components/shared/Header'
import { Footer } from 'components/shared/Footer'
import theme from '@/app/theme'
import { useAuth } from 'utils/context/auth-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            {/* Require 'Auth' e.g. UserDetails to render */}
            <AuthProvider>
              <LayoutContent>{children}</LayoutContent>
            </AuthProvider>
          </ChakraProvider>
        </ApolloProvider>
      </body>
    </html>
  )
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {isAuthenticated ? (
        <VStack minH="100vh">
          <Header />
          {children}
          <Footer />
        </VStack>
      ) : null}
      <UserDetailsModal />
    </>
  )
}
