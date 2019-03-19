import React, { useState, useEffect } from "react";
import axios from "axios";

function Post({ post }) {
  return (
    <div className="post-wrapper">
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
    </div>
  );
}

export default function App() {
  const [posts, setPosts] = useState([]);

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
      {posts.map((post, index) => (
        <Post post={post} />
      ))}
    </div>
  );
}
