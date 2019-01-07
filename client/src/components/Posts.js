import React from 'react';
import Post from './Post';
import styled from 'styled-components';

const PostsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

class Posts extends React.Component {
  render() {
    if (!this.props.posts.length) return <h2>loading</h2>;
    return (
      <>
        <h2>Posts</h2>
        <PostsContainer>
          {this.props.posts.map((p, i) => (
            <Post key={i} post={p} />
          ))}
        </PostsContainer>
      </>
    );
  }
}

export default Posts;
