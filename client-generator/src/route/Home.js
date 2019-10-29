import React, { useContext } from 'react';
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { HomeWrapper } from "../styledComponent/HomeWrapper";

const Home = (props) => {
  const context = useContext(AuthContext)

  return (
      <HomeWrapper>
        {context.user ?
          <div />
          :
          <>
            <Button as={Link} to='/register'>register</Button>
            <Button as={Link} to='/login'>log in</Button>
          </>
        }
        {context.user ?
          <>
            <Button as={Link} to='/admin'>administration</Button>
            <Button onClick={() => context.logout()}>log out</Button>
          </>
          : <div />
        }
    </HomeWrapper>
  );
}

export default Home;