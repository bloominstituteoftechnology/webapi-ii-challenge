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

function FormAddOrUpdate({ addPost }) {
  const [post, setPost] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    addPost({
      "title": post,
      "contents": content
    });
    setPost("");
    setContent("");
  };

  return (
    <div className="add-post-form">
      <h2>Add Post:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={post}
          onChange={e => setPost(e.target.value)}
        />
        <input
          type="text"
          name="content"
          placeholder="contents"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        {/* <input
          type="number"
          name="id"
          placeholder="id of post to edit"
          value={id}
          onChange={e => setId(e.target.value)}
        /> */}
        <button>{"Add Post"}</button>
      </form>
    </div>
  );
}

export default function App() {
  const [posts, setPosts] = useState([]);
  

  const deletePost = id => {
    axios
      .delete(`http://localhost:9000/api/posts/${id}`)
    .then(res => {
      fetchData();
    })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchData = () => {
    axios
    .get("http://localhost:9000/api/posts")
    .then(res => {
      setPosts(res.data);
    })
    .catch(err => { 
      setPosts({ error: err });
      console.log(err);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addPost = post => {
    axios.post("http://localhost:9000/api/posts", post)
    .then(res => {
      fetchData();
    })
    .catch(err => { 
      console.log(err)
    })
  };

  return (
    <div className="app">
      <h1>Posts:</h1>
      
      {posts.map(post => (
        <Post post={post} id={post.id} key={post.id} deletePost={deletePost} />
      ))}
      <FormAddOrUpdate addPost={addPost} />
    </div>
  );
}
