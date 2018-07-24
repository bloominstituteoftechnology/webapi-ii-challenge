import React, { Component } from 'react';
import './App.css';
import {getPosts} from './actions/index';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import Post from './components/Post';

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContainer = Styled.div`
  width: 70%;
  height: auto;
  border: 1px solid black
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
`;



class App extends Component {

  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    return (
      <Container >
      {this.props.posts.map(post => {
        return <PostContainer><h3>{post.title}</h3>
        <p>{post.contents}</p>
        </PostContainer>
      })}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
  }
}

const mapActionsToProps = {
  getPosts: getPosts,
}

export default connect(mapStateToProps, mapActionsToProps)(App);
