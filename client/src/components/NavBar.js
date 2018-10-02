import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBarWrapper = styled.div`
  max-width: 600px;
  min-width: 500px;
  border: 1px solid black;
  display: flex;
`;
const LinkWrapper = styled.div`
  margin: 5px;
`;

class NavBar extends Component {
  render() {
    return (
      <NavBarWrapper className="NavBar">
        <LinkWrapper>
          <Link to="/">Home</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link to="/postform">New Post Form</Link>
        </LinkWrapper>
      </NavBarWrapper>
    );
  }
}

export default NavBar;
