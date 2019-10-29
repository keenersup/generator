import React from 'react';
import { Button, Modal, } from "semantic-ui-react";
import { REGISTER_MUTATION } from "../../graphql/registerMutation";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../../customHook/useForm";
import { ALLUSERS_QUERY } from "../../graphql/allUsersQuery";
import RegisterForm from "./RegisterForm";
import 'styled-components/macro'

const AdminRegisterModal = ({ open, setOpen }) => {

  const {
    input, values, errorList, setErrors, reset,
  } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    update: (proxy, result) => {
      setOpen(false)
      const data = proxy.readQuery({
        query: ALLUSERS_QUERY
      })
      data.allUsers.push(result.data.register)
      proxy.writeQuery({ query: ALLUSERS_QUERY, data })
      reset()
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
    variables: values,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await register()
  }

  return (
    <Modal
      size="tiny"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => {
        setOpen(false)
        reset()
      }}
      trigger={
        <Button positive >관리자 추가</Button>
      }>
      <Modal.Header>Register</Modal.Header>
      <Modal.Content>
        <RegisterForm onSubmit={onSubmit} loading={loading} input={input} reset={reset} errorList={errorList} />
      </Modal.Content>
    </Modal>
  );
}

export default AdminRegisterModal;