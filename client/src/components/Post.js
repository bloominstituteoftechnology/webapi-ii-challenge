import React from "react";
import styled from "styled-components";

// const StyledNav = styled(NavLink)`
//   margin: 10px;
//   color: black;
//   &:focus, &:hover, &:visited, &:link, &:active {
//       text-decoration: none;
// `;

const Card = styled.div`
  border-radius: 50px;
  padding: 30px;
  width: 500px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Post = props => {
  return (
    <Card>
      <h1>{props.post.title}</h1>
      <p>{props.post.contents}</p>
    </Card>
  );
};

export default Post;
