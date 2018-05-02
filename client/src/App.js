import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";


import "./App.css";

import { fetchPost } from "./actions";
import Home from "./component/Home";
import List from "./component/List";
import PostCard from "./component/PostCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/api/posts" render={props => <List {...props} propsList={this.props} />} />
        {/* <Route path="/api/posts/:id" render={props => <PostCard {...props} propsPC={this.props} />} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    fetchingPosts: state.fetchingPosts
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchPost
})(App));
