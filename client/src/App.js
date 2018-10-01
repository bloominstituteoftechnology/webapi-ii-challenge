import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import PostList from './components/functional/PostList'


const AppStyle = styled.div`
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  text-align: center;  
`

class App extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    setTimeout(() => {
      axios.get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState({posts: response.data});
      })
      .catch(err => console.log(err));
    }, 2)    
  }

  render() {
    return (
      <AppStyle>
        <h1>Welcome to Guess Who Posts!</h1>
        <PostList posts={this.state.posts} />
      </AppStyle>
    );
  }
}

export default App;
