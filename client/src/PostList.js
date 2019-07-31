import React from "react";
import Post from "./Post";
import "./card.css"
class PostList extends React.Component{
 
    render(){
      return(
         <div className="postList">

             {
                this.props.posts.map(post=>{

                  return <Post key={post.id} post={post} deleteHandler={this.props.deleteHandler}/>

                })

             }

         </div>


      )



    }   


}
export  default PostList
     


