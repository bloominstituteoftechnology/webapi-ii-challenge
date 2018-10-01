import React from 'react';
import styled from 'styled-components';

import Post from '../presentational/Post';

const PostsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

function PostList(props) {
  return (
    <PostsStyle>
      {props.posts.map(post => {
        return <Post key={post.id} post={post} />
      })}
    </PostsStyle>
  )
}

export default PostList;