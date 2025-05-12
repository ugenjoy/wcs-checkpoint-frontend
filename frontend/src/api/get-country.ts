import { gql } from '@apollo/client'

export const GET_COUNTRY = gql(`
  query Country($code: String!) {
    country(code: $code) {
      code
      continent {
        name
      }
      emoji
      id
      name
    }
  }
`)
