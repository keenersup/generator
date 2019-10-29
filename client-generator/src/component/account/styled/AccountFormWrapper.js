import styled from 'styled-components'
import React from 'react';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const StyledWrapper = styled.div`
  width: 400px;
  margin: auto;
  padding: 0!important;
`

export const AccountFormWrapper = (props) => {
  return (
    <StyledDiv>
      <StyledWrapper>
        {props.children}
      </StyledWrapper>
    </StyledDiv>
  );
}

