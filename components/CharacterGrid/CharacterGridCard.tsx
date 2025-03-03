import { Character } from '@/types/Character.types'
import { Box, VStack, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { motion } from 'framer-motion'
const MotionBox = motion.create(Box)
interface CharacterGridCardProps {
  character: Character
  cardIndex: number
  setSelectedCharacter: (character: Character) => void
}

export function CharacterGridCard({
  character,
  cardIndex,
  setSelectedCharacter,
}: CharacterGridCardProps) {

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Prevent modal from closing in hitting enter
      e.preventDefault()
      setSelectedCharacter(character)
    }
  }
  return (
    <MotionBox
      aria-label={`View details for ${character.name}`}
      onClick={() => setSelectedCharacter(character)}
      onKeyDown={handleKeyDown}
      key={character.id}
      {...createCardAnimation(cardIndex)}
      {...cardStyles}
    >
      <Image
        src={character.image}
        alt={character.name}
        priority={cardIndex < 8} // Prioritize loading first 4 images
        height={300}
        width={300}
      />
      <VStack p={4} align="stretch" spacing={2}>
        <Text fontSize="xl" fontWeight="bold">
          {character.name}
        </Text>
      </VStack>
    </MotionBox>
  )
}



export const createCardAnimation = (cardIndex: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay: cardIndex * 0.05 },
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
})

export const cardStyles = {
  bg: 'white',
  borderRadius: 'lg',
  boxShadow: 'md',
  cursor: 'pointer',
  maxWidth: 300,
  overflow: 'hidden',
  role: 'button',
  tabIndex: 0,
}