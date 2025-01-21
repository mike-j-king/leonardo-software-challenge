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
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUserDetails } from '@/utils/providers/UserDetailsProvider'

interface FormState {
  message?: string
  success: boolean
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button 
      type="submit" 
      colorScheme="green" 
      width="100%" 
      size="lg"
      isLoading={pending}
    >
      Continue
    </Button>
  )
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { updateUserDetails } = useUserDetails()

  async function formAction(_prevState: FormState | null, formData: FormData) {
    const username = formData.get('username') as string
    const jobTitle = formData.get('jobTitle') as string
    
    if (!username?.trim() || !jobTitle?.trim()) {
      return { success: false, message: 'All fields are required' }
    }
  
    try {
      await updateUserDetails({ username, jobTitle })
      router.push(searchParams.get('from') || '/')
      return { success: true, message: 'Login successful' }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Login failed. Please try again.'
      return { success: false, message: errorMessage }
    }
  }

  const [formState, dispatchForm] = useFormState(formAction, null)

  return (
    <VStack spacing={8}>
      <Heading>Welcome to Rick & Morty&apos;s Multiverse Explorer!</Heading>
      <Box w="100%" p={8} borderRadius="lg" boxShadow="lg" bg="white">
        {formState?.message && (
          <Alert status={formState.success ? 'success' : 'error'} mb={4}>
            <AlertIcon />
            {formState.message}
          </Alert>
        )}
        <form action={dispatchForm}>
          <VStack spacing={4}>
            <Text fontSize="md" color="gray.600" mt={2}>
              Enter your details to start exploring characters across dimensions
            </Text>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="username"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Job title</FormLabel>
              <Input
                type="text"
                name="jobTitle"
                required
              />
            </FormControl>
            <SubmitButton />
          </VStack>
        </form>
      </Box>
    </VStack>
  )
}
