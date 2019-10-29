import styled from "styled-components";

export const StyledBookmarkWrapper = styled.div`
          height:100%;
          width: 100%;
          margin: 0 !important;
          padding: 0 !important;
          &>.ui.grid{
          height:100%;
          width: 100%;
          margin: 0 !important;
          padding: 0 !important;
          }
          &>.ui.grid>.row{
          padding-top: 0;
          padding-bottom: 0;
          }
          .ReactVirtualized__Grid__innerScrollContainer{
          overflow: visible !important; 
          }
/********* ********* ********* ********* ********* ********* ********* ********* *********
    bookmark css 
********* ********* ********* ********* ********* ********* ********* ********* *********/
          &>.ui.grid>.row>.column{
          width: 400px !important; 
          } 
          
/********* ********* ********* ********* ********* ********* ********* ********* *********
    right content css 
********* ********* ********* ********* ********* ********* ********* ********* *********/
          &>.ui.grid>.row>.column div{
          overflow-x: visible;
          } 
          &>.ui.grid>.row>.column + .column{
          width: calc( 100% - 400px ) !important;
          } 
          &>.ui.grid>.row>.column + .column >*{
          padding-top: 1rem; 
          } 
          `
