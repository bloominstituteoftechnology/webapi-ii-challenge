import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import styled from 'styled-components';

let PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background: gray;
  color: black;
  justify-content: space-around;
  padding-bottom: 50px;
`;

let PostContainer = styled.div`
  border: dashed gold;
  width: 27.5%;
  height: auto;
  margin-top: 50px;
`;

let TitleContainer = styled.h1`
  color: gold;
  width: 100%;
  margin-top: 0px;
  margin-bottom: -50px;
`;

let GuessButton = styled.button`
  color: black;
  margin-bottom: 20px;
  border-radius: 12px;
  border: 2px solid gold;
  background-color: white;
  padding: 14px 28px;
  font-size: 12px;
  cursor: pointer;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
      // EditedPost: {
      //   title: '',
      //   contents: '',
      // }
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:9000/api/posts/')
      .then(response => this.setState({ posts: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        {' '}
        <PostsContainer>
          <TitleContainer>
            <h1>Guess the Hobbit</h1>
          </TitleContainer>
          {this.state.posts.map(post => {
            return (
              <PostContainer key={post.id} title={post.title} contents={post.contents}>
                <p>{post.title}</p>
                <GuessButton>{post.contents}</GuessButton>
              </PostContainer>
            );
          })}
        </PostsContainer>
      </div>
    );
  }
}

export default App;
