import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import SideNav from './components/SideNav';
import HomeView from './views/homeview';
import ListPostsView from './views/listpostsview';

/***************************************************************************************************
 ********************************************* Variables *******************************************
 **************************************************************************************************/
export const urlLinks = {
  server: 'http://www.localhost:8000',
  home: '/',
  getPosts: `api/posts`
};

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivWrapper = styled.div`
  display: flex;
`;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: ${props =>
      props.isModelRaised === 'true'
        ? `rgba(0, 0, 0, 0.3)`
        : `rgb(243, 243, 243)`};
    height: 100vh;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class App extends Component {
  render() {
    return (
      <DivWrapper>
        <GlobalStyle />
        <SideNav
          home={`${urlLinks.home}`}
          viewPostsLink={`${urlLinks.home}${urlLinks.getPosts}`}
        />
        <Route exact path={`${urlLinks.home}`} render={() => <HomeView />} />
        <Route
          exact
          path={`${urlLinks.home}${urlLinks.getPosts}`}
          render={() => (
            <ListPostsView postsLink={`${urlLinks.home}${urlLinks.getPosts}`} />
          )}
        />
      </DivWrapper>
    );
  }
}

export default App;
