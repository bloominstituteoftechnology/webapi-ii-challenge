import React, { useEffect, useState } from "react";
import "./PostsContainer.css";
import { PostCard } from "./index";

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
      {console.log(posts)}
      {!posts.length ? (
        <p className="loading-message">LOADING</p>
      ) : (
        posts.map(post => <PostCard key={post.id} {...post} />)
      )}
    </div>
  );
};

export default PostsContainer;
