import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

const Posts = (props) => {
  return (
    <div>
      {props.posts.map((post) => <Post post={post} />)}
      <PostForm />
    </div>
  );
};

export default Posts;
