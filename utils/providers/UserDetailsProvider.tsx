'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  serverGetUserDetails,
  serverUpdateUserDetails,
  serverClearUserDetails,
} from '@/app/actions/user-details'
import { UserDetails } from 'utils/types/user-details'

type UserDetailsContextType = {
  userDetails: UserDetails | null
  updateUserDetails: (userDetails: UserDetails) => void
  clearUserDetails: () => void
}

const UserDetailsContext = createContext<UserDetailsContextType | undefined>(
  undefined
)

export function UserDetailsProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

  useEffect(() => {
    serverGetUserDetails().then(setUserDetails)
  }, [])

  const updateUserDetails = async (data: UserDetails) => {
    const updatedDetails = await serverUpdateUserDetails(data)
    setUserDetails(updatedDetails)
  }

  const clearUserDetails = async () => {
    await serverClearUserDetails()
    setUserDetails(null)
  }

  return (
    <UserDetailsContext.Provider
      value={{ userDetails, updateUserDetails, clearUserDetails }}
    >
      {children}
    </UserDetailsContext.Provider>
  )
}

export const useUserDetails = () => {
  const context = useContext(UserDetailsContext)
  if (!context)
    throw new Error('useUserDetails must be used within UserDetailsProvider')
  return context
}
