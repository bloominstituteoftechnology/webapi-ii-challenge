import React, { Component } from 'react';
import './App.css';
import Axios from '../../../node_modules/axios';
import Posts from './components/Posts';
import styled from 'styled-components';

const ContentContainer = styled.div `
  display: flex; 
  flex-direction: column; 
  align-items: center;
`
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const response = await Axios.get('http://localhost:8000/api/posts');
    this.setState({ posts: response.data });
  }

  render() {
    return (
      <ContentContainer className="App">
        <Posts posts={this.state.posts} />
      </ContentContainer>
    );
  }
}

export default App;
