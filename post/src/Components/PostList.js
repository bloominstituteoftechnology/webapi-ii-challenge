import React from 'react';
import Post from './post'
const PostList = (props) =>{

console.log(props.post)
return (<React.Fragment>
<div><h1>Post List </h1></div>
<div>
 {props.post.map(post=>{   
return(


<div>
<Post title={post.title} contents={post.contents}/>
</div>


 
); 
 })}
 </div>
 </React.Fragment>)
}

export default PostList;