import React, { useState } from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'
import { AppBar } from './AppBar';
import { Link } from "react-router-dom";
import styled from 'styled-components'
// import { StyledBodyWrapper, StyledSidebarBodyWrapper } from "../styledComponents/StyledSidebar";


const topMenuHeightJs = "3.2rem"
const pusherHorizontalPadding = '8rem'

const StyledBodyWrapper = styled.div`
   height: 100%;
  
// Appbar height
   .ui.top.menu{
      height: ${topMenuHeightJs} ;
    }
// sidebar width
   &>.pushable>.ui.sidebar.menu {
      width: 240px; 
      border-top: none;
   } 
// sidebar transition  
   .ui.push.sidebar { transition: none; }
   .animating.ui.overlay.sidebar, .ui.visible.overlay.sidebar { transition: none; };
   .pushable>.pusher { transition: none; }
   
   & .pushable{
      position: relative;
      width: 100%;
      height: calc(100% - ${topMenuHeightJs}  );
   } 
   .pushable>.pusher {
      width: 100%;
      height: 100%;
      padding: 0 ${pusherHorizontalPadding}
      overflow: auto;
   }
`
export const SideBar = (props) => {
  const { children } = props
  const [visible, setVisible] = useState(false)

  const toggleClick = (e) => {
    e.preventDefault()
    setVisible(!visible)
  }

  return (
    <>
      <StyledBodyWrapper>
        <AppBar visible={visible} toggleClick={toggleClick} />
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            icon='labeled'
            animation='overlay'
            visible={visible}
            onHide={()=>setVisible(false)}
            vertical
          >
            <Menu.Item as={Link} to='/'>
              HOME
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Todo List
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Billing
            </Menu.Item>
            <Menu.Item as={Link} to='/admin'>
              <Icon name='user' />
              Admin
            </Menu.Item>
            <Menu.Item as={Link} to='/test'>
              <Icon name='bug' />
              Bug Test
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        {/*</StyledSidebarBodyWrapper>*/}
      </StyledBodyWrapper>
    </>
  )
}
