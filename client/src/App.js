import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PostList from './Components/PostList';

export default class App extends Component {
  constructor(){
    super(); 
    this.state={
      posts: [],
    }
  }

  componentDidMount(){
       
    axios.get('http://localhost:9000/api/posts')
      .then(posts => {
        this.setState({posts: posts.data})
      })
      .catch(err => console.log(err))


    }


  render() {
    console.log('this is state', this.state.posts)
    return (
      <div className="App">
        {this.state.posts.map( post => <PostList key={post.id} post={post} />)}
      </div>
    );
  }
}


