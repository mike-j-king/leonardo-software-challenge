import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react'
import { PaginationControls } from 'components/shared/PaginationControls'

interface CharacterGridHeaderProps {
  searchName: string
  setSearchName: (name: string) => void
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}
export function CharacterGridHeader({
  searchName,
  setSearchName,
  currentPage,
  totalPages,
  handlePageChange,
}: CharacterGridHeaderProps) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      px={4}
      pt={4}
      gap={{ base: 2, md: 4 }}
    >
      {/* Search input for filtering by name */}
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
      {/* Top Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Flex>
  )
}
