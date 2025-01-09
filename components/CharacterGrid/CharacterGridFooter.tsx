import { Center } from '@chakra-ui/react'
import { PaginationControls } from '@/components/shared/PaginationControls'

interface CharacterGridFooterProps {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
}
export function CharacterGridFooter({
  currentPage,
  totalPages,
  handlePageChange,
}: CharacterGridFooterProps) {
  return (
    <Center my={4}>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Center>
  )
}
