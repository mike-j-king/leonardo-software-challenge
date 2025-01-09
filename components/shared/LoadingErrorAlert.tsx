import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react'
export function LoadingErrorAlert({
  errorMessage,
  refetch,
}: {
  errorMessage: string
  refetch: () => void
}) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      borderRadius="lg"
      my={4}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Failed to Load Characters
      </AlertTitle>
      <AlertDescription maxWidth="sm" mb={4}>
        {errorMessage}
      </AlertDescription>
      <Button colorScheme="red" onClick={() => refetch()}>
        Try Again
      </Button>
    </Alert>
  )
}
