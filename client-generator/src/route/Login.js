import React, { useContext } from 'react';
import { AuthContext } from "../context/authContext";
import gql from 'graphql-tag'
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../customHook/useForm"
import { Form, Button, Message } from "semantic-ui-react";
import { AccountFormWrapper } from "../component/account/styled/AccountFormWrapper";
import { AccountSubmitButtonWrapper } from "../component/account/styled/AccountSubmitButtonWrapper";

const Login = (props) => {
  const context = useContext(AuthContext)
  const {clientId} = context
  let values, reset, errorList, setErrors, input;
  ({
    values, reset, errorList, setErrors, input
  } = useForm({
    username: '',
    password: '',
  }));

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {

    update: (proxy, result) => {
      context.login(result.data.login)
      props.history.push('/')
    },

    onError: (errors) => {
      try {
        setErrors(errors.graphQLErrors[0].extensions.exception.errors)
      } catch (err) {
        console.log(err);
        /********* ********* ********* ********* ********* ********* ********* ********* *********
         todo: window.location.reload()
         ********* ********* ********* ********* ********* ********* ********* ********* *********/
      }
    },

    variables: {
      ...values, clientId,
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await login()
  }

  return (
    clientId &&
        <AccountFormWrapper>

      <Form onSubmit={onSubmit} loading={loading} >
        <Form.Input
          label='Username'
          placeholder='Username'
          type='text'
          {...input.username}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          type='password'
          {...input.password}
        />
        <AccountSubmitButtonWrapper>
          <Button type='reset' primary compact onClick={reset} negative>
            Reset
          </Button>
          <Button type='submit' primary compact positive>
            Login
          </Button>
        </AccountSubmitButtonWrapper>
      </Form>
      {errorList.length > 0 && (
        <Message
          error
          header='Something Wrong'
          list={errorList}
        />
      )}
        </AccountFormWrapper>
  );
}

const LOGIN_MUTATION = gql`
    mutation login(
        $username: String!
        $password: String!
        $clientId: String!
    ){
        login(
            username: $username
            password: $password
            clientId: $clientId
        ){
            id
            email
            username
            username
            accessToken
            roles
        }
    }
`

export default Login;