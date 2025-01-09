'use client'
import { useRouter } from 'next/navigation'
import { useUserDetails } from '@/utils/providers/UserDetailsProvider'

export const useLogout = () => {
  const router = useRouter()
  const { clearUserDetails } = useUserDetails()

  const logout = () => {
    clearUserDetails()
    router.push('/login')
  }

  return logout
}
