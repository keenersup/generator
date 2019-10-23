import { gql } from 'apollo-server'

export default gql`
    type User{
        id: ID!
        username: String!
    }
    type Query{
        getUser(userId: ID!): User
        allUsers:[User]!
    }
    type Mutation{
        register(username: String!): User
    }
`