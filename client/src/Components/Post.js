import React from "react";

const Post = (props) => {
   return (
      <div>
         <span>{props.post.created_at}</span>
         <h3>{props.post.title}</h3>
         <p>{props.post.contents}</p>
      </div>
      )
}

export default Post;