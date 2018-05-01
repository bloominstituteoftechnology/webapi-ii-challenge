import React from 'react';
import PostCard from './PostCard';


const PostsList = props => {
  return (
    <div className='PostsList'>
      {props.posts.map(post => (
        <PostCard 
          key={post.id}
          post={post}
          delete={props.delete}
        />
      ))}
    </div>
  )
}

export default PostsList;