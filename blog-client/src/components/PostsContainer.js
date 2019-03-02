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

  const clickHandler = id => {
    props.setDisplayForm(false);
    props.setDisplayPosts(false);
    props.setDisplayPost(true);
    props.setPostId(id);
  };

  return (
    <div className="posts-container">
      {console.log(posts)}
      {!posts.length ? (
        <p className="loading-message">LOADING</p>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} {...post} clickHandler={clickHandler} />
        ))
      )}
    </div>
  );
};

export default PostsContainer;
