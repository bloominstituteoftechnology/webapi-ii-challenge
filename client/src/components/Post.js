import React, { Component } from 'react';
import styled from 'styled-components';

const PostWrapper = styled.div`
  max-width: 600px;
  min-width: 500px;
  border: 1px solid black;
`;
class Post extends Component {
  render() {
    return (
      <PostWrapper className="Post">
        <h3>{this.props.post.title}</h3>
        <p>{this.props.post.contents}</p>
        {this.props.post.created_at}
        {this.props.post.updated_at}
      </PostWrapper>
    );
  }
}

export default Post;
