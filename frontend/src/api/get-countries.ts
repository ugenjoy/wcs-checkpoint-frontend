import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql(`
  query Countries {
    countries {
      id
      code
      continent {
        name
      }
      emoji
      name
    }
  }
`)
