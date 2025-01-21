import { Providers } from '@/utils/providers'
import { serverGetUserDetails } from './actions/UserDetails'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialUserDetails = await serverGetUserDetails()
  return (
    <html lang="en">
      <body>
        <Providers initialUserDetails={initialUserDetails}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
