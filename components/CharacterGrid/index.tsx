'use client'
import { CharacterGridCard } from './CharacterGridCard'
import { CharacterGridFooter } from './CharacterGridFooter'
import { CharacterGridHeader } from './CharacterGridHeader'
import { CharacterModal } from './CharacterModal'
import { SimpleGrid, Box, Text, Flex } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Character } from '@/types/Character'
import { useDebounce } from '@/utils/hooks/useDebounce'
import { useCharacters } from '@/utils/hooks/useCharacters'
import { useRouter, useSearchParams } from 'next/navigation'
import { LoadingErrorAlert } from '@/components/shared/LoadingErrorAlert'
import { LoadingSkeletonGrid } from '@/components/shared/LoadingSkeletonGrid'

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

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      router.push(
        `/information?page=${page}` +
          (debouncedSearchName ? `&name=${debouncedSearchName}` : '')
      )
    },
    [router, debouncedSearchName]
  )

  // Effect for search name changes - reset search to page 1
  useEffect(() => {
    if (debouncedSearchName !== searchParams.get('name')) {
      setCurrentPage(1)
      router.push(`/information?page=1&name=${debouncedSearchName}`)
    }
  }, [debouncedSearchName, router, searchParams])

  const { loading, error, data, refetch, totalPages } = useCharacters(
    currentPage,
    debouncedSearchName
  )

  const noData = !loading && !error && data?.characters?.results.length === 0

  return (
    <Box w="100%" maxW="container.xl">
      {/* GridHeader - Includes Search and Pagination Controls*/}
      <CharacterGridHeader
        searchName={searchName}
        setSearchName={setSearchName}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {/* Character grid */}
      <Box minHeight="400px" px={4} py={4}>
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
            justifyItems="center"
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
      {/* GridFooter - Includes pagination controls */}
      <CharacterGridFooter
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      {/* Character modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={!!selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </Box>
  )
}
