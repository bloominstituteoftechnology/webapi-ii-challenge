import React from 'react';
import Post from './Post';


const Posts = (props) => {
    return(
        <div>
        {props.posts.map((post) => {return(
        <Post postTitle = {post.title}
        body = {post.contents}
         />
        )}
      )}
      </div>
    )
}

export default Posts;