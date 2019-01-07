import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

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
      </DivWrapper>
    );
  }
}

export default App;
