export interface Character {
  id: string
  name: string
  gender: string
  species: string
  status: string
  image: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
}

export interface CharacterResponse {
  characters: {
    info: {
      count: number
      pages: number
      next: number | null
      prev: number | null
    }
    results: Character[]
  }
}
