import React, { useEffect, useState } from "react";

const Post = props => {
  const [post, setPost] = useState({});
  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${props.id}`).then(post =>
      setPost(post)
    );
  }, []);
  return (
    <section className="post-container">
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
    </section>
  );
};

export default Post;
