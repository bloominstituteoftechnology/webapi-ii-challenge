import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts, addPost, deletePost } from "../actions";
import styled from "styled-components";

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  flex-direction: column;
  height: 100vh;
`;
const PostCard = styled.div`
  width: 200px;
  background-color: gray;
  padding: 0 5px;
  margin: 10px 0;
  border: 1px solid black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`

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
    this.setState({title: '', contents: ''})
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
              <button onClick={() => this.props.deletePost(post.id)}>delete</button>
            </PostCard>
          ))
        )}
        <PostCard>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.title}
              placeholder='Enter title'
              onChange={e => this.setState({ title: e.target.value })}
            />
            <input 
              type="text"
              value={this.state.contents}
              placeholder='Enter contents'
              onChange={e => this.setState({ contents: e.target.value })}
            />
            <input type="submit" />
          </Form>
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
  { fetchPosts, addPost, deletePost }
)(App);
