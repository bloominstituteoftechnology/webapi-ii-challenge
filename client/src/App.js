import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {fetchPosts} from './actions/index';
import PostsList from './components/PostsList';
import {Switch, Route, Link, withRouter} from 'react-router-dom';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search: ''
    }
  }
  render() {
    return (
      <div className="App">
        <PostsList/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default withRouter(connect(mapStateToProps, {
  fetchPosts
})(App));
