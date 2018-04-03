import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, createPost } from '../../actions';
import Post from '../Post/Post';
import Menu from '../Menu/Menu';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="Container">
        <Menu />
        <div className="Content">
          {this.props.posts.map(post => {
            return (
              <Post 
                key={post.id} 
                title={post.title} 
                contents={post.contents}
              />
              )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
  }
}

export default connect(mapStateToProps, { fetchPosts, createPost})(App);
