import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  /* border-bottom: 3px solid lightgrey; */
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 880px;
  width: 100%;
`;

const SiteName = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 66%;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: space-around;
  width: 33%;
`;

const Nav = () => {
  return (
    <Container>
      <NavBar>
        <SiteName>
          <h1>Backend Notes</h1>
        </SiteName>
        <NavLinks>
          <Link to="/">Home</Link>
          <Link to="/add-post">Add</Link>
        </NavLinks>
      </NavBar>
    </Container>
  );
};

export default Nav;
