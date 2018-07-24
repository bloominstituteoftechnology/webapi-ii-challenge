import React from 'react';
import Post from './Post';

const Posts = props => {
  return <div>{props.posts.map(p => <Post key={p.id} post={p} />)}</div>;
};

export default Posts;
