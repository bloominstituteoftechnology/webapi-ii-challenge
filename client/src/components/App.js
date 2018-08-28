import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import styled from "styled-components";

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
`;
const PostCard = styled.div`
  width: 200px;
  background-color: gray;
  padding: 0 5px;
  margin: 5px;
`;

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    return (
      <PostContainer>
        {this.props.fetchingPosts ? (
          <p> ur posts comin</p>
        ) : (
          this.props.posts.map(post => (
            <PostCard key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.contents}</p>
            </PostCard>
          ))
        )}
      </PostContainer>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  fetchingPosts: state.postsReducer.fetchingPosts,
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(App);
