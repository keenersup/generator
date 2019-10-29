import React, { useContext } from 'react';
import { AuthContext } from "../context/authContext";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import { useForm } from "../customHook/useForm";
import { REGISTER_MUTATION } from "../graphql/registerMutation";
import RegisterForm from "../component/account/RegisterForm";
import { ALLUSERS_QUERY } from "../graphql/allUsersQuery";

const Register = (props) => {
  const context = useContext(AuthContext)
  const { clientId } = context

  const {
    input, values, errorList, setErrors, reset,
  } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    update: (cache, { data: { register } }) => {
      context.login(register)
      props.history.push('/')

      const data = cache.readQuery({
        query: ALLUSERS_QUERY
      })
      register.createdAt = moment().valueOf()
      data.allUsers.push(register)
      cache.writeQuery({ query: ALLUSERS_QUERY, data })
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

    variables: { ...values, clientId }
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await register()
  }

  return (
    clientId && <RegisterForm onSubmit={onSubmit} loading={loading} input={input} reset={reset} errorList={errorList} />
  );
}


export default Register;