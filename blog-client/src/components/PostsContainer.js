import React, { useEffect, useState } from "react";
import "./PostsContainer.css";

const PostsContainer = props => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8000/api/posts");
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    console.log("mount effect");
    getPosts().then(posts => setPosts(posts));
  }, []);

  return (
    <div className="posts-container">
      {posts.map(post => (
        <section key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
        </section>
      ))}
    </div>
  );
};

export default PostsContainer;
