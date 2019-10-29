import React, { useState, useContext } from 'react';
import { Card, Image } from "semantic-ui-react";
import moment from 'moment'
import DeleteUserConfirmButton from "../account/DeleteUserConfirmButton";
import UpdateUserModal from "./UpdateUserModal";
import { AuthContext } from "../../context/authContext";

const PostCardUser = ({ user }) => {
  const context = useContext(AuthContext)

  const { id, username, email, createdAt, roles, } = user

  const [openUpdateModal, setUpdateModal] = useState(false)
  let showButton = false
  if (context.user) {
    showButton = context.user.roles.includes('admin');
  }
  /********* ********* ********* ********* ********* ********* ********* ********* *********
   sizeEnum = [mini, tiny, small, medium,large,big,huge,massive]
   ********* ********* ********* ********* ********* ********* ********* ********* *********/
  const buttonStyle = {
    size: "small",
    primary: true,
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image floated='right' size='mini'
               src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
        <Card.Header>
          {username}
        </Card.Header>
        <Card.Meta>
          {moment(new Date(parseInt(createdAt)).toISOString()).fromNow(true)}
        </Card.Meta>
        <Card.Description>
          {email}
        </Card.Description>
        <Card.Description>
          {roles.join(' | ')}
        </Card.Description>
      </Card.Content>
      {showButton &&
      <Card.Content align="right" extra>
        <DeleteUserConfirmButton buttonStyle={{ ...buttonStyle, negative: true, compact: true }} id={id} />
        {user.id === context.user.id &&
        < UpdateUserModal buttonStyle={{ ...buttonStyle, positive: true, compact: true }} open={openUpdateModal}
                          setOpen={setUpdateModal} user={user} />}
      </Card.Content>
      }
    </Card>
  )
}

export default PostCardUser;