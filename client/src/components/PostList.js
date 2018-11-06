import React from 'react';
import { Link } from 'react-router-dom';
import PostPreview from './PostPreview';

const PostList = props => {
  const whatTheHellIsHappening = () => {
    console.log('i clicked on the post list preview')
  }
  return (
    <div className='post-list'>
    {props.posts.map(post =>
      <Link key={post.id} to={`/${post.id}`} onClick={() => (whatTheHellIsHappening())}>
        <PostPreview post={post} />
      </Link>)}
    </div>
  )
}
export default PostList;
