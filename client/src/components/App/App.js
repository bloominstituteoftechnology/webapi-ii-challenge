import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { fetchPosts, createPost } from '../../actions';
import Post from '../Post/Post';
import Menu from '../Menu/Menu';
import Create from '../Create/Create';
import Edit from '../Edit/Edit';
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
          <Route exact path='/' render={() => {
            return this.props.posts.map(post => {
              return (
                <Post 
                  key={post.id} 
                  id={post.id}
                  title={post.title} 
                  contents={post.contents}
                />
                )
              })
            }}/>
            <Route path='/create' component={Create}/>
            <Route path='/edit/:id' component={Edit}/>
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
