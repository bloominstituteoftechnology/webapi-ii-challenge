import React, { useState, useEffect } from "react";
import axios from "axios";

function Post({ post, id, deletePost }) {
  return (
    <div className="post-wrapper">
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
      <span onClick={() => deletePost(id)}>delete post</span>
    </div>
  );
}

export default function App() {
  const [posts, setPosts] = useState([]);

  const deletePost = id => {
    axios
    .delete(`http://localhost:9000/api/posts/${id}`)
  
    .catch(err => {
      console.log(err)
    })
    // const newPosts = [...posts];
    // newPosts.splice(id, 1);
    // setPosts(newPosts);
  }

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/posts")
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        setPosts({ error: err });
        console.log(err);
      });
  });

  return (
    <div className="app">
      <h1>Posts:</h1>
      {posts.map((post) => (
        <Post post={post} id={post.id} key={post.id} deletePost={deletePost} />
      ))}
    </div>
  );
}
