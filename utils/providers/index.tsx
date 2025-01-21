'use client'
import { UserDetailsProvider } from 'utils/providers/UserDetailsProvider'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/utils/apollo-client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/app/theme'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={theme}>
            <ApolloProvider client={client}>
                <UserDetailsProvider>{children}</UserDetailsProvider>
            </ApolloProvider>
        </ChakraProvider>
    )
}
