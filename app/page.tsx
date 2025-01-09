'use client'
import { Container, Button, VStack, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Container maxW="container.xl" flex="1">
      <VStack spacing={8} py={10}>
        <Text fontSize="2xl" fontWeight="bold">
          Welcome to Rick and Morty Character Explorer
        </Text>
        <Link href="/information">
          <Button colorScheme="yellow" size="lg">
            View Characters
          </Button>
        </Link>
      </VStack>
    </Container>
  )
}
