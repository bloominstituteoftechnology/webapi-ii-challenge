import React, { Component } from 'react';
import PostList from './components/PostList';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <PostList />
      </div>
    );
  }
}
