import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

const Posts = (props) => {
  return (
    <div>
      {props.posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
      <PostForm />
    </div>
  );
};

export default Posts;
