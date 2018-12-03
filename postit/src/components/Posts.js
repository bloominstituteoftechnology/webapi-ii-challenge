import React, { Component } from "react";
import { fetchPosts } from "../actions/index";
import Post from "./Post";
import { connect } from "react-redux";
import { Main, Button, SectionHeader } from "../sytles/PostStyles";
import { NavLink } from "react-router-dom";
import lotr from "../img/lord-of-the-rings-total-franchise-revenue.png";
class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <Main>
        <SectionHeader>
          <img src={lotr} width="70" height="90" alt='lotr' />
          <h1>LOTR > QUOTES</h1>
          <br/>
        </SectionHeader>

        <NavLink to="/add" style={{ textDecoration: "none" }}>
          <Button>Add</Button>
        </NavLink>
        <h5>
          Showing {this.props.posts.length} of {this.props.posts.length}
        </h5>
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
