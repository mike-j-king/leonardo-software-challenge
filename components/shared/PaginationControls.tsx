import { HStack, Button, Text } from '@chakra-ui/react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number, totalPages: number) => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const siblingCount = 1
  const totalPageNumbers = siblingCount * 2 + 5

  const range = (start: number, end: number): number[] => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
  }

  let pages: (number | string)[] = []

  if (totalPages <= totalPageNumbers) {
    pages = range(1, totalPages)
  } else {
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    const firstPage = 1
    const lastPage = totalPages

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      pages = [...leftRange, '...', lastPage]
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)

      pages = [firstPage, '...', ...rightRange]
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      pages = [firstPage, '...', ...middleRange, '...', lastPage]
    }
  }

  const handlePageChange = (page: number) => {
    onPageChange(page, totalPages)
  }

  return (
    <HStack spacing={2}>
      <Button
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        {'<'}
      </Button>

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={page}
            size="sm"
            colorScheme={currentPage === page ? 'blue' : 'gray'}
            variant={currentPage === page ? 'solid' : 'ghost'}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <Text key={`ellipsis-${index}`} mx={2}>
            {page}
          </Text>
        )
      )}

      <Button
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        {'>'}
      </Button>
    </HStack>
  )
}
