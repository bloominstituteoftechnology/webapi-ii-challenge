import React, { Component } from 'react';
import PostsList from './PostsList';
import axios from 'axios';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      posts:[],
    };
  }

componentDidMount(){
  axios
  .get('http://localhost:4000/posts')
  .then(posts => {
    console.log(posts.data);
    this.setState({posts: posts.data})
  })
  .catch(err => console.log(err))
}




  render() {
    console.log(this.state.posts);
    return (
      <div className="App">
      <h1 className="title">Posts</h1>
    {this.state.posts.map(post => <PostsList key={post.id} post={post} />)}
    </div>
    );
  }
}


