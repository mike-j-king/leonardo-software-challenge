'use client'
import React, { useRef, useState } from 'react'
import { useAuth } from 'utils/context/auth-context'
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

interface UserData {
  username: string
  jobTitle: string
}

export function UserDetailsModal() {
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const formRef = useRef<HTMLFormElement>(null)

  const [userData, setUserData] = useState<UserData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userData')
      return stored
        ? JSON.parse(stored)
        : {
            username: '',
            jobTitle: '',
          }
    }
    return {
      username: '',
      jobTitle: '',
    }
  })

  // Submit form and save to localStorage
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault()
    localStorage.setItem('userData', JSON.stringify(userData))
    setIsAuthenticated(true)
  }

  return (
    <Modal
      isOpen={!isAuthenticated}
      onClose={() => {}}
      closeOnOverlayClick={false}
      isCentered
      size={{ base: 'sm', md: 'md' }}
    >
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent mx={4} my="auto" borderRadius="xl" boxShadow="xl">
        <ModalHeader>
          <Text fontSize="2xl" fontWeight="bold" color="brand.brown">
            Welcome to Rick & Morty&apos;s Multiverse!
          </Text>
          <Text fontSize="md" color="gray.600" mt={2}>
            Enter your details to start exploring characters across dimensions
          </Text>
        </ModalHeader>
        <form ref={formRef} onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                  placeholder="Enter your username"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Job Title</FormLabel>
                <Input
                  value={userData.jobTitle}
                  onChange={(e) =>
                    setUserData({ ...userData, jobTitle: e.target.value })
                  }
                  placeholder="Enter your job title"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              onClick={handleSubmit}
              isDisabled={!userData.username || !userData.jobTitle}
              width="full"
            >
              Continue
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
