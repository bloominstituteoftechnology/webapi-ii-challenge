import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Post from './components/post/post';
import InputForm from './components/input/input';
import styled from 'styled-components';

class App extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    this.getPosts();
  }


  getPosts = () => {
    axios.get('http://localhost:5000/api/posts')
    .then(res=> {
      console.log(res.data.posts)
      this.setState({posts: res.data.posts})})
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <MyHeader>
          <h1>LOTR Quotes from the Server!</h1>
        </MyHeader>
        {this.state.posts.map(post => 
          <Post post={post} getPosts={this.getPosts} />
        )}
        <InputForm getPosts={this.getPosts} />
      </div>
    );
  }
}

const MyHeader = styled.header`
  padding: none;
  margin: 0;
  color: lightgray;
`


export default App;
