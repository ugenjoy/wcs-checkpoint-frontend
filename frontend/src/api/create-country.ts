import { gql } from '@apollo/client'

export const CREATE_COUNTRY = gql(`
  mutation CreateCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      continent {
        id
      }
      emoji
      name
    }
  }
`)
