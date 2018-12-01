import React, { Component } from "react";
import { fetchPosts } from "../actions/index";
import Post from "./Post";
import { connect } from "react-redux";
import { Main, Button } from "../sytles/PostStyles";
import {NavLink} from 'react-router-dom'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <Main>
            <h1>LOTR > QUOTES</h1>
            <hr />
            <NavLink to='/add' style={{textDecoration: 'none'}}>
            <Button>Add</Button>
            </NavLink>
        {this.props.loading ? <h1>LOADING...</h1> : null}
        {this.props.error !== null ? <h1>{this.props.error}</h1> : null}
        {this.props.posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </Main>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postReducer.posts,
    error: state.postReducer.error,
    loading: state.postReducer.loading
  };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts);
