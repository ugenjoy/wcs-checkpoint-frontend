import { gql } from '@apollo/client'

export const GET_CONTINENTS = gql(`
  query Continents {
    continents {
      id
      name
    }
  }
`)
