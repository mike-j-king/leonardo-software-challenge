'use client'
import { UserDetailsProvider } from 'utils/providers/UserDetailsProvider'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/utils/apollo-client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/app/theme'
import { UserDetails } from '@/types/UserDetails.types';


export function Providers({ children, initialUserDetails }: {
    children: React.ReactNode, initialUserDetails: UserDetails | null;
}) {
    return (
        <ChakraProvider theme={theme}>
            <ApolloProvider client={client}>
                <UserDetailsProvider initialUserDetails={initialUserDetails}>{children}</UserDetailsProvider>
            </ApolloProvider>
        </ChakraProvider>
    )
}
