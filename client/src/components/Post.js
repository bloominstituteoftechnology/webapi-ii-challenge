import React from 'react';

function Post(props) {
  return (
    <div>
      <h5>{props.post.title}</h5>
      <p>{props.post.contents}</p>
    </div>
  )
}
 export default Post; 