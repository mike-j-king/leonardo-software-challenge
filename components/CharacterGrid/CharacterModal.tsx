import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Box,
  Center,
} from '@chakra-ui/react'
import { Character } from '@/types/Character.types'
import Image from 'next/image'

interface CharacterModalProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export function CharacterModal({
  character,
  isOpen,
  onClose,
}: CharacterModalProps) {
  if (!character) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>{character.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Center>
              <Image
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                style={{ borderRadius: '50%' }}
              />
            </Center>
            <Box>
              <Text fontWeight="bold">
                Status:
                <Text
                  as="span"
                  color={character.status === 'Alive' ? 'green.500' : 'red.500'}
                  ml={2}
                >
                  {character.status}
                </Text>
              </Text>
            </Box>
            <Text>
              <strong>Species:</strong> {character.species}
            </Text>
            <Text>
              <strong>Gender:</strong> {character.gender}
            </Text>
            <Box>
              <Text fontWeight="bold">Origin</Text>
              <Text>{character.origin.name}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Current Location</Text>
              <Text>{character.location.name}</Text>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
