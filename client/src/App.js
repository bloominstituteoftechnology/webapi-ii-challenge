import React, { Component } from 'react'
import Posts from './components/Posts'
import Post from './components/Post'
import axios from 'axios'
import { Route } from 'react-router-dom'
import PostForm from './components/PostForm'

import './app.css'

class App extends Component {
  state = {
    posts: [],
    title: '',
    contents: '',
    postDeleted: false,
    deleteConfirmed: false
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        this.setState({
          posts: res.data
        })
      })
      .catch(e => {
        console.log(e, 'ERROR')
      })
  }
  getById = id => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        this.setState({
          title: res.data.title,
          contents: res.data.contents
        })
      })
      .catch(e => console.log(e, 'err'))
  }

  deletePost = id => {
    axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        this.setState({
          postDeleted: res.data,
          deleteConfirmed: true
        })
      })
      .catch(err => {
        console.log(err, 'error')
      })
    axios
      .get('http://localhost:8000/api/posts')
      .then(res => this.setState({ posts: res.data }))
      .catch(e => console.log(e))
  }

  render() {
    return (
      <div className="app-container">
   
        <Route
          exact
          path="/"
          render={props => <Posts {...props} posts={this.state.posts} getById={id => this.getById(id)} />}
        />
        <Route
          path="/:id"
          render={props => <Post {...props} posts={this.state.posts} deletePost={id => this.deletePost(id)} />}
        />
      </div>
    )
  }
}

export default App
