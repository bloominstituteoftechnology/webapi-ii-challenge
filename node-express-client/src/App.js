import React, { Component } from "react";
import PostsContainer from "./containers/PostsContainer";
import styled from "styled-components";
import HomeView from "./containers/HomeView";
import { Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";

const AppContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 2rem 0;
  margin: 0 auto;
`;

const H1 = styled.h1`
  color: rebeccapurple;
  font-size: 2.6rem;
  margin: 1rem auto;
`;

class App extends Component {
  render() {
    return (
      <>
        <H1>POSTS LIST</H1>
        <AppContainer>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/posts" component={PostsContainer} />
          <Route path="/posts/:postId" component={SinglePost} />
        </AppContainer>
      </>
    );
  }
}

export default App;
