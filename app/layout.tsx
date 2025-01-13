import { ChakraProvider } from '@chakra-ui/react'
import { UserDetailsProvider } from 'utils/providers/UserDetailsProvider'

import theme from '@/app/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <UserDetailsProvider>{children}</UserDetailsProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
