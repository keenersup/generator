import gql from 'graphql-tag'

export const REGISTER_MUTATION = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $clientId: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                clientId: $clientId
            }
        ){
            id
            email
            username
            accessToken
            roles
        }
    }
`
