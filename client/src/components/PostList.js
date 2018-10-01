import React from 'react';
import Post from '../components/Post';

function PostList(props) {
  return (
    <div>
      {props.posts.map(post => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}

export default PostList; 