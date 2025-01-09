'use client'
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  // Rick and morty color palletette
  colors: {
    brand: {
      brown: '#44281d',
      peach: '#e4a788',
      yellow: '#f0e14a',
      green: '#97ce4c',
      pink: '#e89ac7',
    },
  },
})

export default theme
