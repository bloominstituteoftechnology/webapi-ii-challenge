import React, { useEffect, useState } from "react";
import "./Post.css";

const Post = props => {
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/posts/${props.postId}`)
      .then(response => response.json())
      .then(post => {
        setPost(post[0]);
        setTitle(post[0].title);
        setContents(post[0].contents);
      });
  }, []);

  return (
    <section className="post-container">
      <div className="title">
        {isEditing ? (
          <input
            type="text"
            name="title"
            className="input-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        ) : (
          <h2>{post.title}</h2>
        )}
        <div className="buttons">
          <button
            onClick={e => {
              e.preventDefault();
              setIsEditing(!isEditing);
            }}
          >
            Δ
          </button>
          <button>X</button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          name="contents"
          className="textarea-contents"
          cols="90"
          rows="10"
          value={contents}
          onChange={e => setContents(e.target.value)}
        />
      ) : (
        <p>{post.contents}</p>
      )}
    </section>
  );
};

export default Post;
