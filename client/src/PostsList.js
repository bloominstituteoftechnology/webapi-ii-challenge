import React from 'react';
 export default function PostsList(posts){
   return(
    <div>
      <div>{posts.post.title}</div>
      <div>{posts.post.contents}</div>
    </div>
   )
} 

