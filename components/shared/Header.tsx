'use client'
import {
  Box,
  Flex,
  Button,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Container,
} from '@chakra-ui/react'
import { useLogout } from 'utils/hooks/useLogout'
import Link from 'next/link'
import { memo } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { useUserDetails } from '@/utils/providers/UserDetailsProvider'
import { UserDetailsModal } from '@/components/shared/UserDetailsModal'

export const Header = memo(function Header() {
  const { userDetails } = useUserDetails()
  const logout = useLogout()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pathname = usePathname()

  const renderBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)

    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => (
          <BreadcrumbItem key={path}>
            <BreadcrumbLink
              as={Link}
              href={`/${paths.slice(0, index + 1).join('/')}`}
            >
              {path}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    )
  }

  return (
    <Box as="header" w="full" bg="brand.peach" py={4}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Box color="white">{renderBreadcrumbs()}</Box>

          <HStack spacing={4}>
            <Box textAlign="right">
              <Text color="white" fontWeight="bold">
                {userDetails?.username}
              </Text>
              <Text color="whiteAlpha.800" fontSize="sm">
                {userDetails?.jobTitle}
              </Text>
            </Box>
            <Button
              colorScheme="whiteAlpha"
              onClick={onOpen}
              >
              Edit
            </Button>
            <Button colorScheme="whiteAlpha" onClick={logout}>
              Logout
            </Button>
          </HStack>
        </Flex>
      </Container>
      {userDetails && (
        <UserDetailsModal
          username={userDetails.username}
          jobTitle={userDetails.jobTitle}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  )
})
