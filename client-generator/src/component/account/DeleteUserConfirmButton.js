import React, { useState, useContext } from 'react';
import { Button, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag'
import { ALLUSERS_QUERY } from "../../graphql/allUsersQuery";
import { AuthContext } from "../../context/authContext";
import styled from "styled-components";

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: make even admin id, it can not delete other admin.
 ********* ********* ********* ********* ********* ****************** ********* *********/

const StyledTextButton = styled(Button)`
   background: none !important;
   color: #ff2b06 !important;
   &:hover{
     text-decoration: underline;
     color: rgba(199,15,27,1) !important;
  } 
`

const DELETEUSER_MUTATION = gql`
    mutation deleteUser(
        $id:ID!
    ){
        deleteUser(id:$id)
    }
`

const DeleteUserConfirmButton = ({ id }) => {

  const context = useContext(AuthContext)

  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deleteUser] = useMutation(DELETEUSER_MUTATION, {
    onError: (errors) => {
      console.log(errors);
      /********* ********* ********* ********* ********* ********* ********* ********* *********
       todo: window.location.reload()
       ********* ********* ********* ********* ********* ********* ********* ********* *********/
      setConfirmOpen(false)
    },

    update: (cache) => {
      setConfirmOpen(false)
      const data = cache.readQuery({
        query: ALLUSERS_QUERY
      })
      const newData = data.allUsers.filter(user => user.id !== id)
      cache.writeQuery({ query: ALLUSERS_QUERY, data: { allUsers: newData } })

      if (id === context.user.id) {
        context.logout()
      }
    },
    variables: { id }
  })


  const onClick = async (e) => {
    e.preventDefault()
    await deleteUser()
  }
  return (
    <>
      <StyledTextButton onClick={() => setConfirmOpen(true)}>Delete</StyledTextButton>
      <Confirm
        header="Delete User"
        content="Are you sure Delete User"
        open={confirmOpen}
        onCancel={() => {
          setConfirmOpen(false)
        }}
        onConfirm={onClick}
        size="tiny"
      />
    </>
  );
}

export default DeleteUserConfirmButton
