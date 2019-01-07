import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 2rem;
  padding: 1rem 1.6rem;
  text-decoration: none;
  text-transform: uppercase;
  background-color: rebeccapurple;
  color: white;
  border: 4px solid white;
  border-radius: 1rem;
  box-shadow: 0 6px white;
  position: relative;

  &:hover {
    top: 2px;
    box-shadow: 0 4px white;
  }

  &:active {
    top: 4px;
    box-shadow: 0 2px white;
  }
`;

function HomeView() {
  return (
    <div>
      <StyledLink to="/posts">Go To Posts</StyledLink>
    </div>
  );
}

export default HomeView;
