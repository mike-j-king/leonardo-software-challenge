'use client'
import { Container, Button, VStack, Text, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { AppShell } from '@/components/shared/AppShell'

export default function Home() {
  return (
    <AppShell>
      <Container maxW="container.xl" flex="1">
        <VStack spacing={8} py={20} textAlign="center">
          <Heading
            fontSize={{ base: '3xl', md: '4xl' }}
            bgGradient="linear(to-r, green.400, blue.500)"
            bgClip="text"
          >
            Welcome to Rick and Morty Character Explorer
          </Heading>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            maxW="600px"
            color="gray.600"
          >
            Dive into the multiverse and discover all your favorite characters
            from the hit show
          </Text>
          <Link href="/information">
            <Button
              colorScheme="green"
              size="lg"
              px={8}
              py={6}
              fontSize="xl"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Explore Characters
            </Button>
          </Link>
        </VStack>
      </Container>
    </AppShell>
  )
}
