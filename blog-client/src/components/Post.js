import React, { useEffect, useState } from "react";
import "./Post.css";

const Post = props => {
  console.log(props);
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
      })
      .catch(error => console.log(error));
  }, []);

  const updatePost = postBody => {
    fetch(`http://localhost:8000/api/posts/${props.postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postBody)
    })
      .then(response => response.json())
      .then(pst => {
        setPost({ ...post, ...postBody });
      });
  };

  const deletePost = id => {
    fetch(`http://localhost:8000/api/posts/${props.postId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(msg => {
        console.log(msg);
      });
  };

  const showPosts = () => {
    props.setDisplayForm(false);
    props.setDisplayPost(false);
    props.setDisplayPosts(true);
  };

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
          {isEditing ? (
            <button
              onClick={() => {
                updatePost({ title: title, contents: contents });
                setIsEditing(false);
              }}
              className="btn-check"
            >
              &#10004;
            </button>
          ) : (
            <button
              onClick={e => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Δ
            </button>
          )}
          {isEditing ? (
            <button
              onClick={e => {
                e.preventDefault();
                setIsEditing(false);
                setContents(post.contents);
              }}
            >
              Ø
            </button>
          ) : (
            <button
              onClick={() => {
                deletePost();
                showPosts();
              }}
            >
              X
            </button>
          )}
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

//
