import React, { useEffect, useState } from "react";
import "./Post.css";

const Post = props => {
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${props.postId}`)
      .then(response => response.json())
      .then(post => {
        setPost(post[0]);
      });
  }, []);

  return (
    <section className="post-container">
      <div className="title">
        <h2>{post.title}</h2>
        <div className="buttons">
          <button>Δ</button>
          <button>X</button>
        </div>
      </div>
      <p>{post.contents}</p>
    </section>
  );
};

export default Post;
