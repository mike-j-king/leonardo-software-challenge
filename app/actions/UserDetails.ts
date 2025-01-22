'use server'
import { cookies } from 'next/headers'
import { UserDetails } from '@/types/UserDetails.types'
export async function serverUpdateUserDetails(data: UserDetails) {
  if (!data.username || !data.jobTitle) {
    throw new Error('Username and job title are required')
  }

  const userDetails = {
    ...data,
  }

  const cookieStore = await cookies()
  cookieStore.set('user-details', JSON.stringify(userDetails))

  return userDetails
}

export async function serverGetUserDetails() {
  const cookieStore = await cookies()
  const userDetailsCookie = cookieStore.get('user-details')
  try {
    return userDetailsCookie ? JSON.parse(userDetailsCookie.value) : null
  } catch {
    return null
  }
}
export async function serverClearUserDetails() {
  const cookieStore = await cookies()
  cookieStore.delete('user-details')
  return null
}
