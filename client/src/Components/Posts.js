import React from "react";
import axios from "axios";
import Post from "./Post";

class Posts extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         posts: [],
      };
   }

   componentDidMount() {
//chrome extention or CORS must be used to access localhost:4000
      axios.get("http://localhost:4000/api/posts/")
      .then(posts => {
         this.setState({
            posts: posts.data
         });
      })
      .catch(err => {
         console.log(err);
      });
   }

   deletePost = (postId) => {
      console.log(postId)
      axios.delete(`http://localhost:4000/api/posts/${postId}`)
         .then(post => {
            console.log(post);
         })
         .catch(err => {
            console.log(err);
         })
   }

   updatePost = () => {

   }

   addPost = () => {

   }

   render() {
      return (
         <div>
            {this.state.posts.map(post =>
               <Post 
                  key={post.id} 
                  post={post}
                  delete={this.deletePost}
               />
            )}
         </div>
      )
   }
}

export default Posts;