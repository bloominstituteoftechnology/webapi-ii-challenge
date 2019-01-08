import React, { Component } from "react";
import PostsContainer from "./containers/PostsContainer";
import styled from "styled-components";
import HomeView from "./containers/HomeView";
import { Route } from "react-router-dom";
import SinglePost from "./components/SinglePost";
import PostForm from "./components/PostForm";
import Navbar from "./components/Navbar";

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

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <AppContainer>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/posts" component={PostsContainer} />
          <Route path="/posts/:postId" component={SinglePost} />
          <Route path="/post/add-post" component={PostForm} />
        </AppContainer>
      </>
    );
  }
}

export default App;
