import { HStack, Button, Text } from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number, totalPages: number) => void
}

// Helper functions
const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, idx) => idx + start)

// Function to determine what pagenumbers + ellipses to display in the pagination  controls returns an array of numbers and '...' strings e.g. [1,2,3,4,'...',10]
const generatePaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | string)[] => {
  const totalPageNumbers = siblingCount * 2 + 5

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)
  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftRange = range(1, 3 + 2 * siblingCount)
    return [...leftRange, '...', totalPages]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightRange = range(
      totalPages - (3 + 2 * siblingCount) + 1,
      totalPages
    )
    return [1, '...', ...rightRange]
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex)
  return [1, '...', ...middleRange, '...', totalPages]
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const siblingCount = useBreakpointValue({ base: 0, md: 1 }) || 0
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'sm' })
  const spacing = useBreakpointValue({ base: 1, md: 2 })
  const shouldDisplay = useBreakpointValue({ base: false, md: true })

  const renderPageButton = (page: number) => (
    <Button
      key={page}
      size={buttonSize}
      colorScheme={currentPage === page ? 'blue' : 'gray'}
      variant={currentPage === page ? 'solid' : 'ghost'}
      onClick={() => onPageChange(page, totalPages)}
      display={
        shouldDisplay ||
        page === 1 ||
        page === totalPages ||
        page === currentPage
          ? 'flex'
          : 'none'
      }
    >
      {page}
    </Button>
  )

  const renderEllipsis = (index: number) => (
    <Text key={`ellipsis-${index}`} mx={spacing}>
      ...
    </Text>
  )

  // Pages will be an array of numbers and '...' strings e.g. [1,2,3,4,'...',10]
  const pages = generatePaginationRange(currentPage, totalPages, siblingCount)

  return (
    <HStack spacing={spacing}>
      <Button
        size={buttonSize}
        onClick={() => onPageChange(currentPage - 1, totalPages)}
        isDisabled={currentPage === 1}
      >
        {'<'}
      </Button>

      {pages.map((page, index) =>
        typeof page === 'number'
          ? renderPageButton(page)
          : renderEllipsis(index)
      )}

      <Button
        size={buttonSize}
        onClick={() => onPageChange(currentPage + 1, totalPages)}
        isDisabled={currentPage === totalPages}
      >
        {'>'}
      </Button>
    </HStack>
  )
}
