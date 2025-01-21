import { Box, Container, Text, Link } from '@chakra-ui/react'
import { memo } from 'react'

export const Footer = memo(function Footer() {
  return (
    <Box as="footer" w="full" bg="gray.100" py={4}>
      <Container maxW="container.xl">
        <Text textAlign="center" color="gray.600">
          Data provided by{' '}
          <Link
            href="https://rickandmortyapi.com"
            color="brand.green"
            textDecoration="underline"
            fontWeight="bold"
            _hover={{ color: 'brand.yellow' }}
          >
            Rick and Morty API
          </Link>
        </Text>
      </Container>
    </Box>
  )
})
