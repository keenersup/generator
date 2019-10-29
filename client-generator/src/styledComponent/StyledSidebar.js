import styled, { css } from "styled-components";
import { Menu } from "semantic-ui-react";
import { bodyHeightWidth, topMenuHeightJs } from "./styles";

const pusherHorizontalPadding = '8rem'

export const StyledSidebarContentsWrapper = styled(Menu)`

   .ui.push.sidebar {
      transition: none; 
   }
   
   .animating.ui.overlay.sidebar, .ui.visible.overlay.sidebar {
      transition: none;
   };
 
   .pushable>.pusher {
     transition: none;
   }
   
   &.ui.menu{
      position: fixed;
      top: calc(${topMenuHeightJs} + 2px);
      height: 100%;
      width: 100%;
      border-top: 0;
      margin:0; 
   }
   
/********* ********* ********* ********* ********* ********* ********* ********* *********
todo: sidebar menu color change to gray as button type
********* ********* ********* ********* ********* ********* ********* ********* *********/
   .sidebar>a:first-child {
      margin-top: 20px; 
   }
   
   .pushable{
      position: relative;
      width: 100%;
      height: calc(100% - ${topMenuHeightJs});
   } 
   .sidebar{
      overflow-y: visible; 
   }
   .pushable>.pusher {
      width: 100%;
      height: 100%;
      overflow-y: auto; 
   }
   .pushable>.pusher>*{
      overflow-y: auto;  
      padding: 1rem ${pusherHorizontalPadding}
      ${props => props.full === 'true' && css`
        padding: 1rem;
     `}
   
   }
   
/********* ********* ********* ********* ********* ********* ********* ********* *********
      animation: push 
********* ********* ********* ********* ********* ********* ********* ********* *********/
  .ui.visible.left.sidebar~.pusher {
     transform: translate3d(12rem,0,0);
     padding-right: 15rem;    
     
      ${props => props.full === 'true' && css`
/********* ********* ********* ********* ********* ********* ********* ********* *********
      tranlate3d value + padding 1rem 
********* ********* ********* ********* ********* ********* ********* ********* *********/
        padding-right: 17rem;
        transform: translate3d(17rem,0,0);
       `}
    }
  
/********* ********* ********* ********* ********* ********* ********* ********* *********
      animation: overlay 
********* ********* ********* ********* ********* ********* ********* ********* *********/
 .ui.visible.overlay.sidebar~.pusher{
        padding:0 ${pusherHorizontalPadding};
        
      ${props => props.full === 'true' && css`
        padding-right: 0;
     `}
 }
 
 
 ${props => (props.center === "true") && css`
          & .pusher{
              display: flex;
              justify-content: center ;
              align-items: center ;
              padding-top: 2% !important;
              padding-bottom: 8% !important;
          }
`}
 
`

export const StyledSidebarBodyWrapper = styled.div`
@media only screen and (max-width: 767px) {
.pusher .ui.container {
    width:100% !important;
    margin: auto 0 !important;
    overflow-y: auto;
  }
 }
@media only screen and (max-width: 991px) and (min-width: 768px){
.pusher .ui.container {
    margin:auto;
    overflow-y: auto;
  }
}
@media only screen and (max-width: 1199px) and (min-width: 992px){
.pusher .ui.container {
    margin:auto;
    overflow-y: auto;
  }
}
@media only screen and (min-width: 1200px){
.pusher .ui.container {
    margin:auto;
    overflow-y: auto;
  }
}
 .ui.top.menu{
      position:fixed;
      z-index: 1;
      top:0;
      
      height: ${topMenuHeightJs};
  }
`
export const StyledChildrenWrapper = styled.div`
  ${bodyHeightWidth}
`