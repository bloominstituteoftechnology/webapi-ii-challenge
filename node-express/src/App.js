import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { fetchPosts, addPost } from './actions';
import PostForm from './components/PostForm';
import PostsListView from './components/PostList';
import Home from './components/Home';

class App extends Component {
  state = {
    titleInput: '',
    contentsInput: ''
  }

  componentDidMount = () => {
    fetchPosts();
  }

  addNewPost = () => {
    const post = {
      title: this.state.titleInput,
      contents: this.state.contentsInput
    };
    this.props.addPost
  }

  render() {
    return (
      <div className="App">
      <div className="Navigation">
      <NavLink to="/posts" activeClassName="activeNavButton">
        Posts
        </NavLink>
        <NavLink to="/addPost" activeClassName="activeNavButton">
        Add New Post
        </NavLink>
      </div>
      <div className="Page-Window">
      <Route exact path="/" component={Home} />
      <Route exact path="/posts" component={PostsListView} />
      <Route exact path="/addPost" component={PostForm} />
      
      </div>
        
      </div>
    );
  }
}

export default withRouter(App);
