import React, { useContext, useState, useEffect } from 'react';
import { Button, Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styled from 'styled-components'
import AccountDropdown from "./AccountDropdown";
import { AuthContext } from "../../context/authContext";

const SideBarButton = styled(Button)`
  padding-left: 1.5rem !important;
  background: none !important;
`

const sidebarButton = (toggleClick) => (
  <SideBarButton
    icon
    size="mini"
    onClick={toggleClick}
  >
    <Icon
      name="bars"
      size="large"
    />
  </SideBarButton>
)

/********* ********* ********* ********* ********* ********* ********* ********* *********
 todo: react-sticky here
 todo: sidebar onHide for mobile
 ********* ********* ********* ********* ********* ********* ********* ********* *********/
const CommonMenu = ({ children }) => (
  <Menu pointing secondary size='large' color='teal' attached="top">
    {children}
  </Menu>
)

export const AppBar = ({ toggleClick }) => {

  const context = useContext(AuthContext)

  const [activeItem, setActiveItem] = useState(window.location.pathname.substr(1))

  useEffect(() => {
    const path = window.location.pathname.substr(1)
    if (activeItem !== path) {
      setActiveItem(path)
    }
  }, [activeItem])

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return context.user ? (
    <CommonMenu>
      <Menu.Menu>
        {sidebarButton(toggleClick)}
        <Menu.Item
          name="Test Blog"
          as={Link}
          to='/'
        />
      </Menu.Menu>
      <Menu.Menu position='right'>
        <Menu.Item>
          <AccountDropdown context={context} />
        </Menu.Item>
      </Menu.Menu>
    </CommonMenu>
  ) : (
    <CommonMenu>
      <Menu.Menu>
        {sidebarButton(toggleClick)}
        <Menu.Item
          name="home"
          as={Link}
          to='/'
        />
      </Menu.Menu>
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </CommonMenu>
  )
}

