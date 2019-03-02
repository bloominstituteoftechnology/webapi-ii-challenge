import React, { useEffect, useState } from "react";
import "./Post.css";

const Post = props => {
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${props.postId}`)
      .then(response => response.json())
      .then(post => {
        console.log(post[0]);
        setPost(post[0]);
      });
  }, []);

  return (
    <section className="post-container">
      <button>Δ EDIT</button>
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
    </section>
  );
};

export default Post;
