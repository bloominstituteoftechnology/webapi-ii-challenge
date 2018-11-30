import React, { Component } from 'react';
import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';
import './App.css';
import PostForm from './PostForm';
import Posts from './Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount= () => {
    axios.get('http://localhost:3000/api/posts')
      .then( response => {
        if(typeof response.data.message === 'string'){
          Promise.reject("Error: posts are missing!")
        }
        this.setState({ posts: response.data })
      })
      .catch ( err=> console.log(err))
  }

  addNewPost = (obj) => {
    axios.post('http://localhost:3000/api/posts', obj)
      .then(response=>{
              axios.get('http://localhost:3000/api/posts')
          .then( response => {
            if(typeof response.data.message === 'string'){
              Promise.reject("Error: posts are missing!")
            }
            this.setState({ posts: response.data })
          })
          .catch ( err=> console.log(err))
        })
      .catch( err => console.log(err))
  }

  deletePost = (id) => {
    console.log(id);
    return() => {
      axios.delete(`http://localhost:3000/api/posts/${id}`)
        .then(response=>{
              axios.get('http://localhost:3000/api/posts')
          .then( response => {
            if(typeof response.data.message === 'string'){
              Promise.reject("Error: posts are missing!")
            }
            this.setState({ posts: response.data })
          })
          .catch ( err=> console.log(err))
        })
        .catch(err=>console.log(err))
    }
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/add'>Add New Post</NavLink>
        </nav>

        <Route path='/add' render={(props)=> <PostForm {...props} addNewPost={this.addNewPost} />} />
        <Route path='/' render={(props)=> <Posts {...props} posts={this.state.posts} delete={this.deletePost} /> } />

      </div>
    );
  }
}

export default App;