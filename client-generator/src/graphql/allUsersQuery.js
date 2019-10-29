import gql from 'graphql-tag'

export const ALLUSERS_QUERY = gql`
    {
        allUsers {
            id
            username
            email
            roles
            createdAt
        }
    }
`
