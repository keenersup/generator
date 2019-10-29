import React from 'react'
import { Dropdown, Header, Icon } from 'semantic-ui-react'
import 'styled-components/macro'
import { Link } from "react-router-dom";
import styled from 'styled-components/macro'

const StyledDropdownWrapper = styled(Dropdown)`
    &>.text {
      vertical-align: text-bottom;
    }
    &.ui.dropdown .menu  {
        min-width:23rem;
    }
    &.ui.dropdown .menu>.header{
        font-size: 1.71428571rem;
    }
`

const AccountDropdown = ({ context }) => {
  return (
    <StyledDropdownWrapper
      icon={<Icon name="user outline" css={`
          &::after{
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 100%;
              height: 100%;
          }
`} />}
    >

      <Dropdown.Menu>
        <Header>
          <Icon name='user circle' style={{ fontSize: "1.8em" }} />

          <Header.Content>
            {context.user.username}
            <Header.Subheader>{context.user.email}</Header.Subheader>
          </Header.Content>
        </Header>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to='/admin' text='admin' description="admin-setting" />
        <Dropdown.Item as={Link} to='/change-password' text='changePassword' />
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/" onClick={context.logout} text='Log-out' icon="log out" description="logout" />
      </Dropdown.Menu>
    </StyledDropdownWrapper>
  );
}

export default AccountDropdown
