import React from 'react';
import Post from './Post';

function PostContainer(props) {
return <ul className='post-container'>{props.posts.map(post=> <Post  key={post.id} post={post} />)}</ul>
}
export default PostContainer;