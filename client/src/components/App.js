import React, { Component } from 'react';
import PostsList from './PostsList';
import styled from 'styled-components';

const Application = styled.div`
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  text-align: center;

`


class App extends Component {

  render() { 
    return ( 
      <Application>
      <PostsList />
      </Application>
     );
  }
}
 
export default App;
