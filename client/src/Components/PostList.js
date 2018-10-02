import React from 'react';

import axios from 'axios';
const uuidv4 = require('uuid/v4');
export default class PostList extends React.Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/posts`)
      .then(res => {
        const posts = res.data;
        this.setState({ posts });
      })
  }

  render() {
    return (
      <ul>
        {this.state.posts.map(post => <li key = {uuidv4()}><h3>{post.title}</h3><p>{post.contents}</p></li>)}
      </ul>
    )
  }
}