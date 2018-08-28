import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="App">
        {this.props.fetchingPosts ? 
        <p> ur posts comin</p>
        : this.props.posts.map(post => <p key={post.id}>title: {post.title} contents: {post.contents} </p>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  fetchingPosts: state.postsReducer.fetchingPosts
})
export default connect(
  mapStateToProps,
  { fetchPosts }
)(App);
