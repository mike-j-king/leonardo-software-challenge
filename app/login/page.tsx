import { Container } from '@chakra-ui/react'
import { LoginForm } from '@/components/LoginForm'
export default function LoginPage() {
  return (
    <Container maxW="container.sm" py={10}>
        <LoginForm />
    </Container>
  )
}
