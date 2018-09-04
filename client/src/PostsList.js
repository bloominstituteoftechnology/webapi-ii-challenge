import React from 'react';
import './PostList.css'
 export default function PostsList({ post }){
   return(
    <div className="posts">
      <div><h3>{post.title}</h3></div>
      <div><h3>{post.contents}</h3></div>
    </div>
   )
} 

