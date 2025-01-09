'use client'
import { Box, Container, Flex, Text, Button, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from 'utils/context/auth-context'
import { useEffect, useState } from 'react'
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'

interface UserData {
  username: string
  jobTitle: string
}

export function Header() {
  const { setIsAuthenticated } = useAuth()
  const pathname = usePathname()
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleEditDetails = () => {
    localStorage.removeItem('userData')
    setIsAuthenticated(false)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/information', label: 'Information' },
  ]

  return (
    <Box as="header" w="full" bg="brand.peach" py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
<Breadcrumb 
  spacing="8px" 
  separator='>'
  color='white'
>
  {navLinks.map((link) => (
    <BreadcrumbItem key={link.href}>
      <BreadcrumbLink
        as={Link}
        href={link.href}
        color="white"
        fontWeight="semibold"
        textDecoration={pathname === link.href ? 'underline' : 'none'}
        _hover={{ textDecoration: 'underline' }}
      >
        {link.label}
      </BreadcrumbLink>
    </BreadcrumbItem>
  ))}
</Breadcrumb>
          <HStack spacing={4}>
            {userData && (
              <Box textAlign="right">
                <Text color="white" fontWeight="bold">
                  {userData.username}
                </Text>
                <Text color="whiteAlpha.800" fontSize="sm">
                  {userData.jobTitle}
                </Text>
              </Box>
            )}
            <Button colorScheme="whiteAlpha" onClick={handleEditDetails}>
              Edit
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}
