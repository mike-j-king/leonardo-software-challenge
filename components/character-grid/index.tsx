'use client'
import {
  SimpleGrid,
  Box,
  Text,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CharacterModal } from 'components/character-grid/CharacterModal'
import { Character } from 'utils/types/character'
import { PaginationControls } from 'components/shared/PaginationControls'
import { useDebounce } from 'utils/hooks/useDebounce'
import { useCharacters } from 'utils/hooks/useCharacters'
import { LoadingErrorAlert } from 'components/shared/LoadingErrorAlert'
import { LoadingSkeletonGrid } from 'components/shared/LoadingSkeletonGrid'
import { CharacterGridCard } from 'components/character-grid/CharacterGridCard'
import { useRouter, useSearchParams } from 'next/navigation'

export function CharacterGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  )
  const [searchName, setSearchName] = useState(searchParams.get('name') || '')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  )
  const debouncedSearchName = useDebounce(searchName, 300) // 300ms debounce

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    router.push(
      `/information?page=${currentPage}` +
        (debouncedSearchName ? `&name=${debouncedSearchName}` : '')
    )
  }, [currentPage, debouncedSearchName, router])

  const { loading, error, data, refetch, totalPages } = useCharacters(
    currentPage,
    debouncedSearchName
  )

  const noData = !loading && !error && data?.characters?.results.length === 0

  return (
    <Box w="100%">
      {/* Top pagination controls */}
      <Flex justify="space-between" align="center" px={4} pt={4}>
        <InputGroup maxW="300px">
          <Input
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          {searchName && (
            <InputRightElement>
              <Button
                h="1.75rem"
                size="sm"
                variant="ghost"
                onClick={() => setSearchName('')}
              >
                ×
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Flex>
      {/* Character grid */}
      <Box minHeight="400px" px={4} py={2}>
        {loading ? (
          <LoadingSkeletonGrid />
        ) : error ? (
          <LoadingErrorAlert errorMessage={error.message} refetch={refetch} />
        ) : noData ? (
          <Flex align="center" justify="center" h="100%">
            <Text fontSize="xl" fontWeight="bold">
              No Characters Found
            </Text>
          </Flex>
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={4}
            p={4}
          >
            {data?.characters.results.map((character, index) => (
              <CharacterGridCard
                key={character.id}
                character={character}
                cardIndex={index}
                setSelectedCharacter={setSelectedCharacter}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
      {/* Bottom pagination controls */}
      <Center my={4}>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Center>
      {/* Character modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </Box>
  )
}
