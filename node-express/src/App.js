import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { fetchPosts, addPost } from './actions';
import PostFormView from './views/PostFormView';
import PostsListView from './views/PostsListView';
import PostView from './views/PostView';
import Home from './components/Home';

class App extends Component {
  
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
      <Route exact path="/addPost" component={PostFormView} />
      <Route exact path="/posts/:postId" component={PostView} />
      
      </div>
        
      </div>
    );
  }
}

export default withRouter(App);
