import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";

const PostContainer = styled.div`
  width: 30%;
  min-width: 300px;
  border: 1px dashed #0f0f0f;
  box-shadow: -1px 3px 7px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  margin: 0 auto 2rem;
  display: inline-block;
  height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    opacity: 0.8;
  }
`;

const H1 = styled.h1`
  font-size: 1.4rem;
  flex: 6;
  margin: 0;
  text-transform: uppercase;
  background: rebeccapurple;
  color: white;
  padding: 1.2rem;
`;

const H3 = styled.h3`
  font-size: 1.2rem;
  flex: 2;
  padding: 1rem;
  margin: 0;
  background: #f0f0f0;
  border-bottom: 1px dashed #0f0f0f;
`;

const H6 = styled(Moment)`
  font-size: 0.8rem;
  flex: 1;
  width: 100%;
  /* padding: 1.2rem; */
  margin: 0 auto 0rem;
  background: rebeccapurple;
  color: white;
  line-height: 3rem;
  opacity: 0.7;
`;

function Post({ title, contents, created_at, id, history }) {
  return (
    <PostContainer onClick={() => history.push(`/posts/${id}`)}>
      <H1>{title.length > 50 ? title.slice(0, 50) + "..." : title}</H1>
      <H3>{contents.length > 50 ? contents.slice(0, 50) + "..." : contents}</H3>
      <H6 format="Do MMM YYYY">{created_at}</H6>
    </PostContainer>
  );
}

export default withRouter(Post);
