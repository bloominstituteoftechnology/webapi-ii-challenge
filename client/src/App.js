import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import PostCard from './PostCard';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 880px;
  width: 100%;
  margin: 0 auto;

  h1{
    align-self: center;
    font-size: 3.2rem;
    margin: 20px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid black;
  }
`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      error: false
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/posts')
    .then(response=>{
      this.setState({
        posts: response.data,
        error: false
      })
    })
    .catch(error=>{
      console.log('error', error);
      this.setState({
        error: true
      })
    });
  }
  render() {
    return (
      <PostContainer>
        <h1>Node Express Lab</h1>
        {this.state.posts.map(post=><PostCard key={post.id} header={post.contents} quote={post.title}/>)}
        {this.state.error ? <h2>Error retrieving data from database</h2> : null}
      </PostContainer>
    );
  }
}

export default App;
