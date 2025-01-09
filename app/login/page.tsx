'use client'
import { Suspense } from 'react'
import { Container } from '@chakra-ui/react'
import { LoginForm } from '@/components/login-form'
export default function LoginPage() {
  return (
    <Container maxW="container.sm" py={10}>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </Container>
  )
}
