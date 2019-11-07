import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts")
      .then(res => {
        setPosts(res.data.posts);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Posts App</h1>
      <div className="wrapper">
        {posts &&
          posts.map(post => (
            <Card key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.contents}</p>
              <Card.Meta>{post.created_at}</Card.Meta>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default App;
