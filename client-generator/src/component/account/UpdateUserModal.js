import React, { useState, useContext, useEffect } from 'react';
import { Message, Button, Modal, Form, Input, List } from "semantic-ui-react";
import { useForm } from "../../customHook/useForm";
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag'
import { AuthContext } from "../../context/authContext";

const UpdateUserModal = ({ open, setOpen, user, buttonStyle }) => {
  const context = useContext(AuthContext)

  const [clientId, setClientId] = useState('')

  useEffect(() => {
    import("../../util/getFingerprint").then(({ getFingerprint }) => {
      getFingerprint().then(res => {
        setClientId(res)
      })
    })
  }, [])

  const {
    input, values, reset, errorList, setErrors,
    setValues,
  } = useForm({
    username: user.username,
    email: user.email,
    currentPassword: '',
    password: '',
    confirmPassword: '',
  })

  const { email, currentPassword, password, confirmPassword, } = values
  const [updateUser, { loading }] = useMutation(UPDATEUSER_MUTATION, {
    variables: {
      email, currentPassword, password, confirmPassword,
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
    update: (proxy, result) => {
      context.login(result.data.updateUser, clientId)
      setOpen(false)
      reset()
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await updateUser()

  }

  const [disabled, setDisabled] = useState(true)
  const onClick = (e) => {
    e.preventDefault()
    if (disabled) {
      setDisabled(false)
      setValues({ ...values, email: '' })
    } else {
      setDisabled(true)
      setValues({ ...values, email: user.email })
    }
  }
  const [passwordChange, setPasswordChange] = useState(false)

  return (
    <Modal
      size='tiny'
      open={open}
      onClose={(e) => {
        e.preventDefault()
        setDisabled(true)
        setOpen(false)
        reset()
      }}
      onOpen={(e) => {
        e.preventDefault()
        setOpen(true)
      }}
      trigger={<Button {...buttonStyle} >Update</Button>}
    >
      <Modal.Header>User update</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit} loading={loading}>
          <Form.Input
            label="Username"
          >
            <Input
              type="text"
              name="username"
              value={values.username}
              disabled
            />
          </Form.Input>
          <Form.Input
            label="Email"
          >
            <Input
              type="text"
              disabled={disabled}
              {...input.email}
            /><Button type="button" content={disabled ? "change" : "cancel"} onClick={onClick} positive={disabled}
                      negative={!disabled} />
          </Form.Input>
          {
            !passwordChange &&
            <>
              <Form.Field>
                <Button type='submit' fluid positive>Update</Button>
              </Form.Field>
              <Form.Field>
                <List horizontal>
                  <List.Item as='a' onClick={() => setPasswordChange(true)}>비밀번호 변경</List.Item>
                </List>
              </Form.Field>
            </>
          }
          {passwordChange && (
            <>
              <Form.Input
                label="CurrentPassword"
                type="password"
                {...input.currentPassword}
              />
              <Form.Input
                label="Password"
                type="password"
                {...input.password}
              />
              <Form.Input
                label="ConfirmPassword"
                type="password"
                {...input.confirmPassword}
              />
              <Form.Field>
                <Button type='submit' fluid positive>Update</Button>
              </Form.Field>
              <Form.Field>
                <List horizontal>
                  <List.Item as='a' onClick={() => setPasswordChange(false)}>비밀번호 변경 취소</List.Item>
                </List>
              </Form.Field>
            </>
          )}
        </Form>
        {errorList.length > 0 &&
        <Message
          error
          header='Something Wrong'
          list={errorList}
        />
        }
      </Modal.Content>
    </Modal>
  );
}

const UPDATEUSER_MUTATION = gql`
    mutation updateUser(
        $email:String!
        $currentPassword: String
        $password: String
        $confirmPassword: String
    ){
        updateUser(
            updateUserInput:{
                email: $email
                currentPassword: $currentPassword
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id
            username
            email
            createdAt
            accessToken
            roles
        }
    }
`

export default UpdateUserModal;