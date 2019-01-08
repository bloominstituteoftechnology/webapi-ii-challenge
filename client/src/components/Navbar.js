import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  font-size: 1rem;
  padding: 0.8rem;
  background: rebeccapurple;
  justify-content: center;
  align-items: center;

  & > a,
  & > div > a {
    color: white;
    text-decoration: none;
  }
`;

function Navbar() {
  return (
    <Nav style={{ display: "flex", padding: ".5rem" }}>
      <NavLink to="/">
        <p style={{ fontWeight: "bolder" }}>
          POST<span style={{ fontWeight: "light", opacity: 0.6 }}>PALACE</span>
        </p>
      </NavLink>
      <div style={{ marginLeft: "auto" }}>
        <NavLink to="/posts">POSTS</NavLink>
        <NavLink to="/post/add-post" style={{ marginLeft: "1rem" }}>
          ADD A POST
        </NavLink>
      </div>
    </Nav>
  );
}

export default Navbar;
