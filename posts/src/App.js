import React, { Component } from "react";
import "./App.css";
import PostList from "./components/PostList";
import { connect } from "react-redux";
import { getPosts } from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App" style={{ margin: "20px 0" }}>
        {this.props.error ? (
          <div>
            <h4>{this.props.error}</h4>
          </div>
        ) : (
          <PostList posts={this.props.posts} />
        )}
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    posts: state.posts,
    error: state.error
  };
};

export default connect(
  mapStateToProp,
  { getPosts }
)(App);
