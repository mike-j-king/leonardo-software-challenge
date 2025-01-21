import { headers } from 'next/headers'
import { Providers } from '@/utils/providers';
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const userDetailsHeader = headersList.get('x-user-details')
  const initialUserDetails = userDetailsHeader ? JSON.parse(userDetailsHeader) : null

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
