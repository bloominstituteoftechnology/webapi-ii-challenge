import React from "react";

const Posts = props => {
console.log(props.notes);
  return (
    <div>
      {props.posts.map(post => {
        return (
          
          <div>
            <h3>{post.title}</h3>
            <br></br>
          </div>
        );
      })}
        
    </div>
  );
  
};

export default Posts;
