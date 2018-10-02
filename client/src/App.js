import React, { Component } from 'react';
import PostList from './components/PostList';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PostForm from './components/PostForm';
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={PostList} />
        <Route path="/postform" component={PostForm} />
      </div>
    );
  }
}
