import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, addPost } from "../actions";
import styled from "styled-components";
import Post from "./Post";
import Form from "./Form";

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  height: 100vh;
`;

const PostCard = styled.div`
  border-radius: 3px;
  width: 200px;
  background-color: gray;
  padding: 5px;
  margin: 10px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  font-family: 'Lato', sans-serif;
`;

class App extends Component {
  state = {
    title: "",
    contents: "",
  };
  componentDidMount() {
    this.props.fetchPosts();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addPost(this.state);
    this.setState({ title: "", contents: "" });
  };

  render() {
    return (
      <PostContainer>
        {this.props.fetchingPosts ? (
          <p> ur posts comin</p>
        ) : (
          this.props.posts.map(post => (
            <PostCard key={post.id}>
              <Post post={post} />
            </PostCard>
          ))
        )}
        <PostCard>
          <Form
            handleSubmit={this.handleSubmit}
            title={this.state.title}
            contents={this.state.contents}
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
          />
        </PostCard>
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
  { fetchPosts, addPost }
)(App);
