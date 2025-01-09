'use server'
import { cookies } from 'next/headers'
import { UserDetails } from 'utils/types/user-details'
export async function serverUpdateUserDetails(data: UserDetails) {
  if (!data.username || !data.jobTitle) {
    throw new Error('Username and job title are required')
  }

  const userDetails = {
    ...data,
    timestamp: new Date().toISOString(),
  }

  const cookieStore = await cookies()
  cookieStore.set('user-details', JSON.stringify(userDetails))

  return userDetails
}

export async function serverGetUserDetails() {
  const cookieStore = await cookies()
  const userDetailsCookie = cookieStore.get('user-details')
  return userDetailsCookie ? JSON.parse(userDetailsCookie.value) : null
}

export async function serverClearUserDetails() {
  const cookieStore = await cookies()
  cookieStore.delete('user-details')
  return null
}
