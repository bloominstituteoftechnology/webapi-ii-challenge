import React from "react";

const Post = (props) => {
   return (
      <div>
         <span onClick={ () => props.delete(props.post.id)}>x</span>
         <h3>{props.post.title}</h3>
         <p>{props.post.contents}</p>
      </div>
      )
}

export default Post;