'use client'
import React, { useState } from 'react'
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

interface UserDetailsModalProps {
  open: boolean
  username: string
  jobTitle: string
  onClose: () => void
}

export function UserDetailsModal({
  open,
  username,
  jobTitle,
  onClose,
}: UserDetailsModalProps) {
  const { updateUserDetails } = useUserDetails()

  const [userData, setUserData] = useState({
    username: username,
    jobTitle: jobTitle,
  })

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault()
    updateUserDetails(userData)
    onClose()
  }

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
        <form onSubmit={handleSubmit}>
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
