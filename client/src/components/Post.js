import React, { Component } from 'react';
import styled from 'styled-components';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
const PostWrapper = styled.div`
  max-width: 600px;
  min-width: 500px;
  border-bottom: 1px solid black;
  margin-top: 10px;
  padding-bottom: 10px;
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
