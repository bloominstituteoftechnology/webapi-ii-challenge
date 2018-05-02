import React,{Component} from "react";


const PostList = ({ posts }) => (
  <div >
    {posts.map((post) => (
      <Post {...post} />
    ))}
  </div>
)

const Post = ({ title, contents }) => (
  <div>
    <h1>{title} </h1>
    <h2>{contents} </h2>
  </div>
)

export default PostList;
