import React from 'react';
import { Link } from 'react-router-dom';
import PostPreview from './PostPreview';

const PostList = props => {
  return (
    <div className='post-list'>
    {props.posts.map(post =>
      <Link key={post.id} to={`/${post.id}`}>
        <PostPreview post={post} />
      </Link>)}
    </div>
  )
}
export default PostList;
