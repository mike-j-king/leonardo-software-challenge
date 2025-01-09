import { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { CharacterResponse } from 'utils/types/character'

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        gender
        species
        status
        image
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`

export function useCharacters(currentPage: number, searchName: string) {
  const [totalPages, setTotalPages] = useState(1)

  const { loading, error, data, refetch } = useQuery<CharacterResponse>(
    GET_CHARACTERS,
    {
      variables: { page: currentPage, name: searchName },
      fetchPolicy: 'cache-first',
    }
  )

  useEffect(() => {
    if (data?.characters.info.pages) {
      setTotalPages(data.characters.info.pages)
    }
  }, [data])

  return {
    loading,
    error,
    data,
    refetch,
    totalPages,
  }
}
