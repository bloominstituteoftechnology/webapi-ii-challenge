import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import PostsList from "./components/PostsList";

const App = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then(res => {
        console.log(res);
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [posts]);
  return (
    <div className="App">
      <PostsList posts={posts} />
    </div>
  );
};

export default App;
