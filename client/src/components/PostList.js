import React from 'react';


function PostList(props) {
  return (
    <div className='post-list'>
      {props.posts.map(post => (
        <div className='post'>
          <h2 className='title'>{post.title}</h2>
          <p className='contents'>{post.contents}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;