import React, { Component } from 'react';
import './App.css';
import axios from "axios"
import PostContainer from './components/postContainer';
import SinglePost from './components/singlePost';
import { Route } from 'react-router-dom';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      posts: []
    };
  }
  componentDidMount() {
    axios
    .get('http://localhost:9000/api/posts')
    .then(response => this.setState({ posts: response.data }))
    .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <Route exact path='/posts' render={props =>(<PostContainer {...props} posts={this.state.posts} />)}/>
        <Route path='/posts/:id' render={props =>(<SinglePost {...props}/>)}/>
      </div>
    );
  }
}
