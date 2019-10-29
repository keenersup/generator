import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { ALLUSERS_QUERY } from "../graphql/allUsersQuery";
import { Table } from "semantic-ui-react";
import moment from "moment";
import 'styled-components/macro'
import ErrorPage from "./ErrorPage";
import DeleteUserConfirmButton from "../component/account/DeleteUserConfirmButton";


const Admin = (props) => {
  const { loading, data, error } = useQuery(ALLUSERS_QUERY)
  if (loading) {
    return null
  }
  if (error) {
    return <ErrorPage />
  }
  return (
    <>
      <h1
        css={`
              width: 100%;
              margin-top: 1rem !important;
              text-align: center;
          `}>
        Administration
      </h1>
      <Table striped textAlign="center" unstackable singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>ID</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>CreatedAt</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data && data.allUsers && data.allUsers.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.roles.join(' | ')}</Table.Cell>
              <Table.Cell>{moment(parseInt(user.createdAt)).fromNow(true)}</Table.Cell>
              <Table.Cell>
                <DeleteUserConfirmButton
                  id={user.id}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default Admin;