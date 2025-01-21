'use client'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  Button,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react'
import { useUserDetails } from '@/utils/providers/UserDetailsProvider'

interface FormState {
  message?: string
  success: boolean
}


interface UserDetailsModalProps {
  open: boolean
  username: string
  jobTitle: string
  onClose: () => void
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button
      type="submit"
      colorScheme="blue"
      width="full"
      isLoading={pending}
    >
      Continue
    </Button>
  )
}


export function UserDetailsModal({
  open,
  username,
  jobTitle,
  onClose,
}: UserDetailsModalProps) {
  const { updateUserDetails } = useUserDetails()

  async function formAction(_prevState: FormState | null, formData: FormData) {
    const username = formData.get('username') as string
    const jobTitle = formData.get('jobTitle') as string
    
    if (!username?.trim() || !jobTitle?.trim()) {
      return { success: false, message: 'All fields are required' }
    }
  
    try {
      await updateUserDetails({ username, jobTitle })
      return { success: true, message: 'Login successful' }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Login failed. Please try again.'
      return { success: false, message: errorMessage }
    }
  }

  const [formState, dispatchForm] = useFormState(formAction, null)


  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
      size={{ base: 'sm', md: 'md' }}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent mx={4} my="auto" borderRadius="xl" boxShadow="xl">
        <ModalHeader>
          <Text fontSize="md" color="gray.600" mt={2}>
            Edit your details
          </Text>
        </ModalHeader>
        <form action={dispatchForm}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  defaultValue={username}
                  placeholder="Enter your username"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Job Title</FormLabel>
                <Input
                  name="jobTitle"
                  defaultValue={jobTitle}
                  placeholder="Enter your job title"
                />
              </FormControl>
              {formState?.message && (
                <Text color={formState.success ? 'green.500' : 'red.500'}>
                  {formState.message}
                </Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <SubmitButton />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
