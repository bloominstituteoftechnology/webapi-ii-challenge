import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";

import PostList from "./components/PostList";
import { fetchPosts } from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Node Express Lab</h1>
        </header>
        <div className="App-intro">
          <PostList {...this.props} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    posts: state.posts,
    fetchingPosts: state.fetchingPosts
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPosts
  }
)(App);
