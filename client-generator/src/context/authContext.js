import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import { useGenerateFingerprint } from "../customHook/useGenerateFingerprint";

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: token store at localStorage vs sessionStorage with at login page "keep login" checkbox button
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const initialState = {
  user: null,
  clientId: null,
}

/********* ********* ********* ********* ********* ********* ********* ********* *********
 when error all state reset
 todo: logout resolver should includes here
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const resetValues = () => {
  try {
    initialState.user = null;
    initialState.clientId = null
    localStorage.removeItem('clientId')
    localStorage.removeItem('token')
  } catch (err) {
    console.log(err);
  }
};

const REFRESHTOKEN_MUTATION = gql`
    mutation refreshToken(
        $accessToken: String!
        $clientId: String!
    ){
        refreshToken(
            accessToken:$accessToken
            clientId: $clientId
        ) {
            accessToken
        }
    }
`

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.user,
        clientId: action.clientId,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        clientId: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext({
  user: null,
  clientId: null,
  login: () => {
  },
  logout: () => {
  },
})

const AuthProvider = (props) => {
  const clientToken = localStorage.getItem('clientId')
  const accessToken = localStorage.getItem('token')
  const { clientId } = useGenerateFingerprint({ clientToken, resetValues })

  const client = useApolloClient()
  const refreshToken = () => {
    client.mutate({
      mutation: REFRESHTOKEN_MUTATION,
      variables: {
        accessToken: accessToken,
        clientId: initialState.clientId,
      },
    }).then(({ data }) => {
      const decodedUser = jwtDecode(data.refreshToken.accessToken)
      initialState.user = decodedUser
      initialState.clientId = decodedUser.clientId
      localStorage.setItem('uid', data.refreshToken.accessToken)
      localStorage.setItem('uuid', decodedUser.clientId)
    }).catch(err => {
      console.log(err);
      resetValues()
    })
  }
  /********* ********* ********* ********* ********* ********* ********* ********* *********
   jwt token expired 체크 && refresh token
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  if (accessToken && clientToken) {
    try {
      const decodedToken = jwtDecode(accessToken)
      initialState.user = decodedToken
      initialState.clientId = clientToken

      if (decodedToken.exp * 1000 < Date.now()) {
        refreshToken()
      }
    } catch (err) {
      console.log(err);
      resetValues()
      // window.location.reload()
    }
  } else {
    resetValues()
  }

  const [state, dispatch] = useReducer(authReducer, initialState)
  const login = (userData) => {
    localStorage.setItem('token', userData.accessToken)
    localStorage.setItem('clientId', clientId)
    dispatch({
      type: 'LOGIN',
      user: userData,
    })
  }
  const logout = () => {
    //todo: logout resolver! delete refreshToken from User model
    localStorage.removeItem('token')
    localStorage.removeItem('clientId')
    dispatch({
      type: 'LOGOUT'
    })
  }
  const user = state.user
  return (
    <AuthContext.Provider
      value={{
        login, logout, user, clientId,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider }
