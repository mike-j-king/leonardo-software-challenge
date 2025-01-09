'use client'
import { Box, Container, Text } from '@chakra-ui/react'

export function Footer() {
  return (
    <Box as="footer" w="full" bg="gray.100" py={4}>
      <Container maxW="container.xl">
        <Text textAlign="center" color="gray.600">
          Data provided by Rick and Morty API
        </Text>
      </Container>
    </Box>
  )
}
