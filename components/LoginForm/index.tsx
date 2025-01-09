'use client'
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUserDetails } from '@/utils/providers/UserDetailsProvider'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateUserDetails } = useUserDetails()
  const [username, setUsername] = useState('')
  const [jobTitle, setJobTitle] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateUserDetails({
      username,
      jobTitle,
    })

    router.push(searchParams.get('from') || '/')
  }

  return (
    <VStack spacing={8}>
      <Heading>Welcome to Rick & Morty&apos;s Multiverse Explorer!</Heading>
      <Box w="100%" p={8} borderRadius="lg" boxShadow="lg" bg="white">
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <Text fontSize="md" color="gray.600" mt={2}>
              Enter your details to start exploring characters across dimensions
            </Text>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Job title</FormLabel>
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="green" width="100%" size="lg">
              Continue
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  )
}
