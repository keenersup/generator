import React from 'react';
import App from './App'
import { REACT_APP_ADDR, REACT_APP_PORT } from "./config";

import ApolloClient from 'apollo-client'
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from 'apollo-link'
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";

import { ApolloProvider } from '@apollo/react-hooks'
import { AuthProvider } from "./context/authContext";

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: some special error message
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
});
/********* ********* ********* ********* ********* ********* ********* ********* *********
 for CORS credentials
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const httpLink = createHttpLink({
  uri: `http://${REACT_APP_ADDR}:${REACT_APP_PORT}`,
  credentials: "include",
})
const authLink = setContext((context) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...context.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    ...context,
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    errorLink,
    authLink,
    httpLink,
  ]),
})

export default (

  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
)

