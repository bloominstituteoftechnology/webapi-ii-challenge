import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

const StyledDiv = styled.div`
width: 600px; 
height: 100px; 
border: 2px solid black;
padding: 5px; 
margin: 0 auto; 
margin-bottom: 10px;  
background: lightyellow; 
box-shadow: 3px 5px; 
&:hover{
  background: lightblue; 
  box-shadow: none; 
}
`;
const Blockquote = styled.blockquote`
font-style: italic;  
`;
const HeaderH1 = styled.h1`
border: 2px solid black; 
margin-top: 10px; 
margin-bottom: 20px; 
box-shadow: 5px 10px; 
background: lightyellow; 
&:hover{
  background: lightblue; 
}

display: inline-block; 
padding: 15px; 
`; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState(prevState => Object.assign({}, prevState, { posts: response.data }));
      })

      .catch(err => {
        console.log('Error App.js');
      });
    //  fetch ('http://localhost:5000/api/posts')
    //  .then ( data => this.updateState({data}))
  }

  render() {
    return (
      <div className="App">
        <div className="app-container">
        <HeaderH1>Node Posts</HeaderH1>
          {this.state.posts.map(post => (
            <StyledDiv>
              <Blockquote>{post.title} </Blockquote>
              <p>~{post.contents} </p>
            </StyledDiv>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
