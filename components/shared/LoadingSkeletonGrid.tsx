import { Box, Skeleton, SkeletonText, SimpleGrid } from '@chakra-ui/react'

export function LoadingSkeletonGrid() {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          bg="white"
        >
          <Skeleton width="300px" aspectRatio={1} />
          <Box p={4}>
            <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="2" />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}
